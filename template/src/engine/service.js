import VueResource from 'vue-resource';

/** Comments for CommonJS file
	......
 */
var Vue = null;
var serviceFactory = {};
var commonFailFn = IX.emptyFn;
var isInitialized = false;

/*
	@entry : RouteDef
		1. ["name", "url", "type",preDataHandler, errorhandler]
		// default ["name", "urlPattern", "GET"(POST,DELETE,PUT,JS), IX.selfFn, null]
		2. {name, url, type, preDataHandler:function(jsonObj), errorhandler: function(err)}
 */
function getRouteRequest(entry) {
	var isArray = IX.isArray(entry);
	var url = entry[isArray ? 1 : 'url'];
	var urlFn = IX.isFn(url) ? url : function (params) {
		return url.replaceByParams(params);
	};

	var type = (entry[isArray ? 2 : 'type'] || 'get').toLowerCase();
	var withoutBody = !(type === 'post' || type === 'put' || type === 'patch');

	var preDataHandler = entry[isArray ? 3 : 'preDataHandler'];
	var entryFailFn = entry[isArray ? 4 : 'errorhandler'];
	if (!IX.isFn(preDataHandler))
		preDataHandler = IX.selfFn;
	if (!IX.isFn(entryFailFn))
		entryFailFn = commonFailFn;

	return function (params, cbFn, failFn) {
		var _url = urlFn(params);
		var ajaxRequest = withoutBody 
				? Vue.http[type](_url, { params: params }) 
				: Vue.http[type](_url, params, { emulateJSON: true });
		var _failFn = IX.isFn(failFn) ? failFn : entryFailFn;
		ajaxRequest.then(function (rsp) {
			rsp.json().then(function (rspData) {
				if (rspData.code <= 0)
					_failFn(rspData);
				else
					cbFn(preDataHandler(rspData.data));
			});
		}, function (rsp) {
			_failFn({
				code: -1,
				err: 'Failed:' + rsp.status + ':' + rsp.statusText
			});
		}).catch(function (error) {
			_failFn({
				code: -1,
				err: 'Exception:' + error
			});
		});
		return ajaxRequest;
	};
}
/**  
	@routeMapping : [RouteDef]
 */
function createServiceEngine(serviceEntry) {
	var serviceName = serviceEntry[0];
	var routeMapping = serviceEntry[1];
	var routeHT = {};

	if (IX.isFn(routeMapping)) {
		serviceFactory[serviceName] = routeMapping;
		return;
	}

	routeMapping.forEach(function (entry) {
		var routeName = $XP(entry, IX.isArray(entry) ? '0' : 'name', null);
		if (!routeName) return;
		routeHT[routeName] = getRouteRequest(entry);
	});

	serviceFactory[serviceName] = function (name, params, cbFn, failFn) {
		var routeRequestFn = routeHT[name];
		if (IX.isFn(routeRequestFn))
			return routeRequestFn(params, cbFn, failFn);

		(IX.isFn(failFn) ? failFn : commonFailFn)({
			code: -1,
			err: 'Method:' + name + ' for service "' + serviceName + '" not found!'
		});
	};
}

serviceFactory.init = function (vue, serviceEntries) {
	if (!isInitialized) {
		isInitialized = true;
		Vue = vue;
		Vue.use(VueResource);
	}
	if (serviceEntries)
		serviceEntries.forEach(createServiceEngine);
};
serviceFactory.register = function (serviceEntries) {
	if (serviceEntries)
		serviceEntries.forEach(createServiceEngine);
};
serviceFactory.registerErrorHandler = function (failFn) {
	if (IX.isFn(failFn)) commonFailFn = failFn;
};
serviceFactory.unregisterErrorHandler = function () {
	commonFailFn = IX.emptyFn;
};

IX.ns('NP');
NP.serviceFactory = serviceFactory;
