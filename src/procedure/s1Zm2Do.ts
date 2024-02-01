import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1zm2dogs',
		'oneHuman',
		'twoDogs',
		Math.random() < 0.5
	);
};
