import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-3', 's-goldfish');

	await playPromise(`./cultures/${data.culture}/audio/s-transition-1_3.mp3`);
};
