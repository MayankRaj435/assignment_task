import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AddBookmarkForm from '@/components/add-bookmark-form'
import BookmarkList from '@/components/bookmark-list'



export default async function Dashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                        <span className="text-xl font-bold tracking-tight">SmartBookmarks</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-400 hidden sm:block">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 border border-white/10">
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl p-4 lg:p-8">
                {/* Add Bookmark Form */}
                <section className="mb-12">
                    <AddBookmarkForm />
                </section>

                {/* Existing Bookmarks */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Your Bookmarks</h2>

                        {/* Simple filter/search placeholder */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 w-48"
                            />
                        </div>
                    </div>

                    <BookmarkList initialBookmarks={bookmarks || []} />
                </section>
            </main>
        </div>
    )
}
