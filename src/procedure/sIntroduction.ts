import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
// todo make this a dynamic import
import pindaStart from '../cultures/deUrban/video/si_welcome_headphones.webm';
import pindaNext from '../cultures/deUrban/video/si_next.webm';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-introduction');

	const startTime = new Date().getTime();

	const player = document.getElementById('player') as HTMLVideoElement;
	player.src = pindaStart;

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
		delay: 17,
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
		onStart: () => {
			player.src = pindaNext;
		},
		delay: 4,
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

	const pindaRepeat = gsap.timeline();

	// await playPromise(`./cultures/${data.culture}/audio/si-welcome_1.mp3`);
	// await playPromise(`./cultures/${data.culture}/audio/si-headphones_1.mp3`);
	// await playPromise(`./cultures/${data.culture}/audio/si-next-red_1.mp3`);

	play(`./cultures/${data.culture}/audio/si-next_2.mp3`, 'link-si-headphones');

	await getResponse('link-si-next');

	data.procedure.introduction = {
		duration: new Date().getTime() - startTime,
	};

	// kill timeline animations
	tl.kill();

	player.style.display = 'none';
};
