const supportedLanguages = ['de', 'en', 'es'];
const languageIds = [
	'heading',
	'mpi',
	'idLabel',
	'culture',
	'birthday',
	'gender',
	'female',
	'male',
	'diverse',
	'responseFormat',
	'audioPrio',
	'textPrio',
	'audioInput',
	'textInput',
	'microphone',
	'dataTransfer',
	'consentHeading',
	'adultConsent',
	'consentID',
	'consentYes',
	'imprint',
	'dataProtection',
];

const translations = {
	heading: {
		de: `Einstellung zu Tieren`,
		en: `Attitudes towards Animals`,
		es: ``,
	},
	mpi: {
		de: `Max-Planck-Institut für evolutionäre Anthropologie`,
		en: `Max Planck Institute for Evolutionary Anthropology`,
		es: `Max Planck Institute for Evolutionary Anthropology`,
	},
	idLabel: {
		de: `Vor- und Nachname oder ID`,
		en: `Name and Surname or ID`,
		es: ``,
	},
	culture: {
		de: `Kultur`,
		en: `Culture`,
		es: ``,
	},
	birthday: {
		de: `Geburtstag`,
		en: `Birthday`,
		es: ``,
	},
	gender: {
		de: `Geschlecht`,
		en: `Gender`,
		es: ``,
	},
	female: {
		de: `weiblich`,
		en: `female`,
		es: ``,
	},
	male: {
		de: `männlich`,
		en: `male`,
		es: ``,
	},
	diverse: {
		de: `divers`,
		en: `diverse`,
		es: ``,
	},
	responseFormat: {
		de: `Antwortformat`,
		en: `Response Format`,
		es: ``,
	},
	audioPrio: {
		de: `Später entscheiden (Sprachinput priorisiert)`,
		en: `Decide later (audio priority)`,
		es: ``,
	},
	textPrio: {
		de: `Später entscheiden (Textinput priorisiert)`,
		en: `Decide later (keyboard priority)`,
		es: ``,
	},
	audioInput: {
		de: `Sprachinput`,
		en: `Use microphone`,
		es: ``,
	},
	textInput: {
		de: `Textinput`,
		en: `Keyboard`,
		es: ``,
	},
	microphone: {
		de: `Mikrofongenehmigung`,
		en: `Microphone permission`,
		es: ``,
	},
	dataTransfer: {
		de: `Datentransfer`,
		en: `Data Transfer`,
		es: ``,
	},
	consentHeading: {
		de: `Einwilligungserklärung`,
		en: `Consent`,
		es: ``,
	},
	consentID: {
		de: `Ihre Teilnahme an der Sudie ist natürlich freiwillig. Alle in der Studie erhobenen Daten
		werden anonymisiert auf einem Server am Max-Planck-Institut in Leipzig (Deutschland)
		gespeichert und nicht an Dritte weitergegeben. Sie können Ihre Teilnahme zu jedem
		Zeitpunkt abbrechen, indem sie das Browserfenster schließen. Wenn Sie zu einem späteren
		Zeitpunkt Ihre erhobenen Daten löschen lassen möchten, kontaktieren Sie uns über
		<a href="mailto:forschungsreise@eva.mpg.de">forschungsreise@eva.mpg.de</a> und geben Sie
		dafür Name und Geburtsdatum Ihres Kindes bzw. bei eigener Teilnahme von Ihnen selbst an.`,
		en: `Your participation in this study is, of course, voluntary. All study data will be stored 
		in an anonymized form on a server at the Max Planck Institute in Leipzig, Germany, and will 
		not be passed on to third parties. You can cancel your participation at any time by closing 
		the window. If you wish to withdraw your data from the study at a later date, please write 
		to us, indicating the name and birthday of your child or yourself, at this e-mail address: 
		<a href="mailto:forschungsreise@eva.mpg.de">forschungsreise@eva.mpg.de</a>.`,
		es: ``,
	},
	adultConsent: {
		de: `Ich bin damit einverstanden, am oben genannten Projekt des Max-Planck-Instituts für
		evolutionäre Anthropologie teilzunehmen und dass Tonaufnahmen in anonymisierter Form
		zur Beantwortung wissenschaftlicher Fragestellungen ausgewertet und im Rahmen
		wissenschaftlicher Beiträge bei Forschungs-, Lehr- oder Informationsveranstaltungen
		verwendet werden können. Ausführliche Informationen zum
		<a href="https://www.eva.mpg.de/de/datenschutzhinweis.html" target="-blank"
			>Datenschutz</a
		>
		habe ich erhalten.`,
		en: `I agree....`,
		es: ``,
	},
	consentYes: {
		de: `Ich stimme zu.`,
		en: `I agree.`,
		es: ``,
	},
	imprint: {
		de: `Impressum`,
		en: `Imprint`,
		es: ``,
	},
	dataProtection: {
		de: `Datenschutz`,
		en: `Data Protection`,
		es: ``,
	},
};

const browserLanguage = window.navigator.language.substring(0, 2);

// check if browser language is defined in supported languages
let hasTranslation = true;
if (!supportedLanguages.includes(browserLanguage)) {
	hasTranslation = false;
}

languageIds.forEach((languageId) => {
	const currentEle = document.getElementById(languageId);
	currentEle.innerHTML = hasTranslation
		? translations[languageId][browserLanguage]
		: translations[languageId].en;
});
