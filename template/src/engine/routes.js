import VueRouter from 'vue-router';

var Vue = null;
var router = null;
var isInitialized = false;

IX.ns('NP.Route');
NP.Route.init = function (vue, pageRouters) {
	if (isInitialized)
		return;

	isInitialized = true;
	Vue = vue;
	Vue.use(VueRouter);
	router = new VueRouter({
		routes: pageRouters
	});
};
NP.Route.getInstance = function () {
	return router;
};
