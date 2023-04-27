import { gsap } from 'gsap';
import { play } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
import { startFullscreen } from '../util/helpers';
import config from '../config.yaml';
import { SvgInHtml } from '../types';
import { prefetchAssets } from '../util/prefechAssets';

export default async ({ currentSlide, previousSlide }) => {
	// show slide
	swapSlides(currentSlide, previousSlide);

	const audio = document.getElementById('audio') as HTMLMediaElement;

	const speaker = document.getElementById('link-si-speaker') as SvgInHtml;
	const pinda = document.getElementById('player') as HTMLVideoElement;
	const headphones = document.getElementById('link-si-headphones') as SvgInHtml;
	const nextButton = document.getElementById('link-si-next') as SvgInHtml;
	gsap.set([headphones, nextButton], { autoAlpha: 0, pointerEvents: 'none' });

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(`./cultures/${data.culture}/video/s-introduction.webm`);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	let playingTimeline = true;
	speaker.addEventListener('click', () => {
		if (!config.devmode.on) {
			startFullscreen();
		}
		gsap.to(speaker, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/si-next-red.mp3`, headphones.id);

		audio.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			gsap.set([nextButton, headphones], { autoAlpha: 0.25 });
		});
		pinda.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			if (playingTimeline) {
				gsap.set([nextButton, headphones], { autoAlpha: 0 });
			} else {
				gsap.set([nextButton, headphones], { autoAlpha: 0.5 });
			}
		});
		audio.addEventListener('ended', () => {
			nextButton.style.pointerEvents = 'visible';
			headphones.style.pointerEvents = 'visible';
			gsap.to([nextButton, headphones], { autoAlpha: 1 });
		});
		pinda.addEventListener('ended', () => {
			nextButton.style.pointerEvents = 'visible';
			headphones.style.pointerEvents = 'visible';
			gsap.to([nextButton, headphones], { autoAlpha: 1 });
			gsap.to(pinda, { autoAlpha: 0 });
		});

		// start pinda video
		pinda.src = url;
		pinda.play();
		// only start timeline when media can play through
		gsap
			.timeline()
			.to(headphones, {
				autoAlpha: 0.5,
				delay: 16,
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
			})
			.to(headphones, {
				filter: 'drop-shadow(0px 0px 14px #000)',
				delay: 1,
				repeat: 4,
				yoyo: true,
				reversed: true,
			})
			.to(nextButton, {
				autoAlpha: 0.5,
				delay: 5,
				opacity: 1,
				visibility: 'visible',
			})
			.to(nextButton, {
				filter: 'drop-shadow(0px 0px 14px #a90707)',
				delay: 1,
				repeat: -1,
				yoyo: true,
				reversed: true,
				onComplete: () => {
					playingTimeline = false;
				},
			});
	});

	await getResponse(nextButton.id);
};
