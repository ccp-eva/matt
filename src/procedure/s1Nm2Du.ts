import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1nm2duikers',
		'oneHuman',
		'twoDuikers',
		Math.random() < 0.5
	);
};
