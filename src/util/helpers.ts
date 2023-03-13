import config from '../config.yaml';

// promised based timeout
export const sleep = (ms = 2000) => new Promise<number>((r) => setTimeout(r, ms));

export const getUrlParameters = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const params: { [key: string]: string } = {};
	for (const [key, value] of urlParams) {
		params[key] = value;
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
