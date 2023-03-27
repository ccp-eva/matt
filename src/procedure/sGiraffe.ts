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

	const giraffe = document.getElementById('link-giraffe');

	// for the first two animal slides, hide yes and no response buttons
	if (data.animalSlideCounter <= config.globals.playAnimalYesNoAudio) {
		gsap.set(['#link-s-giraffe-yes', '#link-s-giraffe-no', giraffe], {
			autoAlpha: 0,
		});

		gsap
			.timeline()
			.to(giraffe, {
				autoAlpha: 1,
				delay: 3,
				duration: 2,
			})
			.to('#link-s-giraffe-yes', {
				duration: 0.5,
				autoAlpha: 1,
				onStart: () => {
					play(`./cultures/${data.culture}/audio/yes-no.mp3`);
				},
			})
			.to('#link-s-giraffe-no', {
				delay: 1,
				duration: 0.5,
				autoAlpha: 1,
			});
	}

	// todo audio
	// await playPromise(`./cultures/${data.culture}/audio/s-giraffe.mp3`);
	play(`./cultures/${data.culture}/audio/s-cat.mp3`, 'link-s-giraffe-headphones');

	const response = await getResponse(['link-s-giraffe-yes', 'link-s-giraffe-no']);

	console.log(response);
	console.log(response.id);
	data.procedure.sGiraffe.response = response.id;

	// play button response sounds only for the first four trials
	if (data.animalSlideCounter <= config.globals.playAnimalResponseFeedback) {
		if (response.id.includes('-yes')) {
			const responseOption = ['ok', 'alright'];
			const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
			await playPromise(`./cultures/${data.culture}/audio/neutral-resp-${randomResponse}.mp3`);
		}

		if (response.id.includes('-no')) {
			const responseOption = ['resp-no', 'resp-no-next'];
			const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
			await playPromise(`./cultures/${data.culture}/audio/animal-${randomResponse}.mp3`);
		}
	}

	await sleep(config.globals.animalSlidesGap);
};
