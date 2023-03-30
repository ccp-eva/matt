import { SvgInHtml } from '../types';

// promised based timeout
export const sleep = (ms = 2000) => new Promise<number>((r) => setTimeout(r, ms));

export const moveToCenterAnchor = (svg: SvgInHtml, x: number, y: number) => {
	// Get the bounding box of the svg
	const bbox = svg.getBBox();

	// Calculate the center coordinates
	const cx = bbox.x + bbox.width / 2;
	const cy = bbox.y + bbox.height / 2;

	// Translate the SVG to the new position
	svg.setAttribute('transform', `translate(${x - cx}, ${y - cy})`);
};

export const startFullscreen = () => {
	const elem = document.documentElement as HTMLElement & {
		mozRequestFullScreen(): Promise<void>;
		webkitRequestFullscreen(): Promise<void>;
		msRequestFullscreen(): Promise<void>;
	};
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
};

export const exitFullscreen = () => {
	const elem = document as Document & {
		mozCancelFullScreen(): Promise<void>;
		webkitExitFullscreen(): Promise<void>;
		msExitFullscreen(): Promise<void>;
	};
	if (elem.exitFullscreen) {
		elem.exitFullscreen();
	} else if (elem.mozCancelFullScreen) {
		/* Firefox */
		elem.mozCancelFullScreen();
	} else if (elem.webkitExitFullscreen) {
		/* Chrome, Safari and Opera */
		elem.webkitExitFullscreen();
	} else if (elem.msExitFullscreen) {
		/* IE/Edge */
		elem.msExitFullscreen();
	}
};

export const downloadData = () => {
	// download data as JSON from global data object
	const blob = new Blob([JSON.stringify(data, null, 2)]);
	const day = new Date().toISOString().slice(0, 10);
	const time = new Date().toISOString().slice(11, 19).split(':').join('-');

	const hiddenElement = document.createElement('a');
	hiddenElement.href = window.URL.createObjectURL(blob);
	hiddenElement.download = `matt-${data.id}-${day}-${time}.json`;
	hiddenElement.click();
};
