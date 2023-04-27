import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [2, 2]);
	const pinda = document.getElementById('pinda') as HTMLVideoElement;

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/motivation-questions.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	let isPlaying = true;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	pinda.src = url;

	while (isPlaying) {
		await sleep(100);
	}
};
