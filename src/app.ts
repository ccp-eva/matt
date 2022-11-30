import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
import './css/app.css';
import './css/style.css';
import { SvgInHtml } from './types';
import { init } from './util/init';
import { hideFirstChildSlides, swapSlides } from './util/slideVisibility';
import { translation } from './populations/de-de/translation';

// import SVG & apply initial settings
init();

hideFirstChildSlides('svg');
swapSlides(['s-introduction'], []);

document.getElementById('si-next')!.addEventListener('click', () => {
	swapSlides(['s-moral-circle'], ['s-introduction']);
});

// get child
const smcChild = document.getElementById('smc-child')! as SvgInHtml;

gsap.set(smcChild, { transformOrigin: '50% 50%' });
// gsap.set(smcChild, { scale: 2 });

Draggable.create(smcChild);

const replace = document.getElementById('text-welcome')!
	.children[0] as HTMLElement;
replace.innerHTML = translation.welcome;
