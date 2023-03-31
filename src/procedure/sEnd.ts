import _ from 'lodash';
import { gsap } from 'gsap';
import { swapSlides } from '../util/slideVisibility';
import { exitFullscreen } from '../util/helpers';
import { downloadData, uploadData } from '../util/helpers';

export default async () => {
	exitFullscreen();
	uploadData();
	downloadData();
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });

	gsap.timeline().to(pinda, {
		autoAlpha: 1,

		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/s-end.webm`;
		},
	});
};
