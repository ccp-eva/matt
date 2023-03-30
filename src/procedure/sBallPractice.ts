import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [0, 0]);

	const ball = document.getElementById('link-sbp-ball')! as SvgInHtml;
	const inner = document.getElementById('sbp-inner')! as SvgInHtml;
	const middle = document.getElementById('sbp-middle')! as SvgInHtml;
	const outer = document.getElementById('sbp-outer')! as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;

	gsap.set([inner, middle, outer], { opacity: 0.5 });

	let isPlaying = true;
	audio.addEventListener('play', () => {
		isPlaying = true;
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
	});
	await playPromise(`./cultures/${data.culture}/audio/s-ball-practice.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sbp-expl.mp3`);

	// init data object
	// todo if explanation count > 3 skip to dilemma https://github.com/ccp-eva/matt/issues/18
	const order = _.shuffle(['inner', 'middle', 'outer']);
	data.procedure.sBallPractice = {
		duration: 0,
		addExplanationCount: 0,
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

		console.log(currentCircle);

		if (failed) {
			failed = false;
			repeat = true;

			gsap.timeline().to('#link-s-bp-headphones', {
				autoAlpha: 0,
			});

			await playPromise(`./cultures/${data.culture}/audio/sbp-fail.mp3`);

			gsap
				.timeline()
				.to(inner, {
					delay: 3,
					autoAlpha: 1,
					repeat: 2,
				})
				.to(inner, {
					autoAlpha: 0.5,
				})
				.to(middle, {
					delay: 2.5,
					autoAlpha: 1,
					repeat: 2,
				})
				.to(middle, {
					autoAlpha: 0.5,
				})
				.to(outer, {
					delay: 1.75,
					autoAlpha: 1,
					repeat: 2,
					reversed: true,
				})
				.to(outer, {
					autoAlpha: 0.5,
				})
				.to('#link-s-bp-headphones', {
					autoAlpha: 1,
				});

			await playPromise(`./cultures/${data.culture}/audio/sbp-repeat-rules.mp3`);
		}

		play(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`, 'link-s-bp-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`);

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
					data.procedure.sBallPractice![currentCircle] = 'inner';

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
						data.procedure.sBallPractice.addExplanationCount++;
						failed = true;
						repeat = false;
						data.procedure.sBallPractice[currentCircle] === '';
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
					data.procedure.sBallPractice![currentCircle] = 'middle';

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
						data.procedure.sBallPractice.addExplanationCount++;
						failed = true;
						repeat = false;
						data.procedure.sBallPractice[currentCircle] === '';
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
					data.procedure.sBallPractice![currentCircle] = 'outer';

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
						data.procedure.sBallPractice.addExplanationCount++;
						failed = true;
						repeat = false;
						data.procedure.sBallPractice[currentCircle] === '';
						i -= 1;
					}
				}
			},
		});

		while (data.procedure.sBallPractice[currentCircle] === '' || repeat) {
			await sleep(500);
		}
	}

	if (
		data.procedure.sBallPractice.inner &&
		data.procedure.sBallPractice.middle &&
		data.procedure.sBallPractice.outer
	) {
		data.procedure.sBallPractice.completed = true;
	}

	while (isPlaying) {
		await sleep(100);
	}

	// await sleep(1000);
};
