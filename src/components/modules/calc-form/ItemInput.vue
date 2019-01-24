<template>
	<div class="wkn-cal-grid-item-top">
		<label class="wkn-cal-label" v-if="label">{{label}}</label>
		<span class="wkn-cal-span-abs">
			<slot></slot>
			<span :class="[errors && errors.length ? 'wkn-cal-left-input wkn-cal-left-error' : 'wkn-cal-left-input']"></span>
		</span>
		<div class="wkn-cal-errors" v-if="!is_disabled && errors && errors.length">
			<div class="wkn-cal-errors-item" v-for="(error, index) in errors" :key="index">{{error}}</div>
		</div>
	</div>
</template>


<script>
export default {
	props: ['label', 'errors', 'is_disabled'],
	data() {
		return {
			is_success: false
		}
	},
	watch: {
		errors: function () {
			this.is_success = !(this.errors && this.errors.length)
		}
	}
}
</script>
