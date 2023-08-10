import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1pe10nails',
		'oneHuman',
		'tenNails',
		Math.random() < 0.5
	);
};
