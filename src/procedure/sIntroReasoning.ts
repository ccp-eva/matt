import { gsap } from 'gsap';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/intro-reasoning.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	const pinda = document.getElementById('player') as HTMLVideoElement;

	let isPlaying = true;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	pinda.src = `./cultures/${data.culture}/video/intro-reasoning.webm`;

	while (isPlaying) {
		await sleep(100);
	}
};
