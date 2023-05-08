import { gsap } from 'gsap';
import { moveToCenterAnchor, sleep } from '../util/helpers';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export const sDilemmaCodeRunner = async (
	currentSlide: string,
	previousSlide: string,
	slidePrefix: string,
	leftPostfix: string,
	rightPostfix: string,
	swapLeftRight: boolean
) => {
	swapSlides(currentSlide, previousSlide);

	// check if current slide is last slide in any of the orders
	let isLast = false;
	if (data.companionOrder && data.foodOrder && data.controlOrder) {
		[data.companionOrder, data.foodOrder, data.controlOrder].forEach((order) => {
			const orderLength = order.length - 1;
			if (order.indexOf(_.kebabCase(data.currentSlide)) === orderLength) {
				isLast = true;
				return;
			}
		});
	}
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });

	const headphones = document.getElementById(`link-${slidePrefix}-headphones`)! as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const left = document.getElementById(`${slidePrefix}-${leftPostfix}`)! as SvgInHtml;
	const center = document.getElementById(`${slidePrefix}-cantDecide`)! as SvgInHtml;
	const right = document.getElementById(`${slidePrefix}-${rightPostfix}`)! as SvgInHtml;

	gsap.set([left, center, right, headphones], { opacity: 0.5, pointerEvents: 'none' });

	// swap left box with right box if swapLeftRight is true
	data.procedure[data.currentSlide].swapLeftRight = swapLeftRight;
	if (swapLeftRight) {
		moveToCenterAnchor(left, 1580);
		moveToCenterAnchor(right, 340);
		await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-right.mp3`);
	} else {
		await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-left.mp3`);
	}

	await playPromise(`./cultures/${data.culture}/audio/saving.mp3`);

	gsap.set([left, center, right, headphones], { opacity: 1, pointerEvents: 'visible' });

	audio.addEventListener('play', () => {
		gsap.set([headphones, left, center, right], { autoAlpha: 0.25, pointerEvents: 'none' });
	});
	audio.addEventListener('ended', () => {
		gsap.to([headphones, left, center, right], { autoAlpha: 1, pointerEvents: 'visible' });
	});

	if (swapLeftRight) {
		play(`./cultures/${data.culture}/audio/${slidePrefix}-right.mp3`, headphones.id);
	} else {
		play(`./cultures/${data.culture}/audio/${slidePrefix}-left.mp3`, headphones.id);
	}

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
			pinda.src = `./cultures/${data.culture}/video/motivation-dilemma1.${data.meta.videoExtension}`;
			data.dilemmaMotivationOnePlayed = true;
		} else {
			pinda.src = `./cultures/${data.culture}/video/motivation-dilemma2.${data.meta.videoExtension}`;
			data.dilemmaMotivationTwoPlayed = true;
		}

		await gsap.timeline().to(`#${left.parentElement!.id}`, { autoAlpha: 0 });

		while (isPlaying) {
			await sleep(100);
		}
	}
};