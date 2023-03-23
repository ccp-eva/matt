import { gsap } from 'gsap';
import { play, playPromise, stop } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
import _ from 'lodash';
import { SvgInHtml } from '../types';

export default async () => {
	// show slide
	swapSlides(_.kebabCase(data.currentSlide));

	const speaker = document.getElementById('link-si-speaker') as SvgInHtml;
	const pinda = document.getElementById('player') as HTMLVideoElement;

	const tl = gsap.timeline();
	const headphones = document.getElementById('link-si-headphones') as SvgInHtml;
	const nextButton = document.getElementById('link-si-next') as SvgInHtml;

	gsap.set([headphones, nextButton], { transformOrigin: '50% 50%', autoAlpha: 0 });

	speaker.addEventListener('click', () => {
		// timeline start
		tl.to(pinda, {
			onStart: () => {
				pinda.src = `./cultures/${data.culture}/video/s-introduction.webm`;
			},
		})
			.to(
				headphones,
				{
					delay: 17,
					duration: 0.5,
					opacity: 1,
					visibility: 'visible',
				},
				'<'
			)
			.to(headphones, {
				filter: 'drop-shadow(0px 0px 14px #c4c4c4)',
				delay: 1,
				repeat: 2,
				yoyo: true,
				reversed: true,
			})
			.to(nextButton, {
				delay: 5,
				opacity: 1,
				visibility: 'visible',
			})
			.to(nextButton, {
				filter: 'drop-shadow(0px 0px 14px #a90707)',
				delay: 1,
				repeat: -1,
				yoyo: true,
				reversed: true,
			})
			.to(pinda, {
				delay: 3,
				autoAlpha: 0,
				onStart: () => {
					play(`./cultures/${data.culture}/audio/si-next-red.mp3`, 'link-si-headphones');
				},
			});
	});

	await getResponse('link-si-next');

	// kill timeline animations
	tl.kill();
};
