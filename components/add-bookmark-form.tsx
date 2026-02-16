'use client'

import { addBookmark } from '@/app/actions'
import { useActionState } from 'react'

const initialState = {
    error: '',
    success: false,
}

export default function AddBookmarkForm() {
    const [state, formAction, isPending] = useActionState(addBookmark, initialState)

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-1">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            <div className="relative rounded-xl bg-black/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Add New Bookmark</h2>

                {state?.error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-200">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-200">
                        Bookmark added successfully!
                    </div>
                )}

                <form action={formAction} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <input
                            name="url"
                            type="url"
                            placeholder="https://example.com"
                            required
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 transition focus:bg-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            name="title"
                            type="text"
                            placeholder="Bookmark Title"
                            required
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 transition focus:bg-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <input
                        name="description"
                        type="text"
                        placeholder="Description (optional)"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 transition focus:bg-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <input
                        name="tags"
                        type="text"
                        placeholder="Tags (comma, separated)"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 transition focus:bg-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            disabled={isPending}
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Saving...' : 'Save Bookmark'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
