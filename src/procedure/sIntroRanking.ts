import { gsap } from 'gsap';
import _ from 'lodash';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [2, 2]);
	const pinda = document.getElementById('player') as HTMLVideoElement;

	let isPlaying = true;

	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	gsap.set(pinda, { autoAlpha: 0 });

	gsap.to(pinda, {
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/intro-ranking.webm`;
		},
	});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(pinda, {
		autoAlpha: 0,
	});

	await sleep(500);
};
