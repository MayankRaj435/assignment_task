'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated', success: false }
    }

    const url = formData.get('url') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const tags = (formData.get('tags') as string)?.split(',').map(tag => tag.trim()) || []

    // Basic validation
    if (!url || !title) {
        return { error: 'URL and Title are required', success: false }
    }

    const { error } = await supabase.from('bookmarks').insert({
        user_id: user.id,
        url,
        title,
        description,
        tags,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/dashboard')
    return { success: true, error: '' }
}


export async function deleteBookmark(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { error } = await supabase.from('bookmarks').delete().match({ id, user_id: user.id })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
