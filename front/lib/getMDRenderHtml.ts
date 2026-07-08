import MarkdownItAsync from 'markdown-it-async'

let md: ReturnType<typeof MarkdownItAsync> | null = null

const getMDRenderHtml = (markdown: string) => {
    if (!md) {
        md = MarkdownItAsync({
            async highlight(code, lang) {
                const { codeToHtml } = await import('shiki')
                return await codeToHtml(code, { lang, theme: 'vitesse-dark' })
            },
        })
    }
    return md.render(markdown)
}
export default getMDRenderHtml
