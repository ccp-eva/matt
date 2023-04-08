import { gsap } from 'gsap';
import _ from 'lodash';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide, [2, 2]);
	const fsplayer = document.getElementById('fsplayer') as HTMLVideoElement;

	let isPlaying = true;

	fsplayer.addEventListener('play', () => {
		isPlaying = true;
	});
	fsplayer.addEventListener('ended', () => {
		isPlaying = false;
	});

	gsap.set(fsplayer, { autoAlpha: 0 });
	fsplayer.style.display = 'block';

	gsap
		.timeline()
		.to('#svg', {
			backgroundColor: '#000',
			duration: 1,
		})
		.to(fsplayer, {
			autoAlpha: 1,
			onStart: () => {
				fsplayer.src = `./cultures/${data.culture}/video/s-resolve-dilemma-720p.mp4`;
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

	fsplayer.style.display = 'none';
};