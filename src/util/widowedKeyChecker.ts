import _ from 'lodash';
import { translation } from '../cultures/de-urban/translation';
import Toastify from 'toastify-js';

export const widowedKeyChecker = () => {
	// get all foreignObjects whose ids starts with 'text-'
	const foreignObjectNodeList = document.querySelectorAll(
		'foreignObject[id^="text-"]'
	) as NodeListOf<SVGForeignObjectElement>;

	// remove prefix
	const foreignObjectKeys = [...foreignObjectNodeList].map((e) =>
		e.id.replace('text-', '')
	);

	const translationKeys = Object.keys(translation);

	const widowedTranslationKeys = _.difference(
		translationKeys,
		foreignObjectKeys
	);
	const widowedForeignObjectKeys = _.difference(
		foreignObjectKeys,
		translationKeys
	);
	const widowedKeys = [...widowedTranslationKeys, ...widowedForeignObjectKeys];

	if (widowedKeys.length > 0) {
		Toastify({
			text: `⚮ Found widowed translation/fo keys: ${widowedKeys.length}. Check console!`,
			duration: 5000,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-info',
		}).showToast();
	}

	if (widowedTranslationKeys.length > 0) {
		console.error(
			"You are using translation ids (keys) that don't have a matching counterpart in the SVG!",
			'Present translation ids without matching SVG ids:',
			widowedTranslationKeys
		);
	}

	if (widowedForeignObjectKeys.length > 0) {
		console.error(
			"You are using SVG ids that don't have a matching translation id!",
			'Present SVG ids without matching translation ids:',
			widowedForeignObjectKeys
		);
	}

	const textKeys = _.intersection(translationKeys, foreignObjectKeys);
	console.log(
		'Following keys are present in both translation file and SVG composition and can be used for text elements:',
		textKeys
	);

	return _.intersection(translationKeys, foreignObjectKeys);
};
