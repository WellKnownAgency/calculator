<template>
	<div class="wkn-form-row">
		<input type="text" class="wkn-form-input" v-bind:class="{'wkn-form-input--error': errors}" :id="name" :placeholder="placeholder" :value="value" @input="$emit('input', $event)" :disabled="disabled">
		<div class="wkn-form-errors" v-if="errors">
			<div class="wkn-form-errors__item" v-for="(error, index) in errors" :key="index">{{error}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'placeholder', 'value', 'errors', 'disabled'],
		data() {
			return {}
		},
	}
</script>
