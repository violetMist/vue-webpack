<template>
	<div class="np-biz-sample">
		<h1>{{ $i(msg) }}</h1>
		<h2>{{ $i(desc) }}</h2>
	</div>
</template>

<script>
/** Comments for Business Component Sample
	......
 */

export default {
	name: 'sample2',
	data: function () {
		return {
			msg: 'Welcome to Vue.js Sample App for Netposa',
			desc: 'Business Component Sample'
		};
	}
};
</script>

<style lang="less">
.np-biz-sample{
	border:1px solid #ccf;background:#ccc;

	h1 {color:#333;}
	h2 {color:#777;}
}
</style>
