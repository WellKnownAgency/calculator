<template>
	<div>
		<select :id="name" class="wkn-form-input" v-bind:class="{'wkn-form-input--error': errors}" :value="value" @input="$emit('input', $event)" :disabled="disabled">
			<option :value="null">{{placeholder}}</option>
			<option v-for="option in options" :key="option.id" :value="option.id">{{option.display_name}}</option>
		</select>
		<div class="wkn-form-errors" v-if="errors">
			<div class="wkn-form-errors__item" v-for="(error, index) in errors" :key="index">{{error}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'placeholder', 'options', 'value', 'errors', 'disabled'],
		data() {
			return {}
		},
	}
</script>
