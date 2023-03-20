import { gsap } from 'gsap';
import _, { head } from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const pinda = document.getElementById('player') as HTMLVideoElement;
	const headphones = document.getElementById('link-sib-headphones') as SvgInHtml;

	gsap.set([pinda, headphones], { autoAlpha: 0 });

	const tl = gsap.timeline();

	tl.to(pinda, {
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/sr-react2-transition-4.webm`;
		},
	}).to(pinda, {
		autoAlpha: 0,
		delay: 20,
	});

	await sleep(23000);

	const fsplayer = document.getElementById('fsplayer') as HTMLVideoElement;
	gsap.set(fsplayer, { autoAlpha: 0 });
	tl.to(fsplayer, {
		display: 'block',
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			fsplayer.src = '../assets/s-intro-boats.mp4';
		},
	}).to(fsplayer, {
		autoAlpha: 0,
		delay: 17,
	});

	await playPromise(`./cultures/${data.culture}/audio/s-intro-boats.mp3`);

	await sleep(500);
};
