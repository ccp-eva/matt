import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async () => {
	data.slideCount++;

	data.procedure.mcIntro = { completed: false };

	// circles
	const inner = document.getElementById('smci-inner')! as SvgInHtml;
	const middle = document.getElementById('smci-middle')! as SvgInHtml;
	const outer = document.getElementById('smci-outer')! as SvgInHtml;
	gsap.set([inner, middle, outer], { autoAlpha: 0.5 });

	const pinda = document.getElementById('player') as HTMLVideoElement;
	gsap.set(pinda, { autoAlpha: 0 });
	const timeline = gsap.timeline();
	timeline.to(pinda, {
		autoAlpha: 1,
		duration: 1,
		onStart: () => {
			pinda.src = `./cultures/${data.culture}/video/s-transition-3-mc-intro.webm`;
		},
	});

	await sleep(1500);

	swapSlides('s-mc-intro', 's-goldfish', [3, 1]);

	// gsap flash animation for smci-inner id
	timeline
		.to(inner, {
			delay: 14,
			autoAlpha: 1,
		})
		.to(middle, {
			delay: 4,
			autoAlpha: 1,
		})
		.to(outer, {
			delay: 3.5,
			autoAlpha: 1,
		})
		.to(pinda, {
			delay: 2,
			autoAlpha: 0,
			duration: 2,
			onComplete: () => {
				data.procedure.mcIntro.completed = true;
			},
		});

	while (!data.procedure.mcIntro.completed) {
		await sleep(500);
	}

	await sleep(2000);
};
