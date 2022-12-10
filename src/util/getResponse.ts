export const getResponse = (id?: string, hide = false) => {
	return new Promise<MouseEvent | TouchEvent>((resolve) => {
		const handleResponse = (event: MouseEvent | TouchEvent) => {
			if (id && hide) {
				document.getElementById(id)!.setAttribute('visibility', 'hidden');
				// following line is required since gsap is setting inline styles
				document.getElementById(id)!.style.visibility = 'hidden';
			}
			return resolve(event);
		};

		if (id) {
			document
				.getElementById(id)!
				.addEventListener('click', handleResponse, { once: true });
		} else {
			document
				.getElementById('wrapper')!
				.addEventListener('click', handleResponse, { once: true });
		}
	});
};
