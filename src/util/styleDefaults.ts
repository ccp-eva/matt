import config from '../config.yaml';
import { gsap } from 'gsap';

export const setMousePointer = () => {
	config.css.mousePointerObjects.forEach((e: string) => {
		const element = document.getElementById(e)!;
		element.style.cursor = 'pointer';
	});
};

export const setScaleOnHover = () => {
	config.css.scaleOnHoverObjects.forEach((e: string) => {
		const element = document.getElementById(e)!;
		gsap.set(element, { transformOrigin: '50% 50%' });
		let tween = gsap.to(element, {
			scale: 1.2,
			ease: 'none',
			paused: true,
		});

		element.addEventListener('mouseenter', () => {
			gsap.to(tween, {
				duration: 1.3,
				time: tween.duration(),
				ease: 'elastic.out(0.8, 0.3)',
			});
		});
		element.addEventListener('mouseleave', () => {
			gsap.to(tween, { duration: 0.1, time: 0, ease: 'none', overwrite: true });
		});
	});
};
