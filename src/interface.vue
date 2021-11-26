<template>
  <v-input :fullWidth="true" :clickable="true" :disabled="disabled" v-model="value">
    <template v-slot:input>
      <flat-pickr v-if="renderFlatpickr" v-model="date" class="date-picker" :config="fpConfig"/>
    </template>

    <template v-if="!disabled" #append>
      <v-icon :name="value ? 'close' : 'today'" @click.stop="$emit('input', null)" />
    </template>
  </v-input>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import './styles.css';

export default {
  emits: ['input'],
  name: "DatePicker",
  props: {
    type: String,
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enableTime: {
      type: Boolean,
      default: false,
    },
    use24: {
      type: Boolean,
      default: true,
    },
    enableSeconds: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    flatPickr
  },
  data () {
    return {
      renderFlatpickr: true
    }
  },
  computed: {
    date: {
      get () {
        if (! this.value) return null;

        return new Date(this.value)
      },
      set (value) {
        this.$emit('input', !!value ? value : null)
      }
    },
    fpConfig () {
      const { enableTime, enableSeconds, disabled, type, use24 } = this
      const timeFormat = 'H:i' + (enableSeconds ? ':S' : '')
      const isTime = type === 'time'
      return {
        altFormat: 'F J, Y' + (enableTime ? ' ' + timeFormat : ''),
        altInput: !isTime,
        allowInput: !disabled,
        clickOpens: !disabled,
        dateFormat: isTime ? timeFormat : 'Z',

        enableTime: isTime || enableTime,
        enableSeconds,

        noCalendar: isTime,
        time_24hr: isTime || use24
      }
    }
  },
  watch: {
    fpConfig () {
      // Remove Flatpickr from the DOM
      this.renderFlatpickr = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderFlatpickr = true;
      });
    }
  }
}
</script>

<style>
.date-picker {
  flex-grow: 1;
  width: 60px;
  height: 100%;
  padding: var(--input-padding);
  padding-right: 0;
  padding-left: 0;
  font-family: var(--v-input-font-family);
  background-color: transparent;
  border: none;
  appearance: none;
}


</style>