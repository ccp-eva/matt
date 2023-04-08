import { swapSlides } from '../util/slideVisibility';
import { sleep } from '../util/helpers';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	const pinda = document.getElementById('player') as HTMLVideoElement;

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/intro-human-animals.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	let isPlaying = true;
	pinda.src = url;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	while (isPlaying) {
		await sleep(100);
	}
};
