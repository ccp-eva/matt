import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-dog', 's-cat');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-comp2_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-comp2_1.mp3`, 'link-s-dog-headphones');

	const response = await getResponse(['link-s-dog-yes', 'link-s-dog-no']);
	console.log(response.id);
	data.procedure.dog = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};
};
