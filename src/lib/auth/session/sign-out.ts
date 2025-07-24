// lib/auth/session/signout.ts

export const signOut = async (): Promise<boolean> => {
    try {
        const res = await fetch("/api/auth/signout", {
            method: "POST",
        });

        if (!res.ok) {
            console.error("Sign out failed");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error during sign out:", error);
        return false;
    }
};