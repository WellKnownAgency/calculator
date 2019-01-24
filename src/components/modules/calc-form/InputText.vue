<template>
		<input
			class="wkn-cal-input"
			ref="from_zip"
			:placeholder="placeholder"
			v-bind:class="{'wkn-cal-error': errors && errors.length, 'wkn-cal-success': is_success}"
			id="from-zip"
			:disabled="is_disabled"
			:value="value"
			@input="$emit('input', $event)"
		>
</template>


<script>
	export default {
		props: ['placeholder', 'value', 'is_disabled', 'errors'],
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
