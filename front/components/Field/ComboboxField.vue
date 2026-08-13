<script setup lang="ts">
import type { ComboboxValue } from '@/components/BaseCombobox.vue'
import type { RuleExpression } from 'vee-validate'

const props = defineProps<{
    name: string
    rules?: RuleExpression<ComboboxValue>
}>()

const { value } = useField<ComboboxValue>(props.name, props.rules)
</script>

<template>
    <BaseCombobox v-model="value" v-bind="$attrs" />
</template>
