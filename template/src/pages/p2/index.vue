<template>
	<div class="p2">
		<span>{{ $i(msg) }}</span>
		<span>{{ $i(desc) }}</span>
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

export default {
	name: 'samplePage2',
	data: function () {
		return {
			msg: 'Welcome to Vue.js Sample App for Netposa',
			desc: 'Common Page Sample 2'
		};
	},
	components: {
		'np-sample': npSample,
		'np-biz-sample': npBizSample
	}
};
</script>

<style lang="less">
.p2{
	&>span {display:inline-block;width:100%;height:40px;background:gray;}
	.np-sample {background:green;}
}
</style>
