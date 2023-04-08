import { gsap } from 'gsap';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	// check if current slide is last slide in any of the orders
	let isLast = false;
	[data.companionOrder, data.foodOrder, data.controlOrder].forEach((order) => {
		const orderLength = order.length - 1;
		if (order.indexOf(_.kebabCase(data.currentSlide)) === orderLength) {
			isLast = true;
			return;
		}
	});
	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });

	const slidePrefix = 's1h100cats';
	const leftPostfix = 'oneHuman';
	const rightPostfix = 'hundredCats';
	const headphones = document.getElementById(`link-${slidePrefix}-headphones`)! as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const left = document.getElementById(`${slidePrefix}-${leftPostfix}`)! as SvgInHtml;
	const center = document.getElementById(`${slidePrefix}-cantDecide`)! as SvgInHtml;
	const right = document.getElementById(`${slidePrefix}-${rightPostfix}`)! as SvgInHtml;

	gsap.set([left, center, right, headphones], { opacity: 0.5, pointerEvents: 'none' });

	await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-left.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/saving.mp3`);

	gsap.set([left, center, right, headphones], { opacity: 1, pointerEvents: 'visible' });

	audio.addEventListener('play', () => {
		gsap.set([headphones, left, center, right], { autoAlpha: 0.25, pointerEvents: 'none' });
	});
	audio.addEventListener('ended', () => {
		gsap.to([headphones, left, center, right], { autoAlpha: 1, pointerEvents: 'visible' });
	});

	play(`./cultures/${data.culture}/audio/${slidePrefix}-left.mp3`, headphones.id);

	[left, center, right].forEach((el) => {
		el.classList.add('dilemma-card');
	});

	// save responses and store to response object
	let response = await getResponse([
		`${slidePrefix}-${leftPostfix}`,
		`${slidePrefix}-cantDecide`,
		`${slidePrefix}-${rightPostfix}`,
	]);

	// bubble up until first g element
	while (response.tagName !== 'g') {
		response = response.parentElement!;
	}

	console.log(response.id);
	data.procedure[data.currentSlide].response = response.id;

	if (isLast && !data.dilemmaMotivationTwoPlayed) {
		pinda.addEventListener('play', () => {
			isPlaying = true;
		});
		pinda.addEventListener('ended', () => {
			isPlaying = false;
		});
		let isPlaying = true;
		if (data.dilemmaMotivationOnePlayed === false) {
			pinda.src = `./cultures/${data.culture}/video/motivation-dilemma1.webm`;
			data.dilemmaMotivationOnePlayed = true;
		} else {
			pinda.src = `./cultures/${data.culture}/video/motivation-dilemma2.webm`;
			data.dilemmaMotivationTwoPlayed = true;
		}

		await gsap.timeline().to(`#${left.parentElement!.id}`, { autoAlpha: 0 });

		while (isPlaying) {
			await sleep(100);
		}
	}
};
