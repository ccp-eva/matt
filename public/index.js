// check if URL Params already exist and store them
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

let id = '';
let culture = '';
let agegroup = '';
let input = '';
let datatransfer = '';

if (params.has('id')) {
	id = params.get('id');
}
if (params.has('culture')) {
	culture = params.get('culture');
}
if (params.has('agegroup')) {
	agegroup = params.get('agegroup');
}
if (params.has('input')) {
	input = params.get('input');
}
if (params.has('datatransfer')) {
	datatransfer = params.get('datatransfer');
}

// remove all params from URL
window.history.pushState({}, document.title, window.location.pathname);

// hide form fields for form data where URL params already existed
if (id) {
	const idElement = document.getElementById('input-id');
	idElement.required = false;
	idElement.parentNode.style.display = 'none';
}
if (culture) {
	const cultureElement = document.getElementById('input-culture');
	cultureElement.required = false;
	cultureElement.parentNode.style.display = 'none';
}
if (agegroup) {
	const agegroupElement = document.getElementById('input-agegroup');
	agegroupElement.required = false;
	agegroupElement.parentNode.style.display = 'none';
}
if (input) {
	const inputElement = document.getElementById('input-response');
	inputElement.required = false;
	inputElement.parentNode.style.display = 'none';
}
if (datatransfer) {
	const datatransferElement = document.getElementById('input-datatransfer');
	datatransferElement.required = false;
	datatransferElement.parentElement.style.display = 'none';
}

// handle submit button
document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();

	// use existing data if available, else use form data
	id = id ? id : document.getElementById('input-id').value;
	culture = culture ? culture : document.getElementById('input-culture').value;
	agegroup = agegroup ? agegroup : document.getElementById('input-agegroup').value;
	let inputIndex = '';
	if (!input) {
		inputIndex = document.getElementById('input-response').selectedIndex;
	}
	let datatransferIndex = '';
	if (!datatransfer) {
		datatransferIndex = document.getElementById('input-datatransfer').selectedIndex;
	}

	// mapping for input and datatransfer
	// key value lookup
	const inputMapping = new Map()
		.set(0, 'userchoice-audio')
		.set(1, 'userchoice-text')
		.set(2, 'audio')
		.set(3, 'text');

	const datatransferMapping = new Map().set(0, 'server').set(1, 'local').set(2, 'both');

	input = input ? input : inputMapping.get(inputIndex);
	datatransfer = datatransfer ? datatransfer : datatransferMapping.get(datatransferIndex);

	window.location.href = `${window.location.href}app.html?id=${id}&culture=${culture}&agegroup=${agegroup}&input=${input}&datatransfer=${datatransfer}`;
});
