import _ from 'lodash';
import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	const childQuestion = document.getElementById('text-differenceChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-differenceAdult') as SvgInHtml;
	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });

	childQuestion.children[0].classList.add('question');
	adultQuestion.children[0].classList.add('question');

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqd-adult.mp3`, 'link-sqd-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqd-adult.mp3`);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/sqd-child.mp3`, 'link-sqd-headphones');
		await playPromise(`./cultures/${data.culture}/audio/sqd-child.mp3`);
	}

	// save responses and store to response object
	const response = await getResponse(['link-sqd-yes', 'link-sqd-no']);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-transition-9.webm`;
			},
		})
		.to(pinda, {
			delay: 4,
			autoAlpha: 0,
		});

	await sleep(5000);
};
