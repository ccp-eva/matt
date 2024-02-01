import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1zdog1zchicken',
		'oneDog',
		'oneChicken',
		Math.random() < 0.5
	);
};
