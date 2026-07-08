<script setup lang="ts">
import { LucideAlertCircle } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dayjs from 'dayjs'
import FileShareView from '@/components/Share/FileShareView.vue'
import TextShareView from '@/components/Share/TextShareView.vue'
import { useQuery } from '@tanstack/vue-query'
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const id = computed(() => route.params.id)

const { data, isLoading, error } = useQuery({
    queryKey: ['share', id.value],
    queryFn: async () => {
        const data = await $fetch<{
            code: number
            data: {
                id?: string
                expire_at?: number
                type?: string
            }
        }>(`/api/share/${id.value}`)
        return data?.data
    },
    retry: false,
})

const isExpired = computed(() => {
    const { expire_at } = data.value || {}
    return !data || !expire_at || dayjs(expire_at * 10e2).isBefore(dayjs())
})

const componentMap = {
    file: FileShareView,
    text: TextShareView,
}
</script>

<template>
    <BaseCard class="my-5 overflow-hidden">
        <div v-if="isLoading" class="flex flex-col items-center gap-5">
            <Skeleton class="h-6 w-32 rounded-md" />
            <Skeleton class="size-16 rounded-xl" />
            <Skeleton class="h-5 w-28 rounded-md" />
            <div class="flex w-full flex-col gap-2 md:flex-row">
                <div
                    v-for="i in 3"
                    :key="i"
                    class="flex min-h-11 flex-1 items-center justify-between gap-1 rounded-xl bg-black/5 px-3 py-2 md:flex-col md:items-start md:justify-between"
                >
                    <Skeleton class="h-3 w-16 rounded-md bg-black/10" />
                    <Skeleton v-if="i === 1" class="size-7 rounded-full bg-white/50" />
                    <Skeleton v-else class="h-6 w-16 rounded-md bg-black/10" />
                </div>
            </div>
            <Skeleton class="h-10 w-full rounded-md" />
        </div>
        <template v-else>
            <div v-if="isExpired || !data" class="flex flex-col gap-5 items-center">
                <LucideAlertCircle :size="48" class="text-orange-500 rounded-full bg-orange-500/30 p-2" />
                <div class="text-xl">{{ t('page.shareView.linkExpired') }}</div>
                <Button
                    @click="
                        () => {
                            router.push('/')
                        }
                    "
                    >{{ t('btn.backToHome') }}</Button
                >
            </div>
            <template v-else>
                <component :is="componentMap[data?.type as keyof typeof componentMap] || 'div'" :data="data" />
            </template>
        </template>
    </BaseCard>
</template>
