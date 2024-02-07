import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1zm2chicken',
		'oneHuman',
		'twoChicken',
		Math.random() < 0.5
	);
};
