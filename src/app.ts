import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import './css/app.css';
import './css/style.css';
import { SvgInHtml } from './types';
import { init } from './util/init';
import { swapSlides } from './util/slideVisibility';
import _ from 'lodash';
import { getResponse } from './util/getResponse';
import siWelcome from './cultures/de-urban/audio/si-welcome_1.mp3';
import siHeadphones from './cultures/de-urban/audio/si-headphones_1.mp3';
import siNextRed from './cultures/de-urban/audio/si-next-red_1.mp3';
import { playPromise, play } from './util/audio';
import { procedure } from './procedure/procedure';

// import SVG & apply initial settings
init();

// run culture-specific procedure
procedure();

// --------------------- slides ---------------------
// show first slide
swapSlides(['s-introduction']);

const tl = gsap.timeline();
const nextButton = document.getElementById('link-si-next')!;
gsap.set(nextButton, {
	transformOrigin: '50% 50%',
	opacity: 0,
	visibility: 'hidden',
});

tl.to(nextButton, {
	delay: 8,
	duration: 0.5,
	opacity: 1,
	visibility: 'visible',
});
tl.to(nextButton, {
	filter: 'drop-shadow(0px 0px 14px #a90707)',
	delay: 1,
	repeat: -1,
	yoyo: true,
	reversed: true,
});

await playPromise(siWelcome);
await playPromise(siHeadphones);
await playPromise(siNextRed);

play(siNextRed, 'link-si-headphones');

const resp = await getResponse('link-si-next', true);

swapSlides(['s-moral-circle'], ['s-introduction']);

await playPromise(siWelcome);

// document.getElementById('si-next')!.addEventListener('click', () => {
// 	swapSlides(['s-moral-circle'], ['s-introduction']);
// });

// get child
const smcChild = document.getElementById('smc-child')! as SvgInHtml;

gsap.set(smcChild, { transformOrigin: '50% 50%' });
// gsap.set(smcChild, { scale: 2 });

Draggable.create(smcChild);
// // --------------------- humans ---------------------

swapSlides(['s-humans'], ['s-moral-circle']);

// await playPromise(sIntroductionAudioPath);

// todo make human animation

gsap.set('#sh-woman', { opacity: 0 });
gsap.set('#sh-child', { opacity: 0 });
gsap.set('#sh-elderly', { opacity: 0 });
gsap.set('#sh-man', { opacity: 0 });

const tl2 = gsap.timeline();
tl2.to('#sh-woman', {
	delay: 2,
	opacity: 1,
});
tl2.to(
	'#sh-child',
	{
		opacity: 1,
	},
	'<'
);
tl2.to(
	'#sh-elderly',
	{
		opacity: 1,
	},
	'<'
);
tl2.to(
	'#sh-man',
	{
		opacity: 1,
	},
	'<'
);
