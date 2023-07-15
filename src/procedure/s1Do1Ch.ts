import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1dog1chicken',
		'oneDog',
		'oneChicken',
		Math.random() < 0.5
	);
};
