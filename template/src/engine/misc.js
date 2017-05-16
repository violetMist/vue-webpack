IX.ns('NP.misc');

NP.misc.init = function (vue) {
	// 过滤器-截取字符串
	vue.filter('truncLongString', function (value, num) {
		if (!value) { return ''; }
		return value.substrByLength(num || 8).reString;
	});

	vue.mixin({
		computed: {
			$i: function () {
				var vm = this;
				var ref = this.$i18n,
					locale = ref ? ref.locale : null,
					messages = ref ? ref.vm.messages : null;

				/* eslint-disable */ // no-plusplus prefer-rest-params prefer-spread
				return function (key) {
					var values = [], len = arguments.length - 1;
					while (len-- > 0) values[len] = arguments[len + 1];

					if (ref)
						return ref._t.apply(ref, [key, locale, messages, vm].concat(values));

					if (values.length === 0)
						return key;
					// console.log("$i:", key, arguments, values));
					if (!IX.isArray(values[0]))
						return key.replaceByParams(values[0]);
					return IX.loop(values[0], key, function (acc, item, idx) {
						return acc.replace(new RegExp('\\{' + idx + '\\}', 'gm'), item);
					});
				};
			}
		}
	});
};
