import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(
		currentSlide,
		previousSlide,
		's1nm10duikers',
		'oneHuman',
		'tenDuikers',
		Math.random() < 0.5
	);
};