import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's10nm1duiker',
		'tenHumans',
		'oneDuiker',
		Math.random() < 0.5
	);
};
