const DB_NAME = "userSessionDB"
const DB_VERSION = 1
const STORE_NAME = "session"

// Utility: Open the IndexedDB
function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME)
            }
        }

        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })
}

// Generic setter
async function saveToIndexedDB(key: string, value: string): Promise<void> {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    store.put(value, key)
    await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
    })
}

// Generic getter
async function getFromIndexedDB(key: string): Promise<string | null> {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve, reject) => {
        const request = store.get(key)
        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
    })
}

// Generic remover
async function clearFromIndexedDB(key: string): Promise<void> {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    store.delete(key)
    await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
    })
}

// Public API
export async function saveStudentId(id: string) {
    return saveToIndexedDB("studentId", id)
}

export async function getStudentId() {
    return getFromIndexedDB("studentId")
}

export async function clearStudentId() {
    return clearFromIndexedDB("studentId")
}

export async function savePartnerId(id: string) {
    return saveToIndexedDB("partnerId", id)
}

export async function getPartnerId() {
    return getFromIndexedDB("partnerId")
}

export async function clearPartnerId() {
    return clearFromIndexedDB("partnerId")
}