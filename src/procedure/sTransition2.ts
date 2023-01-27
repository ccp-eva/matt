import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-2', 's-humans');

	await playPromise(`./cultures/${data.culture}/audio/s-transition_1.mp3`);
};
