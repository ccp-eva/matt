import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100ij1cat',
		'hundredHumans',
		'oneCat',
		Math.random() < 0.5
	);
};