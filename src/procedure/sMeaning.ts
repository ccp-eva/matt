import gsap from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { generateUserIdFilename, sleep, uploadAudio } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	// only prefetch required videos depending on input
	const prefetchedVideos = {
		transition: '',
		neutral: '',
		text: '',
		audio: '',
	};
	prefetchedVideos.transition = `./cultures/${data.culture}/video/sr-finish-meaning.${data.meta.videoExtension}`;
	if (!data.pindaNeutralBlob) {
		prefetchedVideos.neutral = `./cultures/${data.culture}/video/pinda-neutral-listening.${data.meta.videoExtension}`;
	}
	if (!data.textIntroBlob && data.input === 'text') {
		prefetchedVideos.text = `./cultures/${data.culture}/video/s-ex-next-red-textInput.${data.meta.videoExtension}`;
	}
	if (!data.audioIntroBlob && data.input === 'audio') {
		prefetchedVideos.audio = `./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.${data.meta.videoExtension}`;
	}
	if (data.input === 'userchoice-audio' || data.input === 'userchoice-text') {
		if (!data.textIntroBlob) {
			prefetchedVideos.text = `./cultures/${data.culture}/video/s-ex-next-red-textInput.${data.meta.videoExtension}`;
		}
		if (!data.audioIntroBlob) {
			prefetchedVideos.audio = `./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.${data.meta.videoExtension}`;
		}
	}

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	for (const [key, value] of Object.entries(prefetchedVideos)) {
		if (value) {
			const videoResp = await fetch(value);
			const blob = await videoResp.blob();
			prefetchedVideos[key] = URL.createObjectURL(blob);
		}
	}
	// write blobs to data object
	data.pindaNeutralBlob = data.pindaNeutralBlob || prefetchedVideos.neutral;
	data.textIntroBlob = data.textIntroBlob || prefetchedVideos.text;
	data.audioIntroBlob = data.audioIntroBlob || prefetchedVideos.audio;
	// write blobs from data to prefetchedVideos if not already there
	prefetchedVideos.neutral = prefetchedVideos.neutral || data.pindaNeutralBlob;
	prefetchedVideos.text = prefetchedVideos.text || data.textIntroBlob;
	prefetchedVideos.audio = prefetchedVideos.audio || data.audioIntroBlob;
	parentBlock.setAttribute('visibility', 'hidden');
	console.log(prefetchedVideos);

	// insert HTML
	{
		// get svg rect element
		const rect = document.getElementById('sm-written-response')! as SvgInHtml;
		// create new foreignObject
		const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
		fo.removeAttribute('fill');
		rect.replaceWith(fo);
		// create html content
		fo.innerHTML = `
	<div id="wrapper-smeaning" style="display: none;">
		<div id="toggle-smeaning" style="width: 9em; margin: 0 auto; margin-bottom: 10px">
				<input id="chck-smeaning" type="checkbox" />
			<label for="chck-smeaning" class="check-trail"><span class="check-handler"></span> </label>
		</div>

		<div>
			<textarea
			   rows="5"
				disabled
				id="text-response-smeaning"
				maxlength="2000"
				style="display: block; pointer-events: auto;"
			></textarea>
			<div id="voice-response-smeaning" style="display: flex;">
				<button type="button" class="button" disabled id="voice-response-start-smeaning"><span>🎤&nbsp;Start</span></button> <button type="button" class="button" disabled id="voice-response-stop-smeaning"><span>🛑&nbsp;Stop</span></button>
			</div>
		</div>
	</div>`;
	}

	const headphones = document.getElementById('link-sm-headphones') as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	const pindaNeutral = document.getElementById('pinda-neutral') as HTMLVideoElement;
	const nextButton = document.getElementById('link-sm-next') as SvgInHtml;

	const wrapper = document.getElementById('wrapper-smeaning') as HTMLDivElement;
	const textResponse = document.getElementById('text-response-smeaning') as HTMLTextAreaElement;
	const voiceResponse = document.getElementById('voice-response-smeaning') as HTMLDivElement;
	const voiceResponseStart = document.getElementById(
		'voice-response-start-smeaning'
	) as HTMLButtonElement;
	const voiceResponseStop = document.getElementById(
		'voice-response-stop-smeaning'
	) as HTMLButtonElement;
	const toggle = document.getElementById('toggle-smeaning') as HTMLDivElement;
	const checkLabel = document.querySelector('.check-trail') as HTMLLabelElement;
	const checkBox = document.getElementById('chck-smeaning') as HTMLInputElement;

	nextButton.style.pointerEvents = 'none';
	checkLabel.style.pointerEvents = 'none';
	gsap.set([nextButton, checkLabel], { autoAlpha: 0.25 });

	data.procedure[data.currentSlide] = {
		duration: 0,
		input: data.input,
		textInput: '',
		isText: false,
		isVoice: false,
		voiceExplanation: false,
		textExplanation: false,
	};

	// unchecked = keyboard response (default)
	// checked = voice response
	// change checkBox depending on URL parameter

	// if text, do nothing and hide toggle
	if (data.input === 'text') {
		toggle.style.visibility = 'hidden';
		voiceResponse.style.display = 'none';
	}
	// if audio, check checkbox and hide toggle
	if (data.input === 'audio') {
		checkBox.click();
		toggle.style.visibility = 'hidden';
		textResponse.style.display = 'none';
		voiceResponse.style.display = 'flex';
	}
	// if userchoice-audio, show toggle, clicked
	if (data.input === 'userchoice-audio') {
		checkBox.click();
		textResponse.style.display = 'none';
		voiceResponse.style.display = 'flex';
	}

	if (data.input === 'userchoice-text') {
		textResponse.style.display = 'block';
		voiceResponse.style.display = 'none';
	}

	// show wrapper
	wrapper.style.display = 'block';

	data.procedure[data.currentSlide].voiceExplanation = checkBox.checked;
	data.procedure[data.currentSlide].textExplanation = !checkBox.checked;

	let isPlaying = true;

	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	pinda.src = prefetchedVideos.transition;
	await sleep(5000);
	swapSlides(currentSlide, previousSlide, [3, 2]);

	while (isPlaying) {
		await sleep(100);
	}

	// if userchoice-X landing block
	if (checkBox.checked) {
		pinda.src = prefetchedVideos.audio;
		await gsap
			.timeline()
			.to(voiceResponseStart, {
				filter: 'drop-shadow(0px 0px 18px #000)',
				delay: 8,
				repeat: 3,
				yoyo: true,
				reversed: true,
			})
			.to(voiceResponseStop, {
				filter: 'drop-shadow(0px 0px 18px #000)',
				delay: 1.5,
				repeat: 3,
				yoyo: true,
				reversed: true,
			});
	}
	if (!checkBox.checked) {
		pinda.src = prefetchedVideos.text;
		await sleep(500);
	}

	while (isPlaying) {
		await sleep(100);
	}

	pindaNeutral.src = prefetchedVideos.neutral!;
	gsap.timeline().to(pinda, { autoAlpha: 0 }).to(pindaNeutral, { autoAlpha: 1 }, '<');

	gsap.to(checkLabel, { autoAlpha: 1 });
	checkLabel.style.pointerEvents = 'auto';
	textResponse.disabled = false;
	voiceResponseStart.disabled = false;

	play(`./cultures/${data.culture}/audio/st-meaning.mp3`, headphones.id);

	audio.addEventListener('play', () => {
		checkLabel.style.pointerEvents = 'none';
		gsap.set(checkLabel, { autoAlpha: 0.25 });
	});
	audio.addEventListener('ended', () => {
		checkLabel.style.pointerEvents = 'visible';
		gsap.set(checkLabel, { autoAlpha: 1 });
	});

	// if userchoice part
	if (data.input === 'userchoice-audio' || data.input === 'userchoice-text') {
		checkBox.addEventListener('change', async () => {
			const switchToVoice = checkBox.checked;
			const switchToText = !checkBox.checked;

			// switch to voice
			if (switchToVoice) {
				textResponse.style.display = 'none';
				voiceResponse.style.display = 'flex';
			}

			if (switchToText) {
				textResponse.style.display = 'block';
				voiceResponse.style.display = 'none';
			}

			// play voice instruction if not already played yet
			if (switchToVoice && !data.procedure[data.currentSlide].voiceExplanation) {
				data.procedure[data.currentSlide].voiceExplanation = true;

				voiceResponseStart.disabled = true;
				checkLabel.style.pointerEvents = 'none';
				headphones.style.pointerEvents = 'none';
				gsap.set([nextButton, checkLabel], { autoAlpha: 0.25 });

				gsap.to(pindaNeutral, { autoAlpha: 0 });
				pinda.src = prefetchedVideos.audio;
				await gsap
					.timeline()
					.to(voiceResponseStart, {
						filter: 'drop-shadow(0px 0px 18px #000)',
						delay: 8,
						repeat: 3,
						yoyo: true,
						reversed: true,
					})
					.to(voiceResponseStop, {
						filter: 'drop-shadow(0px 0px 18px #000)',
						delay: 1.5,
						repeat: 3,
						yoyo: true,
						reversed: true,
					});

				while (isPlaying) {
					await sleep(100);
				}

				voiceResponseStart.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'auto';
				headphones.style.pointerEvents = 'auto';

				gsap.timeline().to(pinda, { autoAlpha: 0 }).to(pindaNeutral, { autoAlpha: 1 }, '<');
			}

			// play text instuction if not already played yet
			if (switchToText && !data.procedure[data.currentSlide].textExplanation) {
				data.procedure[data.currentSlide].textExplanation = true;

				textResponse.disabled = true;
				checkLabel.style.pointerEvents = 'none';
				headphones.style.pointerEvents = 'none';
				gsap.set(checkLabel, { autoAlpha: 0.25 });

				gsap.to(pindaNeutral, { autoAlpha: 0 });
				pinda.src = prefetchedVideos.text;
				await sleep(500);

				while (isPlaying) {
					await sleep(100);
				}

				textResponse.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'auto';
				headphones.style.pointerEvents = 'auto';

				gsap.timeline().to(pinda, { autoAlpha: 0 }).to(pindaNeutral, { autoAlpha: 1 }, '<');
			}
		});
	}

	textResponse.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textResponse.value.length >= config.globals.minimumTextInputLength) {
			data.procedure[data.currentSlide].isText = true;
			data.procedure[data.currentSlide].isVoice = false;
			gsap.set(nextButton, { autoAlpha: 1 });
			gsap.set(checkLabel, { autoAlpha: 0.25 });
			nextButton.style.pointerEvents = 'visible';
			checkLabel.style.pointerEvents = 'none';
		} else {
			gsap.set(checkLabel, { autoAlpha: 1 });
			gsap.set(nextButton, { autoAlpha: 0.25 });
			nextButton.style.pointerEvents = 'none';
			checkLabel.style.pointerEvents = 'visible';
		}
	});

	voiceResponseStart.addEventListener('click', async () => {
		data.procedure[data.currentSlide].isText = false;
		data.procedure[data.currentSlide].isVoice = true;
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		let recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
			type: 'audio',
		});
		recorder.startRecording();

		voiceResponseStart.disabled = true;
		voiceResponseStop.disabled = false;

		checkLabel.style.pointerEvents = 'none';
		gsap.set(checkLabel, { autoAlpha: 0.25 });

		voiceResponseStop.addEventListener('click', async () => {
			await recorder.stopRecording();
			let blob = await recorder.getBlob();

			// upload blob to server
			uploadAudio(blob, generateUserIdFilename('matt', `${data.currentSlide}`, 'ogg'));

			RecordRTC.invokeSaveAsDialog(
				blob,
				generateUserIdFilename('matt', `${data.currentSlide}`, 'ogg')
			);

			nextButton.style.pointerEvents = 'auto';
			gsap.timeline().to(nextButton, {
				autoAlpha: 1,
			});

			voiceResponseStart.disabled = false;
			voiceResponseStop.disabled = true;

			checkLabel.style.pointerEvents = 'auto';
			gsap.set(checkLabel, { autoAlpha: 1 });
		});
	});

	// save responses and store to response object
	const response = await getResponse(nextButton.id);
	console.log(response.id);
	data.procedure[data.currentSlide].textInput = textResponse.value;
	console.log(data.procedure[data.currentSlide].textInput);
};
