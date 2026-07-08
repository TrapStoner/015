<script setup lang="ts">
import AsyncButton from '@/components/ui/button/AsyncButton.vue'
import { useQueryClient } from '@tanstack/vue-query'
import showDrawer from '~/lib/showDrawer'
import { toast } from 'vue-sonner'
import PasswallShareDrawer from '~/components/Drawer/PasswallShareDrawer.vue'

const { t } = useI18n()
const props = defineProps<{
    data: any
}>()

const queryClient = useQueryClient()
const { downloadFile, getShareToken } = useMyAppShare()
const token = ref<string>()

const handleDownload = async () => {
    const { id } = props?.data || {}
    try {
        if (!token.value) {
            if (props?.data?.has_password) {
                token.value = await showDrawer({
                    render: ({ ...rest }) => h(PasswallShareDrawer, { ...rest, share_id: id }),
                })
            } else {
                token.value = await getShareToken(id)
            }
            if (!token.value) {
                throw new Error(t('page.shareView.fileShare.getTokenFailed'))
            }
        }
        downloadFile(token.value)
    } catch (error: any) {
        toast.error(error?.data?.message || error?.message || error)
    } finally {
        queryClient.invalidateQueries({ queryKey: ['share', id] })
    }
}

const fileShareInfo = computed(() => {
    return [
        { label: t('page.shareView.fileShare.needPassword'), type: 'bool' as const, value: props?.data?.has_password ?? false },
        {
            label: t('page.shareView.fileShare.expireTime'),
            type: 'countdown' as const,
            value: props?.data?.expire_at ?? 0,
        },
        { label: t('page.shareView.fileShare.remainingDownloads'), type: 'string' as const, value: props?.data?.download_nums ?? 0 },
    ]
})
</script>

<template>
    <div class="flex flex-col gap-5 items-center">
        <h1 class="text-xl font-bold">{{ t('page.shareView.fileShare.title') }}</h1>
        <FilePreviewView :value="props?.data" />
        <ShareInfoCards :items="fileShareInfo" />
        <div class="w-full">
            <AsyncButton @click="handleDownload" class="w-full">{{ t('page.shareView.fileShare.downloadBtn') }}</AsyncButton>
        </div>
    </div>
</template>
