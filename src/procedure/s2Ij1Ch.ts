import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's2ij1chicken',
		'twoHumans',
		'oneChicken',
		Math.random() < 0.5
	);
};
