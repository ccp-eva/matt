import { gsap } from 'gsap';
import { swapSlides } from '../util/slideVisibility';
import _ from 'lodash';
import { sleep } from '../util/helpers';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	// show slide
	swapSlides(currentSlide, previousSlide);
	const pinda = document.getElementById('pinda') as HTMLVideoElement;

	let isPlaying = false;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
		gsap.to(pinda, { autoAlpha: 0 });
	});

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(
		`./cultures/${data.culture}/video/s-dilemma-start.${data.meta.videoExtension}`
	);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	isPlaying = true;
	pinda.src = url;

	while (isPlaying) {
		await sleep(100);
	}
};
