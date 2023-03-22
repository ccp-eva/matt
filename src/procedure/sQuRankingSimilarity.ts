import _ from 'lodash';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	data.procedure.sQuRankingSimilarity = {
		response: '',
		duration: 0,
		cow: 0,
		cat: 0,
	};

	const cow = document.getElementById('link-sqrs-cow') as SvgInHtml;
	const cat = document.getElementById('link-sqrs-cat') as SvgInHtml;

	const rect1 = document.getElementById('sqrs-1') as SvgInHtml;
	const rect1Fill = rect1.getAttribute('fill')!;
	const rect2 = document.getElementById('sqrs-2') as SvgInHtml;
	const rect2Fill = rect2.getAttribute('fill')!;
	const rect3 = document.getElementById('sqrs-3') as SvgInHtml;
	const rect3Fill = rect3.getAttribute('fill')!;
	const rect4 = document.getElementById('sqrs-4') as SvgInHtml;
	const rect4Fill = rect4.getAttribute('fill')!;

	const next = document.getElementById('link-sqrs-next') as SvgInHtml;

	gsap.set(next, { autoAlpha: 0 });

	await playPromise(`./cultures/${data.culture}/audio/sqrs.mp3`);
	play(`./cultures/${data.culture}/audio/sqrs.mp3`, 'link-sqrs-headphones');

	Draggable.create([cow, cat], {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(10);

			play(`./cultures/${data.culture}/audio/sqrs-${currentObj}.mp3`);
		},
		onDrag: function () {
			const currentId = this.target.id;

			if (this.hitTest(rect1, '70%')) {
				rect1.setAttribute('fill', '#c6d325');
			} else {
				rect1.setAttribute('fill', rect1Fill);
			}

			if (this.hitTest(rect2, '70%')) {
				rect2.setAttribute('fill', '#c6d325');
			} else {
				rect2.setAttribute('fill', rect2Fill);
			}

			if (this.hitTest(rect3, '70%')) {
				rect3.setAttribute('fill', '#c6d325');
			} else {
				rect3.setAttribute('fill', rect3Fill);
			}

			if (this.hitTest(rect4, '70%')) {
				rect4.setAttribute('fill', '#c6d325');
			} else {
				rect4.setAttribute('fill', rect4Fill);
			}
		},
		onDragEnd: function () {
			const currentId = this.target.id;
			const currentIdTrimmed = currentId.slice(10);

			if (this.hitTest(rect1, '70%')) {
				data.procedure.sQuRankingSimilarity[currentIdTrimmed] = 1;
				rect1.setAttribute('fill', rect1Fill);
			}

			if (this.hitTest(rect2, '70%')) {
				data.procedure.sQuRankingSimilarity[currentIdTrimmed] = 2;
				rect2.setAttribute('fill', rect2Fill);
			}

			if (this.hitTest(rect3, '70%')) {
				data.procedure.sQuRankingSimilarity[currentIdTrimmed] = 3;
				rect3.setAttribute('fill', rect3Fill);
			}

			if (this.hitTest(rect4, '70%')) {
				data.procedure.sQuRankingSimilarity[currentIdTrimmed] = 4;
				rect4.setAttribute('fill', rect4Fill);
			}
		},
	});

	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		['cat', 'cow'].forEach((animal) => {
			if (!data.procedure.sQuRankingSimilarity[animal]) {
				allPlaced.push(false);
			}
		});
		return allPlaced;
	};

	while (checkAnimals().length > 0) {
		await sleep(2000);
	}

	gsap
		.timeline()
		.to(next, {
			autoAlpha: 1,
			onStart: () => {
				play(`./cultures/${data.culture}/audio/sqr-next-red.mp3`);
			},
		})
		.to(next, {
			filter: 'drop-shadow(0px 0px 14px #a90707)',
			delay: 1,
			repeat: -1,
			yoyo: true,
			reversed: true,
		});

	await getResponse('link-sqrs-next');

	await sleep(500);
};
