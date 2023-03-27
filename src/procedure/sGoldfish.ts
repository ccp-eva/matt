import { gsap } from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	data.animalSlideCounter++;

	const audio = document.getElementById('audio') as HTMLMediaElement;
	const yesButton = document.getElementById('link-s-goldfish-yes') as SvgInHtml;
	const noButton = document.getElementById('link-s-goldfish-no') as SvgInHtml;

	gsap.set([yesButton, noButton], {
		pointerEvents: 'none',
	});

	if (data.animalSlideCounter <= config.globals.playAnimalYesNoAudio) {
		gsap.set([yesButton, noButton], { autoAlpha: 0 });
	} else {
		gsap.set([yesButton, noButton], { autoAlpha: 0.5 });
	}

	await playPromise(`./cultures/${data.culture}/audio/s-goldfish.mp3`);
	play(`./cultures/${data.culture}/audio/s-goldfish.mp3`, 'link-s-goldfish-headphones');

	// for the first two animal slides, hide yes and no response buttons
	if (data.animalSlideCounter <= config.globals.playAnimalYesNoAudio) {
		await gsap
			.timeline()
			.to(yesButton, {
				duration: 0.5,
				autoAlpha: 0.5,
				onStart: () => {
					play(`./cultures/${data.culture}/audio/yes-no.mp3`);
					console.log('this is the start');
				},
			})
			.to(noButton, {
				delay: 1,
				duration: 0.5,
				autoAlpha: 0.5,
				onComplete: () => {
					gsap.set([yesButton, noButton], { pointerEvents: 'auto' });
					gsap.to([yesButton, noButton], { autoAlpha: 1 });
				},
			});
	} else {
		gsap.set([yesButton, noButton], { autoAlpha: 1, pointerEvents: 'auto' });
	}

	function handlePlay() {
		yesButton.style.pointerEvents = 'none';
		noButton.style.pointerEvents = 'none';
		gsap.to([yesButton, noButton], { autoAlpha: 0.5 });
	}

	function handleEnded() {
		yesButton.style.pointerEvents = 'auto';
		noButton.style.pointerEvents = 'auto';
		gsap.to([yesButton, noButton], { autoAlpha: 1 });
	}

	audio.addEventListener('play', handlePlay);
	audio.addEventListener('ended', handleEnded);

	// Get Response
	const response = await getResponse([yesButton.id, noButton.id]);

	// Remove Event Listeners after response
	audio.removeEventListener('play', handlePlay);
	audio.removeEventListener('ended', handleEnded);

	// Hide Response Buttons
	gsap.to([yesButton, noButton], { autoAlpha: 0 });

	console.log(response.id);
	data.procedure[data.currentSlide].response = response.id;

	// play button response sounds only for the first four trials
	if (data.animalSlideCounter <= config.globals.playAnimalResponseFeedback) {
		if (response.id.includes('-yes')) {
			const responseOption = ['ok', 'alright'];
			const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
			await playPromise(`./cultures/${data.culture}/audio/neutral-resp-${randomResponse}.mp3`);
		}

		if (response.id.includes('-no')) {
			const responseOption = ['resp-no', 'resp-no-next'];
			const randomResponse = responseOption[Math.floor(Math.random() * responseOption.length)];
			await playPromise(`./cultures/${data.culture}/audio/animal-${randomResponse}.mp3`);
		}
	}

	await sleep(config.globals.animalSlidesGap);
};
