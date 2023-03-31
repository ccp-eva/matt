import { gsap } from 'gsap';
import _, { head } from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const slidePrefix = 's100h1cat';
	const leftPostfix = 'oneCat';
	const rightPostfix = 'hundredHumans';
	const headphones = document.getElementById(`link-${slidePrefix}-headphones`)! as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const left = document.getElementById(`${slidePrefix}-${leftPostfix}`)! as SvgInHtml;
	const center = document.getElementById(`${slidePrefix}-cantDecide`)! as SvgInHtml;
	const right = document.getElementById(`${slidePrefix}-${rightPostfix}`)! as SvgInHtml;

	gsap.set([left, center, right, headphones], { opacity: 0.5, pointerEvents: 'none' });

	await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-right.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/saving.mp3`);

	gsap.set([left, center, right, headphones], { opacity: 1, pointerEvents: 'visible' });

	audio.addEventListener('play', () => {
		gsap.set([headphones, left, center, right], { autoAlpha: 0.25, pointerEvents: 'none' });
	});
	audio.addEventListener('ended', () => {
		gsap.to([headphones, left, center, right], { autoAlpha: 1, pointerEvents: 'visible' });
	});

	play(`./cultures/${data.culture}/audio/${slidePrefix}-right.mp3`, headphones.id);

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

	await sleep(500);
};
