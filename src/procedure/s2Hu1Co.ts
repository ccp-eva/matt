import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(currentSlide, previousSlide, 's2h1cow', 'twoHumans', 'oneCow', false);
};
