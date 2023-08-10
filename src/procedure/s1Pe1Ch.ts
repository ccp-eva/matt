import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1pe1chicken',
		'oneHuman',
		'oneChicken',
		Math.random() < 0.5
	);
};
