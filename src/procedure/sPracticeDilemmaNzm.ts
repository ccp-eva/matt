import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	data.procedure.sPracticeDilemmaNzm.completed = false;

	const tenPencilsGroup = document.getElementById('spdnzm-tenPencils')! as SvgInHtml;
	const cantDecideGroup = document.getElementById('spdnzm-cantDecide')! as SvgInHtml;
	const onePotGroup = document.getElementById('spdnzm-onePot')! as SvgInHtml;

	const tenPencilsRect = document.getElementById('spdnzm-r-tenPencils')! as SvgInHtml;
	const cantDecideRect = document.getElementById('spdnzm-r-cantDecide')! as SvgInHtml;
	const onePotRect = document.getElementById('spdnzm-r-onePot')! as SvgInHtml;

	const boatLeft = document.getElementById('link-spdnzm-boat-tenPencils')! as SvgInHtml;
	const tenPencils = document.getElementById('link-spdnzm-tenPencils')! as SvgInHtml;
	const buttonLeft = document.getElementById('b-spdnzm-tenPencils')! as SvgInHtml;
	const textLeft = document.getElementById(
		'text-tenPencils_00000041261112618563176640000000132598553708179611_'
	)! as SvgInHtml;
	const boatRight = document.getElementById('link-spdnzm-boat-onePot')! as SvgInHtml;
	const onePot = document.getElementById('link-spdnzm-onePot')! as SvgInHtml;
	const buttonRight = document.getElementById('b-spdnzm-onePot')! as SvgInHtml;
	const textRight = document.getElementById(
		'text-onePot_00000042015332966990488700000005401106424215378308_'
	)! as SvgInHtml;
	const qm = document.getElementById(
		'text-questionMark_00000005266711333439028310000007837424185256342181_'
	)! as SvgInHtml;
	const buttonCenter = document.getElementById('b-spdnzm-cantDecide')! as SvgInHtml;
	const textCenter = document.getElementById(
		'text-cantDecide_00000030482603120029967880000009373768330268536465_'
	)! as SvgInHtml;

	const pencilYesButton = document.getElementById('link-b-spdnzm-tenPencils-yes')! as SvgInHtml;
	const pencilNoButton = document.getElementById('link-b-spdnzm-tenPencils-no')! as SvgInHtml;
	const cantDecideYesButton = document.getElementById('link-b-spdnzm-cantDecide-yes')! as SvgInHtml;
	const cantDecideNoButton = document.getElementById('link-b-spdnzm-cantDecide-no')! as SvgInHtml;
	const onePotYesButton = document.getElementById('link-b-spdnzm-onePot-yes')! as SvgInHtml;
	const onePotNoButton = document.getElementById('link-b-spdnzm-onePot-no')! as SvgInHtml;

	const confirm1 = document.getElementById(
		'text-confirm_00000019652870556898836550000010752636904055995838_'
	);
	const confirm2 = document.getElementById(
		'text-confirm_00000123400920002008550350000010746608116806919089_'
	);
	const confirm3 = document.getElementById(
		'text-confirm_00000145045341419562445250000006948009176123042441_'
	);

	while (!data.procedure.sPracticeDilemmaNzm.completed) {
		// hide card contents
		gsap.set(
			[
				boatLeft,
				tenPencils,
				buttonLeft,
				textLeft,
				boatRight,
				onePot,
				buttonRight,
				textRight,
				qm,
				buttonCenter,
				textCenter,
				pencilYesButton,
				pencilNoButton,
				cantDecideYesButton,
				cantDecideNoButton,
				onePotYesButton,
				onePotNoButton,
				confirm1,
				confirm2,
				confirm3,
			],
			{
				autoAlpha: 0,
			}
		);

		[
			pencilYesButton,
			pencilNoButton,
			cantDecideYesButton,
			cantDecideNoButton,
			onePotYesButton,
			onePotNoButton,
		].forEach((el) => (el.style.pointerEvents = 'none'));

		gsap.set([tenPencilsGroup, cantDecideGroup, onePotGroup], {
			autoAlpha: 1,
		});

		await playPromise(`./cultures/${data.culture}/audio/s-practice-dilemma-intro.mp3`);

		const cultureDelay = {
			boatsDisplay: {
				'nam-rural': 0,
				'zm-rural': 0,
			},
			tenPencilsRect: {
				'nam-rural': 4.5,
				'zm-rural': 4.5,
			},
			onePotRect: {
				'nam-rural': 0.5,
				'zm-rural': 0.5,
			},
			cantDecideRect: {
				'nam-rural': 2,
				'zm-rural': 2,
			},
			textCenter: {
				'nam-rural': 0,
				'zm-rural': 0,
			},
			tenPencils: {
				'nam-rural': 2,
				'zm-rural': 1.5,
			},
			textLeft: {
				'nam-rural': 0,
				'zm-rural': 0,
			},
			onePot: {
				'nam-rural': 0.1,
				'zm-rural': 0.1,
			},
			textRight: {
				'nam-rural': 1.3,
				'zm-rural': 1.0,
			},
		};
		play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`);
		await gsap
			.timeline()
			.to([boatLeft, boatRight], {
				autoAlpha: 1,
				delay: cultureDelay.boatsDisplay[data.culture],
			})
			.to(tenPencilsRect, {
				delay: cultureDelay.tenPencilsRect[data.culture],
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to(onePotRect, {
				delay: cultureDelay.onePotRect[data.culture],
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to([cantDecideRect], {
				delay: cultureDelay.cantDecideRect[data.culture],
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to([textCenter], {
				delay: cultureDelay.textCenter[data.culture],
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to(qm, { autoAlpha: 1 }, '<')
			.to([tenPencils], {
				autoAlpha: 1,
				delay: cultureDelay.tenPencils[data.culture],
			})
			.to([textLeft], {
				autoAlpha: 1,
				delay: cultureDelay.textLeft[data.culture],
			})
			.to([textRight], {
				autoAlpha: 1,
				delay: cultureDelay.textRight[data.culture],
			})
			.to([onePot], {
				autoAlpha: 1,
				delay: cultureDelay.onePot[data.culture],
			})
			.to(onePot, {
				delay: 1,
				onComplete: () => {
					play(`./cultures/${data.culture}/audio/saving.mp3`);
				},
			});

		play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`, 'link-spdnzm-headphones');

		[tenPencilsGroup, cantDecideGroup, onePotGroup].forEach((el) => {
			el.classList.add('dilemma-card');
		});

		// save responses and store to response object
		let response = await getResponse(['spdnzm-tenPencils', 'spdnzm-cantDecide', 'spdnzm-onePot']);

		[tenPencilsGroup, cantDecideGroup, onePotGroup].forEach((el) => {
			el.classList.remove('dilemma-card');
		});

		// bubble up until first g element
		while (response.tagName !== 'g') {
			response = response.parentElement!;
		}

		console.log(response.id);

		if (response.id.includes('tenPencils')) {
			gsap.to([cantDecideGroup, onePotGroup], { autoAlpha: 0.25 });

			await playPromise(`./cultures/${data.culture}/audio/spdc-tenPencils.mp3`);

			gsap.to(confirm1, { autoAlpha: 1 });
			await playPromise(`./cultures/${data.culture}/audio/spdc.mp3`);

			play(`./cultures/${data.culture}/audio/yes-no.mp3`);
			await gsap
				.timeline()
				.to(pencilYesButton, { autoAlpha: 0.5 })
				.to(pencilNoButton, { delay: 1, autoAlpha: 0.5 });

			gsap.set([pencilYesButton, pencilNoButton], { pointerEvents: 'visible' });
			gsap.to([pencilYesButton, pencilNoButton], { autoAlpha: 1 });

			response = await getResponse(['link-b-spdnzm-tenPencils-yes', 'link-b-spdnzm-tenPencils-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemmaNzm.completed = true;
			}
		}

		if (response.id.includes('cantDecide')) {
			gsap.to([tenPencilsGroup, onePotGroup], { autoAlpha: 0.25 });

			await playPromise(`./cultures/${data.culture}/audio/spdc-cantDecide.mp3`);

			gsap.to(confirm2, { autoAlpha: 1 });
			await playPromise(`./cultures/${data.culture}/audio/spdc.mp3`);

			play(`./cultures/${data.culture}/audio/yes-no.mp3`);
			await gsap
				.timeline()
				.to(cantDecideYesButton, { autoAlpha: 0.5 })
				.to(cantDecideNoButton, { delay: 1, autoAlpha: 0.5 });

			gsap.set([cantDecideYesButton, cantDecideNoButton], { pointerEvents: 'visible' });
			gsap.to([cantDecideYesButton, cantDecideNoButton], { autoAlpha: 1 });

			response = await getResponse(['link-b-spdnzm-cantDecide-yes', 'link-b-spdnzm-cantDecide-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemmaNzm.completed = true;
			}
		}

		if (response.id.includes('onePot')) {
			gsap.to([tenPencilsGroup, cantDecideGroup], { autoAlpha: 0.25 });

			await playPromise(`./cultures/${data.culture}/audio/spdc-onePot.mp3`);

			gsap.to(confirm3, { autoAlpha: 1 });
			await playPromise(`./cultures/${data.culture}/audio/spdc.mp3`);

			play(`./cultures/${data.culture}/audio/yes-no.mp3`);
			await gsap
				.timeline()
				.to(onePotYesButton, { autoAlpha: 0.5 })
				.to(onePotNoButton, { delay: 1, autoAlpha: 0.5 });

			gsap.set([onePotYesButton, onePotNoButton], { pointerEvents: 'visible' });
			gsap.to([onePotYesButton, onePotNoButton], { autoAlpha: 1 });

			response = await getResponse(['link-b-spdnzm-onePot-yes', 'link-b-spdnzm-onePot-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemmaNzm.completed = true;
			}
		}

		data.procedure[data.currentSlide].response = response.id;
	}
};
