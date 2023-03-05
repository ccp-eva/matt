import { gsap } from 'gsap';
import { play, playPromise, stop } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-introduction');

	const startTime = new Date().getTime();

	const pinda = document.getElementById('player') as HTMLVideoElement;

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

	// timeline start
	tl.to(pinda, {
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/s-introduction.webm`;
		},
	})
		.to(
			headphones,
			{
				delay: 17,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
			},
			'<'
		)
		.to(headphones, {
			filter: 'drop-shadow(0px 0px 14px #c4c4c4)',
			delay: 1,
			repeat: 2,
			yoyo: true,
			reversed: true,
		})
		.to(nextButton, {
			delay: 5,
			opacity: 1,
			visibility: 'visible',
		})
		.to(nextButton, {
			filter: 'drop-shadow(0px 0px 14px #a90707)',
			delay: 1,
			repeat: -1,
			yoyo: true,
			reversed: true,
		})
		.to(pinda, {
			delay: 3,
			autoAlpha: 0,
			onStart: () => {
				play(`./cultures/${data.culture}/audio/si-next-red.mp3`, 'link-si-headphones');
			},
		});

	await getResponse('link-si-next');
	// stop audio playback after next button is clicked
	stop();

	data.procedure.introduction = {
		duration: new Date().getTime() - startTime,
	};

	// kill timeline animations
	tl.kill();
};
