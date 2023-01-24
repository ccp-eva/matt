import { gsap } from 'gsap';
import { playPromise } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { sleep } from '../util/helpers';

export default async () => {
	data.slideCount++;

	swapSlides('s-moral-circle', 's-introduction');

	const tl = gsap.timeline();

	tl.fromTo('#smc-circle', { opacity: 0 }, { opacity: 1, delay: 2 });

	tl.fromTo('#link-smc-elderly', { opacity: 0 }, { opacity: 1 });
	tl.fromTo('#link-smc-sheep', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-rabbit', { opacity: 0 }, { opacity: 1 }, '<');

	tl.fromTo('#link-smc-chicken', { opacity: 0 }, { opacity: 1 });
	tl.fromTo('#link-smc-dog', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-child', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-cow', { opacity: 0 }, { opacity: 1 }, '<');

	tl.fromTo('#link-smc-pig', { opacity: 0 }, { opacity: 1 });
	tl.fromTo('#link-smc-man', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-goldfish', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-cat', { opacity: 0 }, { opacity: 1 }, '<');
	tl.fromTo('#link-smc-woman', { opacity: 0 }, { opacity: 1 }, '<');

	await playPromise(`./cultures/${data.culture}/audio/s-moral-circle_1.mp3`);
	await sleep(1000);
};

// // get child
// const smcChild = document.getElementById('smc-child')! as SvgInHtml;

// gsap.set(smcChild, { transformOrigin: '50% 50%' });
// // gsap.set(smcChild, { scale: 2 });

// Draggable.create(smcChild);
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
