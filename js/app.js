(function (Vue) { // 表示依赖了全局的Ｖue
	'use strict';

	const STORAGE_KEY = 'items-vuejs';
	const itemStorage = {
		fetch() {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save(items) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		}
	}

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

	Vue.directive('app-focus', {
		inserted(el, binding) {
			el.focus();
		}
	})

	const app = new Vue({
		el: '#todoapp',
		data: {
			items: itemStorage.fetch(),
			currentItem: null,
			filterStatus: 'all'
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
			},
			removeItem(index) {
				this.items.splice(index, 1);
			},
			removeCompleted() {
				const newItems = this.items.filter(function(item) {
					return !item.completed;
				});
				this.items = newItems;
			},
			toEdit(item) {
				this.currentItem = item;
			},
			cancelEdit() {
				this.currentItem = null;
			},
			finishEdit(item, index, event) {
				const content = event.target.value.trim();
				if (!content) {
					this.removeItem(index);
					return;
				}
				item.content = content;
				this.currentItem = null;
			}
		},

		computed: {
			remaining() {
				const items = this.items.filter(function(item) {
					return !item.completed;
				});
				return items.length;
			},
			// 复选框双向绑定计算属性
			toggleAll: {
				get() {
					return this.remaining === 0;
				},
				set(newStatus) {
					this.items.forEach(function(item) {
						item.completed = newStatus;
					});
				}
			},
			filterItem() {
				switch(this.filterStatus) {
					case 'active':
						return this.items.filter(function(item) {
							return !item.completed;
						});
						break;
					case 'completed':
						return this.items.filter(function(item) {
							return item.completed;
						});
						break;
					default:
						return this.items;
				}
			}
		},

		directives: {
			'todo-focus': {
				update(el, binding) {
					if (binding.value) {
						el.focus();
					}
				}
			}
		},

		watch: {
			items: {
				deep: true,
				handler: function(newItems, oldItems) {
					itemStorage.save(newItems);
				}
			}
		}
	})

	window.onhashchange = function() {
		const hash = window.location.hash.substr(2) || 'all';
		console.log(hash);
		app.filterStatus = hash;
	}
	window.onhashchange();

})(Vue);
