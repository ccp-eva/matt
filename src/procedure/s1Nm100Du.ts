import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1nm100duikers',
		'oneHuman',
		'hundredDuikers',
		Math.random() < 0.5
	);
};
