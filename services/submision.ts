import { supabase } from "@/lib/supabase"

export async function fetchData() {
    const { data, error } = await supabase.from('submissions').select('*')
    if (error) throw error
    return data
}

export async function uploadFile({ file }: { file: File }) {
    const filePath = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

    return data.publicUrl
}

export async function insertSubmission({ name, promile, photo_url }: { name: string, promile: string, photo_url: string | null }) {
    const { error } = await supabase.from('submissions').insert({
        name,
        promile: parseFloat(promile),
        photo_url,
    })
    if (error) throw error
}
