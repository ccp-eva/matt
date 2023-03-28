import { gsap } from 'gsap';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [0, 0]);

	data.procedure.sBallAnimation.completed = false;
	const ball = document.getElementById('link-sba-ball')! as SvgInHtml;
	const innerBallX = Math.round(ball.getBBox().width / 2 + ball.getBBox().x);
	const inner = document.getElementById('sba-inner')! as SvgInHtml;
	const middle = document.getElementById('sba-middle')! as SvgInHtml;
	const outer = document.getElementById('sba-outer')! as SvgInHtml;

	gsap.set(ball, { autoAlpha: 0 });
	gsap.set([inner, middle, outer], { opacity: 0.5 });

	// make circle introduction random
	const order = _.shuffle(['inner', 'middle', 'outer']);
	data.procedure.sBallAnimation.order = order;

	// get anchor coordinates
	const ballToAnchor0 =
		Number(document.getElementById(`sba-${order[0]}-anchor`)!.getAttribute('cx')) - innerBallX;
	const ballToAnchor1 =
		Number(document.getElementById(`sba-${order[1]}-anchor`)!.getAttribute('cx')) - innerBallX;
	const ballToAnchor2 =
		Number(document.getElementById(`sba-${order[2]}-anchor`)!.getAttribute('cx')) - innerBallX;

	gsap
		.timeline()
		// no animation, just start audio
		.to(ball, {
			onStart: function () {
				play(`./cultures/${data.culture}/audio/s-ball-animation.mp3`);
			},
		})
		// start animation in parallel ("<" means "at the same time")
		.to(
			ball,
			{
				delay: 2,
				duration: 1,
				autoAlpha: 1,
			},
			'<'
		)
		// no animation, just start order0 audio
		.to(ball, {
			delay: 1,
			onStart: function () {
				play(`./cultures/${data.culture}/audio/sba-${order[0]}.mp3`);
			},
		})
		// start order0 animation in parallel
		.to(
			ball,
			{
				delay: 2,
				duration: 1,
				x: ballToAnchor0,
			},
			'<'
		)
		// full opacity to circle
		.to(
			`#sba-${order[0]}`,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		)
		// hide ball
		.to(ball, {
			delay: 2,
			autoAlpha: 0,
		})
		// lower opacity of circle
		.to(
			`#sba-${order[0]}`,
			{
				autoAlpha: 0.5,
			},
			'<.3'
		)
		// repostion ball to start
		.to(ball, {
			x: 0,
			delay: 0,
		})
		// show ball
		.to(ball, {
			autoAlpha: 1,
			duration: 1,
		})
		// no animation, just start order1 audio
		.to(ball, {
			onStart: function () {
				play(`./cultures/${data.culture}/audio/sba-${order[1]}.mp3`);
			},
		})

		// start order1 animation in parallel
		.to(
			ball,
			{
				delay: 2,
				duration: 1,
				x: ballToAnchor1,
			},
			'<'
		)
		// full opacity to circle
		.to(
			`#sba-${order[1]}`,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		)
		// hide ball
		.to(ball, {
			delay: 2,
			autoAlpha: 0,
		})
		// lower opacity of circle
		.to(
			`#sba-${order[1]}`,
			{
				autoAlpha: 0.5,
			},
			'<.3'
		)
		// repostion ball to start
		.to(ball, {
			x: 0,
			delay: 0,
		})
		// show ball
		.to(ball, {
			autoAlpha: 1,
			duration: 1,
		})
		// no animation, just start order2 audio
		.to(ball, {
			onStart: function () {
				play(`./cultures/${data.culture}/audio/sba-${order[2]}.mp3`);
			},
		})

		// start order2 animation in parallel
		.to(
			ball,
			{
				delay: 2,
				duration: 1,
				x: ballToAnchor2,
			},
			'<'
		)
		// full opacity to circle
		.to(
			`#sba-${order[2]}`,
			{
				duration: 1,
				opacity: 1,
			},
			'<.5'
		)
		// hide ball
		.to(ball, {
			delay: 2,
			autoAlpha: 0,
		})
		// lower opacity of circle
		.to(
			`#sba-${order[2]}`,
			{
				autoAlpha: 0.5,
				onComplete: () => {
					data.procedure.sBallAnimation.completed = true;
				},
			},
			'<.3'
		);

	while (!data.procedure.sBallAnimation.completed) {
		await sleep(500);
	}
};
