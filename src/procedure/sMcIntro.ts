import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import { sleep } from '../util/helpers';
import { swapSlides } from '../util/slideVisibility';

export default async ({ currentSlide, previousSlide }) => {
	swapSlides(currentSlide, previousSlide);

	// circles
	const inner = document.getElementById('smci-inner')! as SvgInHtml;
	const middle = document.getElementById('smci-middle')! as SvgInHtml;
	const outer = document.getElementById('smci-outer')! as SvgInHtml;
	gsap.set([inner, middle, outer], { autoAlpha: 0 });

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(
		`./cultures/${data.culture}/video/s-outro-animals-mc-intro.webm`
	);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	const pinda = document.getElementById('pinda') as HTMLVideoElement;

	pinda.src = url;
	data.procedure.sMcIntro.completed = false;
	gsap
		.timeline()
		.to([inner, middle, outer], {
			autoAlpha: 0.5,
			delay: 3.5,
		})
		.to(inner, {
			delay: 11,
			autoAlpha: 1,
			repeat: 2,
		})
		.to(inner, {
			autoAlpha: 0.5,
		})
		.to(middle, {
			delay: 3,
			autoAlpha: 1,
			repeat: 2,
		})
		.to(middle, {
			autoAlpha: 0.5,
		})
		.to(outer, {
			delay: 1.5,
			autoAlpha: 1,
			repeat: 2,
			reversed: true,
		})
		.to(outer, {
			autoAlpha: 0.5,
			onComplete: () => {
				data.procedure.sMcIntro.completed = true;
			},
		});

	while (!data.procedure.sMcIntro.completed) {
		await sleep(100);
	}
};
