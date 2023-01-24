export const playPromise = (url: string, elementId?: string) => {
	if (elementId) {
		return new Promise(function (resolve, reject) {
			document.getElementById(elementId)!.addEventListener('click', () => {
				const audio = new Audio(); // create audio w/o src
				audio.preload = 'auto'; // intend to play through
				audio.autoplay = true; // autoplay when loaded
				audio.onerror = reject; // on error, reject
				audio.onended = resolve; // when done, resolve
				audio.src = url;
			});
		});
	} else {
		return new Promise(function (resolve, reject) {
			const audio = new Audio(); // create audio w/o src
			audio.preload = 'auto'; // intend to play through
			audio.autoplay = true; // autoplay when loaded
			audio.onerror = reject; // on error, reject
			audio.onended = resolve; // when done, resolve
			audio.src = url;
		});
	}
};

export const play = (url: string, elementId?: string) => {
	const audio = new Audio(url);

	if (elementId) {
		document.getElementById(elementId)!.addEventListener('click', () => {
			// Restart the audio by setting the current time to 0
			audio.currentTime = 0;
			audio.play();
		});
	} else {
		audio.preload = 'auto'; // intend to play through
		audio.autoplay = true; // autoplay when loaded
		audio.src = url;
	}
};
