import Vue from 'vue';

import './engine';

import App from './App';
import pageRouters from './router';

NP.misc.init(Vue);
NP.serviceFactory.init(Vue, IXW.Service.entries);
NP.I18N.init(Vue, IXW.I18N.setting);
NP.Route.init(Vue, pageRouters);

// will be applied in lowest priority
// NP.serviceFactory.registerErrorHandler(function(err){
// 	console.err(err.code, err);
// });

// NP.serviceFactory.loginService("session", {}, function(data){
// 	console.log("session :", data);
// }, function(err){ // will be applied in highest priority
// 	console.log("err :", err);
// });

/* eslint-disable no-new */
new Vue({
	router: NP.Route.getInstance(),
	i18n: NP.I18N.getInstance(),
	render: h => h(App)
}).$mount('#app');
