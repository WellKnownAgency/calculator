<template>
	<div>
		<input
			:id="injectData.id"
			autocomplete="new_password"
			class="wkn-input-text"
			:placeholder="placeholder"
			v-bind:class="{'wkn-input-text--error': injectData.is_error && !injectData.is_disabled, 'wkn-input-text--success': is_success && !injectData.is_disabled}"
			v-bind:style="inputStyle"
			:disabled="injectData.is_disabled"
			:value="value"
			@input="inputField($event)"
			:maxlength="maxlength"
		>
		<span class="wkn-animate-loading-field" v-if="is_loading"></span>
	</div>
</template>


<script>
	import {mapGetters} from "vuex";

	export default {
		inject: ['injectData'],
		props: ['placeholder', 'value', 'is_loading', 'maxlength', 'throttled'],
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
		methods: {
			inputField($event) {}
		},
		watch: {
			'injectData.is_error': function (newVal, oldVal){
				this.is_success = !this.injectData.is_error
			},
		},
		created() {
			if (this.throttled) {
				this.inputField = _.debounce(function ($event) {
					this.$emit('input', $event)
				}, 1000)
			} else {
				this.inputField = function ($event) {
					this.$emit('input', $event)
				}
			}
		}
	}
</script>
