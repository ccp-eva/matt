import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import _ from 'lodash';
import { SvgInHtml } from '../types';
gsap.registerPlugin(Draggable);
import { play, playPromise, stop } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep, moveToCenterAnchor } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	data.procedure.sTask = {
		duration: 0,
		knownAnimals: [],
		unknownAnimals: [],
		human: '',
		chicken: undefined,
		pig: undefined,
		dog: undefined,
		sheep: undefined,
		goldfish: undefined,
		cow: undefined,
		rabbit: undefined,
		cat: undefined,
		assignedAnimals: 0,
		comprehension: {
			completed: false,
			order: _.shuffle(['inner', 'middle', 'outer']),
			inner: false,
			middle: false,
			outer: false,
		},
	};

	const pinda = document.getElementById('player') as HTMLVideoElement;
	const inner = document.getElementById('st-inner')! as SvgInHtml;
	const middle = document.getElementById('st-middle')! as SvgInHtml;
	const outer = document.getElementById('st-outer')! as SvgInHtml;
	const human = document.getElementById('link-st-human')! as SvgInHtml;
	const chicken = document.getElementById('link-st-chicken')! as SvgInHtml;
	const pig = document.getElementById('link-st-pig')! as SvgInHtml;
	const dog = document.getElementById('link-st-dog')! as SvgInHtml;
	const sheep = document.getElementById('link-st-sheep')! as SvgInHtml;
	const goldfish = document.getElementById('link-st-goldfish')! as SvgInHtml;
	const cow = document.getElementById('link-st-cow')! as SvgInHtml;
	const rabbit = document.getElementById('link-st-rabbit')! as SvgInHtml;
	const cat = document.getElementById('link-st-cat')! as SvgInHtml;

	gsap.to([inner, middle, outer], { opacity: 0.5 });

	[inner, middle, outer].forEach((circle) => {
		circle.style.cursor = 'pointer';
		circle.addEventListener('mouseenter', () => {
			gsap.timeline().to(circle, { autoAlpha: 1 });
		});
		circle.addEventListener('mouseleave', () => {
			gsap.timeline().to(circle, { autoAlpha: 0.5 });
		});
	});

	// set position slots (taken from Illustrator boxes centered anchor)
	const slots = {
		0: { x: 1330, y: 306 },
		1: { x: 1539, y: 306 },
		2: { x: 1748, y: 306 },
		3: { x: 1330, y: 543 },
		4: { x: 1539, y: 543 },
		5: { x: 1748, y: 543 },
		6: { x: 1330, y: 774 },
		7: { x: 1539, y: 774 },
		8: { x: 1748, y: 774 },
	};

	// fetch prior responses if subject knows an animal
	const animals = ['chicken', 'pig', 'dog', 'sheep', 'goldfish', 'cow', 'rabbit', 'cat'];

	let knownAnimals: string[] = [];
	let unknownAnimals: string[] = [];
	animals.forEach((animal) => {
		const prefixedAnimal = _.camelCase(`s-${animal}`);
		if (!data.procedure[prefixedAnimal]) {
			return;
		}
		if (data.procedure[prefixedAnimal].response.split('-').at(-1) === 'yes') {
			knownAnimals.push(animal);
		}
		if (data.procedure[prefixedAnimal].response.split('-').at(-1) === 'no') {
			unknownAnimals.push(animal);
		}
	});

	// store data
	data.procedure.sTask.knownAnimals = knownAnimals;
	data.procedure.sTask.unknownAnimals = unknownAnimals;

	// always show human
	knownAnimals = [...knownAnimals, 'human'];

	// hide unknownAnimals not in list
	unknownAnimals.forEach((animal) => {
		gsap.set(`#link-st-${animal}`, { autoAlpha: 0 });
	});

	// put known animals in slots, so there are no gaps between them and store their positions
	const animalPositionLut = {};
	knownAnimals.forEach((animal, index) => {
		animalPositionLut[animal] = index;
		const animalElement = document.getElementById(`link-st-${animal}`)! as SvgInHtml;
		moveToCenterAnchor(animalElement, slots[index].x, slots[index].y);
	});

	gsap.set(pinda, { autoAlpha: 0 });
	gsap.set('#link-st-next', { autoAlpha: 0 });

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			delay: 0.5,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-task.webm`;
			},
		})
		.to(pinda, {
			autoAlpha: 0,
			delay: 14,
		});

	await sleep(14000);

	play(`./cultures/${data.culture}/audio/s-task-cut.mp3`, 'link-st-headphones');

	Draggable.create([chicken, human, pig, dog, sheep, goldfish, cow, rabbit, cat], {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(8);

			play(`./cultures/${data.culture}/audio/st-${currentObj}.mp3`);
		},
		onDrag: function () {
			const currentId = this.target.id;
			if (this.hitTest(inner, '50%') && this.hitTest(middle, '50%') && this.hitTest(outer, '50%')) {
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
			if (this.hitTest(inner, '50%') && this.hitTest(middle, '50%') && this.hitTest(outer, '50%')) {
				data.procedure.sTask[currentIdTrimmed] = 'inner';
				data.procedure.sTask.assignedAnimals++;
				gsap.to(inner, { opacity: 0.5, duration: 0.25 });
			}

			// MIDDLE
			if (
				!this.hitTest(inner, '50%') &&
				this.hitTest(middle, '50%') &&
				this.hitTest(outer, '50%')
			) {
				data.procedure.sTask[currentIdTrimmed] = 'middle';
				data.procedure.sTask.assignedAnimals++;
				gsap.to(middle, { opacity: 0.5, duration: 0.25 });
			}

			// OUTER
			if (
				!this.hitTest(inner, '50%') &&
				!this.hitTest(middle, '50%') &&
				this.hitTest(outer, '50%')
			) {
				data.procedure.sTask[currentIdTrimmed] = 'outer';
				data.procedure.sTask.assignedAnimals++;
				gsap.to(outer, { opacity: 0.5, duration: 0.25 });
			}

			// NONE
			if (
				!this.hitTest(inner, '50%') &&
				!this.hitTest(middle, '50%') &&
				!this.hitTest(outer, '50%')
			) {
				console.log(currentId);
				console.log(this.target);
				console.log(slots[animalPositionLut[currentIdTrimmed]].x);
				console.log(slots[animalPositionLut[currentIdTrimmed]].y);

				// bug this is not working yet #72
				// moveToCenterAnchor(
				// 	this.target,
				// 	slots[animalPositionLut[currentIdTrimmed]].x,
				// 	slots[animalPositionLut[currentIdTrimmed]].y
				// );
				gsap.to(`#${currentId}`, { x: 0, y: 0 });
			}
		},
	});

	// check if all knowAnimals have been placed
	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		knownAnimals.forEach((animal) => {
			if (!data.procedure.sTask[animal]) {
				allPlaced.push(false);
			}
		});
		return allPlaced;
	};

	while (data.procedure.sTask.assignedAnimals < Math.ceil(knownAnimals.length / 2)) {
		await sleep(500);
	}

	// check circle comprehension
	console.log('Comprehension check...');

	// hide all known animals
	gsap.timeline().to(
		knownAnimals.map((e) => `#link-st-${e}`),
		{
			autoAlpha: 0,
		}
	);

	for (const order of data.procedure.sTask.comprehension.order) {
		play(`./cultures/${data.culture}/audio/s-comp-check-${order}.mp3`, 'link-st-headphones');
		await playPromise(`./cultures/${data.culture}/audio/s-comp-check.mp3`);
		await playPromise(`./cultures/${data.culture}/audio/s-comp-check-${order}.mp3`);
		await playPromise(`./cultures/${data.culture}/audio/s-comp-check-expl.mp3`);

		const response = await getResponse(['st-inner', 'st-middle', 'st-outer']);

		const responseOption = ['ok', 'alright', 'okThanks'];
		const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-${randomResponse}.mp3`);

		if (response.id.slice(3) === order) {
			data.procedure.sTask.comprehension[order] = true;
		}
	}

	data.procedure.sTask.comprehension.completed = true;

	// show all known animals
	gsap.timeline().to(
		knownAnimals.map((e) => `#link-st-${e}`),
		{
			autoAlpha: 1,
		}
	);

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
};
