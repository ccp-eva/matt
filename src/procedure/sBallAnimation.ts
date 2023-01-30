import { gsap } from 'gsap';
import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;
	swapSlides('s-ball-animation', 's-mc-intro');

	const tl = gsap.timeline();
	// fade in ball
	tl.fromTo(
		'#link-sba-ball',
		{
			opacity: 0,
		},
		{
			delay: 2,
			duration: 1,
			opacity: 1,
		}
	);
	tl.to('#link-sba-ball', {
		delay: 2,
		duration: 1,
		x: -575,
	});
	tl.to('#link-sba-ball', {
		delay: 1,
		opacity: 0,
	});
	tl.to('#link-sba-ball', {
		delay: 0,
		x: 0,
	});
	tl.to('#link-sba-ball', {
		opacity: 1,
	});
	tl.to('#link-sba-ball', {
		delay: 1,
		duration: 1,
		x: -460,
	});
	tl.to('#link-sba-ball', {
		delay: 1,
		opacity: 0,
	});
	tl.to('#link-sba-ball', {
		delay: 0,
		x: 0,
	});
	tl.to('#link-sba-ball', {
		opacity: 1,
	});
	tl.to('#link-sba-ball', {
		delay: 1,
		duration: 1,
		x: -894,
	});

	await playPromise(`./cultures/${data.culture}/audio/s-ball-animation_2.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-medium_1.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-outer_1.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-inner_2.mp3`);
};
