(function (Vue) { // 表示依赖了全局的Ｖue
	'use strict';

	const items = [
		{
			id: 1,
			content: 'Vue.js',
			completed: false
		},
		{
			id: 2,
			content: 'Python',
			completed: false
		},
		{
			id: 3,
			content: 'Egg.js',
			completed: true
		},
	]

	const app = new Vue({
		el: '#todoapp',
		data: {
			items
		},

		methods: {
			addItem(event) {
				// 获取文本框输入的信息
				const content = event.target.value.trim();
				if (!content) {
					alert('请输入有效值');
					return;
				}
				const id = this.items.length + 1;
				this.items.push({
					id,
					content,
					completed: false
				});
				event.target.value = null;
			}
		},

		computed: {
			remaining() {
				const items = this.items.filter(function(item) {
					return !item.completed;
				});
				return items.length;
			}
		}
	})

})(Vue);
