import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCounter++;
	swapSlides('s-intro-boats', 's-task');

	const pinda = document.getElementById('player') as HTMLVideoElement;

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			delay: 0.5,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/sr-react2-transition-4.webm`;
			},
		})
		.to(pinda, {
			autoAlpha: 0,
			delay: 21,
		});
};
