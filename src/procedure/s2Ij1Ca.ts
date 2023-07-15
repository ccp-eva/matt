import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's2ij1cat',
		'twoHumans',
		'oneCat',
		Math.random() < 0.5
	);
};
