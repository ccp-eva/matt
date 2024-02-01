import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';
import { sleep } from '../util/helpers';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide);

	const audio = document.getElementById('audio') as HTMLMediaElement;
	const slidePrefix = 'sqmfnzm';
	const headphones = document.getElementById(`link-${slidePrefix}-headphones`) as SvgInHtml;
	const yesButton = document.getElementById(`link-${slidePrefix}-yes`) as SvgInHtml;
	const noButton = document.getElementById(`link-${slidePrefix}-no`) as SvgInHtml;

	gsap.set([yesButton, noButton], { autoAlpha: 0, pointerEvents: 'none' });
	gsap.set(headphones, { autoAlpha: 0.5, pointerEvents: 'none' });

	await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}.mp3`);
	play(`./cultures/${data.culture}/audio/${slidePrefix}.mp3`, headphones.id);

	play(`./cultures/${data.culture}/audio/yes-no.mp3`);
	await gsap
		.timeline()
		.to(yesButton, { autoAlpha: 0.5 })
		.to(noButton, {
			delay: 1,
			autoAlpha: 0.5,
			onComplete: () => {
				gsap.set([yesButton, noButton, headphones], { pointerEvents: 'visible' });
				gsap.to([yesButton, noButton, headphones], { autoAlpha: 1 });
			},
		});

	let isPlaying = false;
	audio.addEventListener('play', () => {
		isPlaying = true;
		gsap.to([yesButton, noButton, headphones], { autoAlpha: 0.5, pointerEvents: 'none' });
	});
	audio.addEventListener('ended', () => {
		isPlaying = false;
		gsap.to([yesButton, noButton, headphones], { autoAlpha: 1, pointerEvents: 'visible' });
	});

	while (isPlaying) {
		await sleep(100);
	}

	// save responses and store to response object
	const response = await getResponse([yesButton.id, noButton.id]);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};
};
