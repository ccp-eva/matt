import { playPromise } from '../util/audio';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import pinda from '../cultures/deUrban/video/s-transition-2.webm';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-2', 's-humans');

	const player = document.getElementById('player') as HTMLVideoElement;
	player.src = pinda;

	await sleep(5000);
	player.style.display = 'none';

	// await playPromise(`./cultures/${data.culture}/audio/s-transition_2.mp3`);
};
