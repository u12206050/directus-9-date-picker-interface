<template>
  <v-input :fullWidth="true" :clickable="true" v-model="value" :disabled="disabled">
    <template v-slot:input>
      <flat-pickr v-model="date" class="date-picker" :config="fpConfig"/>
    </template>

    <template v-if="!disabled" #append>
      <v-icon :name="value ? 'close' : 'today'" @click.stop="$emit('input', null)" />
    </template>
  </v-input>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import _get from 'lodash/get';
import './styles.css';

export default {
  emits: ['input'],
  inject: ['values'],
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
    min: {
      type: String,
    },
    max: {
      type: String,
    },
  },
  components: {
    flatPickr
  },
  computed: {
    date: {
      get () {
        return this.value ?? null;
      },
      set (value) {
        this.$emit('input', !!value ? value : null)
      }
    },
    fpConfig () {
      const { enableTime, enableSeconds, disabled, min, max, type, use24, values } = this
      const minDate = min ? _get(values.value, min) : ''
      const maxDate = max ? _get(values.value, max) : ''

      const formatOfDate = 'F J, Y'
      const timeFormat = 'H:i' + (enableSeconds ? ':S' : '')
      const isTime = type === 'time'
      
      let dFormat = ''
      let aFormat = formatOfDate + (enableTime ? ' ' + timeFormat : '')

      switch(type) {
        case "dateTime":
           dFormat = 'Y-m-dTH:i:S'
        break;
        case "time":
           dFormat = 'H:i:S'
           aFormat = timeFormat
        break;
        case "date":
           dFormat = 'Y-m-d'
           aFormat = formatOfDate
        break;
        case "timestamp":
           dFormat = 'Z'
        break;
      }

      return {
        altFormat: aFormat,
        altInput: true,
        allowInput: !disabled,
        clickOpens: !disabled,
        dateFormat: dFormat,

        enableTime: isTime || enableTime,
        enableSeconds,

        minDate,
        maxDate,

        noCalendar: isTime,
        time_24hr: use24,

        static: true,
      }
    }
  }
}
</script>

<style>
.date-picker {
  flex-grow: 1;
  width: 100%;
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