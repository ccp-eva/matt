import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const childQuestion = document.getElementById('text-ownershipChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-ownershipAdult') as SvgInHtml;
	const yes = document.getElementById('link-sqo-yes') as SvgInHtml;
	const no = document.getElementById('link-sqo-no') as SvgInHtml;
	gsap.set([yes, no], { autoAlpha: 0 });

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqo-adult.mp3`, 'link-sqo-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqo-adult.mp3`);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqo-child.mp3`, 'link-sqo-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqo-child.mp3`);
	}

	gsap
		.timeline()
		.to(yes, {
			autoAlpha: 1,
			onStart: () => {
				play(`./cultures/${data.culture}/audio/yes-no.mp3`);
			},
		})
		.to(no, {
			delay: 1,
			autoAlpha: 1,
		});

	// save responses and store to response object
	const response = await getResponse(['link-sqo-yes', 'link-sqo-no']);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	await sleep(500);
};
