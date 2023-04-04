import { gsap } from 'gsap';
import { play, stop } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
import { startFullscreen } from '../util/helpers';
import config from '../config.yaml';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { sleep } from '../util/helpers';

export default async () => {
	// show slide
	swapSlides(_.kebabCase(data.currentSlide));

	// play([
	// 	`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`,
	// 	`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`,
	// 	`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`,
	// ]);
	const video = document.getElementById('player') as HTMLMediaElement;
	const audio = document.getElementById('audio') as HTMLMediaElement;

	const speaker = document.getElementById('link-si-speaker') as SvgInHtml;
	const pinda = document.getElementById('player') as HTMLVideoElement;

	const tl = gsap.timeline();
	const headphones = document.getElementById('link-si-headphones') as SvgInHtml;
	const nextButton = document.getElementById('link-si-next') as SvgInHtml;
	gsap.set([headphones, nextButton], { autoAlpha: 0 });

	let playingTimeline = false;
	speaker.addEventListener('click', async () => {
		if (!config.devmode.on) {
			startFullscreen();
		}
		gsap.to(speaker, { autoAlpha: 0 });
		playingTimeline = true;
		play(`./cultures/${data.culture}/audio/si-next-red.mp3`, headphones.id);

		audio.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			gsap.set([nextButton, headphones], { autoAlpha: 0.25 });
		});
		video.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			if (playingTimeline) {
				gsap.set([nextButton, headphones], { autoAlpha: 0 });
			} else {
				gsap.set([nextButton, headphones], { autoAlpha: 0.25 });
			}
		});
		audio.addEventListener('ended', () => {
			nextButton.style.pointerEvents = 'visible';
			headphones.style.pointerEvents = 'visible';
			gsap.to([nextButton, headphones], { autoAlpha: 1 });
		});
		video.addEventListener('ended', () => {
			nextButton.style.pointerEvents = 'visible';
			headphones.style.pointerEvents = 'visible';
			gsap.to([nextButton, headphones], { autoAlpha: 1 });
		});

		pinda.src = `./cultures/${data.culture}/video/s-introduction.webm`;
		pinda.onload = async () => {
			await gsap
				.timeline()
				.to(headphones, {
					autoAlpha: 1,
					delay: 17,
					duration: 0.5,
					opacity: 1,
					visibility: 'visible',
				})
				.to(headphones, {
					filter: 'drop-shadow(0px 0px 14px #c4c4c4)',
					delay: 1,
					repeat: 2,
					yoyo: true,
					reversed: true,
				})
				.to(nextButton, {
					autoAlpha: 1,
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
		};
	});

	await getResponse(nextButton.id);

	// kill timeline animations
	tl.kill();

	stop();
	await sleep(500);
};
