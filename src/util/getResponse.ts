export const getResponse = (id?: string) => {
	return new Promise<MouseEvent | TouchEvent>((resolve) => {
		const handleResponse = (event: MouseEvent | TouchEvent) => {
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
