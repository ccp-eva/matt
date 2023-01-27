import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-pig', 's-cow');

	const startTime = new Date().getTime();

	const tl = gsap.timeline();

	gsap.set('#link-s-pig-yes', {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});
	gsap.set('#link-s-pig-no', {
		transformOrigin: '50% 50%',
		opacity: 0,
		visibility: 'hidden',
	});

	tl.to('#link-s-pig-yes', {
		delay: 2,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});

	tl.to('#link-s-pig-no', {
		delay: 1,
		duration: 0.5,
		opacity: 1,
		visibility: 'visible',
	});

	await playPromise(`./cultures/${data.culture}/audio/s-food2_1.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/yes-no_new.mp3`);

	play(`./cultures/${data.culture}/audio/s-food2_1.mp3`, 'link-s-pig-headphones');

	const response = await getResponse(['link-s-pig-yes', 'link-s-pig-no']);
	console.log(response.id);
	data.procedure.pig = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
