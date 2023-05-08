import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(currentSlide, previousSlide, 's1h2cows', 'oneHuman', 'twoCows', false);
};
