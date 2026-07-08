<script setup lang="ts">
import { cx } from 'class-variance-authority'
import getMDRenderHtml from '~/lib/getMDRenderHtml'

const props = defineProps<{
    markdown: string
    class?: string
}>()
const renderHtml = computed(() => {
    return getMDRenderHtml(props.markdown)
})
</script>
<template>
    <div
        :class="
            cx(
                'prose prose-sm *:outline-none prose-p:my-1 prose-headings:my-2 prose-pre:mb-0 prose-blockquote:border-black/50 selection:bg-primary/20 break-all',
                props?.class
            )
        "
        v-html="renderHtml"
    />
</template>
