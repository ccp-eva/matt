import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1pe10sponges',
		'oneHuman',
		'tenSponges',
		Math.random() < 0.5
	);
};
