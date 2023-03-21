import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const left = document.getElementById('s1h10cows-oneHuman')! as SvgInHtml;
	const center = document.getElementById('s1h10cows-cantDecide')! as SvgInHtml;
	const right = document.getElementById('s1h10cows-tenCows')! as SvgInHtml;

	play(`./cultures/${data.culture}/audio/s1h10cows-left.mp3`, 'link-s1h10cows-headphones');
	await playPromise(`./cultures/${data.culture}/audio/s1h10cows-left.mp3`);
	await playPromise(`./cultures/${data.culture}/audio/saving.mp3`);

	[left, center, right].forEach((el) => {
		el.classList.add('dilemma-card');
	});

	// save responses and store to response object
	let response = await getResponse([
		's1h10cows-oneHuman',
		's1h10cows-cantDecide',
		's1h10cows-tenCows',
	]);

	// bubble up until first g element
	while (response.tagName !== 'g') {
		response = response.parentElement!;
	}

	console.log(response.id);
	data.procedure[data.currentSlide].response = response.id;

	await sleep(500);
};