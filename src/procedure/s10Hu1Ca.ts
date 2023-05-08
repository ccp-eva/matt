import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's10h1cat',
		'tenHumans',
		'oneCat',
		Math.random() < 0.5
	);
};
