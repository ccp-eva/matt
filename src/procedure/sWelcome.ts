import _ from 'lodash';
import { play } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	play(`./cultures/${data.culture}/audio/neutral-resp-ok.mp3`, 'enter');

	const response = await getResponse('enter');

	document.getElementById('enter')!.style.display = 'none';

	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	await sleep(1000);
};
