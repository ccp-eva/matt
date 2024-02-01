import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1zm10spoons',
		'oneHuman',
		'tenSpoons',
		Math.random() < 0.5
	);
};
