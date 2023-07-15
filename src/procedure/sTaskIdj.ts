import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise, stop } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep, moveToCenterAnchor } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [0, 0]);

	data.procedure.sTaskIdj = {
		duration: 0,
		knownAnimals: [],
		unknownAnimals: [],
		humanIdj: { circle: undefined, coords: { x: 0, y: 0 } },
		chicken: { circle: undefined, coords: { x: 0, y: 0 } },
		catfish: { circle: undefined, coords: { x: 0, y: 0 } },
		dog: { circle: undefined, coords: { x: 0, y: 0 } },
		goat: { circle: undefined, coords: { x: 0, y: 0 } },
		goldfish: { circle: undefined, coords: { x: 0, y: 0 } },
		cow: { circle: undefined, coords: { x: 0, y: 0 } },
		parrot: { circle: undefined, coords: { x: 0, y: 0 } },
		cat: { circle: undefined, coords: { x: 0, y: 0 } },
		knownAnimalOrder: [],
		comprehension: {
			completed: false,
			order: _.shuffle(['inner', 'middle', 'outer']),
			inner: false,
			middle: false,
			outer: false,
		},
	};

	const nextButton = document.getElementById('link-st-next')! as SvgInHtml;
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const headphones = document.getElementById('link-st-headphones') as SvgInHtml;
	const circle = document.getElementById('st-circle')! as SvgInHtml;
	const inner = document.getElementById('st-inner')! as SvgInHtml;
	const middle = document.getElementById('st-middle')! as SvgInHtml;
	const outer = document.getElementById('st-outer')! as SvgInHtml;

	gsap.to([inner, middle, outer], { opacity: 0.5 });

	// set position slots (taken from Illustrator boxes centered anchor)
	const slotPositions = new Map()
		.set(0, { x: 1330, y: 306 })
		.set(1, { x: 1539, y: 306 })
		.set(2, { x: 1748, y: 306 })
		.set(3, { x: 1330, y: 543 })
		.set(4, { x: 1539, y: 543 })
		.set(5, { x: 1748, y: 543 })
		.set(6, { x: 1330, y: 774 })
		.set(7, { x: 1539, y: 774 })
		.set(8, { x: 1748, y: 774 });

	// fetch prior responses if subject knows an animal
	const animals = ['chicken', 'catfish', 'dog', 'goat', 'goldfish', 'cow', 'parrot', 'cat'];

	let knownAnimals: string[] = [];
	let unknownAnimals: string[] = [];
	animals.forEach((animal) => {
		const prefixedAnimal = _.camelCase(`s-${animal}`);
		// if the key does not exist, treat is as unknown (this should only exist during development)
		if (!data.procedure[prefixedAnimal]) {
			console.warn(`${animal} not found in data.procedure, treating it as unknown.`);
			unknownAnimals.push(animal);
			return;
		}
		if (data.procedure[prefixedAnimal].response.split('-').at(-1) === 'yes') {
			knownAnimals.push(animal);
		}
		if (data.procedure[prefixedAnimal].response.split('-').at(-1) === 'no') {
			unknownAnimals.push(animal);
		}
	});

	// always show human
	knownAnimals = [...knownAnimals, 'human-idj'];

	let animalOrder = _.shuffle(knownAnimals); // fallback for developement
	if (data.animalOrder) {
		animalOrder = data.animalOrder.map((animal) => animal.slice(2));
	}

	// known animal order (= only known animals and in the order they were presented)
	const knownAnimalOrder = _.intersection(animalOrder, knownAnimals);

	// store data
	data.procedure.sTask.knownAnimals = knownAnimals;
	data.procedure.sTask.unknownAnimals = unknownAnimals;
	data.procedure.sTask.knownAnimalOrder = knownAnimalOrder;

	// use the ordered version
	const knownAnimalElements = knownAnimalOrder.map(
		(animal) => document.getElementById(`link-st-${animal}`)! as SvgInHtml
	);
	const unknownAnimalElements = unknownAnimals.map(
		(animal) => document.getElementById(`link-st-${animal}`)! as SvgInHtml
	);

	// hide unknownAnimalElements, show knownAnimalElements
	gsap.set(unknownAnimalElements, { autoAlpha: 0 });
	gsap.set(knownAnimalElements, { autoAlpha: 0.5 });
	gsap.set([nextButton, headphones], { autoAlpha: 0, pointerEvents: 'none' });

	// put known animals in slots, so there are no gaps between them and store their positions
	knownAnimalElements.forEach((animal, i) => {
		moveToCenterAnchor(animal, slotPositions.get(i).x, slotPositions.get(i).y);
	});

	const animalOrderIndexLookup = knownAnimalOrder.reduce((acc, cv, i) => {
		acc[cv] = i;
		return acc;
	}, {} as { [key: string]: number });

	let isPlaying = true;
	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	audio.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
		gsap.to(pinda, { autoAlpha: 0 });
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
	});

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(
		`./cultures/${data.culture}/video/s-task.${data.meta.videoExtension}`
	);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');
	pinda.src = url;

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(knownAnimalElements, { autoAlpha: 1 });
	play(`./cultures/${data.culture}/audio/s-task-cut.mp3`, headphones.id);
	gsap.to(headphones, { autoAlpha: 1, pointerEvents: 'visible' });

	// MORAL CIRCLE LOGIC
	const innerRadius = inner.getBBox().width / 2;
	const middleRadius = middle.getBBox().width / 2;
	const outerRadius = outer.getBBox().width / 2;

	// get center of circles
	const innerCx = inner.getBBox().x + innerRadius;
	const innerCy = inner.getBBox().y + innerRadius;

	const dragObjects = Draggable.create(knownAnimalElements, {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(8);
			play(`./cultures/${data.culture}/audio/st-${currentObj}.mp3`);
		},
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
			if (circleDistance * 1.2 <= innerRadius + targetWidth) {
				gsap.to(inner, { opacity: 1 });
				gsap.to([middle, outer], { opacity: 0.5 });
			}

			if (
				circleDistance * 1.2 <= middleRadius + targetWidth &&
				circleDistance * 1.2 > innerRadius + targetWidth
			) {
				gsap.to(middle, { opacity: 1 });
				gsap.to([inner, outer], { opacity: 0.5 });
			}

			if (
				circleDistance * 1.2 <= outerRadius + targetWidth &&
				circleDistance * 1.2 > middleRadius + targetWidth
			) {
				gsap.to(outer, { opacity: 1 });
				gsap.to([inner, middle], { opacity: 0.5 });
				gsap.to(this.target, { scale: 0.5, transformOrigin: '50% 50%' });
			}

			// Outside of outer circle (i.e., all circles)
			if (circleDistance * 1.2 > outerRadius + targetWidth) {
				gsap.to(this.target, { scale: 1, transformOrigin: '50% 50%' });
				gsap.to([inner, middle, outer], { opacity: 0.5 });
			}
		},
		onDragEnd: function () {
			const currentTarget = this.target;
			const currentId = currentTarget.id;
			console.log(currentId);
			const currentIdTrimmed = currentId.slice(8);
			const targetBBox = currentTarget.getBBox();
			const targetHeight = currentTarget.getBBox().height / 2;
			const targetWidth = currentTarget.getBBox().width / 2;
			const droppedX = gsap.getProperty(currentTarget, 'x');
			const droppedY = gsap.getProperty(currentTarget, 'y');
			const originalPosition = animalOrderIndexLookup[currentIdTrimmed];

			let updatedObjX = targetBBox.x + targetWidth + this.x;
			let updatedObjY = targetBBox.y + targetHeight + this.y;

			const circleDistance = Math.sqrt(
				Math.pow(updatedObjX - innerCx, 2) + Math.pow(updatedObjY - innerCy, 2)
			);

			// Check if the distance between the centers is less than or equal to the sum of the radii
			if (circleDistance * 1.2 <= innerRadius + targetWidth) {
				play(`./cultures/${data.culture}/audio/inner.mp3`);
				data.procedure.sTask[currentIdTrimmed].circle = 'inner';
				data.procedure.sTask[currentIdTrimmed].coords.x = droppedX;
				data.procedure.sTask[currentIdTrimmed].coords.y = droppedY;
				gsap.to(inner, { opacity: 0.5, duration: 0.25 });
			}

			// MIDDLE
			if (
				circleDistance * 1.2 <= middleRadius + targetWidth &&
				circleDistance * 1.2 > innerRadius + targetWidth
			) {
				play(`./cultures/${data.culture}/audio/middle.mp3`);
				data.procedure.sTask[currentIdTrimmed].circle = 'middle';
				data.procedure.sTask[currentIdTrimmed].coords.x = droppedX;
				data.procedure.sTask[currentIdTrimmed].coords.y = droppedY;
				gsap.to(middle, { opacity: 0.5, duration: 0.25 });
			}

			// OUTER
			if (
				circleDistance * 1.2 <= outerRadius + targetWidth &&
				circleDistance * 1.2 > middleRadius + targetWidth
			) {
				play(`./cultures/${data.culture}/audio/outer.mp3`);
				data.procedure.sTask[currentIdTrimmed].circle = 'outer';
				data.procedure.sTask[currentIdTrimmed].coords.x = droppedX;
				data.procedure.sTask[currentIdTrimmed].coords.y = droppedY;
				gsap.to(outer, { opacity: 0.5, duration: 0.25 });
			}

			// NONE
			if (circleDistance * 1.2 > outerRadius + targetWidth) {
				if (data.procedure.sTask[currentIdTrimmed].circle === undefined) {
					gsap.to(currentTarget, {
						x: slotPositions.get(originalPosition).x,
						y: slotPositions.get(originalPosition).y,
					});
				} else {
					gsap.to(currentTarget, {
						x: data.procedure.sTask[currentIdTrimmed].coords.x,
						y: data.procedure.sTask[currentIdTrimmed].coords.y,
						scale: 0.5,
					});
				}
			}
		},
	});

	// check if all knowAnimals have been placed
	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		knownAnimals.forEach((animal) => {
			if (!data.procedure.sTask[animal].circle) {
				allPlaced.push(false);
			}
		});
		return allPlaced;
	};

	const placedAnimalCount = () => {
		let count = 0;
		knownAnimals.forEach((animal) => {
			if (data.procedure.sTask[animal].circle) {
				count++;
			}
		});
		return count;
	};

	while (placedAnimalCount() < Math.ceil(knownAnimals.length / 2)) {
		await sleep(500);
	}

	// check circle comprehension
	console.log('Comprehension check...');
	const inCompCheck = true;

	// hide all known animals
	gsap.to([knownAnimalElements, inner, middle, outer], { opacity: 0.5 });
	dragObjects.forEach((dragObject) => {
		dragObject.disable();
	});

	while (isPlaying) {
		await sleep(100);
	}

	function handleMouseEnterInner() {
		gsap.timeline().to(inner, { autoAlpha: 1 });
	}
	function handleMouseLeaveInner() {
		gsap.timeline().to(inner, { autoAlpha: 0.5 });
	}
	function handleMouseEnterMiddle() {
		gsap.timeline().to(middle, { autoAlpha: 1 });
	}
	function handleMouseLeaveMiddle() {
		gsap.timeline().to(middle, { autoAlpha: 0.5 });
	}
	function handleMouseEnterOuter() {
		gsap.timeline().to(outer, { autoAlpha: 1 });
	}
	function handleMouseLeaveOuter() {
		gsap.timeline().to(outer, { autoAlpha: 0.5 });
	}

	for (const [index, order] of data.procedure.sTask.comprehension.order.entries()) {
		gsap.set(headphones, { opacity: 0.5, pointerEvents: 'none' });
		play(`./cultures/${data.culture}/audio/s-comp-check-${order}.mp3`, headphones.id);
		if (index === 0) {
			await playPromise(`./cultures/${data.culture}/audio/s-comp-check.mp3`);
		}

		await playPromise(`./cultures/${data.culture}/audio/s-comp-check-${order}.mp3`);

		if (index === 0) {
			await playPromise(`./cultures/${data.culture}/audio/s-comp-check-expl.mp3`);
		}
		gsap.set(headphones, { opacity: 1, pointerEvents: 'visible' });

		circle.style.cursor = 'pointer';
		inner.addEventListener('mousemove', handleMouseEnterInner);
		inner.addEventListener('mouseenter', handleMouseEnterInner);
		inner.addEventListener('mouseleave', handleMouseLeaveInner);
		middle.addEventListener('mousemove', handleMouseEnterMiddle);
		middle.addEventListener('mouseenter', handleMouseEnterMiddle);
		middle.addEventListener('mouseleave', handleMouseLeaveMiddle);
		outer.addEventListener('mousemove', handleMouseEnterOuter);
		outer.addEventListener('mouseenter', handleMouseEnterOuter);
		outer.addEventListener('mouseleave', handleMouseLeaveOuter);

		const response = await getResponse(['st-inner', 'st-middle', 'st-outer']);

		circle.style.cursor = 'default';
		inner.removeEventListener('mousemove', handleMouseEnterInner);
		inner.removeEventListener('mouseenter', handleMouseEnterInner);
		inner.removeEventListener('mouseleave', handleMouseLeaveInner);
		middle.removeEventListener('mousemove', handleMouseEnterMiddle);
		middle.removeEventListener('mouseenter', handleMouseEnterMiddle);
		middle.removeEventListener('mouseleave', handleMouseLeaveMiddle);
		outer.removeEventListener('mousemove', handleMouseEnterOuter);
		outer.removeEventListener('mouseenter', handleMouseEnterOuter);
		outer.removeEventListener('mouseleave', handleMouseLeaveOuter);

		const responseOption = ['ok', 'alright', 'okThanks'];
		const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-${randomResponse}.mp3`);

		gsap.to([inner, middle, outer], { autoAlpha: 0.5 });

		if (response.id.slice(3) === order) {
			data.procedure.sTask.comprehension[order] = true;
		}
	}

	data.procedure.sTask.comprehension.completed = true;

	// show all known animals
	gsap.to(knownAnimalElements, { opacity: 1 });
	dragObjects.forEach((dragObject) => {
		dragObject.enable();
	});

	while (checkAnimals().length > 0) {
		await sleep(1000);
	}

	gsap.to([knownAnimalElements, inner, middle, outer], { opacity: 0.5 });
	dragObjects.forEach((dragObject) => {
		dragObject.disable();
	});

	isPlaying = true;
	play(`./cultures/${data.culture}/audio/sqr-next-red.mp3`);

	gsap
		.timeline()
		.to(nextButton, {
			autoAlpha: 0.5,
		})
		.to(nextButton, {
			filter: 'drop-shadow(0px 0px 14px #a90707)',
			delay: 1,
			repeat: -1,
			yoyo: true,
			reversed: true,
		});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(nextButton, { autoAlpha: 1, pointerEvents: 'visible' });

	await getResponse(nextButton.id);
};
