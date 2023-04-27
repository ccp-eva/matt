import { gsap } from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	const prefetchedVideos = {
		transition: `./cultures/${data.culture}/video/sr-react2-intro-dilemmas.webm`,
		boat: `./cultures/${data.culture}/video/s-intro-combined-720p.mp4`,
	};

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	for (const [key, value] of Object.entries(prefetchedVideos)) {
		const videoResp = await fetch(value);
		const blob = await videoResp.blob();
		prefetchedVideos[key] = URL.createObjectURL(blob);
	}
	parentBlock.setAttribute('visibility', 'hidden');
	console.log(prefetchedVideos);

	swapSlides(currentSlide, previousSlide, [2, 2]);
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
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

	pinda.src = prefetchedVideos.transition;

	while (isPlaying) {
		await sleep(100);
	}

	gsap.set(fsplayer, { autoAlpha: 0 });
	fsplayer.style.display = 'block';

	gsap.to(pinda, { autoAlpha: 0 });

	await gsap
		.timeline()
		.to('#svg', {
			backgroundColor: '#000',
			duration: 1,
		})
		.to(fsplayer, {
			autoAlpha: 1,
			onStart: () => {
				fsplayer.src = prefetchedVideos.boat;
			},
		});

	while (isPlaying) {
		await sleep(1);
	}

	await gsap.timeline().to('#svg', { backgroundColor: '#fff' }).to(fsplayer, { autoAlpha: 0 }, '<');

	fsplayer.style.display = 'none';
};
