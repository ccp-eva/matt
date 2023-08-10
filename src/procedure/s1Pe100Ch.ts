import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1pe100chicken',
		'oneHuman',
		'hundredChicken',
		Math.random() < 0.5
	);
};
