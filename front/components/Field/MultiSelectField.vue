<script setup lang="ts">
import type { SelectValue } from '@/components/BaseSelect.vue'
import type { RuleExpression } from 'vee-validate'

const props = defineProps<{
    name: string
    rules?: RuleExpression<SelectValue[]>
}>()
const { value } = useField<SelectValue[]>(props.name, props?.rules)
</script>

<template>
    <BaseSelect v-model="value" v-bind="$attrs" multiple />
</template>
