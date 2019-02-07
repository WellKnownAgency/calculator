<template>
		<input
			:id="injectData.id"
			:name="injectData.id"
			autocomplete="autocomplete_off_hack_xfr4!k"
			class="wkn-input-text"
			:placeholder="placeholder"
			v-bind:class="{'wkn-input-text--error': injectData.is_error && !injectData.is_disabled, 'wkn-input-text--success': is_success && !injectData.is_disabled}"
			:disabled="injectData.is_disabled"
			:value="value"
			@input="$emit('input', $event)"
		>
</template>


<script>
	export default {
		inject: ['injectData'],
		props: ['placeholder', 'value'],
		data() {
			return {
				is_success: false
			}
		},
		watch: {
			'injectData.is_error': function (newVal, oldVal){
				this.is_success = !this.injectData.is_error
			},
		}
	}
</script>
