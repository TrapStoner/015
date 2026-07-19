<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CheckIcon, ChevronDownIcon } from '@lucide/vue'
import { computed } from 'vue'
import Fuse from 'fuse.js'
import { Button } from '@/components/ui/button'
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
} from '@/components/ui/combobox'

export type ComboboxValue = string | number

const props = withDefaults(
    defineProps<{
        placeholder?: string
        searchPlaceholder?: string
        emptyText?: string
        label?: string
        options?: {
            label?: string
            value: ComboboxValue
        }[]
        multiple?: boolean
        class?: HTMLAttributes['class']
        listClass?: HTMLAttributes['class']
    }>(),
    {}
)

const { t } = useI18n()
const modelValue = defineModel<ComboboxValue | ComboboxValue[]>()

const inputPlaceholder = computed(() => props.searchPlaceholder ?? t('common.searchOptions'))
const emptyLabel = computed(() => props.emptyText ?? t('common.emptyOptions'))
const searchTerm = ref('')
const fuse = computed(
    () =>
        new Fuse(props.options ?? [], {
            keys: ['label', 'value'],
            threshold: 0.3,
        })
)
const filteredOptions = computed(() => {
    if (!searchTerm.value) return props.options ?? []

    return fuse.value.search(searchTerm.value).map((r) => r.item)
})

const selectedValues = computed(() => {
    if (Array.isArray(modelValue.value)) return modelValue.value
    return modelValue.value === undefined || modelValue.value === null ? [] : [modelValue.value]
})

const displayValue = computed(() => {
    if (selectedValues.value.length === 0) return props.placeholder

    return selectedValues.value
        .map((selectedValue) => {
            const option = props.options?.find((item) => item.value === selectedValue)
            return option?.label ?? option?.value ?? selectedValue
        })
        .join(', ')
})
</script>

<template>
    <Combobox v-model="modelValue" :multiple="multiple" :ignore-filter="true">
        <ComboboxAnchor as-child>
            <ComboboxTrigger as-child>
                <Button variant="outline" :class="['justify-between w-full', props.class]">
                    <span class="truncate">
                        {{ displayValue }}
                    </span>
                    <ChevronDownIcon class="size-4 shrink-0 opacity-50" />
                </Button>
            </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList :class="listClass" align="start">
            <ComboboxInput :placeholder="inputPlaceholder" v-model="searchTerm" :displayValue="() => ''" />
            <ComboboxEmpty v-if="filteredOptions.length === 0">{{ emptyLabel }}</ComboboxEmpty>
            <ComboboxGroup>
                <div v-if="label" class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {{ label }}
                </div>
                <ComboboxItem v-for="item in filteredOptions" :key="item.value" :value="item.value">
                    {{ item.label ?? item.value }}
                    <ComboboxItemIndicator>
                        <CheckIcon class="size-4" />
                    </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>
</template>
