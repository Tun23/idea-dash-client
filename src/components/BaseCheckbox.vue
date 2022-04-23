<template>
  <div class="custom-control custom-checkbox" :class="{ disabled: disabled, 'form-check-inline': inline }">
    <validate-field v-slot="{ handleChange, handleBlur }" :name="name" :rules="rules">
      <input
        :id="cbId"
        class="custom-control-input"
        type="checkbox"
        :disabled="disabled"
        :name="name"
        :checked="checked"
        @change="
          (e) => {
            handleChangeCheck(e)
            handleChange(e.target.checked)
          }
        "
        @blur="handleBlur"
      />
    </validate-field>
    <error-message class="text-danger text-sm" :name="name" />
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
import { randomString } from './stringUtils'
import { Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'base-checkbox',
  model: {
    prop: 'checked',
  },
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: 'Whether checkbox is checked',
    },
    disabled: {
      type: Boolean,
      description: 'Whether checkbox is disabled',
    },
    inline: {
      type: Boolean,
      description: 'Whether checkbox is inline',
    },
    name: String,
    rules: String,
  },
  data() {
    return {
      cbId: '',
      touched: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(check) {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      },
    },
  },
  mounted() {
    this.cbId = randomString()
  },
  methods: {
    handleChangeCheck(e) {
      this.$emit('update:checked', e.target.checked)
    },
  },
}
</script>
