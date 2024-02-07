import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1zm10stones',
		'oneHuman',
		'tenStones',
		Math.random() < 0.5
	);
};
