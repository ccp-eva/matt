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

	const tenPencilsGroup = document.getElementById('spd-tenPencils')! as SvgInHtml;
	const cantDecideGroup = document.getElementById('spd-cantDecide')! as SvgInHtml;
	const oneBikeGroup = document.getElementById('spd-oneBike')! as SvgInHtml;

	const tenPencilsRect = document.getElementById('spd-r-tenPencils')! as SvgInHtml;
	const cantDecideRect = document.getElementById('spd-r-cantDecide')! as SvgInHtml;
	const oneBikeRect = document.getElementById('spd-r-oneBike')! as SvgInHtml;

	const boatLeft = document.getElementById('link-spd-boat-tenPencils')! as SvgInHtml;
	const tenPencils = document.getElementById('link-spd-tenPencils')! as SvgInHtml;
	const buttonLeft = document.getElementById('spd-b-tenPencils')! as SvgInHtml;
	const textLeft = document.getElementById('text-tenPencils')! as SvgInHtml;
	const boatRight = document.getElementById('link-spd-boat-oneBike')! as SvgInHtml;
	const oneBike = document.getElementById('link-spd-oneBike')! as SvgInHtml;
	const buttonRight = document.getElementById('spd-b-oneBike')! as SvgInHtml;
	const textRight = document.getElementById('text-oneBike')! as SvgInHtml;
	const qm = document.getElementById(
		'text-questionMark_00000155127853693399251650000009331183858803794561_'
	)! as SvgInHtml;
	const buttonCenter = document.getElementById('spd-b-cantDecide')! as SvgInHtml;
	const textCenter = document.getElementById(
		'text-cantDecide_00000034056727285669922990000017223503196478564235_'
	)! as SvgInHtml;

	const pencilYesButton = document.getElementById('link-b-tenPencils-yes')! as SvgInHtml;
	const pencilNoButton = document.getElementById('link-b-tenPencils-no')! as SvgInHtml;
	const cantDecideYesButton = document.getElementById('link-b-cantDecide-yes')! as SvgInHtml;
	const cantDecideNoButton = document.getElementById('link-b-cantDecide-no')! as SvgInHtml;
	const oneBikeYesButton = document.getElementById('link-b-oneBike-yes')! as SvgInHtml;
	const oneBikeNoButton = document.getElementById('link-b-oneBike-no')! as SvgInHtml;

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
				oneBike,
				buttonRight,
				textRight,
				qm,
				buttonCenter,
				textCenter,
				pencilYesButton,
				pencilNoButton,
				cantDecideYesButton,
				cantDecideNoButton,
				oneBikeYesButton,
				oneBikeNoButton,
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
			oneBikeYesButton,
			oneBikeNoButton,
		].forEach((el) => (el.style.pointerEvents = 'none'));

		gsap.set([tenPencilsGroup, cantDecideGroup, oneBikeGroup], {
			autoAlpha: 1,
		});

		await playPromise(`./cultures/${data.culture}/audio/s-practice-dilemma-intro.mp3`);

		const cultureDelay = {
			boatsDisplay: {
				'de-urban': 0,
				'pe-rural': 0,
			},
			tenPencilsRect: {
				'de-urban': 2.5,
				'pe-rural': 2.5,
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
			.to(oneBikeRect, {
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
			.to([oneBike, textRight], { autoAlpha: 1, delay: 2 })
			.to(oneBike, {
				delay: 0.5,
				onComplete: () => {
					play(`./cultures/${data.culture}/audio/saving.mp3`);
				},
			});

		play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`, 'link-spd-headphones');

		[tenPencilsGroup, cantDecideGroup, oneBikeGroup].forEach((el) => {
			el.classList.add('dilemma-card');
		});

		// save responses and store to response object
		let response = await getResponse(['spd-tenPencils', 'spd-cantDecide', 'spd-oneBike']);

		[tenPencilsGroup, cantDecideGroup, oneBikeGroup].forEach((el) => {
			el.classList.remove('dilemma-card');
		});

		// bubble up until first g element
		while (response.tagName !== 'g') {
			response = response.parentElement!;
		}

		console.log(response.id);

		if (response.id.includes('tenPencils')) {
			gsap.to([cantDecideGroup, oneBikeGroup], { autoAlpha: 0.25 });

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

			response = await getResponse(['link-b-tenPencils-yes', 'link-b-tenPencils-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		if (response.id.includes('cantDecide')) {
			gsap.to([tenPencilsGroup, oneBikeGroup], { autoAlpha: 0.25 });

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

			response = await getResponse(['link-b-cantDecide-yes', 'link-b-cantDecide-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		if (response.id.includes('oneBike')) {
			gsap.to([tenPencilsGroup, cantDecideGroup], { autoAlpha: 0.25 });

			await playPromise(`./cultures/${data.culture}/audio/spdc-oneBike.mp3`);

			gsap.to(confirm3, { autoAlpha: 1 });
			await playPromise(`./cultures/${data.culture}/audio/spdc.mp3`);

			play(`./cultures/${data.culture}/audio/yes-no.mp3`);
			await gsap
				.timeline()
				.to(oneBikeYesButton, { autoAlpha: 0.5 })
				.to(oneBikeNoButton, { delay: 1, autoAlpha: 0.5 });

			gsap.set([oneBikeYesButton, oneBikeNoButton], { pointerEvents: 'visible' });
			gsap.to([oneBikeYesButton, oneBikeNoButton], { autoAlpha: 1 });

			response = await getResponse(['link-b-oneBike-yes', 'link-b-oneBike-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		data.procedure[data.currentSlide].response = response.id;
	}
};
