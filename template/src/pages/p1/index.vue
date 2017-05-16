<template>
	<div class="p1">
		<a class="btn-add"></a>
		<span class="icon">{{ $i('HERE') }}</span>
		<span>{{ $i(msg) }}</span>
		<span>{{ $i(desc) }}</span>
		<span>{{ $i('abc.edf{0}[0]{1}', ['X','Y']) }}</span>

		<np-sample></np-sample>
		<np-biz-sample></np-biz-sample>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npSample from '../../components/npSample';
import npBizSample from '../../biz-components/npBizSample';

// NP.serviceFactory.loginService("login", {}, function(data){
// 	console.log("login :", data);
// }, function(info){
// 	console.log("err :", info);
// });

export default {
	name: 'samplePage',
	data: function () {
		return {
			msg: 'Welcome to Vue.js Sample App for Netposa',
			desc: 'Common Page Sample 1'
		};
	},
	components: {
		'np-sample': npSample,
		'np-biz-sample': npBizSample
	}
};
</script>

<style lang="less">
@import '../../less/ixwpre.less';
.p1{
	&>span {display:inline-block;width:100%;height:40px;background:gray;}
	&>.icon {.x-pic;.x-pic-btn-unfold;width: 18px; height:18px; padding:18px 0 0 18px;overflow:hidden;}
	.np-sample {background:red;}
}

.btn-add {.x-cn;width:75px; height:30px;.x-cn-btn-add-click;}
.i18n-en .btn-add {.x-en; .x-en-btn-add-click;}
</style>
