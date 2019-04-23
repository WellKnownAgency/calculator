<template>
	<div class="wkn-calc-help-item">
		<div class="wkn-calc-help-item__title">{{title}}</div>
		<div class="wkn-calc-help-item__description">{{description}}</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'description'],
		data() {
			return {}
		},
	}
</script>
