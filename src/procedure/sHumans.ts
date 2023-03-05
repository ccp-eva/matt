import { gsap } from 'gsap';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-humans', 's-introduction');
	data.procedure.humans = { completed: false };

	const pinda = document.getElementById('player') as HTMLVideoElement;
	pinda.style.display = 'block';

	const woman = document.getElementById('link-sh-woman');
	const child = document.getElementById('link-sh-child');
	const elderly = document.getElementById('link-sh-elderly');
	const man = document.getElementById('link-sh-man');

	// initially hide
	gsap.set([woman, child, elderly, man], {
		autoAlpha: 0,
	});

	gsap
		.timeline()
		.to(pinda, {
			autoAlpha: 1,
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-transition-1-humans-2.webm`;
			},
		})
		.to([woman, child, elderly, man], { autoAlpha: 1, duration: 1, delay: 10 })
		.to([woman, child, elderly, man], { autoAlpha: 0, delay: 5 })

		.to(pinda, {
			autoAlpha: 0,
			delay: 5,
			onComplete: () => {
				data.procedure.humans.completed = true;
			},
		});

	while (!data.procedure.humans.completed) {
		await sleep(500);
	}
};
