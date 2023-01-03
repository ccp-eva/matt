import _ from 'lodash';

// promised based timeout
export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const getUrlParameters = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const params: { [key: string]: string } = {};
	for (const [key, value] of urlParams) {
		params[key] = _.camelCase(value);
	}
	return params;
};
