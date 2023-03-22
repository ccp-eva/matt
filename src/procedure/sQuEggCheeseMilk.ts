import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const yes = document.getElementById('link-sqecm-yes') as SvgInHtml;
	const no = document.getElementById('link-sqecm-no') as SvgInHtml;
	gsap.set([yes, no], { autoAlpha: 0 });

	play(`./cultures/${data.culture}/audio/sqecm.mp3`, 'link-sqecm-headphones');
	await playPromise(`./cultures/${data.culture}/audio/sqecm.mp3`);

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
	const response = await getResponse(['link-sqecm-yes', 'link-sqecm-no']);
	console.log(response.id);

	data.procedure[data.currentSlide].response = response.id;

	await sleep(500);
};
