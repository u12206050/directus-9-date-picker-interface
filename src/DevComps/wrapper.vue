<template>
  <div style="width: 100vw; height: 100vh; display: flex; justify-content: center; padding: 32px 16px;">
    <div style="width: 290px">

      <label>Dark Mode <input type="checkbox" v-model="dark"></label>

      <br>
      <hr>
      <br>

      <h3>Date value: <pre>{{ date }}</pre></h3>

      <label>Disabled <input type="checkbox" v-model="disabled"></label>

      <label>Enable Time <input type="checkbox" v-model="enableTime"></label>
      <label>Use 24-Hour Format <input type="checkbox" v-model="use24"></label>
      <label>Include Seconds <input type="checkbox" v-model="enableSeconds"></label>

      <br>
      <hr>
      <br>

      <div class="label type-label disabled" data-v-792c5ca7 data-v-5157b788>
        <span class="field-name" data-v-792c5ca7>From Date</span>
      </div>
      <div class="interface" data-v-175a2f1a data-v-5157b788>
        <DatePicker v-if="renderFlatpickr"
                    v-bind="settings"
                    max="toDate"
                    :value="fromDate" @input="v => fromDate = v">
        </DatePicker>
      </div>
      <br>
      <div class="label type-label disabled" data-v-792c5ca7 data-v-5157b788>
        <span class="field-name" data-v-792c5ca7>To Date</span>
      </div>
      <div class="interface" data-v-175a2f1a data-v-5157b788>
        <DatePicker v-if="renderFlatpickr"
                    v-bind="settings"
                    min="fromDate"
                    :value="toDate" @input="v => toDate = v">
        </DatePicker>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "../interface.vue";
import './directus_styles.css'
import {ref} from "vue";

export default {
  name: "wrapper.vue",
  components: {DatePicker},
  data () {
    return {
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      disabled: false,
      enableTime: false,
      use24: false,
      enableSeconds: false,
      dark: false,

      renderFlatpickr: true,
    }
  },
  provide () {
    const { fromDate, toDate } = this
    return {
      values: ref({
        fromDate,
        toDate
      })
    }
  },
  computed: {
    settings () {
      const { disabled, enableTime, use24, enableSeconds } = this
      return {
        disabled,
        enableTime,
        enableSeconds,
        use24
      }
    }
  },
  watch: {
    settings (after, before) {
      if (JSON.stringify(after) !== JSON.stringify(before)) {
        // Remove Flatpickr from the DOM
        this.renderFlatpickr = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderFlatpickr = true;
        });
      }
    },
    dark: {
      immediate: true,
      handler (dark) {
        window.document.body.classList.remove('auto', 'dark', 'light')

        window.document.body.classList.add(dark ? 'dark' : 'light')
      }
    }
  }
}
</script>