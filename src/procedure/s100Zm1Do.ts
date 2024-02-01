import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100zm1dog',
		'hundredHumans',
		'oneDog',
		Math.random() < 0.5
	);
};
