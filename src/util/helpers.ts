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
