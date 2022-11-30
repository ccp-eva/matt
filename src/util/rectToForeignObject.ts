export const rectToForeignObject = () => {
	// get all rect nodes that start with id "text-""
	const foreignObjects = Array.from(document.querySelectorAll('[id^="text-"]'));
	foreignObjects.forEach((e) => {
		const obj = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'foreignObject'
		);
		// copy all attributes from rect to new foreignObject
		[...e.attributes].map(({ name, value }) => obj.setAttribute(name, value));
		e.replaceWith(obj);

		// add default child p element
		obj.appendChild(document.createElement('div'));
	});
};
