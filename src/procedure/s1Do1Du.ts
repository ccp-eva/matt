import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1dog1duiker',
		'oneDog',
		'oneDuiker',
		Math.random() < 0.5
	);
};
