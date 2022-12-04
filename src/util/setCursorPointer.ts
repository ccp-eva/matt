import config from '../config.yaml';

export const setCurorPointer = () => {
	config.pointerObjects.forEach((e: string) => {
		const element = document.getElementById(e)!;
		element.style.cursor = 'pointer';
	});
};
