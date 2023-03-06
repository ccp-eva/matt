import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-sheep', 's-pig');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-sheep.mp3`);

	play(`./cultures/${data.culture}/audio/s-sheep.mp3`, 'link-s-sheep-headphones');

	const response = await getResponse(['link-s-sheep-yes', 'link-s-sheep-no']);
	console.log(response.id);
	data.procedure.sheep = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.sheep.response === 'link-s-sheep-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`);
	}

	if (data.procedure.sheep.response === 'link-s-sheep-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no-next.mp3`);
	}

	await sleep(500);
};
