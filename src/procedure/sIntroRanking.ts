import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [2, 2]);

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/intro-ranking.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	const pinda = document.getElementById('player') as HTMLVideoElement;

	let isPlaying = false;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	isPlaying = true;
	pinda.src = url;

	while (isPlaying) {
		await sleep(100);
	}

	await sleep(500);
};
