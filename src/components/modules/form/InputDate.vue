<template>
	<date-picker
		:id="injectData.id"
		:name="injectData.id"
		autocomplete="autocomplete_off_hack_xfr4!k"
		width="100%"
		:value="value"
		@input="$emit('input', $event)"
		format="MM.DD.YYYY"
		:range="range"
		:not-before="new Date()"
		lang="en"
		:input-class="[{'wkn-input-text--error': injectData.is_error, 'wkn-input-text--success': is_success}, 'wkn-input-text']"
		@clear="$emit('clear')"
	/>
</template>


<script>
	import DatePicker from "vue2-datepicker";

	export default {
		components: {DatePicker},
		inject: ['injectData'],
		props: ['placeholder', 'range', 'value'],
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
