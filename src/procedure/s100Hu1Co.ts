import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100h1cow',
		'hundredHumans',
		'oneCow',
		Math.random() < 0.5
	);
};
