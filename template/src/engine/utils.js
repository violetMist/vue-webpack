var _head = document.getElementsByTagName('head')[0];
function _afterLoadJsFn(script, nextFn) {
	if (!script.readyState) {
		script.onload = nextFn;
		return;
	}
	// IE
	script.onreadystatechange = function () {
		if (script.readyState == 'complete' || script.readyState == 'loaded') {
			script.onreadystatechange = null;
			nextFn();
		}
	};
}
function loadJsFn(durl, nextFn) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = durl;
	if (IX.isFn(nextFn))
		_afterLoadJsFn(script, nextFn);
	_head.appendChild(script);
}

IX.ns('NP.Utils');
NP.Utils.loadJs = loadJsFn;

(function () {
var params = {
	flag: false,
	currentX: 0, 
	currentY: 0,
	moveFn: IX.emptyFn
};
IX.bind(document, {
	mouseup: function () { params.flag = false; },
	mousemove: function (e) {
		if (!params.flag)
			return;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
		params.moveFn({ dx: params.currentX - e.clientX, dy: params.currentY - e.clientY });
	}
});

IX.ns('IXW');
IXW.ns = function (subNS) {
	return IX.ns(['NP'].concat(subNS).join('.'));
};

IXW.draggable = function (el, exptFn, fn) {
	el.onselectstart = function () { return false; };
	IX.bind(el, {
		mousedown: function (e) {
			if (exptFn(e)) return;
			params.moveFn = fn;
			params.currentX = e.clientX;
			params.currentY = e.clientY;
			params.flag = true;
		}
	});
};

IXW.onmousewheel = function (el, fn) {
	if (el.addEventListener)
		el.addEventListener('DOMMouseScroll', function (evt) {
			// var deltaY = evt.detail * 10;
			fn({ dx: 0, dy: evt.detail * 10 });
		}, false);
    el.onmousewheel = function (event) {
		var evt = event || window.event;
		fn({ dx: evt.wheelDeltaX / 10, dy: evt.wheelDeltaY / 10 });
    };
};
}());
(function () {
var fnHT = {};
var evtHT = IX.I1ToNManager();

IX.ns('IXW');
IXW.publish = function (evtname, params) {
	IX.iterate(evtHT.get(evtname), function (key) {
		var fn = fnHT[key];
		if (!IX.isFn(fn))
			return;
		fn(params);
	});
};
IXW.subscribe = function (evtname, fn) {
	var key = evtname + (new Date()).getTime();

	fnHT[key] = fn;
	evtHT.put(evtname, key);
	return {
		unsubscribe: function () {
			fnHT[key] = undefined;
			evtHT.remove(evtname, key);
		}
	};
};
}());
