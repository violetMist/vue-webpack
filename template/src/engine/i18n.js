import VueI18n from 'vue-i18n';

var Vue = null;
var i18n = null;
var locales = [];
var isInitialized = false;

function loadLangPkg(key, cbFn) {
	NP.Utils.loadJs('static/i18n/' + key + '.js', function () {
		i18n.setLocaleMessage(key, IXW.I18N[key]);
		cbFn();
	});
}

function createInstance(langList) {
	var primeLangName = $XP(langList, '0.lang', 'cn');
	var messages = {};

	messages[primeLangName] = {};
	IX.iterate(langList, function (lang) {
		var key = $XP(lang, 'lang');
		var name = $XP(lang, 'name', key);
		var msgs = $XP(lang, 'messages', null);

		if (msgs)
			messages[key] = msgs;

		locales.push({ lang: key, name: name });
	});
	i18n = new VueI18n({
		locale: primeLangName, 
		fallbackLocale: primeLangName,
		// silentTranslationWarn: true,
		missing: function (locale, key, vm) {
			/* eslint-disable no-console */
			if (primeLangName != locale)
				console.error('I18N missing in ' + vm._name + ' for [' + locale + ']:', key);
		},
		messages: messages
	});
}

IX.ns('NP.I18N');
NP.I18N.init = function (vue, settings) {
	if (isInitialized)
		return;

	isInitialized = true;
	Vue = vue;
	Vue.use(VueI18n);
	createInstance(settings);
};
NP.I18N.getInstance = function () {
	return i18n;
};

NP.I18N.getLocales = function () {
	return locales;
};
NP.I18N.setLocale = function (lang) {
	if (lang in i18n.messages) {
		i18n.vm.locale = lang;
		return;
	}
	loadLangPkg(lang, function () {
		i18n.vm.locale = lang;
	});
};
