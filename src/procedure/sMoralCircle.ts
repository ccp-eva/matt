import { gsap } from 'gsap';
import { play, playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import siWelcome from '../cultures/deUrban/audio/si-welcome_1.mp3';
import siHeadphones from '../cultures/deUrban/audio/si-headphones_1.mp3';
import siNextRed from '../cultures/deUrban/audio/si-next-red_1.mp3';
import { getResponse } from '../util/getResponse';
import { SvgInHtml } from '../types';

swapSlides('s-moral-circle', 's-introduction');

// get child
const smcChild = document.getElementById('smc-child')! as SvgInHtml;

gsap.set(smcChild, { transformOrigin: '50% 50%' });
// gsap.set(smcChild, { scale: 2 });

Draggable.create(smcChild);
// // --------------------- humans ---------------------

// swapSlides(['s-humans'], ['s-moral-circle']);

// // await playPromise(sIntroductionAudioPath);

// // todo make human animation

// gsap.set('#sh-woman', { opacity: 0 });
// gsap.set('#sh-child', { opacity: 0 });
// gsap.set('#sh-elderly', { opacity: 0 });
// gsap.set('#sh-man', { opacity: 0 });

// const tl2 = gsap.timeline();
// tl2.to('#sh-woman', {
// 	delay: 2,
// 	opacity: 1,
// });
// tl2.to(
// 	'#sh-child',
// 	{
// 		opacity: 1,
// 	},
// 	'<'
// );
// tl2.to(
// 	'#sh-elderly',
// 	{
// 		opacity: 1,
// 	},
// 	'<'
// );
// tl2.to(
// 	'#sh-man',
// 	{
// 		opacity: 1,
// 	},
// 	'<'
// );
