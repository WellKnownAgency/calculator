<template>
	<select
		class="wkn-cal-select-input"
		v-bind:class="{'wkn-cal-error': errors}"
		:disabled="is_disabled"
		:value="value"
		@input="$emit('input', $event)
	">
		<option :value="null" v-if="placeholder">{{placeholder}}</option>
		<option v-for="option in options" :key="option.id" :value="option.id">{{option.display_name}}</option>
	</select>
</template>


<script>
	export default {
		props: ['placeholder', 'value', 'options', 'is_disabled', 'errors'],
	}
</script>
