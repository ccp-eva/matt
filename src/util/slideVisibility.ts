import { SvgInHtml } from '../types';

/**
 * Removes display="none" from all DOM elements
 */
export const removeDisplayNone = () => {
	document.querySelectorAll('[display="none"]').forEach((e) => {
		e.removeAttribute('display');
	});
};

/**
 * Receives a parent id as string and returns all child ids as string[]
 *
 * @param parentId - The parent element id as string (defaults to 'svg')
 * @returns All direct children of the parent element
 */
export const getChildrenFromParent = (parentId = 'svg') => {
	const parent = document.getElementById(parentId) as SvgInHtml;
	const childrenArray = [...parent.children];
	const childIds = childrenArray.map((e) => e.id);
	return childIds;
};

/**
 * Hides all direct children from a given parent id as string (defaults to 'svg').
 * Those are usually groups of you slides. Note that this function
 * only targets group elements `<g>`.
 *
 * @remarks
 * SVG’s `g` node can also be set to hidden (i.e., `visibility="hidden"`).
 *
 * @param parentId The parent element id as string
 * @returns void
 */
export const hideFirstChildSlides = (parentId = 'svg') => {
	const children = getChildrenFromParent(parentId);
	children.forEach((child) => {
		document.getElementById(child)!.setAttribute('visibility', 'hidden');
	});
};

/**
 * Hides all(!) subsequent children from a given parent id as string (defaults to 'svg').
 * Note that this function only targets group elements `<g>`.
 * The parent element itself is not hidden.
 *
 * @see {@link hideFirstChildSlides}
 *
 * @param parentId The parent element id as string
 * @returns void
 */
export const hideAllChildSlides = (parentId = 'svg') => {
	const gNodes = document.querySelectorAll('g') as NodeListOf<SVGGElement>;
	// drop the first element, which is the parent 'svg' element
	const gChildNodes = [...gNodes].slice(1, gNodes.length);
	gChildNodes.forEach((child: SVGGElement) => {
		child.setAttribute('visibility', 'hidden');
	});
};

/**
 * Receives a single slide id as string, and hides all other sibling slides
 *
 * @param slideId - The slide you want to be displayed
 * @returns void
 */
export const showSingleSlide = (slideId: string) => {
	hideFirstChildSlides();
	const allSlides = getChildrenFromParent();
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
