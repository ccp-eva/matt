import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-pig', 's-cow');
	const startTime = new Date().getTime();

	gsap.set(['#link-s-pig-yes', '#link-s-pig-no'], {
		transformOrigin: '50% 50%',
		autoAlpha: 0,
	});

	gsap
		.timeline()
		.to('#link-s-pig-yes', {
			delay: 2,
			duration: 0.5,
			opacity: 1,
			visibility: 'visible',
			onStart: () => {
				playPromise(`./cultures/${data.culture}/audio/yes-no.mp3`);
			},
		})
		.to('#link-s-pig-no', {
			delay: 1,
			duration: 0.5,
			opacity: 1,
			visibility: 'visible',
		});

	await playPromise(`./cultures/${data.culture}/audio/s-pig.mp3`);
	play(`./cultures/${data.culture}/audio/s-pig.mp3`, 'link-s-pig-headphones');

	const response = await getResponse(['link-s-pig-yes', 'link-s-pig-no']);

	console.log(response.id);
	data.procedure.pig = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.pig.response === 'link-s-pig-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-alright.mp3`);
	}

	if (data.procedure.pig.response === 'link-s-pig-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no.mp3`);
	}
};
