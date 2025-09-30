// _utils/hashFilename.ts

/**
 * Generate a deterministic, hashed version of a filename.
 * - Uses SHA-256 on (salt + pathStr) for uniqueness & security
 * - Preserves the original file extension (like Python's os.path.splitext)
 *
 * @param pathStr - The original filename or path
 * @param salt - Optional salt to avoid predictable hashes
 * @returns A hex-encoded hash string with the original file extension
 */
export async function hashFilename(
    pathStr: string,
    salt = "cb92f213-0396-4a54-a9cf-ad20a69f882e"
): Promise<{ jsonUrl: string; mp3Url: string }> {
    // Step 1: Encode input as Uint8Array for hashing
    // Concatenate the salt with the input filename to avoid collisions/attacks
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + pathStr);

    // Step 2: Compute SHA-256 hash of the data (returns an ArrayBuffer)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Step 3: Convert ArrayBuffer -> byte array -> hex string
    // Each byte is converted to 2-char hex (e.g., 15 -> "0f")
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Step 4: Extract file extension (e.g., ".jpg") if present
    // Matches Python's os.path.splitext behavior
    const lastDot = pathStr.lastIndexOf(".");
    const ext = lastDot !== -1 ? pathStr.slice(lastDot) : "";
    const jsonName = hashHex + ext;

    // ---------- MP3 ----------
    const mp3LogicalPath = pathStr.replace(/\.json$/, ".mp3");
    const dataMp3 = encoder.encode(salt + mp3LogicalPath);
    const hashBufferMp3 = await crypto.subtle.digest("SHA-256", dataMp3);
    const hashArrayMp3 = Array.from(new Uint8Array(hashBufferMp3));
    const hashHexMp3 = hashArrayMp3.map((b) => b.toString(16).padStart(2, "0")).join("");
    const mp3Name = hashHexMp3 + ".mp3";

    // ---------- Buckets ----------
    const JSON_BUCKET =
        "https://ielts-practice-sets-question-data-json-files-8edfac2b-d231-4f81.s3.ap-south-1.amazonaws.com";
    const AUDIO_BUCKET =
        "https://ielts-practice-sets-question-audio-mp3-files-3f06f131-15f4-8d69.s3.ap-south-1.amazonaws.com";

    return {
        jsonUrl: `${JSON_BUCKET}/${jsonName}`,
        mp3Url: `${AUDIO_BUCKET}/${mp3Name}`,
    };
}