import { gsap } from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	data.animalSlideCounter++;

	// for the first two animal slides, hide yes and no response buttons
	if (data.animalSlideCounter === 1 || data.animalSlideCounter === 2) {
		gsap.set(['#link-s-human-yes', '#link-s-human-no'], {
			autoAlpha: 0,
		});

		gsap
			.timeline()
			.to('#link-s-human-yes', {
				delay: 2,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
				onStart: () => {
					play(`./cultures/${data.culture}/audio/yes-no.mp3`);
				},
			})
			.to('#link-s-human-no', {
				delay: 1,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
			});
	}

	// todo audio
	// await playPromise(`./cultures/${data.culture}/audio/s-human.mp3`);
	play(`./cultures/${data.culture}/audio/s-human.mp3`, 'link-s-human-headphones');

	const response = await getResponse(['link-s-human-yes', 'link-s-human-no']);

	console.log(response.id);
	data.procedure.sHuman.response = response.id;

	// play button response sounds only for the first four trials
	if (data.animalSlideCounter <= 4) {
		if (response.id.includes('-yes')) {
			const responseOption = ['ok', 'alright'];
			const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
			await playPromise(`./cultures/${data.culture}/audio/neutral-resp-${randomResponse}.mp3`);
		}

		if (response.id.includes('-no')) {
			await playPromise(`./cultures/${data.culture}/audio/animal-resp-no-next.mp3`);
		}
	}

	await sleep(config.globals.animalSlidesGap);
};
