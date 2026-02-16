'use client'

import { deleteBookmark } from '@/app/actions'
import { useState } from 'react'

interface Bookmark {
    id: string
    url: string
    title: string
    description?: string | null
    tags?: string[] | null
    created_at: string
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            setIsDeleting(true)
            await deleteBookmark(bookmark.id)
            setIsDeleting(false)
        }
    }

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {/* Fallback icon or fetch favicons later */}
                        <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 000 5.304l7.197 7.197a.75.75 0 001.06 0l1.875-1.875a.75.75 0 000-1.06l-6.197-6.197a2.25 2.25 0 013.182-3.182l4.5-4.5a3.75 3.75 0 000-5.304zM6.155 10.99A4.745 4.745 0 017.5 7.5L3.308 3.308a2.25 2.25 0 00-3.182 3.182l4.192 4.192a4.745 4.745 0 011.839.308z" clipRule="evenodd" />
                                <path d="M13.5 10.5h-9a.75.75 0 000 1.5h9a.75.75 0 000-1.5z" />
                            </svg>
                        </div>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-1">
                            {bookmark.title}
                        </a>
                    </div>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-400 p-1 rounded-md hover:bg-white/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.49 1.478l-.56 12.743a4.5 4.5 0 01-4.5 4.5h-4.656a4.5 4.5 0 01-4.5-4.5l-.56-12.743a48.818 48.818 0 01-3.878-.512.75.75 0 11.49-1.478 48.831 48.831 0 013.878-.512V4.478a2.25 2.25 0 012.25-2.25h3.75a2.25 2.25 0 012.25 2.25zM6.258 7.749l.527 11.967a3 3 0 003 3h4.656a3 3 0 003-3l.527-11.967A49.814 49.814 0 0112 7.75a49.814 49.814 0 01-5.742-.001z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {bookmark.description && (
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                        {bookmark.description}
                    </p>
                )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {bookmark.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-zinc-500">
                    {new Date(bookmark.created_at).toLocaleDateString()}
                </span>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    Visit
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    )
}
