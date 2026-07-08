<script setup lang="ts">
import { cx } from 'class-variance-authority'
import getMDRenderHtml from '~/lib/getMDRenderHtml'
import { useAsyncState } from '@vueuse/core'

const props = defineProps<{
    markdown: string
    class?: string
}>()
const { state: renderHtml } = useAsyncState(async () => {
    return await getMDRenderHtml(props.markdown)
}, null)
</script>
<template>
    <div
        :class="
            cx(
                'prose prose-sm *:outline-none prose-p:my-1 prose-headings:my-2 prose-pre:mb-0 prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-black/50 selection:bg-primary/20 break-all',
                props?.class
            )
        "
        v-html="renderHtml"
    />
</template>
