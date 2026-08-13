import MarkdownItAsync from 'markdown-it-async'
import { codeToHtml } from 'shiki'

let md: ReturnType<typeof MarkdownItAsync> | null = null

const getMDRenderHtml = async (markdown: string) => {
    if (!md) {
        md = MarkdownItAsync({
            async highlight(code, lang) {
                return await codeToHtml(code, { lang, theme: 'github-dark' })
            },
        })
    }
    return await md.renderAsync(markdown)
}
export default getMDRenderHtml
