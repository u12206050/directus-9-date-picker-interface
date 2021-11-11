<template>
	<div class="v-input" data-v-498949c4 :class="classes" @click="$emit('click', $event)">
		<div v-if="$slots['prepend-outer']" class="prepend-outer">
			<slot name="prepend-outer" :value="modelValue" :disabled="disabled" />
		</div>
		<div class="input" data-v-498949c4 :class="{ disabled }">
			<div v-if="$slots.prepend" class="prepend">
				<slot name="prepend" :value="modelValue" :disabled="disabled" />
			</div>
			<slot name="input">
				
			</slot>
			<div v-if="$slots.append" class="append">
				<slot name="append" :value="modelValue" :disabled="disabled" />
			</div>
		</div>
		<div v-if="$slots['append-outer']" class="append-outer">
			<slot name="append-outer" :value="modelValue" :disabled="disabled" />
		</div>
	</div>
</template>

<script>
export default {
	props: ['modelValue', 'fullWidth', 'clickable', 'disabled'],
	computed: {
		classes () {
      return {
        'full-width': this.fullWidth,
        'has-click': this.clickable,
        disabled: this.disabled,
      }
    }
	}
}
</script>