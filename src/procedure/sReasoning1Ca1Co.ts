import { gsap } from 'gsap';
import _ from 'lodash';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	const left = document.getElementById('sr1cat1cow-oneCow')! as SvgInHtml;
	const center = document.getElementById('sr1cat1cow-cantDecide')! as SvgInHtml;
	const right = document.getElementById('sr1cat1cow-oneCat')! as SvgInHtml;

	data.procedure.sReasoning1Ca1Co = {
		duration: 0,
		response: '',
		textInput: '',
		isText: false,
		isVoice: false,
		voiceExplanation: false,
	};

	const nextButton = document.getElementById('link-sr1cat1cow-next') as SvgInHtml;
	nextButton.style.pointerEvents = 'none';
	gsap.set(nextButton, { autoAlpha: 0.25 });

	// get svg rect element
	const rect = document.getElementById('sr1cat1cow-wr')! as SvgInHtml;
	// create new foreignObject
	const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
	fo.removeAttribute('fill');
	rect.replaceWith(fo);
	// create textarea

	fo.innerHTML = `
<div id="response-wrapper-reasoning-catcow" style="margin-top: -5px;">
	<div id="toggle" style="width: 9em; margin: 0 auto;">
		<input id="chck" type="checkbox" />
		<label for="chck" class="check-trail" style="scale: 0.8;"><span class="check-handler"></span> </label>
	</div>

	<div id="response-area">
		<textarea
			id="text-response"
			maxlength="2000"
			rows="3"
			style="pointer-events: auto; height: 100%"
		></textarea>
		<button type="button" id="voice-response" style="display: none; font-size: 2rem; margin: 3% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🎤 Record</button>
	</div>
</div>
`;

	// default values
	let wasCow = true;
	let wasCantDecide = false;
	let wasCat = false;
	// check actual responses from sC1Ca1Co and overwrite default values
	if (data.procedure.sC1Ca1Co) {
		wasCow = data.procedure.sC1Ca1Co.response.toLowerCase().includes('-onecow');
		wasCantDecide = data.procedure.sC1Ca1Co.response.toLowerCase().includes('-cantdecide');
		wasCat = data.procedure.sC1Ca1Co.response.toLowerCase().includes('-onecat');
	}

	// add css
	if (wasCow) {
		left.classList.add('dilemma-card-fix');
	}
	if (wasCantDecide) {
		center.classList.add('dilemma-card-fix');
	}
	if (wasCat) {
		right.classList.add('dilemma-card-fix');
	}

	gsap.set('#response-wrapper-reasoning-cat', { autoAlpha: 0 });

	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	// await sleep(13000);

	await playPromise(`./cultures/${data.culture}/audio/sr1cat1cow-cat-right.mp3`);

	if (wasCow) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cow.mp3`);
	}
	if (wasCantDecide) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`);
	}
	if (wasCat) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cat.mp3`);
	}

	gsap.to('#response-wrapper-reasoning-catcow', { autoAlpha: 1 });

	const textResponse = document.getElementById('text-response') as HTMLTextAreaElement;
	const voiceResponse = document.getElementById('voice-response') as HTMLTextAreaElement;
	const checkLabel = document.querySelector('.check-trail') as HTMLLabelElement;

	// unchecked = keyboard response
	// checked = voice response
	const chck = document.getElementById('chck') as HTMLInputElement;
	chck.addEventListener('change', () => {
		if (chck.checked) {
			gsap
				.timeline()
				.to(textResponse, {
					autoAlpha: 0,
					duration: 0.25,
					pointerEvents: 'none',
					display: 'none',
				})
				.to(
					voiceResponse,
					{
						autoAlpha: 1,
						duration: 0.25,
						pointerEvents: 'auto',
						display: 'block',
					},
					'>'
				);
		}

		if (!chck.checked) {
			gsap
				.timeline()
				.to(voiceResponse, {
					autoAlpha: 0,
					duration: 0.25,
					pointerEvents: 'none',
					display: 'none',
				})
				.to(
					textResponse,
					{
						autoAlpha: 1,
						duration: 0.25,
						pointerEvents: 'auto',
						display: 'block',
					},
					'>'
				);
		}
	});

	voiceResponse.addEventListener('click', async () => {
		data.procedure.sReasoning1Ca1Co.isText = false;
		data.procedure.sReasoning1Ca1Co.isVoice = true;
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		let recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
			type: 'audio',
		});
		recorder.startRecording();

		// todo
		const buttonRecordingString = 'Start Recording';

		voiceResponse.innerText = '🛑 Stop Recording';

		voiceResponse.addEventListener('click', async () => {
			await recorder.stopRecording();
			let blob = await recorder.getBlob();
			RecordRTC.invokeSaveAsDialog(blob, `s-reasoning-1ca-1co-${data.id}`);

			nextButton.style.pointerEvents = 'auto';
			gsap.timeline().to(nextButton, {
				autoAlpha: 1,
			});
		});
	});

	textResponse.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textResponse.value.length >= 15) {
			data.procedure.sReasoning1Ca1Co.isText = true;
			data.procedure.sReasoning1Ca1Co.isVoice = false;
			nextButton.style.pointerEvents = 'auto';
			checkLabel.style.pointerEvents = 'none';
			gsap
				.timeline()
				.to(nextButton, {
					autoAlpha: 1,
					duration: 0.25,
				})
				.to(
					'.check-trail',
					{
						autoAlpha: 0.25,
						duration: 0.25,
					},
					'<'
				);
		} else {
			nextButton.style.pointerEvents = 'none';
			checkLabel.style.pointerEvents = 'auto';
			gsap
				.timeline()
				.to(nextButton, {
					autoAlpha: 0.25,
				})
				.to(
					'.check-trail',
					{
						autoAlpha: 1,
						duration: 0.25,
					},
					'<'
				);
		}
	});

	// save responses and store to response object
	const response = await getResponse(nextButton.id);
	console.log(response.id);
	data.procedure.sReasoning1Ca1Co.textInput = textResponse.value;
	console.log(data.procedure.sReasoning1Ca1Co.textInput);
	data.procedure[data.currentSlide].response = response.id;

	await sleep(500);
};
