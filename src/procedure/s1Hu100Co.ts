import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1h100cows',
		'oneHuman',
		'hundredCows',
		Math.random() < 0.5
	);
};
