const STORAGE_PREFIX = 'logrecap:custom-material:'

export const readCustomMaterial = (topicSlug) => {
  if (typeof window === 'undefined' || !topicSlug) return []

  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${topicSlug}`)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Gagal membaca materi tambahan:', error)
    return []
  }
}

export const writeCustomMaterial = (topicSlug, sections) => {
  if (typeof window === 'undefined' || !topicSlug) return

  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${topicSlug}`, JSON.stringify(sections))
  } catch (error) {
    console.error('Gagal menyimpan materi tambahan:', error)
  }
}
