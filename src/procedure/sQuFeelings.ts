import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide);

	const prefix = 'sqf';
	const linkPrefix = `link-${prefix}`;
	const middlefix = 'feelings';
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const headphones = document.getElementById(`${linkPrefix}-headphones`) as SvgInHtml;
	const childQuestion = document.getElementById(`text-${middlefix}Child`) as SvgInHtml;
	const adultQuestion = document.getElementById(`text-${middlefix}Adult`) as SvgInHtml;
	const comp = document.getElementById(`text-${middlefix}Comp`) as SvgInHtml;
	const yes = document.getElementById(`${linkPrefix}-yes`) as SvgInHtml;
	const no = document.getElementById(`${linkPrefix}-no`) as SvgInHtml;
	gsap.set([comp, yes, no], { autoAlpha: 0 });
	gsap.set([yes, no], { pointerEvents: 'none' });

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
		await playPromise(`./cultures/${data.culture}/audio/${prefix}-adult.mp3`);
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
		await playPromise(`./cultures/${data.culture}/audio/${prefix}-child.mp3`);
	}

	play(`./cultures/${data.culture}/audio/yes-no.mp3`);
	await gsap.timeline().to(yes, { autoAlpha: 0.5 }).to(no, { delay: 1, autoAlpha: 0.5 });

	data.agegroup === 'adult' &&
		play(`./cultures/${data.culture}/audio/${prefix}-adult.mp3`, headphones.id);

	data.agegroup === 'child' &&
		play(`./cultures/${data.culture}/audio/${prefix}-child.mp3`, headphones.id);

	gsap.to([yes, no], { pointerEvents: 'visible', autoAlpha: 1 });

	audio.addEventListener('play', () => {
		yes.style.pointerEvents = 'none';
		no.style.pointerEvents = 'none';
		headphones.style.pointerEvents = 'none';
		gsap.to([yes, no, headphones], { autoAlpha: 0.5 });
	});
	audio.addEventListener('ended', () => {
		yes.style.pointerEvents = 'visible';
		no.style.pointerEvents = 'visible';
		headphones.style.pointerEvents = 'visible';
		gsap.to([yes, no, headphones], { autoAlpha: 1 });
	});

	// save responses and store to response object
	const response = await getResponse([yes.id, no.id]);
	console.log(response.id);
	data.procedure[data.currentSlide] = {
		response: response.id,
	};

	if (response.id.includes('-yes')) {
		gsap.set([childQuestion, adultQuestion], { autoAlpha: 0 });
		gsap.to(comp, { autoAlpha: 1 });

		await playPromise(`./cultures/${data.culture}/audio/${prefix}c.mp3`);
		play(`./cultures/${data.culture}/audio/${prefix}c.mp3`, headphones.id);

		const response = await getResponse([yes.id, no.id]);
		console.log(response.id);
		data.procedure.sQuFeelingsComp = {
			response: response.id,
		};
	}
};
