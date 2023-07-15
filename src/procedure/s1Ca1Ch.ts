import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1cat1chicken',
		'oneCat',
		'oneChicken',
		Math.random() < 0.5
	);
};
