import _ from 'lodash';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { moveToCenterAnchor } from '../util/helpers';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide);

	const slidePrefix = 'sqre';
	const entity1 = 'cow';
	const entity2 = 'cat';
	const box1TextId = 'never';
	const box2TextId = 'sometimes';
	const box3TextId = 'often';
	const box4TextId = 'almostEveryDay';
	const childQuestion = document.getElementById('text-exposureChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-exposureAdult') as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const headphones = document.getElementById(`link-${slidePrefix}-headphones`) as SvgInHtml;
	const box1TextElement = document.getElementById(`text-${box1TextId}`)!
		.children[0] as HTMLParagraphElement;
	const box2TextElement = document.getElementById(`text-${box2TextId}`)!
		.children[0] as HTMLParagraphElement;
	const box3TextElement = document.getElementById(`text-${box3TextId}`)!
		.children[0] as HTMLParagraphElement;
	const box4TextElement = document.getElementById(`text-${box4TextId}`)!
		.children[0] as HTMLParagraphElement;
	const box1Rect = document.getElementById(`${slidePrefix}-1`) as SvgInHtml;
	const box1Fill = box1Rect.getAttribute('fill')!;
	const box2Rect = document.getElementById(`${slidePrefix}-2`) as SvgInHtml;
	const box2Fill = box2Rect.getAttribute('fill')!;
	const box3Rect = document.getElementById(`${slidePrefix}-3`) as SvgInHtml;
	const box3Fill = box3Rect.getAttribute('fill')!;
	const box4Rect = document.getElementById(`${slidePrefix}-4`) as SvgInHtml;
	const box4Fill = box4Rect.getAttribute('fill')!;
	const entity1Element = document.getElementById(`link-${slidePrefix}-${entity1}`) as SvgInHtml;
	const entity2Element = document.getElementById(`link-${slidePrefix}-${entity2}`) as SvgInHtml;
	const nextButton = document.getElementById(`link-${slidePrefix}-next`) as SvgInHtml;

	// centered slots (from Illustrator)
	// POSITION 0 = LEFT
	// POSITION 1 = MIDDLE
	// POSITION 2 = RIGHT
	const slotPositions = new Map().set(0, { x: 800, y: 330 }).set(1, { x: 1120, y: 330 });

	const order = _.shuffle([entity1, entity2]);

	const orderElements = order.map(
		(animal) => document.getElementById(`link-${slidePrefix}-${animal}`) as SvgInHtml
	);

	data.procedure[data.currentSlide] = {
		response: '',
		order,
		duration: 0,
		[entity1]: {
			position: 0, // position 0 means not assigned in any box yet
			coords: { x: 0, y: 0 },
		},
		[entity2]: {
			position: 0, // position 0 means not assigned in any box yet
			coords: { x: 0, y: 0 },
		},
	};

	const animalOrderIndexLookup = {
		[entity1]: order.indexOf(entity1),
		[entity2]: order.indexOf(entity2),
	};

	// move objects to their target location
	moveToCenterAnchor(orderElements[0], slotPositions.get(0).x, slotPositions.get(0).y);
	moveToCenterAnchor(orderElements[1], slotPositions.get(1).x, slotPositions.get(1).y);

	gsap.set(
		[
			box1TextElement,
			box2TextElement,
			box3TextElement,
			box4TextElement,
			box1Rect,
			box2Rect,
			box3Rect,
			box4Rect,
			nextButton,
		],
		{
			autoAlpha: 0,
		}
	);
	gsap.set(orderElements, { transformOrigin: '50% 50%' });
	gsap.set([orderElements, headphones], { autoAlpha: 0.5 });
	headphones.style.pointerEvents = 'none';

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-adult.mp3`);
		play(`./cultures/${data.culture}/audio/${slidePrefix}-adult.mp3`, headphones.id);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}.mp3`);
		play(`./cultures/${data.culture}/audio/${slidePrefix}.mp3`, headphones.id);
	}

	gsap
		.timeline()
		.to([box1Rect, box1TextElement], { autoAlpha: 1 })
		.to([box2Rect, box2TextElement], { delay: 1, autoAlpha: 1 })
		.to([box3Rect, box3TextElement], { delay: 1, autoAlpha: 1 })
		.to([box4Rect, box4TextElement], { delay: 0.7, autoAlpha: 1 });
	await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-resp.mp3`);

	play(`./cultures/${data.culture}/audio/${slidePrefix}.mp3`, headphones.id);
	await playPromise(`./cultures/${data.culture}/audio/sqre-expl.mp3`);

	gsap.to([entity1Element, entity2Element, headphones], { autoAlpha: 1 });
	headphones.style.pointerEvents = 'visible';

	let isPlaying = false;
	audio.addEventListener('play', (e) => {
		isPlaying = true;
		// only fire if headphones are clicked not on animals
		if (!(e.target as HTMLVideoElement).src.includes(`${slidePrefix}-`)) {
			gsap.to([entity1Element, entity2Element, headphones], {
				autoAlpha: 0.5,
				pointerEvents: 'none',
			});
		}
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
		gsap.to([entity1Element, entity2Element, headphones], {
			autoAlpha: 1,
			pointerEvents: 'visible',
		});
	});

	[box1Rect, box2Rect, box3Rect, box4Rect].forEach((rect, i) => {
		rect.addEventListener('click', () => {
			play(`./cultures/${data.culture}/audio/${slidePrefix}-resp-${i}.mp3`);
		});
	});
	[box1Rect, box2Rect, box3Rect, box4Rect].forEach((rect) => {
		rect.addEventListener('mouseover', () => {
			rect.setAttribute('fill', '#c6d325');
			rect.style.cursor = 'pointer';
		});
	});
	[box1Rect, box2Rect, box3Rect, box4Rect].forEach((rect) => {
		rect.addEventListener('mouseout', () => {
			rect.style.cursor = 'default';
		});
	});
	box1Rect.addEventListener('mouseout', () => {
		box1Rect.setAttribute('fill', box1Fill);
	});
	box2Rect.addEventListener('mouseout', () => {
		box2Rect.setAttribute('fill', box2Fill);
	});
	box3Rect.addEventListener('mouseout', () => {
		box3Rect.setAttribute('fill', box3Fill);
	});
	box4Rect.addEventListener('mouseout', () => {
		box4Rect.setAttribute('fill', box4Fill);
	});

	Draggable.create([entity1Element, entity2Element], {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(10);

			play(`./cultures/${data.culture}/audio/${slidePrefix}-${currentObj}.mp3`);
		},
		onDrag: function () {
			if (this.hitTest(box1Rect, '70%')) {
				box1Rect.setAttribute('fill', '#c6d325');
				gsap.to(this.target, { scale: 0.5 });
			} else {
				box1Rect.setAttribute('fill', box1Fill);
			}

			if (this.hitTest(box2Rect, '70%')) {
				box2Rect.setAttribute('fill', '#c6d325');
				gsap.to(this.target, { scale: 0.5 });
			} else {
				box2Rect.setAttribute('fill', box2Fill);
			}

			if (this.hitTest(box3Rect, '70%')) {
				box3Rect.setAttribute('fill', '#c6d325');
				gsap.to(this.target, { scale: 0.5 });
			} else {
				box3Rect.setAttribute('fill', box3Fill);
			}

			if (this.hitTest(box4Rect, '70%')) {
				box4Rect.setAttribute('fill', '#c6d325');
				gsap.to(this.target, { scale: 0.5 });
			} else {
				box4Rect.setAttribute('fill', box4Fill);
			}
			if (
				!this.hitTest(box1Rect, '70%') &&
				!this.hitTest(box2Rect, '70%') &&
				!this.hitTest(box3Rect, '70%') &&
				!this.hitTest(box4Rect, '70%')
			) {
				gsap.to(this.target, { scale: 1 });
			}
		},
		onDragEnd: function () {
			const target = this.target;
			const currentId = target.id;
			const currentIdTrimmed = currentId.slice(10);
			const originalPosition = animalOrderIndexLookup[currentIdTrimmed];
			const droppedX = gsap.getProperty(target, 'x');
			const droppedY = gsap.getProperty(target, 'y');
			console.log(currentIdTrimmed);
			console.log(originalPosition);

			if (this.hitTest(box1Rect, '70%')) {
				data.procedure[data.currentSlide][currentIdTrimmed].position = 1;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.x = droppedX;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.y = droppedY;
				box1Rect.setAttribute('fill', box1Fill);
				play(`./cultures/${data.culture}/audio/${slidePrefix}-resp-0.mp3`);
			}

			if (this.hitTest(box2Rect, '70%')) {
				data.procedure[data.currentSlide][currentIdTrimmed].position = 2;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.x = droppedX;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.y = droppedY;
				box2Rect.setAttribute('fill', box2Fill);
				play(`./cultures/${data.culture}/audio/${slidePrefix}-resp-1.mp3`);
			}

			if (this.hitTest(box3Rect, '70%')) {
				data.procedure[data.currentSlide][currentIdTrimmed].position = 3;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.x = droppedX;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.y = droppedY;
				box3Rect.setAttribute('fill', box3Fill);
				play(`./cultures/${data.culture}/audio/${slidePrefix}-resp-2.mp3`);
			}

			if (this.hitTest(box4Rect, '70%')) {
				data.procedure[data.currentSlide][currentIdTrimmed].position = 4;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.x = droppedX;
				data.procedure[data.currentSlide][currentIdTrimmed].coords.y = droppedY;
				box4Rect.setAttribute('fill', box4Fill);
				play(`./cultures/${data.culture}/audio/${slidePrefix}-resp-3.mp3`);
			}

			if (
				!this.hitTest(box1Rect, '70%') &&
				!this.hitTest(box2Rect, '70%') &&
				!this.hitTest(box3Rect, '70%') &&
				!this.hitTest(box4Rect, '70%')
			) {
				// if aniamls were not placed in any box, move them back to their original position
				if (data.procedure[data.currentSlide][currentIdTrimmed].position === 0) {
					gsap.to(target, {
						x: slotPositions.get(originalPosition).x,
						y: slotPositions.get(originalPosition).y,
					});
				} else {
					// if animals were placed in a box and moved outside of it, and not in anoher box, move them back to their original box
					gsap.to(target, {
						x: data.procedure[data.currentSlide][currentIdTrimmed].coords.x,
						y: data.procedure[data.currentSlide][currentIdTrimmed].coords.y,
						scale: 0.5,
					});
				}
			}
		},
	});

	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		order.forEach((animal) => {
			if (!data.procedure[data.currentSlide][animal].position) {
				allPlaced.push(false);
			}
		});
		return allPlaced;
	};

	while (checkAnimals().length > 0) {
		await sleep(100);
	}

	while (isPlaying) {
		await sleep(100);
	}

	isPlaying = true;
	play(`./cultures/${data.culture}/audio/sqr-next-red.mp3`);
	gsap.to(nextButton, { autoAlpha: 0.5, pointerEvents: 'none' });
	gsap.timeline().to(nextButton, {
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
