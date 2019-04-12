<template>
	<div>
		<multiselect
			v-bind:class="{'multiselect--error': injectData.is_error && !injectData.is_disabled, 'multiselect--success': is_success && !injectData.is_disabled}"
			ref="select"
			:value="selected"
			:placeholder="placeholder"
			:options="options"
			track-by="id"
			label="display_name"
			:searchable="false"
			:allow-empty="true"
			@input="input"
			:disabled="injectData.is_disabled"
			selectLabel=""
			selectedLabel=""
			:optionHeight="36"
		></multiselect>
		<span class="wkn-animate-loading-field" style="right: 30px" v-if="is_loading"></span>
	</div>
</template>

<script>
	import {mapGetters} from "vuex";
	import _ from 'lodash'
	export default {
		inject: ['injectData'],
		props: ['placeholder', 'value', 'options', 'is_loading'],
		data() {
			return {
				selectedId: null,
				is_success: false
			}
		},
		computed: {
			...mapGetters("AppStore", {
				style: 'style'
			}),
			selected () {
				return _.find(this.options, o => o.id == this.value)
			},
		},
		methods: {
			input(value) {
				this.selectedId = value ? value.id : null
			},
		},
		watch: {
			selectedId(newVal) {
				//console.log(newVal)
				this.$emit('input', newVal)
			},
			'injectData.is_error': function (newVal, oldVal){
				this.is_success = !this.injectData.is_error
			}
		},
		mounted() {
			if (this.style('shadow_field')) {
				this.$refs['select'].$refs['tags'].style.boxShadow = `0 ${this.style('shadow_field').value * 0.8}px ${this.style('shadow_field').value * 2.4}px -${this.style('shadow_field').value* 0.4}px #8c92ac`
			}
		}
	}
</script>
