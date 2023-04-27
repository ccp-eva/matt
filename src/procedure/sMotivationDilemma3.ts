import { swapSlides } from '../util/slideVisibility';
import { sleep } from '../util/helpers';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	const pinda = document.getElementById('pinda') as HTMLVideoElement;

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/s-motivation-dilemma3.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

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
};
