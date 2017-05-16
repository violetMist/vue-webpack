<template>
	<div class="np-sample">
		<h1>{{ $i(msg) }}</h1>
		<h2>{{ $i(desc) }}</h2>
	</div>
</template>

<script>
/** Comments for Common Component Sample
	......
 */

export default {
	name: 'sample1',
	data: function () {
		return {
			msg: 'Welcome to Vue.js [Sample] <App> for Netposa',
			desc: 'Common Component Sample'
		};
	}
};
</script>

<style lang="less">
.np-sample{
	border:1px solid #fcc;background:#ccc;
	
	h1 {color:#333;}
	h2 {color:blue;}
}
</style>
