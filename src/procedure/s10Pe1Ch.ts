import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's10pe1chicken',
		'tenHumans',
		'oneChicken',
		Math.random() < 0.5
	);
};