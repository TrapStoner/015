<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
export type SelectValue = string | number
const props = defineProps<{
    placeholder?: string
    label?: string
    options?: {
        label?: string
        value: SelectValue
    }[]
    class?: string
}>()

const modelValue = defineModel<SelectValue | SelectValue[]>()
</script>

<template>
    <Select v-model="modelValue">
        <SelectTrigger :class="class">
            <SelectValue :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel class="text-xs" v-if="label">{{ label }}</SelectLabel>
                <SelectItem v-for="item in options" :key="item.value" :value="item.value">
                    {{ item?.label ?? item.value }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
