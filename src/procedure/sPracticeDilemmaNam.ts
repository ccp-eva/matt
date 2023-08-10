import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);

	data.procedure.sPracticeDilemma.completed = false;

	const tenPencilsGroup = document.getElementById('spdnam-tenPencils')! as SvgInHtml;
	const cantDecideGroup = document.getElementById('spdnam-cantDecide')! as SvgInHtml;
	const onePotGroup = document.getElementById('spdnam-onePot')! as SvgInHtml;

	const tenPencilsRect = document.getElementById('spdnam-r-tenPencils')! as SvgInHtml;
	const cantDecideRect = document.getElementById('spdnam-r-cantDecide')! as SvgInHtml;
	const onePotRect = document.getElementById('spdnam-r-onePot')! as SvgInHtml;

	const boatLeft = document.getElementById('link-spdnam-boat-tenPencils')! as SvgInHtml;
	const tenPencils = document.getElementById('link-spdnam-tenPencils')! as SvgInHtml;
	const buttonLeft = document.getElementById('spdnam-b-tenPencils')! as SvgInHtml;
	const textLeft = document.getElementById('text-tenPencils')! as SvgInHtml;
	const boatRight = document.getElementById('link-spdnam-boat-onePot')! as SvgInHtml;
	const onePot = document.getElementById('link-spdnam-onePot')! as SvgInHtml;
	const buttonRight = document.getElementById('b-onePot')! as SvgInHtml;
	const textRight = document.getElementById('text-onePot')! as SvgInHtml;
	const qm = document.getElementById(
		'text-questionMark_00000155127853693399251650000009331183858803794561_'
	)! as SvgInHtml;
	const buttonCenter = document.getElementById('spdnam-b-cantDecide')! as SvgInHtml;
	const textCenter = document.getElementById(
		'text-cantDecide_00000034056727285669922990000017223503196478564235_'
	)! as SvgInHtml;

	const pencilYesButton = document.getElementById('link-b-spdnam-tenPencils-yes')! as SvgInHtml;
	const pencilNoButton = document.getElementById('link-b-spdnam-tenPencils-no')! as SvgInHtml;
	const cantDecideYesButton = document.getElementById('link-b-spdnam-cantDecide-yes')! as SvgInHtml;
	const cantDecideNoButton = document.getElementById('link-b-spdnam-cantDecide-no')! as SvgInHtml;
	const onePotYesButton = document.getElementById('link-b-onePot-yes')! as SvgInHtml;
	const onePotNoButton = document.getElementById('link-b-onePot-no')! as SvgInHtml;

	const confirm1 = document.getElementById(
		'text-confirm_00000023995390546384149650000012972362905572281273_'
	);
	const confirm2 = document.getElementById(
		'text-confirm_00000023989285641362536010000011733819505523217558_'
	);
	const confirm3 = document.getElementById('text-confirm');

	while (!data.procedure.sPracticeDilemma.completed) {
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

		play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`);
		await gsap
			.timeline()
			.to([boatLeft, boatRight], {
				autoAlpha: 1,
				delay: 3,
			})
			.to(tenPencilsRect, {
				delay: 3,
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to(onePotRect, {
				delay: 0.1,
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to([cantDecideRect, textCenter], {
				delay: 2,
				stroke: '#006c66',
				strokeWidth: 10,
				reversed: true,
				repeat: 1,
			})
			.to(qm, { autoAlpha: 1 }, '<')
			.to([tenPencils, textLeft], { autoAlpha: 1, delay: 2 })
			.to([onePot, textRight], { autoAlpha: 1, delay: 2 })
			.to(onePot, {
				delay: 0.5,
				onComplete: () => {
					play(`./cultures/${data.culture}/audio/saving.mp3`);
				},
			});

		play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`, 'link-spdnam-headphones');

		[tenPencilsGroup, cantDecideGroup, onePotGroup].forEach((el) => {
			el.classList.add('dilemma-card');
		});

		// save responses and store to response object
		let response = await getResponse(['spdnam-tenPencils', 'spdnam-cantDecide', 'spdnam-onePot']);

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

			response = await getResponse(['link-b-spdnam-tenPencils-yes', 'link-b-spdnam-tenPencils-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
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

			response = await getResponse(['link-b-spdnam-cantDecide-yes', 'link-b-sdnam-cantDecide-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
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

			response = await getResponse(['link-b-onePot-yes', 'link-b-onePot-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		data.procedure[data.currentSlide].response = response.id;
	}
};
