import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's2zm1dog',
		'twoHumans',
		'oneDog',
		Math.random() < 0.5
	);
};
