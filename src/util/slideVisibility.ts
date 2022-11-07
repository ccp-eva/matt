type SvgInHtml = HTMLElement & SVGElement;

/**
 * Receives a parent id as string and returns all child ids as string[]
 *
 * @param parentId - The parent element id as string
 * @returns All direct children of the parent element
 */
export const getChildrenFromParent = (parentId: string) => {
	const parent = document.getElementById(parentId) as SvgInHtml;
	const childrenArray = [...parent.children];
	const childIds = childrenArray.map((e) => e.id);
	return childIds;
};

/**
 * Hides all direct children slides from a given parent id as string
 *
 * @param parentId - The parent element id as string
 * @returns void
 */
export const hideAllSlides = (parentId: string) => {
	const children = getChildrenFromParent(parentId);
	children.forEach((child) => {
		document.getElementById(child)!.setAttribute('visibility', 'hidden');
	});
};

/**
 * Receives a single slide id as string, and hides all other sibling slides
 *
 * @param slideId - The slide you want to be displayed
 * @returns void
 */
export const showSingleSlide = (slideId: string) => {
	hideAllSlides('svg'); // todo make this dynamic?
	const allSlides = getChildrenFromParent('svg'); // todo make this dynamic?
	document.getElementById(slideId)!.setAttribute('visibility', 'visible');
};

/**
 * Shows the all slideIds[] from first parameter and hides all slideIds[] from second
 *
 * @param visibleSlides - id[] of slides you want to be displayed
 * @param hiddenSlides - id[] of slides you want to be hidden
 * @returns void
 */
export const swapSlides = (
	visibleSlides?: string[],
	hiddenSlides?: string[]
) => {
	visibleSlides = visibleSlides ?? undefined;
	hiddenSlides = hiddenSlides ?? undefined;
	if (visibleSlides) {
		const visibleSlideElements = visibleSlides.forEach((e) => {
			document.getElementById(e)!.setAttribute('visibility', 'visible');
		});
	}
	if (hiddenSlides) {
		const hiddenSlideElements = hiddenSlides.forEach((e) => {
			document.getElementById(e)!.setAttribute('visibility', 'hidden');
		});
	}
};
