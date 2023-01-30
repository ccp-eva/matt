import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;
	swapSlides('s-ball-practice', 's-ball-animation');

	const ball = document.getElementById('link-sbp-ball')! as SvgInHtml;
	Draggable.create(ball, {
		onDragEnd: function () {
			console.log('drag end');
			play(`./cultures/${data.culture}/audio/sbp-resp1_3.mp3`);
		},
	});

	await playPromise(`./cultures/${data.culture}/audio/s-ball-practice_3.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sbp-medium_1.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sbp-expl_1.mp3`);

	await sleep(2000);

	await playPromise(`./cultures/${data.culture}/audio/sbp-inner_1.mp3`);

	await sleep(2000);

	await playPromise(`./cultures/${data.culture}/audio/sbp-outer_1.mp3`);

	await sleep(2000);
};
