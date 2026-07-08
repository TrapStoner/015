<script setup lang="ts">
import { isBoolean } from 'lodash-es'
import { LucideCheck, LucideX } from '@lucide/vue'
import { cx } from 'class-variance-authority'

defineProps<{
    items: Array<{
        label: string
        value: boolean | string | number
    }>
}>()
</script>

<template>
    <div class="flex w-full flex-col gap-2 md:flex-row">
        <div
            v-for="item in items"
            :key="item.label"
            class="flex min-h-11 flex-1 items-center justify-between gap-1 rounded-xl bg-black/5 px-3 py-2 md:flex-col md:items-start md:justify-between"
        >
            <div class="text-xs font-semibold">{{ item.label }}</div>
            <div v-if="isBoolean(item.value)" class="flex items-center">
                <span class="grid size-7 place-items-center rounded-full bg-white/50">
                    <component :is="item.value ? LucideCheck : LucideX" :class="cx('size-5', item.value ? 'text-emerald-600' : 'text-zinc-500')" />
                </span>
            </div>
            <div v-else class="text-base font-light leading-none tabular-nums md:text-xl">{{ item.value }}</div>
        </div>
    </div>
</template>
