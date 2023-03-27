import { gsap } from 'gsap';
import { play, stop } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
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

	gsap.set([headphones, nextButton], { transformOrigin: '50% 50%', autoAlpha: 0 });

	let playingTimeline = false;
	speaker.addEventListener('click', () => {
		gsap.set(speaker, { autoAlpha: 0 });
		// timeline start
		tl.to(pinda, {
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-introduction.webm`;
				playingTimeline = true;
			},
		})
			.to(
				headphones,
				{
					delay: 17,
					duration: 0.5,
					opacity: 1,
					visibility: 'visible',
				},
				'<'
			)
			.to(headphones, {
				filter: 'drop-shadow(0px 0px 14px #c4c4c4)',
				delay: 1,
				repeat: 2,
				yoyo: true,
				reversed: true,
			})
			.to(nextButton, {
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
			})
			.to(pinda, {
				delay: 3,
				autoAlpha: 0,
				onStart: () => {
					play(`./cultures/${data.culture}/audio/si-next-red.mp3`, 'link-si-headphones');
				},
				onComplete: () => {
					playingTimeline = false;
				},
			});
	});

	audio.addEventListener('play', () => {
		console.log('audio started');
		nextButton.style.pointerEvents = 'none';
		gsap.set(nextButton, { autoAlpha: 0.25 });
	});
	video.addEventListener('play', () => {
		console.log('video started');
		nextButton.style.pointerEvents = 'none';
		if (playingTimeline) {
			gsap.set(nextButton, { autoAlpha: 0 });
		} else {
			gsap.set(nextButton, { autoAlpha: 0.25 });
		}
	});
	audio.addEventListener('ended', () => {
		console.log('audio ended');
		nextButton.style.pointerEvents = 'auto';
		gsap.to(nextButton, { autoAlpha: 1 });
	});
	video.addEventListener('ended', () => {
		nextButton.style.pointerEvents = 'auto';
		gsap.to(nextButton, { autoAlpha: 1 });
		console.log('video ended');
	});

	await getResponse(nextButton.id);

	// kill timeline animations
	tl.kill();

	stop();
	await sleep(500);
};
