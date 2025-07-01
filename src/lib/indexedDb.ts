// lib/indexedDb.ts

export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("mockTestDB", 1)

        request.onupgradeneeded = (event) => {
            const db = request.result
            if (!db.objectStoreNames.contains("settings")) {
                db.createObjectStore("settings", { keyPath: "key" })
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

export const saveCurrentMockSection = async (value: string) => {
    const db = await openDatabase()
    const tx = db.transaction("settings", "readwrite")
    const store = tx.objectStore("settings")
    store.put({ key: "currect_mock_section", value })
    return new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error)
    })
}

export const loadCurrentMockSection = async (): Promise<string | null> => {
    const db = await openDatabase()
    return new Promise((resolve, reject) => {
        const tx = db.transaction("settings", "readonly")
        const store = tx.objectStore("settings")
        const request = store.get("currect_mock_section")

        request.onsuccess = () => {
            resolve(request.result?.value || null)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })
}