import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-cow', 's-transition-2');
	const startTime = new Date().getTime();

	const tl = gsap.timeline();

	gsap.set('#link-s-cow-yes', {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});
	gsap.set('#link-s-cow-no', {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});

	tl.to('#link-s-cow-yes', {
		delay: 2,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});

	tl.to('#link-s-cow-no', {
		delay: 1,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});

	await playPromise(`./cultures/${data.culture}/audio/s-food1_1.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/yes-no_new.mp3`);

	play(`./cultures/${data.culture}/audio/s-food1_1.mp3`, 'link-s-cow-headphones');

	const response = await getResponse(['link-s-cow-yes', 'link-s-cow-no']);
	console.log(response.id);
	data.procedure.cow = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
