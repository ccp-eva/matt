import { playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import pinda from '../cultures/deUrban/video/s-humans.webm';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-humans', 's-transition-1');

	const player = document.getElementById('player') as HTMLVideoElement;
	player.style.display = 'block';
	player.src = pinda;

	await sleep(5000);

	// await playPromise(`./cultures/${data.culture}/audio/s-humans_1.mp3`);
};
