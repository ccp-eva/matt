import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1h2cats',
		'oneHuman',
		'twoCats',
		Math.random() < 0.5
	);
};
