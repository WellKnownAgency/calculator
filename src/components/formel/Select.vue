<template>
	<div>
		<span class="wkn-cal-span-abs">
			<select :id="name" class="wkn-cal-select-input" v-bind:class="{'wkn-cal-errors-item wkn-cal-error': errors}" :value="value" @input="$emit('input', $event)" :disabled="disabled">
				<option :value="null">{{placeholder}}</option>
				<option v-for="option in options" :key="option.id" :value="option.id">{{option.display_name}}</option>
			</select>
			<span class="wkn-cal-left-input wkn-tooltip" v-bind:class="{'wkn-cal-left-error': errors}">
				<span class="wkn-tooltiptext">
					<div class="wkn-cal-errors" v-if="errors">
						<div class="wkn-cal-errors-item" v-for="(error, index) in errors" :key="index">{{error}}</div>
					</div>
				</span>
			</span>
			<!--<span class="cal-right-input"></span>-->
		</span>
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
