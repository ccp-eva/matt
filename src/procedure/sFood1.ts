import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-humans');

	await playPromise(`./cultures/${data.culture}/audio/s-humans_1.mp3`);
};
