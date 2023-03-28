import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

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
	const textRight = document.getElementById(
		'text-oneBike_00000045577191060881134930000013313987683261151118_'
	)! as SvgInHtml;
	const qm = document.getElementById('text-questionMark')! as SvgInHtml;
	const buttonCenter = document.getElementById('spd-b-cantDecide')! as SvgInHtml;
	const textCenter = document.getElementById('text-cantDecide')! as SvgInHtml;

	const pencilYesButton = document.getElementById('link-b-tenPencils-yes')! as SvgInHtml;
	const pencilNoButton = document.getElementById('link-b-tenPencils-no')! as SvgInHtml;
	const cantDecideYesButton = document.getElementById('link-b-cantDecide-yes')! as SvgInHtml;
	const cantDecideNoButton = document.getElementById('link-b-cantDecide-no')! as SvgInHtml;
	const oneBikeYesButton = document.getElementById('link-b-oneBike-yes')! as SvgInHtml;
	const oneBikeNoButton = document.getElementById('link-b-oneBike-no')! as SvgInHtml;

	const confirm1 = document.getElementById(
		'text-confirm_00000034811373726967630570000006256181144808529834_'
	);
	const confirm2 = document.getElementById(
		'text-confirm_00000142136083963970369070000006815839807686652318_'
	);
	const confirm3 = document.getElementById(
		'text-confirm_00000101822596987739090480000015423414397412023998_'
	);

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

		gsap.set([tenPencilsGroup, cantDecideGroup, oneBikeGroup], {
			autoAlpha: 1,
		});

		await playPromise(`./cultures/${data.culture}/audio/s-practice-dilemma-intro.mp3`);

		gsap
			.timeline()
			.to([boatLeft, boatRight], {
				autoAlpha: 1,
				delay: 1,
				onStart: () => {
					play(`./cultures/${data.culture}/audio/s-practice-dilemma.mp3`);
				},
			})
			.to(tenPencilsRect, {
				delay: 2.5,
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
			.to(
				qm,
				{
					autoAlpha: 1,
				},
				'<'
			)
			.to([tenPencils, textLeft], {
				autoAlpha: 1,
				delay: 2,
			})
			.to([oneBike, textRight], {
				autoAlpha: 1,
				delay: 2,
			})
			.to(oneBike, {
				delay: 0.5,
				onComplete: () => {
					play(`./cultures/${data.culture}/audio/saving.mp3`);
				},
			});

		await sleep(16000);
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
			gsap.to([cantDecideGroup, oneBikeGroup], {
				autoAlpha: 0.25,
			});

			await playPromise(`./cultures/${data.culture}/audio/spdc-tenPencils.mp3`);

			gsap
				.timeline()
				.to([cantDecideGroup, oneBikeGroup], {
					onStart: () => play(`./cultures/${data.culture}/audio/spdc.mp3`),
				})
				.to(
					confirm1,
					{
						autoAlpha: 1,
					},
					'<'
				)
				.to(pencilYesButton, {
					autoAlpha: 1,
					delay: 1,
					onStart: () => play(`./cultures/${data.culture}/audio/yes-no.mp3`),
				})
				.to(pencilNoButton, {
					delay: 1,
					autoAlpha: 1,
				});

			response = await getResponse(['link-b-tenPencils-yes', 'link-b-tenPencils-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		if (response.id.includes('cantDecide')) {
			gsap.to([tenPencilsGroup, oneBikeGroup], {
				autoAlpha: 0.25,
			});

			await playPromise(`./cultures/${data.culture}/audio/spdc-cantDecide.mp3`);

			gsap
				.timeline()
				.to([tenPencilsGroup, oneBikeGroup], {
					onStart: () => play(`./cultures/${data.culture}/audio/spdc.mp3`),
				})
				.to(
					confirm2,
					{
						autoAlpha: 1,
					},
					'<'
				)
				.to(cantDecideYesButton, {
					autoAlpha: 1,
					delay: 1,
					onStart: () => play(`./cultures/${data.culture}/audio/yes-no.mp3`),
				})
				.to(cantDecideNoButton, {
					delay: 1,
					autoAlpha: 1,
				});

			response = await getResponse(['link-b-cantDecide-yes', 'link-b-cantDecide-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		if (response.id.includes('oneBike')) {
			gsap.to([tenPencilsGroup, cantDecideGroup], {
				autoAlpha: 0.25,
			});

			await playPromise(`./cultures/${data.culture}/audio/spdc-oneBike.mp3`);
			gsap
				.timeline()
				.to([tenPencilsGroup, cantDecideGroup], {
					onStart: () => play(`./cultures/${data.culture}/audio/spdc.mp3`),
				})
				.to(
					confirm3,
					{
						autoAlpha: 1,
					},
					'<'
				)
				.to(oneBikeYesButton, {
					autoAlpha: 1,
					delay: 1,
					onStart: () => play(`./cultures/${data.culture}/audio/yes-no.mp3`),
				})
				.to(oneBikeNoButton, {
					delay: 1,
					autoAlpha: 1,
				});

			response = await getResponse(['link-b-oneBike-yes', 'link-b-oneBike-no']);

			if (response.id.includes('yes')) {
				data.procedure.sPracticeDilemma.completed = true;
			}
		}

		data.procedure[data.currentSlide].response = response.id;
	}

	await sleep(500);
};
