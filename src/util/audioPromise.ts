export const audioPromise = (url: string, endDelay = 0) => {
	return new Promise(function (resolve, reject) {
		const audio = new Audio(); // create audio w/o src
		audio.preload = 'auto'; // intend to play through
		audio.autoplay = true; // autoplay when loaded
		audio.onerror = reject; // on error, reject
		audio.onended = resolve; // when done, resolve
		audio.src = url;
	});
};
