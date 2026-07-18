<script lang="ts" setup>
import MarkdownInputField from '@/components/Field/MarkdownInputField.vue'
import FormButton from '@/components/Field/FormButton.vue'
import showDrawer from '@/lib/showDrawer'
import { h } from 'vue'
import TextShareDrawer from '@/components/Drawer/TextShareDrawer.vue'
import PickupShareBtn from '@/components/PickupShareBtn.vue'
const form = useFormContext()
const { t } = useI18n()

const emit = defineEmits<{
    (e: 'change', key: string): void
}>()

const handleTextShare = ({ type, config }: { type: string; config: any }) => {
    form?.setFieldValue('handle_type', type)
    form?.setFieldValue('config', config)
    emit('change', 'result')
}
</script>
<template>
    <BaseCard class="gap-5 flex flex-col" :title="t('page.upload.text.uploadText')">
        <div class="relative">
            <MarkdownInputField
                name="text"
                :placeholder="t('page.upload.text.uploadTextPlaceholder')"
                class="max-h-[50vh] min-h-40 overflow-y-auto max-w-full flex flex-col"
                rules="required"
            />
        </div>
        <div class="flex flex-row gap-3">
            <FormButton
                @click="
                    async (form) => {
                        const { text } = form?.values || {}
                        showDrawer({
                            render: ({ hide }) =>
                                h(TextShareDrawer, {
                                    hide,
                                    text,
                                    onTextHandle: handleTextShare,
                                }),
                        })
                    }
                "
            >
                <LucideShare class="size-4" />{{ t('btn.submit') }}
            </FormButton>
            <PickupShareBtn />
        </div>
    </BaseCard>
</template>
