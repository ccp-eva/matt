import { gsap } from 'gsap';
import _ from 'lodash';
import config from '../config.yaml';
import RecordRTC from 'recordrtc';
import { SvgInHtml } from '../types';
import { play, playPromise } from '../util/audio';
import { getResponse } from '../util/getResponse';
import { generateUserIdFilename, moveToCenterAnchor, sleep, uploadAudio } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	data.reasoningSlideCounter++;
	const slidePrefix = 'sr1dog1chicken';
	const leftEntity = 'dog';
	const leftEntityOne = 'oneDog';
	const rightEntity = 'chicken';
	const rightEntityOne = 'oneChicken';

	const videoStrings = {
		neutral: `./cultures/${data.culture}/video/pinda-neutral-listening.${data.meta.videoExtension}`,
		text1: `./cultures/${data.culture}/video/s-ex-next-red-textInput.${data.meta.videoExtension}`,
		text2: `./cultures/${data.culture}/video/sr-promp-textInput.${data.meta.videoExtension}`,
		text3: `./cultures/${data.culture}/video/text-input-3.${data.meta.videoExtension}`,
		audio1: `./cultures/${data.culture}/video/prompt-audioInput-start-speaking-buttons.${data.meta.videoExtension}`,
		audio2: `./cultures/${data.culture}/video/sr-prompt-audioInput.${data.meta.videoExtension}`,
		audio3: `./cultures/${data.culture}/video/audio-input-3.${data.meta.videoExtension}`,
		react1: `./cultures/${data.culture}/video/sr-react-1.${data.meta.videoExtension}`,
		react2: `./cultures/${data.culture}/video/sr-react-2.${data.meta.videoExtension}`,
		react3: `./cultures/${data.culture}/video/sr-react-3.${data.meta.videoExtension}`,
	};

	// only prefetch required videos depending on input
	const prefetchedVideos = {
		neutral: '',
		text1: '',
		text2: '',
		text3: '',
		audio1: '',
		audio2: '',
		audio3: '',
		react1: '',
		react2: '',
		react3: '',
	};
	if (!data.pindaNeutralBlob) {
		prefetchedVideos.neutral = videoStrings.neutral;
	}
	if (!data.react1Blob) {
		prefetchedVideos.react1 = videoStrings.react1;
	}
	if (!data.react2Blob) {
		prefetchedVideos.react2 = videoStrings.react2;
	}
	if (!data.react3Blob) {
		prefetchedVideos.react3 = videoStrings.react3;
	}
	if (!data.textIntroBlob && data.input === 'text') {
		prefetchedVideos.text1 = videoStrings.text1;
	}
	if (!data.textIntroBlob2 && data.input === 'text') {
		prefetchedVideos.text2 = videoStrings.text2;
	}
	if (!data.textIntroBlob3 && data.input === 'text') {
		prefetchedVideos.text3 = videoStrings.text3;
	}
	if (!data.audioIntroBlob && data.input === 'audio') {
		prefetchedVideos.audio1 = videoStrings.audio1;
	}
	if (!data.audioIntroBlob2 && data.input === 'audio') {
		prefetchedVideos.audio2 = videoStrings.audio2;
	}
	if (!data.audioIntroBlob3 && data.input === 'audio') {
		prefetchedVideos.audio3 = videoStrings.audio3;
	}
	if (data.input === 'userchoice-audio' || data.input === 'userchoice-text') {
		if (!data.textIntroBlob) {
			prefetchedVideos.text1 = videoStrings.text1;
		}
		if (!data.textIntroBlob2) {
			prefetchedVideos.text2 = videoStrings.text2;
		}
		if (!data.textIntroBlob3) {
			prefetchedVideos.text3 = videoStrings.text3;
		}
		if (!data.audioIntroBlob) {
			prefetchedVideos.audio1 = videoStrings.audio1;
		}
		if (!data.audioIntroBlob2) {
			prefetchedVideos.audio2 = videoStrings.audio2;
		}
		if (!data.audioIntroBlob3) {
			prefetchedVideos.audio3 = videoStrings.audio3;
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
	data.textIntroBlob = data.textIntroBlob || prefetchedVideos.text1;
	data.textIntroBlob2 = data.textIntroBlob2 || prefetchedVideos.text2;
	data.textIntroBlob3 = data.textIntroBlob3 || prefetchedVideos.text3;
	data.audioIntroBlob = data.audioIntroBlob || prefetchedVideos.audio1;
	data.audioIntroBlob2 = data.audioIntroBlob2 || prefetchedVideos.audio2;
	data.audioIntroBlob3 = data.audioIntroBlob3 || prefetchedVideos.audio3;
	data.react1Blob = data.react1Blob || prefetchedVideos.react1;
	data.react2Blob = data.react2Blob || prefetchedVideos.react2;
	data.react3Blob = data.react3Blob || prefetchedVideos.react3;
	// write blobs from data to prefetchedVideos if not already there
	prefetchedVideos.neutral = prefetchedVideos.neutral || data.pindaNeutralBlob;
	prefetchedVideos.text1 = prefetchedVideos.text1 || data.textIntroBlob;
	prefetchedVideos.text2 = prefetchedVideos.text2 || data.textIntroBlob2;
	prefetchedVideos.text3 = prefetchedVideos.text3 || data.textIntroBlob3;
	prefetchedVideos.audio1 = prefetchedVideos.audio1 || data.audioIntroBlob;
	prefetchedVideos.audio2 = prefetchedVideos.audio2 || data.audioIntroBlob2;
	prefetchedVideos.audio3 = prefetchedVideos.audio3 || data.audioIntroBlob3;
	prefetchedVideos.react1 = prefetchedVideos.react1 || data.react1Blob;
	prefetchedVideos.react2 = prefetchedVideos.react2 || data.react2Blob;
	prefetchedVideos.react3 = prefetchedVideos.react3 || data.react3Blob;
	parentBlock.setAttribute('visibility', 'hidden');
	console.log(prefetchedVideos);

	// insert HTML
	{
		// get svg rect element
		const rect = document.getElementById(`${slidePrefix}-wr`)! as SvgInHtml;
		// create new foreignObject
		const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		[...rect.attributes].map(({ name, value }) => fo.setAttribute(name, value));
		fo.removeAttribute('fill');
		rect.replaceWith(fo);
		// create html content
		fo.innerHTML = `
	<div id="wrapper-${slidePrefix}" style="display: none;">
		<div id="toggle-${slidePrefix}" style="width: 9em; margin: 0 auto; margin-bottom: 10px">
				<input id="chck-${slidePrefix}" type="checkbox" />
			<label for="chck-${slidePrefix}" class="check-trail"><span class="check-handler"></span> </label>
		</div>

		<div>
			<textarea
			   rows="3"
				disabled
				id="text-response-${slidePrefix}"
				maxlength="2000"
				style="display: block; pointer-events: auto;"
			></textarea>
			<div id="voice-response-${slidePrefix}" style="display: flex;">
				<button type="button" class="button reasoning" disabled id="voice-response-start-${slidePrefix}"><span>🎤&nbsp;Start</span></button> <button type="button" class="button reasoning" disabled id="voice-response-stop-${slidePrefix}"><span>🛑&nbsp;Stop</span></button>
			</div>
		</div>
	</div>`;
	}

	const headphones = document.getElementById(`link-${slidePrefix}-headphones`) as SvgInHtml;
	const audio = document.getElementById('audio') as HTMLMediaElement;
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	const pindaNeutral = document.getElementById('pinda-neutral') as HTMLVideoElement;
	const nextButton = document.getElementById(`link-${slidePrefix}-next`) as SvgInHtml;
	const left = document.getElementById(`${slidePrefix}-${leftEntityOne}`)! as SvgInHtml;
	const center = document.getElementById(`${slidePrefix}-cantDecide`)! as SvgInHtml;
	const right = document.getElementById(`${slidePrefix}-${rightEntityOne}`)! as SvgInHtml;

	const wrapper = document.getElementById(`wrapper-${slidePrefix}`) as HTMLDivElement;
	const textResponse = document.getElementById(
		`text-response-${slidePrefix}`
	) as HTMLTextAreaElement;
	const voiceResponse = document.getElementById(`voice-response-${slidePrefix}`) as HTMLDivElement;
	const voiceResponseStart = document.getElementById(
		`voice-response-start-${slidePrefix}`
	) as HTMLButtonElement;
	const voiceResponseStop = document.getElementById(
		`voice-response-stop-${slidePrefix}`
	) as HTMLButtonElement;
	const toggle = document.getElementById(`toggle-${slidePrefix}`) as HTMLDivElement;
	const checkLabel = document.querySelector('.check-trail') as HTMLLabelElement;
	const checkBox = document.getElementById(`chck-${slidePrefix}`) as HTMLInputElement;

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

	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------
	// default values
	let wasDog = false;
	let wasCantDecide = false;
	let wasChicken = false;
	// check actual responses from s1Do1Ch and overwrite default values
	if (data.procedure.s1Do1Ch) {
		wasDog = data.procedure.s1Do1Ch.response.toLowerCase().includes(`-one${leftEntity}`);
		wasCantDecide = data.procedure.s1Do1Ch.response.toLowerCase().includes('-cantdecide');
		wasChicken = data.procedure.s1Do1Ch.response.toLowerCase().includes(`-one${rightEntity}`);
		// check if order was swapped, if so swap boxes
		if (data.procedure.s1Do1Ch.swapLeftRight) {
			const left = document.getElementById(`${slidePrefix}-${leftEntityOne}`)! as SvgInHtml;
			const right = document.getElementById(`${slidePrefix}-${rightEntityOne}`)! as SvgInHtml;
			moveToCenterAnchor(left, 1450);
			moveToCenterAnchor(right, 470);
		}
	} else {
		wasDog = false;
		wasCantDecide = true;
		wasChicken = false;
	}

	// add frame around prior selected card
	if (wasDog) {
		left.classList.add('dilemma-card-fix');
	}
	if (wasCantDecide) {
		center.classList.add('dilemma-card-fix');
	}
	if (wasChicken) {
		right.classList.add('dilemma-card-fix');
	}

	swapSlides(currentSlide, previousSlide);

	if (wasDog) {
		if (data?.procedure?.s1Do1Ch?.swapLeftRight) {
			await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-dog-right.mp3`);
		} else {
			await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-dog-left.mp3`);
		}
	} else {
		if (data?.procedure?.s1Do1Ch?.swapLeftRight) {
			await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-dog-right.mp3`);
		} else {
			await playPromise(`./cultures/${data.culture}/audio/${slidePrefix}-dog-left.mp3`);
		}
	}

	if (wasDog) {
		await playPromise(`./cultures/${data.culture}/audio/srw-${leftEntity}.mp3`);
		play(`./cultures/${data.culture}/audio/srw-${leftEntityOne}.mp3`, headphones.id);
	}
	if (wasCantDecide) {
		await playPromise(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`);
		play(`./cultures/${data.culture}/audio/srw-cantDecide.mp3`, headphones.id);
	}
	if (wasChicken) {
		await playPromise(`./cultures/${data.culture}/audio/srw-${rightEntity}.mp3`);
		play(`./cultures/${data.culture}/audio/srw-${rightEntity}.mp3`, headphones.id);
	}

	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------

	// show wrapper
	gsap.set(wrapper, { autoAlpha: 0 });
	wrapper.style.display = 'block';
	gsap.to(wrapper, { autoAlpha: 1 });

	data.procedure[data.currentSlide].voiceExplanation = checkBox.checked;
	data.procedure[data.currentSlide].textExplanation = !checkBox.checked;

	let isPlaying = true;

	pinda.addEventListener('play', () => {
		isPlaying = true;
		textResponse.disabled = true;
		gsap.to(checkLabel, { autoAlpha: 0.5 });
		checkLabel.style.pointerEvents = 'none';
		headphones.style.pointerEvents = 'none';
	});
	pinda.addEventListener('ended', () => {
		isPlaying = false;
		textResponse.disabled = false;
		gsap.to(checkLabel, { autoAlpha: 1 });
		checkLabel.style.pointerEvents = 'visible';
		headphones.style.pointerEvents = 'visible';
	});

	// if userchoice-X landing block pinda videos
	if (checkBox.checked) {
		if (data.reasoningSlideCounter === 1) {
			pinda.src = prefetchedVideos.audio1;
			await gsap
				.timeline()
				.to(voiceResponseStart, {
					filter: 'drop-shadow(0px 0px 15px #000)',
					delay: 9.5,
					repeat: 3,
					yoyo: true,
					reversed: true,
				})
				.to(voiceResponseStop, {
					filter: 'drop-shadow(0px 0px 15px #000)',
					delay: 1.5,
					repeat: 3,
					yoyo: true,
					reversed: true,
				});
		}
		if (data.reasoningSlideCounter === 2) {
			pinda.src = prefetchedVideos.audio2;
		}
		if (data.reasoningSlideCounter === 3) {
			pinda.src = prefetchedVideos.audio3;
		}
	}
	if (!checkBox.checked) {
		if (data.reasoningSlideCounter === 1) {
			pinda.src = prefetchedVideos.text1;
		}
		if (data.reasoningSlideCounter === 2) {
			pinda.src = prefetchedVideos.text2;
		}
		if (data.reasoningSlideCounter === 3) {
			pinda.src = prefetchedVideos.text3;
		}
	}

	while (isPlaying) {
		await sleep(100);
	}

	pindaNeutral.src = prefetchedVideos.neutral!;
	gsap.timeline().to(pinda, { autoAlpha: 0 }).to(pindaNeutral, { autoAlpha: 1 }, '<');

	gsap.to(checkLabel, { autoAlpha: 1 });
	checkLabel.style.pointerEvents = 'visible';
	textResponse.disabled = false;
	voiceResponseStart.disabled = false;

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
				if (data.reasoningSlideCounter === 1) {
					pinda.src = prefetchedVideos.audio1;
					await gsap
						.timeline()
						.to(voiceResponseStart, {
							filter: 'drop-shadow(0px 0px 15px #000)',
							delay: 9.5,
							repeat: 3,
							yoyo: true,
							reversed: true,
						})
						.to(voiceResponseStop, {
							filter: 'drop-shadow(0px 0px 15px #000)',
							delay: 1.5,
							repeat: 3,
							yoyo: true,
							reversed: true,
						});
				}
				if (data.reasoningSlideCounter === 2) {
					pinda.src = prefetchedVideos.audio2;
				}
				if (data.reasoningSlideCounter === 3) {
					pinda.src = prefetchedVideos.audio3;
				}

				while (isPlaying) {
					await sleep(100);
				}

				voiceResponseStart.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'visible';
				headphones.style.pointerEvents = 'visible';

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
				if (data.reasoningSlideCounter === 1) {
					pinda.src = prefetchedVideos.text1;
				}
				if (data.reasoningSlideCounter === 2) {
					pinda.src = prefetchedVideos.text2;
				}
				if (data.reasoningSlideCounter === 3) {
					pinda.src = prefetchedVideos.text3;
				}
				await sleep(500);

				while (isPlaying) {
					await sleep(100);
				}

				textResponse.disabled = false;
				gsap.to(checkLabel, { autoAlpha: 1 });
				checkLabel.style.pointerEvents = 'visible';
				headphones.style.pointerEvents = 'visible';

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

			nextButton.style.pointerEvents = 'visible';
			gsap.timeline().to(nextButton, {
				autoAlpha: 1,
			});

			voiceResponseStart.disabled = false;
			voiceResponseStop.disabled = true;

			checkLabel.style.pointerEvents = 'visible';
			gsap.set(checkLabel, { autoAlpha: 1 });
		});
	});

	// save responses and store to response object
	const response = await getResponse(nextButton.id);
	console.log(response.id);
	data.procedure[data.currentSlide].textInput = textResponse.value;
	console.log(data.procedure[data.currentSlide].textInput);
	data.procedure[data.currentSlide].response = response.id;

	// react to user response
	isPlaying = true;
	await gsap
		.timeline()
		.to('#s-reasoning-1-do-1-ch', { autoAlpha: 0 })
		.to(pindaNeutral, { autoAlpha: 0 });
	if (data.reasoningSlideCounter === 1) {
		pinda.src = prefetchedVideos.react1;
	}
	if (data.reasoningSlideCounter === 2) {
		pinda.src = prefetchedVideos.react2;
	}
	if (data.reasoningSlideCounter === 3) {
		pinda.src = prefetchedVideos.react3;
	}

	while (isPlaying) {
		await sleep(100);
	}
};
