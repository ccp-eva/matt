import { gsap } from 'gsap';
import _ from 'lodash';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [2, 2]);
	const pinda = document.getElementById('player') as HTMLVideoElement;
	const fsplayer = document.getElementById('fsplayer') as HTMLVideoElement;

	let isPlaying = true;

	[pinda, fsplayer].forEach((player) => {
		player.addEventListener('play', () => {
			isPlaying = true;
		});
		player.addEventListener('ended', () => {
			isPlaying = false;
		});
	});

	gsap.set(pinda, { autoAlpha: 0 });

	gsap.to(pinda, {
		autoAlpha: 1,
		duration: 2,
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/sr-react2-intro-dilemmas.webm`;
		},
	});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(pinda, {
		autoAlpha: 0,
	});

	isPlaying = true;
	gsap
		.timeline()
		.to('#svg', {
			backgroundColor: '#000',
			duration: 1,
		})
		.to(fsplayer, {
			autoAlpha: 1,
			onStart: () => {
				fsplayer.src = `./cultures/${data.culture}/video/s-intro-combined-720p.mp4`;
			},
		});

	while (isPlaying) {
		await sleep(100);
	}

	gsap
		.timeline()
		.to('#svg', {
			backgroundColor: '#fff',
			duration: 1,
		})
		.to(
			fsplayer,
			{
				autoAlpha: 0,
			},
			'<'
		);

	await sleep(500);
};
