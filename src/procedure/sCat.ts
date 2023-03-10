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
		gsap.set(['#link-s-cat-yes', '#link-s-cat-no'], {
			autoAlpha: 0,
		});

		gsap
			.timeline()
			.to('#link-s-cat-yes', {
				delay: 2,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
				onStart: () => {
					playPromise(`./cultures/${data.culture}/audio/yes-no.mp3`);
				},
			})
			.to('#link-s-cat-no', {
				delay: 1,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
			});
	}

	await playPromise(`./cultures/${data.culture}/audio/s-cat.mp3`);
	play(`./cultures/${data.culture}/audio/s-cat.mp3`, 'link-s-cat-headphones');

	const response = await getResponse(['link-s-cat-yes', 'link-s-cat-no']);

	console.log(response.id);
	data.procedure.sCat.response = response.id;

	// play button response sounds only for the first four trials
	if (data.animalSlideCounter <= 4) {
		if (response.id.includes('-yes')) {
			await playPromise(`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`);
		}

		if (response.id.includes('-no')) {
			await playPromise(`./cultures/${data.culture}/audio/animal-resp-no-next.mp3`);
		}
	}

	await sleep(config.globals.animalSlidesGap);
};
