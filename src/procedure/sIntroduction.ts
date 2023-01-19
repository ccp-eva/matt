import { gsap } from 'gsap';
import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import siWelcome from '../cultures/deUrban/audio/si-welcome_1.mp3';
import siHeadphones from '../cultures/deUrban/audio/si-headphones_1.mp3';
import siNextRed from '../cultures/deUrban/audio/si-next-red_1.mp3';
import { getResponse } from '../util/getResponse';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-introduction');

	const tl = gsap.timeline();
	const headphones = document.getElementById('link-si-headphones')!;
	const nextButton = document.getElementById('link-si-next')!;

	gsap.set(headphones, {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});
	gsap.set(nextButton, {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});

	tl.to(headphones, {
		delay: 13,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});
	tl.to(headphones, {
		filter: 'drop-shadow(0px 0px 14px #c4c4c4)',
		delay: 1,
		repeat: 2,
		yoyo: true,
		reversed: true,
	});

	tl.to(nextButton, {
		delay: 3,
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

	await playPromise(siNextRed, 'link-si-headphones');

	await getResponse('link-si-next', true);
	// kill timeline animations
	tl.kill();
};
