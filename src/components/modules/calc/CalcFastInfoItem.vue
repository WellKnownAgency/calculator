<template>
	<div class="wkn-calc-fast-info__item">
		<div class="wkn-calc-fast-info-item">
			<div class="wkn-calc-fast-info-item__label">{{label}}</div>
			<div class="wkn-calc-fast-info-item__value">{{value}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['label', 'value'],
		data() {
			return {}
		},
	}
</script>
