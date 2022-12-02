export const getResponse = () => {
	return new Promise<MouseEvent | TouchEvent>((resolve) => {
		const handleResponse = (event: MouseEvent | TouchEvent) => {
			return resolve(event);
		};

		document
			.getElementById('wrapper')!
			.addEventListener('click', handleResponse, { once: true });
	});
};
