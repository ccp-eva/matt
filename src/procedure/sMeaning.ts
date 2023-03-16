import gsap from 'gsap';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	data.procedure.sMeaning = {
		duration: 0,
		textInput: '',
	};

	const nextButton = document.getElementById('link-sm-next') as SvgInHtml;
	nextButton.style.pointerEvents = 'none';
	gsap.set(nextButton, { autoAlpha: 0.25 });

	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });
	const timeline = gsap.timeline();
	timeline
		.to(pinda, {
			autoAlpha: 1,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/st-finish-meaning.webm`;
			},
		})
		.to(pinda, {
			autoAlpha: 0,
			delay: 11,
		});

	play(`./cultures/${data.culture}/audio/st-meaning.mp3`, 'link-sm-headphones');

	// get svg rect element
	const rect = document.getElementById('sm-written-response')! as SvgInHtml;
	// create new foreignObject
	const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
	fo.removeAttribute('fill');
	rect.replaceWith(fo);
	// create textarea
	const textarea = document.createElement('textarea');
	fo.appendChild(textarea);
	textarea.id = 'text-response';
	textarea.maxLength = 2000;

	textarea.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textarea.value.length >= 10) {
			nextButton.style.pointerEvents = 'auto';
			gsap.timeline().to(nextButton, {
				autoAlpha: 1,
			});
		} else {
			nextButton.style.pointerEvents = 'none';
			gsap.timeline().to(nextButton, {
				autoAlpha: 0.25,
			});
		}
	});

	// save responses and store to response object
	const response = await getResponse(nextButton.id);
	console.log(response.id);
	data.procedure.sMeaning.textInput = textarea.value;
	console.log(data.procedure.sMeaning.textInput);

	await sleep(500);
};
