import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-humans', 's-transition-1');

	await playPromise(`./cultures/${data.culture}/audio/s-humans_1.mp3`);
};
