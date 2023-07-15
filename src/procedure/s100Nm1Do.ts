import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100nm1dog',
		'hundredHumans',
		'oneDog',
		Math.random() < 0.5
	);
};
