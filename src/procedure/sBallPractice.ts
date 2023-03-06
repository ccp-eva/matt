import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;
	swapSlides('s-ball-practice', 's-ball-animation');

	const ball = document.getElementById('link-sbp-ball')! as SvgInHtml;
	const inner = document.getElementById('sbp-inner')! as SvgInHtml;
	const middle = document.getElementById('sbp-middle')! as SvgInHtml;
	const outer = document.getElementById('sbp-outer')! as SvgInHtml;

	await playPromise(`./cultures/${data.culture}/audio/s-ball-practice.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sbp-expl.mp3`);

	// init data object
	const order = _.shuffle(['inner', 'middle', 'outer']);
	data.procedure.ballPractice = {
		duration: 0,
		explanationCount: 1,
		completed: false,
		order: order,
		inner: '',
		middle: '',
		outer: '',
	};

	const startTime = new Date().getTime();

	let failed = false;
	let repeat = false;
	for (let i = 0; i < order.length; i++) {
		gsap.to([inner, middle, outer], { opacity: 0.5 });
		gsap.to(ball, { x: 0, y: 0, duration: 0.25 });

		const currentCircle = order[i];
		if (i > 0) {
			await sleep(1000);
		}

		if (failed) {
			await playPromise(`./cultures/${data.culture}/audio/sbp-fail.mp3`);
			await playPromise(`./cultures/${data.culture}/audio/sba-${currentCircle}.mp3`);
			failed = false;
			repeat = true;
		}

		await playPromise(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`);
		play(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`, 'link-s-bp-headphones');

		const dragBall = Draggable.create(ball, {
			onDrag: function () {
				if (
					this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(inner, { opacity: 1, duration: 0.25 });
				} else {
					gsap.to(inner, { opacity: 0.5, duration: 0.25 });
				}

				if (
					!this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(middle, { opacity: 1, duration: 0.25 });
				} else {
					gsap.to(middle, { opacity: 0.5, duration: 0.25 });
				}

				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(outer, { opacity: 1, duration: 0.25 });
				} else {
					gsap.to(outer, { opacity: 0.5, duration: 0.25 });
				}
			},
			onDragEnd: function () {
				if (
					this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					dragBall[0].disable();
					// Logging
					data.procedure.ballPractice![currentCircle] = 'inner';

					// SUCCESS
					if (i === 2 && currentCircle === 'inner') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}

					if (i < 2 && currentCircle === 'inner') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp${_.random(1, 2)}.mp3`);
					}

					// FAIL
					if (currentCircle !== 'inner') {
						data.procedure.ballPractice.explanationCount!++;
						failed = true;
						repeat = false;
						data.procedure.ballPractice[currentCircle] === '';
						i -= 1;
					}
				}
				if (
					!this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					dragBall[0].disable();
					// Logging
					data.procedure.ballPractice![currentCircle] = 'middle';

					// SUCCESS
					if (i === 2 && currentCircle === 'middle') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}

					if (i < 2 && currentCircle === 'middle') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp${_.random(1, 2)}.mp3`);
					}

					// FAIL
					if (currentCircle !== 'middle') {
						data.procedure.ballPractice.explanationCount!++;
						failed = true;
						repeat = false;
						data.procedure.ballPractice[currentCircle] === '';
						i -= 1;
					}
				}
				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					dragBall[0].disable();
					// Logging
					data.procedure.ballPractice![currentCircle] = 'outer';

					// SUCCESS
					if (i === 2 && currentCircle === 'outer') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}

					if (i < 2 && currentCircle === 'outer') {
						repeat = false;
						play(`./cultures/${data.culture}/audio/sbp-resp${_.random(1, 2)}.mp3`);
					}

					// FAIL
					if (currentCircle !== 'outer') {
						data.procedure.ballPractice.explanationCount!++;
						failed = true;
						repeat = false;
						data.procedure.ballPractice[currentCircle] === '';
						i -= 1;
					}
				}
			},
		});

		while (data.procedure.ballPractice[currentCircle] === '' || repeat) {
			await sleep(500);
		}
	}

	if (
		data.procedure.ballPractice.inner &&
		data.procedure.ballPractice.middle &&
		data.procedure.ballPractice.outer
	) {
		data.procedure.ballPractice.completed = true;
	}
	data.procedure.ballPractice!.duration = new Date().getTime() - startTime;

	await sleep(1000);
};
