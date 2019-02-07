<template>
	<the-mask
		:id="injectData.id"
		:name="injectData.id"
		autocomplete="autocomplete_off_hack_xfr4!k"
		v-bind:class="{'wkn-input-text--error': injectData.is_error && !injectData.is_disabled, 'wkn-input-text--success': is_success && !injectData.is_disabled}"
		class="wkn-input-text"
		mask="(###) ###-####"
		:value="value"
		:disabled="injectData.is_disabled"
		type="text"
		:masked="false"
		:placeholder="placeholder"
		@input="$emit('input', $event)"
	/>
</template>


<script>
	import {TheMask} from 'vue-the-mask'
	export default {
		inject: ['injectData'],
		components: {TheMask},
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
