<template>
	<div class="wkn-form-group">
		<div class="wkn-form-group__label" v-if="label">
			<label class="wkn-label" ref="label">{{label}}</label>
		</div>
		<div class="wkn-form-group__input">
			<slot></slot>
		</div>
		<div class="wkn-form-group__errors" v-if="!is_disabled && errors && errors.length">
			<div class="wkn-form-group-errors">
				<div class="wkn-form-group-errors__item" v-for="(error, index) in errors" :key="index">{{error}}</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {

		provide() {
			const injectData = {}
			Object.defineProperty(injectData, 'is_disabled', {
				enumerable: true,
				get: () => this.is_disabled,
			})

			Object.defineProperty(injectData, 'is_error', {
				enumerable: true,
				get: () => (this.errors && this.errors.length),
			})

			Object.defineProperty(injectData, 'id', {
				enumerable: true,
				get: () => this.label_for,
			})
			return { injectData }
		},
		props: ['label', 'label_for', 'errors', 'is_disabled'],
		data() {
			return {
				is_success: false
			}
		},
		watch: {
			errors: function () {
				this.is_success = !(this.errors && this.errors.length)
			}
		},
		mounted() {
			if (this.label_for)
				this.$refs['label'].htmlFor = this.label_for
		}
	}
</script>
