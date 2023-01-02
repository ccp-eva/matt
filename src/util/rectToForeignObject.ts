/**
 * Iterates over DOM for elements that start with an id of "text-".
 * Those elements get replace replaced with a foreignObject element while
 * keeping their original properties.
 *
 * @param parentId - The parent element id as string (defaults to 'svg')
 * @returns All direct children of the parent element
 */
export const rectToForeignObject = () => {
	// get all rect nodes that start with id "text-"
	const foreignObjects = Array.from(document.querySelectorAll('[id^="text-"]'));
	foreignObjects.forEach((e) => {
		const obj = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'foreignObject'
		);
		// copy all attributes from rect to new foreignObject
		[...e.attributes].map(({ name, value }) => obj.setAttribute(name, value));
		e.replaceWith(obj);

		// add default child div element
		obj.appendChild(document.createElement('div'));
	});
};
