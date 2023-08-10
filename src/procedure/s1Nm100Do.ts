import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1nm100dogs',
		'oneHuman',
		'hundredDogs',
		Math.random() < 0.5
	);
};
