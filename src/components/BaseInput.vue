<template>
  <div class="form-group" :class="formGroupClasses">
    <div
      class="mb-0"
      :class="[
        { 'input-group': hasIcon },
        { 'has-danger': error },
        { focused: focused },
        { 'has-label': label || $slots.label },
        { 'has-success': valid === true },
        { 'has-danger': valid === false },
        formClasses,
      ]"
    >
      <slot name="label">
        <label v-if="label" class="form-control-label" :class="labelClasses">
          {{ label }}
          <span v-if="required">*</span>
        </label>
      </slot>
      <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
        <span class="input-group-text">
          <slot name="addonLeft">
            <i :class="addonLeftIcon"></i>
          </slot>
        </span>
      </div>
      <slot>
        <validate-field
          :type="type"
          :validateOnInput="true"
          :name="name"
          :modelValue="value"
          :placeholder="placeholder"
          :rules="rules"
          @input="handleInput"
          @keyup.enter="handleEnter"
          v-on="listeners"
          class="form-control border-0"
          :class="[{ 'is-valid': valid === true }, { 'is-invalid': valid === false }, inputClasses]"
          aria-describedby="addon-right addon-left"
        />
      </slot>
      <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
        <span class="input-group-text">
          <slot name="addonRight">
            <i :class="addonRightIcon"></i>
          </slot>
        </span>
      </div>
      <slot name="infoBlock"></slot>
      <slot name="helpBlock"></slot>
    </div>
    <error-message class="text-danger" :name="name" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from 'vee-validate'
export default {
  inheritAttrs: false,
  name: 'base-input',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    required: {
      type: Boolean,
      description: 'Whether input is required (adds an asterix *)',
    },
    valid: {
      type: Boolean,
      description: 'Whether is valid',
      default: undefined,
    },
    label: {
      type: String,
      description: 'Input label (text before input)',
    },
    error: {
      type: String,
      description: 'Input error (below input)',
    },
    formClasses: {
      type: String,
      description: 'Form css classes',
    },
    formGroupClasses: {
      type: String,
      description: 'Form css classes',
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes',
    },
    inputClasses: {
      type: String,
      description: 'Input css classes',
    },
    value: {
      type: [String, Number],
      description: 'Input value',
    },
    addonRightIcon: {
      type: String,
      description: 'Addon right icon',
    },
    addonLeftIcon: {
      type: String,
      description: 'Addont left icon',
    },
    rules: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {
    listeners() {
      return {
        input: this.handleInput,
        focus: this.onFocus,
        blur: this.onBlur,
      }
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots
      return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('update:value', e.target.value)
    },
    handleEnter() {
      this.$emit('keyup-enter')
    },
    onFocus(value) {
      this.focused = true
      this.$emit('focus', value)
    },
    onBlur(value) {
      this.focused = false
      this.$emit('blur', value)
    },
  },
}
</script>
<style></style>
