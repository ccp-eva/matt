import gsap from 'gsap';
import _ from 'lodash';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
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
			delay: 11,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`;
			},
		})
		.to(pinda, {
			autoAlpha: 0,
			delay: 6,
		});

	await sleep(8000);

	// swap slides automatically (don’t touch this)
	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [10, 1]);

	play(`./cultures/${data.culture}/audio/st-meaning.mp3`, 'link-sm-headphones');

	data.procedure.sMeaning = {
		duration: 0,
		textInput: '',
		isText: false,
		isVoice: false,
		voiceExplanation: false,
	};

	const nextButton = document.getElementById('link-sm-next') as SvgInHtml;
	nextButton.style.pointerEvents = 'none';
	gsap.set(nextButton, { autoAlpha: 0.25 });

	// get svg rect element
	const rect = document.getElementById('sm-written-response')! as SvgInHtml;
	// create new foreignObject
	const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
	fo.removeAttribute('fill');
	rect.replaceWith(fo);
	// create textarea

	fo.innerHTML = `
	<div id="wrapper">
	<div id="toggle" style="width: 9em; margin: 0 auto; margin-bottom: 10px">
		<input id="chck" type="checkbox" />
		<label for="chck" class="check-trail"><span class="check-handler"></span> </label>
	</div>

	<div id="response-area">
		<textarea
			id="text-response"
			maxlength="2000"
			style="pointer-events: auto;"
		></textarea>
		<button type="button" id="voice-response" style="display: none; font-size: 2rem; margin: 7% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🎤 Record</button>
	</div>
</div>
`;

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
					onStart: () => {
						if (!data.procedure.sMeaning.voiceExplanation) {
							data.procedure.sMeaning.voiceExplanation = true;
							gsap.timeline().to(pinda, { autoAlpha: 1 });
							pinda.src = `./cultures/${data.culture}/video/sr-ex-next-red-audioInput.webm`;
							gsap.timeline().to(pinda, { autoAlpha: 0, delay: 6 });
						}
					},
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
		data.procedure.sMeaning.isText = false;
		data.procedure.sMeaning.isVoice = true;
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		let recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
			type: 'audio',
		});
		recorder.startRecording();

		voiceResponse.innerText = '🛑 Stop Recording';

		voiceResponse.addEventListener('click', async () => {
			await recorder.stopRecording();
			let blob = await recorder.getBlob();
			RecordRTC.invokeSaveAsDialog(blob, data.id);

			nextButton.style.pointerEvents = 'auto';
			gsap.timeline().to(nextButton, {
				autoAlpha: 1,
			});
		});
	});

	textResponse.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textResponse.value.length >= 15) {
			data.procedure.sMeaning.isText = true;
			data.procedure.sMeaning.isVoice = false;
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
	data.procedure.sMeaning.textInput = textResponse.value;
	console.log(data.procedure.sMeaning.textInput);

	await sleep(500);
};
