import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's100nm1duiker',
		'hundredHumans',
		'oneDuiker',
		Math.random() < 0.5
	);
};
