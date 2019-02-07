<template>
	<div class="wkn-calc-help">
		<div class="wkn-calc-help__list">
			<div class="wkn-calc-help__item" v-for="(item, index) in items" :key="index">
				<item :title="item.title"  :description="item.description" />
			</div>
		</div>
	</div>
</template>

<script>
	import Item from './CalcHelpItem'

	export default {
		components: {Item},
		props: ['items'],
		data() {
			return {}
		},
	}
</script>
