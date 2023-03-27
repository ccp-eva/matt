import { gsap } from 'gsap';
import _, { head } from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [2, 2]);
	const fsplayer = document.getElementById('fsplayer') as HTMLVideoElement;

	gsap.set(fsplayer, { autoAlpha: 0 });
	gsap.timeline().to(fsplayer, {
		display: 'block',
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			play(`./cultures/${data.culture}/audio/resolve-dilemma.mp3`);
			fsplayer.src = `./cultures/${data.culture}/video/s-resolve-dilemma.mp4`;
		},
	});

	await sleep(20000);
};
