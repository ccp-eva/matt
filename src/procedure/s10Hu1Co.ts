import { sDilemmaCodeRunner } from './sDilemmaCodeRunner';

export default async ({ currentSlide, previousSlide }) => {
	await sDilemmaCodeRunner(currentSlide, previousSlide, 's10h1cow', 'tenHumans', 'oneCow', false);
};
