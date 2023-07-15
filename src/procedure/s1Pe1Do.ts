import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1pe1dog',
		'oneHuman',
		'oneDog',
		Math.random() < 0.5
	);
};
