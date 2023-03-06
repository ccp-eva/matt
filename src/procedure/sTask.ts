import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise, stop } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;
	swapSlides('s-task', 's-ball-practice');

	data.procedure.task = {
		duration: 0,
		completed: false,
		man: '',
		woman: '',
		child: '',
		elderly: '',
		chicken: undefined,
		pig: undefined,
		dog: undefined,
		sheep: undefined,
		goldfish: undefined,
		cow: undefined,
		rabbit: undefined,
		cat: undefined,
	};

	const pinda = document.getElementById('player') as HTMLVideoElement;
	const inner = document.getElementById('st-inner')! as SvgInHtml;
	const middle = document.getElementById('st-middle')! as SvgInHtml;
	const outer = document.getElementById('st-outer')! as SvgInHtml;
	const man = document.getElementById('link-st-man')! as SvgInHtml;
	const woman = document.getElementById('link-st-woman')! as SvgInHtml;
	const child = document.getElementById('link-st-child')! as SvgInHtml;
	const elderly = document.getElementById('link-st-elderly')! as SvgInHtml;
	const chicken = document.getElementById('link-st-chicken')! as SvgInHtml;
	const pig = document.getElementById('link-st-pig')! as SvgInHtml;
	const dog = document.getElementById('link-st-dog')! as SvgInHtml;
	const sheep = document.getElementById('link-st-sheep')! as SvgInHtml;
	const goldfish = document.getElementById('link-st-goldfish')! as SvgInHtml;
	const cow = document.getElementById('link-st-cow')! as SvgInHtml;
	const rabbit = document.getElementById('link-st-rabbit')! as SvgInHtml;
	const cat = document.getElementById('link-st-cat')! as SvgInHtml;

	// fetch prior responses if subject knows an animal
	const animals = ['chicken', 'pig', 'dog', 'sheep', 'goldfish', 'cow', 'rabbit', 'cat'];

	let knownAnimals: string[] = [];
	let unknownAnimals: string[] = [];
	animals.forEach((animal) => {
		if (!data.procedure[animal]) {
			return;
		}
		if (data.procedure[animal].response.split('-').at(-1) === 'yes') {
			knownAnimals.push(animal);
		}
		if (data.procedure[animal].response.split('-').at(-1) === 'no') {
			unknownAnimals.push(animal);
		}
	});

	// always include humans
	knownAnimals = ['man', 'woman', 'child', 'elderly', ...knownAnimals];
	console.log(knownAnimals);

	// hide unknownAnimals not in list
	unknownAnimals.forEach((animal) => {
		gsap.set(`#link-st-${animal}`, { autoAlpha: 0 });
	});

	gsap.set(pinda, { autoAlpha: 0 });
	gsap.set('#link-st-next', { autoAlpha: 0 });

	// gsap
	// 	.timeline()
	// 	.to(pinda, {
	// 		autoAlpha: 1,
	// 		delay: 0.5,
	// 		onStart: () => {
	// 			pinda.src = `./cultures/${data.culture}/video/s-task.webm`;
	// 		},
	// 	})
	// 	.to(pinda, {
	// 		autoAlpha: 0,
	// 		delay: 14,
	// 	});

	// await sleep(14000);

	play(`./cultures/${data.culture}/audio/s-task-cut.mp3`, 'link-st-headphones');

	const startTime = new Date().getTime();

	gsap.to([inner, middle, outer], { opacity: 0.5 });

	Draggable.create(
		[chicken, elderly, pig, man, dog, sheep, goldfish, cow, rabbit, child, cat, woman],
		{
			onPress: function () {
				// get current drag object
				const currentId = this.target.id;
				let currentObj = currentId.slice(8);
				if (
					currentObj === 'man' ||
					currentObj === 'woman' ||
					currentObj === 'child' ||
					currentObj === 'elderly'
				) {
					currentObj = 'human';
				}
				play(`./cultures/${data.culture}/audio/st-${currentObj}.mp3`);
			},
			onDrag: function () {
				const currentId = this.target.id;
				if (
					this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(inner, { opacity: 1, duration: 0.25 });
					gsap.to(`#${currentId}`, { scale: 0.5, transformOrigin: '50% 50%' });
				} else {
					gsap.to(inner, { opacity: 0.5, duration: 0.25 });
				}

				if (
					!this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(middle, { opacity: 1, duration: 0.25 });
					gsap.to(`#${currentId}`, { scale: 0.5, transformOrigin: '50% 50%' });
				} else {
					gsap.to(middle, { opacity: 0.5, duration: 0.25 });
				}

				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					gsap.to(outer, { opacity: 1, duration: 0.25 });
					gsap.to(`#${currentId}`, { scale: 0.5, transformOrigin: '50% 50%' });
				} else {
					gsap.to(outer, { opacity: 0.5, duration: 0.25 });
				}
				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					!this.hitTest(outer, '50%')
				) {
					gsap.to(`#${currentId}`, { scale: 1, transformOrigin: '50% 50%' });
				}
			},
			onDragEnd: function () {
				const currentId = this.target.id;
				console.log(currentId);
				const currentIdTrimmed = currentId.slice(8);

				// INNER
				if (
					this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					data.procedure.task[currentIdTrimmed] = 'inner';
				}

				// MIDDLE
				if (
					!this.hitTest(inner, '50%') &&
					this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					data.procedure.task[currentIdTrimmed] = 'middle';
				}

				// OUTER
				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					this.hitTest(outer, '50%')
				) {
					data.procedure.task[currentIdTrimmed] = 'outer';
				}
				if (
					!this.hitTest(inner, '50%') &&
					!this.hitTest(middle, '50%') &&
					!this.hitTest(outer, '50%')
				) {
					gsap.to(`#${currentId}`, { x: 0, y: 0 });
				}
			},
		}
	);

	// check if all knowAnimals have been placed
	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		knownAnimals.forEach((animal) => {
			if (!data.procedure.task[animal]) {
				allPlaced.push(false);
			}
		});
		return allPlaced;
	};

	while (checkAnimals().length > 0) {
		await sleep(1000);
	}

	gsap
		.timeline()
		.to('#link-st-next', {
			autoAlpha: 1,
		})
		.to('#link-st-next', {
			filter: 'drop-shadow(0px 0px 14px #a90707)',
			delay: 1,
			repeat: -1,
			yoyo: true,
			reversed: true,
		});

	await getResponse('link-st-next');
	// stop audio playback after next button is clicked
	stop();

	data.procedure.task.duration = new Date().getTime() - startTime;
};
