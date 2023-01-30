import { gsap } from 'gsap';
import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;
	swapSlides('s-mc-intro', 's-transition-3');

	const tl = gsap.timeline();

	// gsap flash animation for smci-inner id
	tl.to('#smci-inner', {
		delay: 11,
		fill: '#c4c4c4',
		repeat: 4,
		yoyo: true,
		reversed: true,
	});
	tl.to('#smci-middle', {
		delay: 1.5,
		fill: '#c4c4c4',
		repeat: 4,
		yoyo: true,
		reversed: true,
	});
	tl.to('#smci-outer', {
		delay: 1.5,
		fill: '#c4c4c4',
		repeat: 4,
		yoyo: true,
		reversed: true,
	});

	await playPromise(`./cultures/${data.culture}/audio/s-mc-intro_1.mp3`);
};
