// lib/indexedDb.ts
// used for storing, in which section we are (reading or listening)

const DB_NAME = "testSessionDB"
const DB_VERSION = 1
const STORE_NAME = "settings"

export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME) // ✅ simple key-value store
            }
        }

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export const saveCurrentMockSection = async (value: string): Promise<void> => {
    const db = await openDatabase()
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    store.put(value, "current_mock_section") // ✅ cleaner
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
    })
}

export const loadCurrentMockSection = async (): Promise<string | null> => {
    const db = await openDatabase()
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    const request = store.get("current_mock_section")

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
    })
}


// ---------- Handle IsReviewMode is ON/OFF --------------
// SETTER
export const setReviewMode = async (value: boolean): Promise<void> => {
    const db = await openDatabase()
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put(value, "is_review_mode")
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
    })
}

// GETTER
export const getReviewMode = async (): Promise<boolean> => {
    const db = await openDatabase()
    const tx = db.transaction(STORE_NAME, "readonly")
    const request = tx.objectStore(STORE_NAME).get("is_review_mode")
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(Boolean(request.result))
        request.onerror = () => reject(request.error)
    })
}