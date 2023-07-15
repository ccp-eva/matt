import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1nm1duiker',
		'oneHuman',
		'oneDuiker',
		Math.random() < 0.5
	);
};
