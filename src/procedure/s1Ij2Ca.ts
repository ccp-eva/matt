import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1ij2cats',
		'oneHuman',
		'twoCats',
		Math.random() < 0.5
	);
};
