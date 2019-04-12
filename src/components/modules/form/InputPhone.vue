<template>
	<the-mask
		:id="injectData.id"
		:name="injectData.id"
		autocomplete="autocomplete_off_hack_xfr4!k"
		v-bind:class="{'wkn-input-text--error': injectData.is_error && !injectData.is_disabled, 'wkn-input-text--success': is_success && !injectData.is_disabled}"
		class="wkn-input-text"
		v-bind:style="inputStyle"
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
	import {mapGetters} from "vuex";
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
		computed: {
			...mapGetters("AppStore", {
				style: 'style'
			}),
			inputStyle() {
				if (this.style('shadow_field')) {
					return {
						boxShadow: `0 ${this.style('shadow_field').value * 0.8}px ${this.style('shadow_field').value * 2.4}px -${this.style('shadow_field').value* 0.4}px #8c92ac`
					}
				}
				return {}
			}
		},
		watch: {
			'injectData.is_error': function (newVal, oldVal){
				this.is_success = !this.injectData.is_error
			},
		}
	}
</script>
