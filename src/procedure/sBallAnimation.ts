import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCounter++;
	swapSlides('s-ball-animation', 's-mc-intro');

	data.procedure.ballAnimation = { completed: false };
	const ball = document.getElementById('link-sba-ball')! as SvgInHtml;
	const innerCircle = document.getElementById('sba-inner')! as SvgInHtml;
	const middleCircle = document.getElementById('sba-middle')! as SvgInHtml;
	const outerCircle = document.getElementById('sba-outer')! as SvgInHtml;

	gsap.set([innerCircle, middleCircle, outerCircle], { opacity: 0.5 });

	gsap.set(ball, { autoAlpha: 0 });

	gsap
		.timeline()
		.to(ball, {
			delay: 2,
			duration: 1,
			autoAlpha: 1,
		})
		.to(ball, {
			delay: 2,
			duration: 1,
			x: -575,
		})
		.to(
			middleCircle,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		)
		.to(ball, {
			delay: 1,
			autoAlpha: 0,
		})
		.to(ball, {
			delay: 0,
			x: 0,
		})
		.to(ball, {
			autoAlpha: 1,
		})
		.to(ball, {
			delay: 1,
			duration: 1,
			x: -460,
		})
		.to(
			outerCircle,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		)
		.to(ball, {
			delay: 1,
			autoAlpha: 0,
		})
		.to(ball, {
			delay: 0,
			x: 0,
		})
		.to(ball, {
			autoAlpha: 1,
		})
		.to(ball, {
			delay: 1,
			duration: 1,
			x: -894,
			onComplete: () => {
				data.procedure.ballAnimation.completed = true;
			},
		})
		.to(
			innerCircle,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		);

	await playPromise(`./cultures/${data.culture}/audio/s-ball-animation.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-middle.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-outer.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sba-inner.mp3`);

	while (!data.procedure.ballAnimation.completed) {
		await sleep(500);
	}
};
