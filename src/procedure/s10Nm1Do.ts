import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's10nm1dog',
		'tenHumans',
		'oneDog',
		Math.random() < 0.5
	);
};
