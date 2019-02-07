<template>
	<multiselect
		v-bind:class="{'multiselect--error': injectData.is_error && !injectData.is_disabled, 'multiselect--success': is_success && !injectData.is_disabled}"
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
</template>

<script>
	import _ from 'lodash'
	export default {
		inject: ['injectData'],
		props: ['placeholder', 'value', 'options'],
		data() {
			return {
				selectedId: null,
				is_success: false
			}
		},
		computed: {
			selected () {
				return _.find(this.options, o => o.id == this.value)
			}
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
		}
	}
</script>
