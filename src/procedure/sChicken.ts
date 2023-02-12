import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-chicken', 's-sheep');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-chicken.mp3`);

	play(`./cultures/${data.culture}/audio/s-chicken.mp3`, 'link-s-chicken-headphones');

	const response = await getResponse(['link-s-chicken-yes', 'link-s-chicken-no']);
	console.log(response.id);
	data.procedure.chicken = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.chicken.response === 'link-s-chicken-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-alright.mp3`);
	}

	if (data.procedure.chicken.response === 'link-s-chicken-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no.mp3`);
	}
};
