import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import pinda from '../cultures/deUrban/video/s-transition-3.webm';
import { sleep } from '../util/helpers';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-3', 's-goldfish');

	const player = document.getElementById('player') as HTMLVideoElement;
	player.src = pinda;
	player.style.display = 'block';

	await sleep(5000);

	player.style.display = 'none';

	// await playPromise(`./cultures/${data.culture}/audio/s-transition-1_3.mp3`);
};
