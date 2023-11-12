import { gsap } from 'gsap';
import { swapSlides } from '../util/slideVisibility';
import { exitFullscreen, sleep } from '../util/helpers';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);
	exitFullscreen();
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	pinda.src = `./cultures/${data.culture}/video/s-end.${data.meta.videoExtension}`;

	pinda.addEventListener('ended', () => {
		gsap.to(pinda, { autoAlpha: 0, duration: 3 });

		// for german setting, forward to goodbye.html with coupon
		// use existing data if available, else use form data
		const culture = new URL(document.location.href).searchParams.get('culture');
		// maybe test culture makes no sense, as default is de-urban? default id = demo
		console.log(culture);
		if (culture === 'de-urban') {
			const id = new URL(document.location.href).searchParams.get('id') || 'testID';
			console.log(id);
			const coupon = new URL(document.location.href).searchParams.get('coupon') || 'testCoupon';
			console.log(coupon);
			window.location.href = `${window.location.href}goodbye.html?id=${id}&culture=${culture}&coupon=${coupon}`;
		}
	});
};
