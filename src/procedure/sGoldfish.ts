import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	swapSlides('s-goldfish', 's-rabbit');

	const startTime = new Date().getTime();

	await playPromise(`./cultures/${data.culture}/audio/s-goldfish.mp3`);

	play(`./cultures/${data.culture}/audio/s-goldfish.mp3`, 'link-s-goldfish-headphones');

	const response = await getResponse(['link-s-goldfish-yes', 'link-s-goldfish-no']);
	console.log(response.id);
	data.procedure.goldfish = {
		duration: new Date().getTime() - startTime,
		response: response.id,
	};

	if (data.procedure.goldfish.response === 'link-s-goldfish-yes') {
		await playPromise(`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`);
	}

	if (data.procedure.goldfish.response === 'link-s-goldfish-no') {
		await playPromise(`./cultures/${data.culture}/audio/animal-resp-no.mp3`);
	}

	await sleep(500);
};
