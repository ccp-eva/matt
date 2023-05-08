import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1h1cat',
		'oneHuman',
		'oneCat',
		Math.random() < 0.5
	);
};
