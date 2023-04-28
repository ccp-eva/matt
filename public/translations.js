const supportedLanguages = ['de', 'en', 'es'];
const languageIds = ['heading', 'mpi', 'female', 'childConsent'];

const translations = {
	heading: {
		de: `Einstellung zu Tieren`,
		en: `Attitude towards animals`,
		es: `Attitude towards animals`,
	},
	mpi: {
		de: `Max-Planck-Institut für evolutionäre Anthropologie`,
		en: `Max Planck Institute for Evolutionary Anthropology`,
		es: `Max Planck Institute for Evolutionary Anthropology`,
	},
	female: {
		de: `weiblich`,
		en: `female`,
		es: `female`,
	},
	childConsent: {
		de: `Ihre Teilnahme an der Sudie ist natürlich freiwillig. Alle in der Studie erhobenen Daten
		werden anonymisiert auf einem Server am Max-Planck-Institut in Leipzig (Deutschland)
		gespeichert und nicht an Dritte weitergegeben. Sie können Ihre Teilnahme zu jedem
		Zeitpunkt abbrechen, indem sie das Browserfenster schließen. Wenn Sie zu einem späteren
		Zeitpunkt Ihre erhobenen Daten löschen lassen möchten, kontaktieren Sie uns über
		<a href="mailto:forschungsreise@eva.mpg.de">forschungsreise@eva.mpg.de</a> und geben Sie
		dafür Name und Geburtsdatum Ihres Kindes bzw. bei eigener Teilnahme von Ihnen selbst an.`,
		en: `Your participation in the study is voluntary. All data collected in the study will be`,
		es: `Your participation in the study is voluntary. All data collected in the study will be`,
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
