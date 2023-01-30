import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-sheep', 's-pig');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-food3_1.mp3`);

	play(`./cultures/${data.culture}/audio/s-food3_1.mp3`, 'link-s-sheep-headphones');

	const response = await getResponse(['link-s-sheep-yes', 'link-s-sheep-no']);
	console.log(response.id);
	data.procedure.sheep = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.sheep.response === 'link-s-sheep-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-ok_1.mp3`);
	}

	if (data.procedure.sheep.response === 'link-s-sheep-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no_1.mp3`);
	}
};
