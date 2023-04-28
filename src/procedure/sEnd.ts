import { gsap } from 'gsap';
import { swapSlides } from '../util/slideVisibility';
import { exitFullscreen, sleep } from '../util/helpers';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);
	exitFullscreen();
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	pinda.src = `./cultures/${data.culture}/video/s-end.${data.meta.videoExtension}`;

	pinda.addEventListener('ended', () => {
		gsap.to(pinda, { autoAlpha: 0, duration: 3 });
	});
};
