import { gsap } from 'gsap';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [0, 0]);

	data.procedure.sBallAnimation.completed = false;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const ball = document.getElementById('link-sba-ball')! as SvgInHtml;
	const innerBallX = Math.round(ball.getBBox().width / 2 + ball.getBBox().x);
	const inner = document.getElementById('sba-inner')! as SvgInHtml;
	const middle = document.getElementById('sba-middle')! as SvgInHtml;
	const outer = document.getElementById('sba-outer')! as SvgInHtml;

	let isPlaying = true;
	audio.addEventListener('play', () => {
		isPlaying = true;
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
	});

	gsap.set(ball, { autoAlpha: 0, transformOrigin: '50% 50%' });
	gsap.set([inner, middle, outer], { opacity: 0.5 });

	// make circle introduction random
	const order = _.shuffle(['inner', 'middle', 'outer']);
	data.procedure.sBallAnimation.order = order;

	play(`./cultures/${data.culture}/audio/s-ball-animation.mp3`);
	gsap.timeline().to(ball, { delay: 2, duration: 1, autoAlpha: 1 });

	while (isPlaying) {
		await sleep(100);
	}

	for (const [i, circle] of order.entries()) {
		play(`./cultures/${data.culture}/audio/sba-${circle}.mp3`);
		await gsap
			.timeline()
			.to(ball, {
				delay: 2,
				duration: 1,
				x: Number(document.getElementById(`sba-${circle}-anchor`)!.getAttribute('cx')) - innerBallX,
			})
			// full opacity to circle
			.to(`#sba-${circle}`, { duration: 1, opacity: 1 }, '<.5')
			.to(ball, { scale: 0.5 }, '<');
		while (isPlaying) {
			await sleep(100);
		}
		await gsap
			.timeline()
			// hide ball
			//.to(ball, { delay: 2, autoAlpha: 0 })
			.to(ball, { autoAlpha: 0 })
			// lower opacity of circle
			.to(
				`#sba-${circle}`,
				{
					autoAlpha: 0.5,
					onComplete: () => {
						if (i === 2) {
							data.procedure.sBallAnimation.completed = true;
						}
					},
				},
				'<.3'
			);
		// while (isPlaying) {
		// 	await sleep(100);
		// }
		if (i < 2) {
			// repostion ball to start and show it
			gsap
				.timeline()
				.to(ball, { x: 0, scale: 1, delay: 0 })
				.to(ball, { autoAlpha: 1, duration: 1 });
		}
	}

	while (!data.procedure.sBallAnimation.completed) {
		await sleep(500);
	}
};
