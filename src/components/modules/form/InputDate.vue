<template>
	<date-picker
		:id="injectData.id"
		:name="injectData.id"
		autocomplete="autocomplete_off_hack_xfr4!k"
		ref="input"
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
	import {mapGetters} from "vuex";
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
		computed: {
			...mapGetters("AppStore", {
				style: 'style'
			}),
		},
		watch: {
			'injectData.is_error': function (newVal, oldVal){
				this.is_success = !this.injectData.is_error
			},
		},
		mounted() {
			if (this.style('shadow_field')) {
				this.$refs['input'].$refs['input'].style.boxShadow = `0 ${this.style('shadow_field').value * 0.8}px ${this.style('shadow_field').value * 2.4}px -${this.style('shadow_field').value* 0.4}px #8c92ac`
			}
		}
	}
</script>
