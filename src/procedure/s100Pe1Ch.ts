import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100pe1chicken',
		'hundredHumans',
		'oneChicken',
		Math.random() < 0.5
	);
};
