import { gsap } from 'gsap';
import _ from 'lodash';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			duration: 2,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/intro-reasoning.webm`;
			},
		})
		.to(pinda, {
			autoAlpha: 0,
			delay: 10.5,
		});

	await sleep(500);
};
