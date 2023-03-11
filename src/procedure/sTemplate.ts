import _ from 'lodash';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	// your expirimental logic goes here
	await playPromise(`./cultures/${data.culture}/audio/s-cat.mp3`);
	play(`./cultures/${data.culture}/audio/s-cat.mp3`, 'link-s-cat-headphones');

	// save responses and store to response object
	const response = await getResponse(['link-s-cat-yes', 'link-s-cat-no']);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	await sleep(500);
};
