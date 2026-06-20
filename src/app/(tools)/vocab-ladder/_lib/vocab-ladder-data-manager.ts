export type LadderNode = {
    id: number
    left: number
    top: number
    status: "completed" | "active" | "locked"
    icon: "check" | "star" | "book"
}

const STORAGE_KEY = "vocab-ladder-data-bigger-manager-igg"

const DEFAULT_NODES: LadderNode[] = [
    { id: 1, left: 62, top: 95, status: "active", icon: "star" },
    { id: 2, left: 36, top: 80, status: "locked", icon: "book" },
    { id: 3, left: 66, top: 65, status: "locked", icon: "book" },
    { id: 4, left: 38, top: 50, status: "locked", icon: "book" },
    { id: 5, left: 60, top: 35, status: "locked", icon: "book" },
    { id: 6, left: 30, top: 20, status: "locked", icon: "book" },
    { id: 7, left: 50, top: 5, status: "locked", icon: "book" },
    { id: 8, left: 28, top: -10, status: "locked", icon: "book" },
    { id: 9, left: 64, top: -25, status: "locked", icon: "book" },
    { id: 10, left: 40, top: -40, status: "locked", icon: "book" },
]

export function getVocabLadderDataLocalStorage(): LadderNode[] {
    if (typeof window === "undefined") { return DEFAULT_NODES }

    const data = localStorage.getItem(STORAGE_KEY)

    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NODES))
        return DEFAULT_NODES
    }

    return JSON.parse(data)
}

// marks the quiz as completed and updates the localstorage nodes data
export function markVocabQuizSetAsCompletedByUpdatingLadder() {
    const nodes = getVocabLadderDataLocalStorage()

    const currentIndex = nodes.findIndex((node) => node.status === "active")

    if (currentIndex === -1) return

    nodes[currentIndex].status = "completed"
    nodes[currentIndex].icon = "check"

    const nextNode = nodes[currentIndex + 1]

    if (nextNode) {
        nextNode.status = "active"
        nextNode.icon = "star"
    }

    // updates the localstorage nodes data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes))
}