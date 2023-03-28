import { gsap } from 'gsap';
import { play, stop } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { sleep } from '../util/helpers';

export default async () => {
	// show slide
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const pinda = document.getElementById('player') as HTMLVideoElement;

	gsap.set(pinda, { autoAlpha: 0 });

	let isPlaying = true;
	gsap.timeline().to(pinda, {
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/s-dilemma-start.webm`;
		},
	});

	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(pinda, { autoAlpha: 0 });

	await sleep(500);
};
