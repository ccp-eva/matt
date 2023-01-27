import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-transition-1', 's-introduction');

	await playPromise(`./cultures/${data.culture}/audio/s-introduction-1.mp3`);
};
