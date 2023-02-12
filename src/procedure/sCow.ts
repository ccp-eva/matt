import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-cow', 's-humans');
	const startTime = new Date().getTime();

	gsap.set(['#link-s-cow-yes', '#link-s-cow-no'], {
		transformOrigin: '50% 50%',
		autoAlpha: 0,
	});

	gsap
		.timeline()
		.to('#link-s-cow-yes', {
			delay: 2,
			duration: 0.5,
			opacity: 1,
			visibility: 'visible',
			onStart: () => {
				playPromise(`./cultures/${data.culture}/audio/yes-no.mp3`);
			},
		})
		.to('#link-s-cow-no', {
			delay: 1,
			duration: 0.5,
			opacity: 1,
			visibility: 'visible',
		});

	await playPromise(`./cultures/${data.culture}/audio/s-cow.mp3`);
	play(`./cultures/${data.culture}/audio/s-cow.mp3`, 'link-s-cow-headphones');

	const response = await getResponse(['link-s-cow-yes', 'link-s-cow-no']);

	console.log(response.id);
	data.procedure.cow = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.cow.response === 'link-s-cow-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`);
	}

	if (data.procedure.cow.response === 'link-s-cow-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no.mp3`);
	}
};
