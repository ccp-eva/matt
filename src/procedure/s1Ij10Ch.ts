import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1ij10chicken',
		'oneHuman',
		'tenChicken',
		Math.random() < 0.5
	);
};
