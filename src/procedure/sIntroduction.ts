import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import siWelcome from '../cultures/deUrban/audio/si-welcome_1.mp3';
import siHeadphones from '../cultures/deUrban/audio/si-headphones_1.mp3';
import siNextRed from '../cultures/deUrban/audio/si-next-red_1.mp3';
import { getResponse } from '../util/getResponse';

export default async () => {
	// show first slide
	swapSlides('s-introduction');

	const tl = gsap.timeline();
	const nextButton = document.getElementById('link-si-next')!;
	gsap.set(nextButton, {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});

	tl.to(nextButton, {
		delay: 8,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});
	tl.to(nextButton, {
		filter: 'drop-shadow(0px 0px 14px #a90707)',
		delay: 1,
		repeat: -1,
		yoyo: true,
		reversed: true,
	});

	await playPromise(siWelcome);
	await playPromise(siHeadphones);
	await playPromise(siNextRed);

	play(siNextRed, 'link-si-headphones');
};
