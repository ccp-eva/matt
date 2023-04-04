import gsap from 'gsap';
import _, { head } from 'lodash';
import config from '../config.yaml';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { generateUserIdFilename, sleep, uploadAudio } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
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
		<div id="toggle" style="width: 9em; margin: 0 auto; margin-bottom: 10px">
				<input id="chck" type="checkbox" />
			<label for="chck" class="check-trail"><span class="check-handler"></span> </label>
		</div>

		<div>
			<textarea
				disabled
				id="text-response-meaning"
				maxlength="2000"
				style="display: block; pointer-events: auto;"
			></textarea>
			<div id="voice-response-meaning" style="display: flex;">
				<button type="button" disabled id="voice-response-start-meaning" style="font-size: 2rem; margin: 7% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🎤 Start</button> <button type="button" disabled id="voice-response-stop-meaning" style="font-size: 2rem; margin: 7% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🛑 Stop</button>
			</div>
		</div>
	</div>`;
	}

	const headphones = document.getElementById('link-sm-headphones') as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const pinda = document.getElementById('player') as HTMLVideoElement;
	const nextButton = document.getElementById('link-sm-next') as SvgInHtml;

	const wrapper = document.getElementById('wrapper-smeaning') as HTMLDivElement;
	const textResponse = document.getElementById('text-response-meaning') as HTMLTextAreaElement;
	const voiceResponse = document.getElementById('voice-response-meaning') as HTMLDivElement;
	const voiceResponseStart = document.getElementById(
		'voice-response-start-meaning'
	) as HTMLButtonElement;
	const voiceResponseStop = document.getElementById(
		'voice-response-stop-meaning'
	) as HTMLButtonElement;
	const toggle = document.getElementById('toggle') as HTMLDivElement;
	const checkLabel = document.querySelector('.check-trail') as HTMLLabelElement;
	const checkBox = document.getElementById('chck') as HTMLInputElement;

	nextButton.style.pointerEvents = 'none';
	checkLabel.style.pointerEvents = 'none';
	gsap.set([nextButton, checkLabel], { autoAlpha: 0.25 });
	gsap.set(pinda, { autoAlpha: 0 });

	data.procedure.sMeaning = {
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

	data.procedure.sMeaning.voiceExplanation = checkBox.checked;
	data.procedure.sMeaning.textExplanation = !checkBox.checked;

	let isPlaying = true;
	let isExplaining = true;

	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
	});

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/st-finish-meaning.webm`;
			},
		})
		.to(pinda, {
			delay: 7,
			onStart: () => {
				swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide), [2, 1]);
			},
		});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.timeline().to(pinda, {
		autoAlpha: 1,
		onStart: () => {
			if (checkBox.checked) {
				pinda.src = `./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.webm`;
				gsap
					.timeline()
					.to(voiceResponseStart, {
						filter: 'drop-shadow(0px 0px 20px #969696)',
						delay: 8,
						repeat: 3,
						yoyo: true,
						reversed: true,
					})
					.to(voiceResponseStop, {
						filter: 'drop-shadow(0px 0px 20px #969696)',
						delay: 1.5,
						repeat: 3,
						yoyo: true,
						reversed: true,
					});
			}
			if (!checkBox.checked) {
				pinda.src = `./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`;
			}
		},
		onComplete: () => {
			isExplaining = false;
		},
	});

	while (isPlaying || isExplaining) {
		await sleep(100);
	}

	gsap.to(pinda, {
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/pinda-neutral-listening.webm`;
			pinda.loop = true;
		},
	});

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
			if (switchToVoice && !data.procedure.sMeaning.voiceExplanation) {
				data.procedure.sMeaning.voiceExplanation = true;

				voiceResponseStart.disabled = true;
				checkLabel.style.pointerEvents = 'none';
				headphones.style.pointerEvents = 'none';
				gsap.set([nextButton, checkLabel], { autoAlpha: 0.25 });

				let isExplaining = true;
				gsap.timeline().to(pinda, {
					onStart: () => {
						pinda.src = `./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.webm`;
						pinda.loop = false;
						gsap
							.timeline()
							.to(voiceResponseStart, {
								filter: 'drop-shadow(0px 0px 20px #969696)',
								delay: 8,
								repeat: 3,
								yoyo: true,
								reversed: true,
							})
							.to(voiceResponseStop, {
								filter: 'drop-shadow(0px 0px 20px #969696)',
								delay: 1.5,
								repeat: 3,
								yoyo: true,
								reversed: true,
							});
					},
					onComplete: () => {
						isExplaining = false;
					},
				});

				while (isPlaying || isExplaining) {
					await sleep(100);
				}

				voiceResponseStart.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'auto';
				headphones.style.pointerEvents = 'auto';

				gsap
					.timeline()
					.to(pinda, {
						autoAlpha: 0,
					})
					.to(pinda, {
						autoAlpha: 1,
						onStart: () => {
							pinda.src = `./cultures/${data.culture}/video/pinda-neutral-listening.webm`;
							pinda.loop = true;
						},
					});
			}

			// play text instuction if not already played yet
			if (switchToText && !data.procedure.sMeaning.textExplanation) {
				data.procedure.sMeaning.textExplanation = true;

				textResponse.disabled = true;
				checkLabel.style.pointerEvents = 'none';
				headphones.style.pointerEvents = 'none';
				gsap.set(checkLabel, { autoAlpha: 0.25 });

				let isExplaining = true;
				gsap.timeline().to(pinda, {
					onStart: () => {
						pinda.src = `./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`;
						pinda.loop = false;
					},
					onComplete: () => {
						isExplaining = false;
					},
				});

				while (isPlaying || isExplaining) {
					await sleep(100);
				}

				textResponse.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'auto';
				headphones.style.pointerEvents = 'auto';

				gsap
					.timeline()
					.to(pinda, {
						autoAlpha: 0,
					})
					.to(pinda, {
						autoAlpha: 1,
						onStart: () => {
							pinda.src = `./cultures/${data.culture}/video/pinda-neutral-listening.webm`;
							pinda.loop = true;
						},
					});
			}
		});
	}

	textResponse.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textResponse.value.length >= config.globals.minimumTextInputLength) {
			data.procedure.sMeaning.isText = true;
			data.procedure.sMeaning.isVoice = false;
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
		data.procedure.sMeaning.isText = false;
		data.procedure.sMeaning.isVoice = true;
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
	data.procedure.sMeaning.textInput = textResponse.value;
	console.log(data.procedure.sMeaning.textInput);

	pinda.loop = false;

	await sleep(500);
	// make sure wrapper is hidden
	wrapper.style.display = 'none';
};
