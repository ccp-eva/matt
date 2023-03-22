import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const question = document.getElementById('text-feelingsComp') as SvgInHtml;
	question.children[0].classList.add('question');

	// default to child version
	play(`./cultures/${data.culture}/audio/sqfc.mp3`, 'link-sqfc-headphones');
	await playPromise(`./cultures/${data.culture}/audio/sqfc.mp3`);

	// save responses and store to response object
	const response = await getResponse(['link-sqfc-yes', 'link-sqfc-no']);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	await sleep(500);
};
