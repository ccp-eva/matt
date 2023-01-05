import config from '../config.yaml';
import _ from 'lodash';

// promised based timeout
export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const getUrlParameters = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const params: { [key: string]: string } = {};
	for (const [key, value] of urlParams) {
		params[key] = _.camelCase(value);
	}

	// if no culture is set, use default culture
	if (!params.culture) {
		params.culture = config.globals.defaultCulture;
	}
	// if no id is set, use default id
	if (!params.id) {
		params.id = config.globals.defaultSubjectId;
	}

	return params;
};
