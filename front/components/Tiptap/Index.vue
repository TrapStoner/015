<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Placeholder from '@tiptap/extension-placeholder'
import { cx } from 'class-variance-authority'
import countWords from '@/lib/countWords'
import CodeBlockShiki from 'tiptap-extension-code-block-shiki'
import Button from '@/components/ui/button/Button.vue'

const { t } = useI18n()

const props = defineProps<{
    modelValue?: string
    placeholder?: string
    class?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const editor = ref<Editor | undefined>(undefined)

const clearContent = () => {
    editor.value?.commands.clearContent()
    emit('update:modelValue', '')
}

onMounted(() => {
    editor.value = new Editor({
        content: props.modelValue,
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockShiki.configure({
                defaultTheme: 'tokyo-night',
            }),
            Markdown.configure({
                transformPastedText: true,
                transformCopiedText: true,
            }),
            Placeholder.configure({
                placeholder: props.placeholder ?? '',
            }),
            // CommandsPlugin,
        ],
        editorProps: {
            attributes: {
                spellcheck: 'false',
                autocorrect: 'off',
                autocapitalize: 'off',
            },
        },
        onUpdate: () => {
            emit('update:modelValue', (editor.value as any)?.storage?.markdown?.getMarkdown() ?? '')
        },
    })
})
watch(
    () => props.modelValue,
    (value) => {
        if (value !== (editor.value as any)?.storage?.markdown?.getMarkdown()) {
            editor.value?.commands.setContent(value ?? '')
        }
    }
)
onUnmounted(() => {
    editor.value?.destroy()
})
</script>
<template>
    <div :class="['relative bg-white/50 rounded-md p-2 pr-10 overflow-hidden [&_.tiptap]:h-full', props.class]">
        <editor-content
            :editor="editor as any"
            class="prose prose-sm *:outline-none prose-p:my-1 prose-headings:my-2 prose-pre:mb-0 prose-blockquote:border-black/50 selection:bg-primary/20 max-w-full w-full"
        >
        </editor-content>
        <Button
            type="button"
            variant="ghost"
            size="icon"
            :class="
                cx(
                    'absolute right-2 top-2 hover:bg-black/10 transition-all duration-300',
                    modelValue?.length && modelValue.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )
            "
            @click="clearContent"
        >
            <LucideX class="size-4" />
        </Button>
        <!-- <BubbleMenuView :editor="editor as any" /> -->
        <div
            v-if="modelValue?.length && modelValue?.length > 0"
            class="absolute bottom-2 right-3 flex justify-end px-2 py-1 text-xs text-gray-400 select-none bg-white rounded-md"
        >
            {{
                `${modelValue?.length ?? 0} ${t('common.length')} · ${countWords(modelValue ?? '')}
            ${t('common.words')}`
            }}
        </div>
    </div>
</template>
