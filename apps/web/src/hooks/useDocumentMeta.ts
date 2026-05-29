import { useEffect } from 'react'

/**
 * Sets <title> and <meta name="description"> on mount, restores on unmount.
 * Lightweight SEO helper — for full prerendering we'd add react-helmet-async,
 * but for client-side React with a modern crawler (Google runs JS) this is enough.
 */
export function useDocumentMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDesc = meta?.content
    if (description) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    return () => {
      document.title = prevTitle
      if (meta && prevDesc !== undefined) meta.content = prevDesc
    }
  }, [title, description])
}
