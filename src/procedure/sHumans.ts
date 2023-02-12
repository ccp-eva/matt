import { gsap } from 'gsap';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';
import pinda from '../cultures/deUrban/video/s-transition-1-humans-2.webm';

export default async () => {
	data.slideCount++;

	// show first slide
	swapSlides('s-humans', 's-introduction');
	data.procedure.humans = { completed: false };

	const player = document.getElementById('player') as HTMLVideoElement;
	player.style.display = 'block';
	player.src = pinda;

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
		.to([woman, child, elderly, man], { autoAlpha: 1, duration: 1, delay: 10 })
		.to([woman, child, elderly, man], { autoAlpha: 0, delay: 5 })
		.to(player, {
			autoAlpha: 0,
			delay: 5,
			onComplete: () => {
				data.procedure.humans.completed = true;
			},
		});

	while (!data.procedure.humans.completed) {
		console.log(data.procedure.humans.completed);
		await sleep(500);
	}
};
