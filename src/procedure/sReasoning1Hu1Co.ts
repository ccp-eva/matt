import { gsap } from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { generateUserIdFilename, sleep, uploadAudio } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.reasoningSlideCounter++;
	// INSERT HTML
	{
		// get svg rect element
		const rect = document.getElementById('sr1h1cow-wr')! as SvgInHtml;
		// create new foreignObject
		const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
		fo.removeAttribute('fill');
		rect.replaceWith(fo);
		// create textarea

		fo.innerHTML = `
			<div id="response-wrapper-reasoning-cow" style="margin-top: -5px;">
			<div id="toggle-cow" style="width: 9em; margin: 0 auto; margin-bottom: 10px">
				<input id="chck-cow" type="checkbox" />
				<label for="chck-cow" class="check-trail" style="scale: 0.8;"><span class="check-handler"></span> </label>
			</div>
			<div>
				<textarea
					disabled
					id="text-response-cow"
					maxlength="2000"
					rows="3"
					style="display: block; pointer-events: auto; height: 100%"
					></textarea>
				<div id="voice-response-cow" style="display: flex;">
					<button type="button" disabled id="voice-response-start-cow" style="font-size: 2rem; margin: 7% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🎤 Start</button> <button type="button" disabled id="voice-response-stop-cow" style="font-size: 2rem; margin: 7% auto; pointer-events: auto; opacity: 1; visibility: inherit;">🛑 Stop</button>
				</div>
			</div>
		</div>
	`;
	}

	const left = document.getElementById('sr1h1cow-oneHuman')! as SvgInHtml;
	const center = document.getElementById('sr1h1cow-cantDecide')! as SvgInHtml;
	const right = document.getElementById('sr1h1cow-oneCow')! as SvgInHtml;
	const nextButton = document.getElementById('link-sr1h1cow-next') as SvgInHtml;
	const headphones = document.getElementById('link-sr1h1cow-headphones') as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const pinda = document.getElementById('player') as HTMLVideoElement;

	const textResponse = document.getElementById('text-response-cow') as HTMLTextAreaElement;
	const voiceResponse = document.getElementById('voice-response-cow') as HTMLDivElement;
	const voiceResponseStart = document.getElementById(
		'voice-response-start-cow'
	) as HTMLButtonElement;
	const voiceResponseStop = document.getElementById('voice-response-stop-cow') as HTMLButtonElement;
	const toggle = document.getElementById('toggle-cow') as HTMLDivElement;
	const checkLabel = document.querySelector('.check-trail') as HTMLLabelElement;
	const checkBox = document.getElementById('chck-cow') as HTMLInputElement;

	nextButton.style.pointerEvents = 'none';
	checkLabel.style.pointerEvents = 'none';
	gsap.set([nextButton, checkLabel], { autoAlpha: 0.25 });
	gsap.set(pinda, { autoAlpha: 0 });

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

	data.procedure[data.currentSlide].voiceExplanation = checkBox.checked;
	data.procedure[data.currentSlide].textExplanation = !checkBox.checked;

	// default values
	let wasHuman = true;
	let wasCow = false;
	let wasCantDecide = false;
	// check actual responses from s1Hu1Co and overwrite default values
	if (data.procedure.s1Hu1Co) {
		wasHuman = data.procedure.s1Hu1Co.response.toLowerCase().includes('-onehuman');
		wasCow = data.procedure.s1Hu1Co.response.toLowerCase().includes('-onecow');
		wasCantDecide = data.procedure.s1Hu1Co.response.toLowerCase().includes('-cantdecide');
	}

	// make text smaller for reasoning slides
	document.querySelectorAll('g [id^=sr] foreignObject p.dilemma').forEach((el) => {
		el.classList.add('dilemma__reasoning');
	});

	// add frame around prior selected card
	if (wasHuman) {
		left.classList.add('dilemma-card-fix');
	}
	if (wasCantDecide) {
		center.classList.add('dilemma-card-fix');
	}
	if (wasCow) {
		right.classList.add('dilemma-card-fix');
	}

	gsap.set('#response-wrapper-reasoning-cow', { autoAlpha: 0 });

	swapSlides(_.kebabCase(data.currentSlide), _.kebabCase(data.previousSlide));

	await playPromise(`./cultures/${data.culture}/audio/sr1h1cow-left.mp3`);

	if (wasHuman) {
		await playPromise(`./cultures/${data.culture}/audio/srw-human.mp3`);
		play(`./cultures/${data.culture}/audio/srw-human.mp3`, headphones.id);
	}
	if (wasCantDecide) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`);
		play(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`, headphones.id);
	}
	if (wasCow) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cow.mp3`);
		play(`./cultures/${data.culture}/audio/srw-cow.mp3`, headphones.id);
	}

	gsap.to('#response-wrapper-reasoning-cow', { autoAlpha: 1 });

	let isPlaying = true;
	let isExplaining = true;
	const timeline = gsap.timeline();
	timeline.to(pinda, {
		autoAlpha: 1,
		onStart: () => {
			isExplaining = true;
			if (checkBox.checked) {
				if (data.reasoningSlideCounter === 1) {
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
				if (data.reasoningSlideCounter === 2) {
					pinda.src = `./cultures/${data.culture}/video/sr-prompt-audioInput.webm`;
				}
				if (data.reasoningSlideCounter === 3) {
					pinda.src = `./cultures/${data.culture}/video/audio-input-3.webm`;
				}
			}
			if (!checkBox.checked) {
				if (data.reasoningSlideCounter === 1) {
					pinda.src = `./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`;
				}
				if (data.reasoningSlideCounter === 2) {
					pinda.src = `./cultures/${data.culture}/video/sr-promp-textInput.webm`;
				}
				if (data.reasoningSlideCounter === 3) {
					pinda.src = `./cultures/${data.culture}/video/text-input-3.webm`;
				}
			}
		},
		onComplete: () => {
			isExplaining = false;
		},
	});

	pinda.addEventListener('play', () => {
		isPlaying = true;
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
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

	audio.addEventListener('play', () => {
		checkLabel.style.pointerEvents = 'none';
		gsap.set(checkLabel, { autoAlpha: 0.25 });
	});
	audio.addEventListener('ended', () => {
		checkLabel.style.pointerEvents = 'auto';
		gsap.set(checkLabel, { autoAlpha: 1 });
	});

	// if userchoice part
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
			pinda.loop = false;

			let isExplaining = true;
			gsap.timeline().to(pinda, {
				onStart: () => {
					if (data.reasoningSlideCounter === 1) {
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
					if (data.reasoningSlideCounter === 2) {
						pinda.src = `./cultures/${data.culture}/video/sr-prompt-audioInput.webm`;
					}
					if (data.reasoningSlideCounter === 3) {
						pinda.src = `./cultures/${data.culture}/video/audio-input-3.webm`;
					}
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
		if (switchToText && !data.procedure[data.currentSlide].textExplanation) {
			data.procedure[data.currentSlide].textExplanation = true;

			textResponse.disabled = true;
			checkLabel.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			gsap.set(checkLabel, { autoAlpha: 0.25 });

			let isExplaining = true;
			pinda.loop = false;
			gsap.timeline().to(pinda, {
				onStart: () => {
					if (data.reasoningSlideCounter === 1) {
						pinda.src = `./cultures/${data.culture}/video/s-ex-next-red-textInput.webm`;
					}
					if (data.reasoningSlideCounter === 2) {
						pinda.src = `./cultures/${data.culture}/video/sr-promp-textInput.webm`;
					}
					if (data.reasoningSlideCounter === 3) {
						pinda.src = `./cultures/${data.culture}/video/text-input-3.webm`;
					}
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

	textResponse.addEventListener('input', () => {
		// show next button if textarea hast at least n chars
		if (textResponse.value.length >= config.globals.minimumTextInputLength) {
			data.procedure[data.currentSlide].isText = true;
			data.procedure[data.currentSlide].isVoice = false;
			nextButton.style.pointerEvents = 'auto';
			checkLabel.style.pointerEvents = 'none';
			gsap
				.timeline()
				.to(nextButton, {
					autoAlpha: 1,
					duration: 0.25,
				})
				.to(
					checkLabel,
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
					checkLabel,
					{
						autoAlpha: 1,
						duration: 0.25,
					},
					'<'
				);
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
			uploadAudio(blob, generateUserIdFilename('matt', 's-reasoning-1ca-1co', 'ogg'));

			RecordRTC.invokeSaveAsDialog(blob, `${data.currentSlide}-${data.id}`);

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
	data.procedure[data.currentSlide].response = response.id;

	pinda.loop = false;

	// react to user response
	gsap.to(pinda, {
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/sr-react-${data.reasoningSlideCounter}.webm`;
		},
	});

	while (isPlaying) {
		await sleep(100);
	}

	gsap.to(pinda, { autoAlpha: 0 });

	await sleep(500);
};
