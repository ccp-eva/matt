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
		`./cultures/${data.culture}/video/s-outro-animals-mc-intro.${data.meta.videoExtension}`
	);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	const pinda = document.getElementById('pinda') as HTMLVideoElement;

	pinda.src = url;
	const cultureDelay = {
		fadeIn: {
			'de-urban': 3.5,
			'pe-rural': 3.5,
			'idj-urban': 3.5,
		},
		highlightInner: {
			'de-urban': 11,
			'pe-rural': 12,
			'idj-urban': 20,
		},
		highlightMiddle: {
			'de-urban': 3,
			'pe-rural': 4,
			'idj-urban': 4.5,
		},
		highlightOuter: {
			'de-urban': 1.5,
			'pe-rural': 3,
			'idj-urban': 4,
		},
	};
	await gsap
		.timeline()
		.to([inner, middle, outer], {
			autoAlpha: 0.5,
			delay: cultureDelay.fadeIn[data.culture],
		})
		.to(inner, {
			autoAlpha: 1,
			delay: cultureDelay.highlightInner[data.culture],
			repeat: 2,
		})
		.to(inner, {
			autoAlpha: 0.5,
		})
		.to(middle, {
			autoAlpha: 1,
			delay: cultureDelay.highlightMiddle[data.culture],
			repeat: 2,
		})
		.to(middle, {
			autoAlpha: 0.5,
		})
		.to(outer, {
			autoAlpha: 1,
			delay: cultureDelay.highlightOuter[data.culture],
			repeat: 2,
			reversed: true,
		})
		.to(outer, {
			autoAlpha: 0.5,
		});
};
