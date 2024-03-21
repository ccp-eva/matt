import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [0, 0]);

	const ball = document.getElementById('link-sbp-ball')! as SvgInHtml;
	const inner = document.getElementById('sbp-inner')! as SvgInHtml;
	const middle = document.getElementById('sbp-middle')! as SvgInHtml;
	const outer = document.getElementById('sbp-outer')! as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const headphones = document.getElementById('link-s-bp-headphones') as HTMLMediaElement;

	gsap.set([inner, middle, outer, ball], { opacity: 0.5 });
	gsap.set(headphones, { autoAlpha: 0 });

	let isPlaying = false;
	audio.addEventListener('play', () => {
		isPlaying = true;
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
	});

	// init data object
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

	await playPromise(`./cultures/${data.culture}/audio/s-ball-practice.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/sbp-expl.mp3`);
	let failed = false;
	let repeat = false;
	for (let i = 0; i < order.length; i++) {
		if (data.procedure.sBallPractice.addExplanationCount > 3) {
			break;
		}
		gsap.to([inner, middle, outer], { opacity: 0.5 });
		gsap.to(ball, { x: 0, y: 0, duration: 0.25, scale: 1, opacity: 0.5 });
		gsap.to(headphones, { autoAlpha: 0 });

		const currentCircle = order[i];

		// if ongoing audio, sleep
		while (isPlaying) {
			await sleep(100);
		}

		console.log(currentCircle);

		if (failed) {
			failed = false;
			repeat = true;

			gsap.timeline().to(headphones, {
				autoAlpha: 0,
			});

			await playPromise(`./cultures/${data.culture}/audio/sbp-fail.mp3`);

			play(`./cultures/${data.culture}/audio/sbp-repeat-rules.mp3`);
			const cultureDelay = {
				inner: {
					'de-urban': 3,
					'pe-rural': 4,
					'idj-urban': 4,
					'nam-rural': 4.5,
					'zm-rural': 6,
				},
				middle: {
					'de-urban': 2.1,
					'pe-rural': 3.5,
					'idj-urban': 3.5,
					'nam-rural': 5.5,
					'zm-rural': 8.5,
				},
				outer: {
					'de-urban': 2,
					'pe-rural': 2.75,
					'idj-urban': 3,
					'nam-rural': 5.2,
					'zm-rural': 11,
				},
			};
			await gsap
				.timeline()
				.to(inner, {
					delay: cultureDelay.inner[data.culture],
					autoAlpha: 1,
					repeat: 2,
				})
				.to(inner, {
					autoAlpha: 0.5,
				})
				.to(middle, {
					delay: cultureDelay.middle[data.culture],
					autoAlpha: 1,
					repeat: 2,
				})
				.to(middle, {
					autoAlpha: 0.5,
				})
				.to(outer, {
					delay: cultureDelay.outer[data.culture],
					autoAlpha: 1,
					repeat: 2,
					reversed: true,
				})
				.to(outer, {
					autoAlpha: 0.5,
				});
		}

		play(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`, headphones.id);
		await playPromise(`./cultures/${data.culture}/audio/sbp-${currentCircle}.mp3`);
		gsap.to(ball, { opacity: 1 });
		gsap.to(headphones, { autoAlpha: 1 });

		// Circle Logic
		const innerRadius = inner.getBBox().width / 2;
		const middleRadius = middle.getBBox().width / 2;
		const outerRadius = outer.getBBox().width / 2;
		const innerCx = inner.getBBox().x + innerRadius;
		const innerCy = inner.getBBox().y + innerRadius;

		const dragBall = Draggable.create(ball, {
			onDrag: function () {
				const currentTarget = this.target;
				const targetBBox = currentTarget.getBBox();
				const targetHeight = currentTarget.getBBox().height / 2;
				const targetWidth = currentTarget.getBBox().width / 2;

				let updatedObjX = targetBBox.x + targetWidth + this.x;
				let updatedObjY = targetBBox.y + targetHeight + this.y;

				const circleDistance = Math.sqrt(
					Math.pow(updatedObjX - innerCx, 2) + Math.pow(updatedObjY - innerCy, 2)
				);

				// Check if the distance between the centers is less than or equal to the sum of the radii
				if (circleDistance * 1.22 <= innerRadius + targetWidth) {
					gsap.to(inner, { opacity: 1 });
					gsap.to([middle, outer], { opacity: 0.5 });
				}

				if (
					circleDistance * 1.22 <= middleRadius + targetWidth &&
					circleDistance * 1.22 > innerRadius + targetWidth
				) {
					gsap.to(middle, { opacity: 1 });
					gsap.to([inner, outer], { opacity: 0.5 });
				}

				if (
					circleDistance * 1.22 <= outerRadius + targetWidth &&
					circleDistance * 1.22 > middleRadius + targetWidth
				) {
					gsap.to(outer, { opacity: 1 });
					gsap.to([inner, middle], { opacity: 0.5 });
					gsap.to(this.target, { scale: 0.5, transformOrigin: '50% 50%' });
				}

				// Outside of outer circle (i.e., all circles)
				if (circleDistance * 1.22 > outerRadius + targetWidth) {
					gsap.to(this.target, { scale: 1, transformOrigin: '50% 50%' });
					gsap.to([inner, middle, outer], { opacity: 0.5 });
				}
			},
			onDragEnd: function () {
				const currentTarget = this.target;
				const currentId = currentTarget.id;
				console.log(currentId);
				const targetBBox = currentTarget.getBBox();
				const targetHeight = currentTarget.getBBox().height / 2;
				const targetWidth = currentTarget.getBBox().width / 2;

				let updatedObjX = targetBBox.x + targetWidth + this.x;
				let updatedObjY = targetBBox.y + targetHeight + this.y;

				const circleDistance = Math.sqrt(
					Math.pow(updatedObjX - innerCx, 2) + Math.pow(updatedObjY - innerCy, 2)
				);

				// Check if the distance between the centers is less than or equal to the sum of the radii
				if (circleDistance * 1.22 <= innerRadius + targetWidth) {
					dragBall[0].disable();
					gsap.to(inner, { opacity: 0.5, duration: 0.25 });
					// Logging
					data.procedure.sBallPractice![currentCircle] = 'inner';
					// SUCCESS
					if (i === 2 && currentCircle === 'inner') {
						repeat = false;
						isPlaying = true;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}
					if (i < 2 && currentCircle === 'inner') {
						repeat = false;
						isPlaying = true;
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
				// MIDDLE
				if (
					circleDistance * 1.22 <= middleRadius + targetWidth &&
					circleDistance * 1.22 > innerRadius + targetWidth
				) {
					dragBall[0].disable();
					gsap.to(middle, { opacity: 0.5, duration: 0.25 });
					// Logging
					data.procedure.sBallPractice![currentCircle] = 'middle';
					// SUCCESS
					if (i === 2 && currentCircle === 'middle') {
						repeat = false;
						isPlaying = true;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}
					if (i < 2 && currentCircle === 'middle') {
						repeat = false;
						isPlaying = true;
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
					circleDistance * 1.22 <= outerRadius + targetWidth &&
					circleDistance * 1.22 > middleRadius + targetWidth
				) {
					dragBall[0].disable();
					gsap.to(outer, { opacity: 0.5, duration: 0.25 });
					// Logging
					data.procedure.sBallPractice![currentCircle] = 'outer';
					// SUCCESS
					if (i === 2 && currentCircle === 'outer') {
						repeat = false;
						isPlaying = true;
						play(`./cultures/${data.culture}/audio/sbp-resp3.mp3`);
					}
					if (i < 2 && currentCircle === 'outer') {
						repeat = false;
						isPlaying = true;
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
				// None of the circles
				if (circleDistance * 1.22 > outerRadius + targetWidth) {
					gsap.to(currentTarget, { x: 0, y: 0 });
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
};
