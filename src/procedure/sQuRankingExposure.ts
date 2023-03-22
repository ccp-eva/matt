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

	data.procedure.sQuRankingExposure = {
		response: '',
		duration: 0,
		cow: 0,
		cat: 0,
	};

	const childQuestion = document.getElementById('text-exposureChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-exposureAdult') as SvgInHtml;

	const cow = document.getElementById('link-sqre-cow') as SvgInHtml;
	const cat = document.getElementById('link-sqre-cat') as SvgInHtml;

	const rect1 = document.getElementById('sqre-1') as SvgInHtml;
	const rect1Fill = rect1.getAttribute('fill')!;
	const rect2 = document.getElementById('sqre-2') as SvgInHtml;
	const rect2Fill = rect2.getAttribute('fill')!;
	const rect3 = document.getElementById('sqre-3') as SvgInHtml;
	const rect3Fill = rect3.getAttribute('fill')!;
	const rect4 = document.getElementById('sqre-4') as SvgInHtml;
	const rect4Fill = rect4.getAttribute('fill')!;

	const never = document.getElementById('text-never')!.children[0] as HTMLParagraphElement;
	const sometimes = document.getElementById('text-sometimes')!.children[0] as HTMLParagraphElement;
	const often = document.getElementById('text-often')!.children[0] as HTMLParagraphElement;
	const almostEveryDay = document.getElementById('text-almostEveryDay')!
		.children[0] as HTMLParagraphElement;

	const next = document.getElementById('link-sqre-next') as SvgInHtml;

	gsap.set([rect1, rect2, rect2, rect3, rect4, next, never, sometimes, often, almostEveryDay], {
		autoAlpha: 0,
	});

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqre-adult.mp3`, 'link-sqre-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqre-adult.mp3`);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqre.mp3`, 'link-sqre-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqre.mp3`);
	}

	const tl = gsap.timeline();

	tl.to([rect1, never], {
		autoAlpha: 1,
		onStart: () => {
			play(`./cultures/${data.culture}/audio/sqre-all-resp.mp3`);
		},
	})
		.to([rect2, sometimes], {
			delay: 1,
			autoAlpha: 1,
		})
		.to([rect3, often], {
			delay: 1,
			autoAlpha: 1,
		})
		.to([rect4, almostEveryDay], {
			delay: 0.5,
			autoAlpha: 1,
		});

	await playPromise(`./cultures/${data.culture}/audio/sqre.mp3`);
	play(`./cultures/${data.culture}/audio/sqre.mp3`, 'link-sqre-headphones');

	Draggable.create([cow, cat], {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(10);

			play(`./cultures/${data.culture}/audio/sqre-${currentObj}.mp3`);
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
				data.procedure.sQuRankingExposure[currentIdTrimmed] = 1;
				rect1.setAttribute('fill', rect1Fill);
			}

			if (this.hitTest(rect2, '70%')) {
				data.procedure.sQuRankingExposure[currentIdTrimmed] = 2;
				rect2.setAttribute('fill', rect2Fill);
			}

			if (this.hitTest(rect3, '70%')) {
				data.procedure.sQuRankingExposure[currentIdTrimmed] = 3;
				rect3.setAttribute('fill', rect3Fill);
			}

			if (this.hitTest(rect4, '70%')) {
				data.procedure.sQuRankingExposure[currentIdTrimmed] = 4;
				rect4.setAttribute('fill', rect4Fill);
			}
		},
	});

	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		['cat', 'cow'].forEach((animal) => {
			if (!data.procedure.sQuRankingExposure[animal]) {
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

	await getResponse('link-sqre-next');

	await sleep(500);
};
