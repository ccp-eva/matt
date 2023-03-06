import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-rabbit', 's-dog');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-rabbit.mp3`);

	play(`./cultures/${data.culture}/audio/s-rabbit.mp3`, 'link-s-rabbit-headphones');

	const response = await getResponse(['link-s-rabbit-yes', 'link-s-rabbit-no']);
	console.log(response.id);
	data.procedure.rabbit = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	await sleep(500);
};
