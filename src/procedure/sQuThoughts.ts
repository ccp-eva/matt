import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const childQuestion = document.getElementById('text-thoughtsChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-thoughtsAdult') as SvgInHtml;
	const comp = document.getElementById('text-thoughtsComp') as SvgInHtml;
	gsap.set(comp, { autoAlpha: 0 });

	[childQuestion, adultQuestion, comp].forEach((el) => {
		el.children[0].classList.add('question');
	});

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqt-adult.mp3`, 'link-sqt-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqt-adult.mp3`);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqt-child.mp3`, 'link-sqt-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqt-child.mp3`);
	}

	// save responses and store to response object
	const response = await getResponse(['link-sqt-yes', 'link-sqt-no']);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	if (response.id.includes('-yes')) {
		gsap.set([childQuestion, adultQuestion], { autoAlpha: 0 });
		gsap.set(comp, { autoAlpha: 1 });

		play(`./cultures/${data.culture}/audio/sqtc.mp3`, 'link-sqt-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqtc.mp3`);

		const response = await getResponse(['link-sqt-yes', 'link-sqt-no']);
		console.log(response.id);
		data.procedure.sQuThoughtsComp = {
			response: response.id,
		};
	}

	await sleep(500);
};
