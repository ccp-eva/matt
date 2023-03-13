export const playPromise = (url: string, elementId?: string) => {
	const audio = document.getElementById('audio') as HTMLAudioElement;

	return new Promise(function (resolve, reject) {
		if (elementId) {
			document.getElementById(elementId)!.addEventListener('click', () => {
				audio.autoplay = true;
				audio.setAttribute('src', url);
				audio.onerror = reject;
				audio.onended = resolve;
			});
		} else {
			audio.autoplay = true;
			audio.setAttribute('src', url);
			audio.onerror = reject;
			audio.onended = resolve;
		}
	});
};

export const play = (url: string, elementId?: string, once = false) => {
	const audio = document.getElementById('audio') as HTMLAudioElement;

	if (elementId) {
		document.getElementById(elementId)!.addEventListener(
			'click',
			() => {
				audio.autoplay = true;
				// Restart the audio by setting the current time to 0
				audio.currentTime = 0;
				audio.setAttribute('src', url);
				audio.play();
			},
			{ once }
		);
	} else {
		audio.autoplay = true; // autoplay when loaded
		audio.setAttribute('src', url);
	}
};

export const stop = () => {
	const audio = document.getElementById('audio') as HTMLAudioElement;
	audio.pause();
	audio.currentTime = 0;
};

// get duration of audio file
export const getDuration = (url: string): Promise<number> =>
	new Promise((resolve) => {
		const audio = document.createElement('audio');
		audio.setAttribute('src', url);
		audio.addEventListener('loadedmetadata', function () {
			resolve(audio.duration);
		});
	});
