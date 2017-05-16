<template>
	<div id="app">
		<a @click="switchLang">{{ $i("语言切换") }}:{{ langName }}</a>
		<div>
			<router-link class="nav-item btn" v-for="item in navList" key="name"
				:to="{name: item.name}">{{item.title}}</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	data: function () {
		return {
			langName: 'cn',
			navList: [
				{ name: 'p1', title: 'Page 1' },
				{ name: 'p2', title: 'Page 2' }
			]
		};
	},
	methods: {
		switchLang: function () {
			$XH.removeClass(document.body, 'i18n-' + this.langName);
			this.langName = this.langName == 'cn' ? 'en' : 'cn';
			$XH.addClass(document.body, 'i18n-' + this.langName);
			NP.I18N.setLocale(this.langName);
		}
	}
};
</script>

<style lang="less">
@import './less/core.less';

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.nav-item {background:green;color:white;margin:0 10px;}
</style>
