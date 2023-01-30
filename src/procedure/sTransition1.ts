import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import pinda from '../cultures/deUrban/video/s-transition-1.webm';
import { sleep } from '../util/helpers';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-1', 's-introduction');

	const player = document.getElementById('player') as HTMLVideoElement;
	player.style.display = 'block';
	player.src = pinda;

	await sleep(9000);

	// await playPromise(`./cultures/${data.culture}/audio/s-introduction-1.mp3`);
};
