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

	data.procedure.sQuRankingIntelligence = {
		response: '',
		duration: 0,
		cow: '',
		cat: '',
		human: '',
	};

	const questionTitle = document.getElementById('text-intelligence')!
		.children[0] as HTMLParagraphElement;
	const notAtAll = document.getElementById('text-notAtAll')!.children[0] as HTMLParagraphElement;
	const aLittle = document.getElementById('text-aLittle')!.children[0] as HTMLParagraphElement;
	const aMediumAmount = document.getElementById('text-aMediumAmount')!
		.children[0] as HTMLParagraphElement;
	const aLotSmart = document.getElementById('text-aLotSmart')!.children[0] as HTMLParagraphElement;
	const cow = document.getElementById('link-sqri-cow') as SvgInHtml;
	const cat = document.getElementById('link-sqri-cat') as SvgInHtml;
	const human = document.getElementById('link-sqri-human') as SvgInHtml;

	const rect1 = document.getElementById('sqri-1') as SvgInHtml;
	const rect1Fill = rect1.getAttribute('fill')!;
	const rect2 = document.getElementById('sqri-2') as SvgInHtml;
	const rect2Fill = rect2.getAttribute('fill')!;
	const rect3 = document.getElementById('sqri-3') as SvgInHtml;
	const rect3Fill = rect3.getAttribute('fill')!;
	const rect4 = document.getElementById('sqri-4') as SvgInHtml;
	const rect4Fill = rect4.getAttribute('fill')!;

	const next = document.getElementById('link-sqri-next') as SvgInHtml;

	gsap.set([notAtAll, aLittle, aMediumAmount, aLotSmart, rect1, rect2, rect3, rect4, next], {
		autoAlpha: 0,
	});

	await playPromise(`./cultures/${data.culture}/audio/sqri.mp3`);

	const tl = gsap.timeline();

	tl.to([rect1, notAtAll], {
		autoAlpha: 1,
		onStart: () => {
			play(`./cultures/${data.culture}/audio/sqri-resp.mp3`);
		},
	})
		.to([rect2, aLittle], {
			delay: 1.5,
			autoAlpha: 1,
		})
		.to([rect3, aMediumAmount], {
			delay: 1.5,
			autoAlpha: 1,
		})
		.to([rect4, aLotSmart], {
			delay: 1.5,
			autoAlpha: 1,
		});

	await sleep(7800);
	play(`./cultures/${data.culture}/audio/sqre-expl.mp3`, 'link-sqri-headphones');
	await playPromise(`./cultures/${data.culture}/audio/sqre-expl.mp3`);

	Draggable.create([cow, cat, human], {
		onPress: function () {
			// get current drag object
			const currentId = this.target.id;
			let currentObj = currentId.slice(10);

			play(`./cultures/${data.culture}/audio/sqri-${currentObj}.mp3`);
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
				data.procedure.sQuRankingIntelligence[currentIdTrimmed] = 'notAtAll';
				rect1.setAttribute('fill', rect1Fill);
			}

			if (this.hitTest(rect2, '70%')) {
				data.procedure.sQuRankingIntelligence[currentIdTrimmed] = 'aLittle';
				rect2.setAttribute('fill', rect2Fill);
			}

			if (this.hitTest(rect3, '70%')) {
				data.procedure.sQuRankingIntelligence[currentIdTrimmed] = 'aMediumAmount';
				rect3.setAttribute('fill', rect3Fill);
			}

			if (this.hitTest(rect4, '70%')) {
				data.procedure.sQuRankingIntelligence[currentIdTrimmed] = 'aLotSmart';
				rect4.setAttribute('fill', rect4Fill);
			}
		},
	});

	const checkAnimals = () => {
		let allPlaced: boolean[] = [];
		['cat', 'cow', 'human'].forEach((animal) => {
			if (!data.procedure.sQuRankingIntelligence[animal]) {
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

	await getResponse('link-sqri-next');

	await sleep(500);
};
