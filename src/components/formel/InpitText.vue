<template>
	<div class="wkn-cal-grid-item">
		<label class="wkn-cal-label">Fixes</label>
		<span class="wkn-cal-span-abs">
			<input type="text" class="wkn-cal-input" v-bind:class="{'wkn-cal-errors-item wkn-cal-error': errors}" :id="name" :placeholder="placeholder" :value="value" @input="$emit('input', $event)" :disabled="disabled">
			<span class="wkn-cal-left-input wkn-tooltip" v-bind:class="{'wkn-cal-left-error': errors}">
				<span class="wkn-tooltiptext">
					<div class="wkn-cal-errors" v-if="errors">
						<div class="wkn-cal-errors-item" v-for="(error, index) in errors" :key="index">{{error}}</div>
					</div>
				</span>
			</span>
		</span>

	</div>
</template>

<script>
	export default {
		props: ['name', 'placeholder', 'value', 'errors', 'disabled', 'label'],
		data() {
			return {}
		},
	}
</script>
