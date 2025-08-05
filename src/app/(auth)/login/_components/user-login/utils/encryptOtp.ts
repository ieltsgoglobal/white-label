const SECRET_KEY = "otpSecret123"

export function simpleEncryptOtp(otp: string): string {
    const otpChars = otp.split("")
    const keyChars = SECRET_KEY.split("")
    const encryptedChars = otpChars.map((char, i) => {
        const otpCode = char.charCodeAt(0)
        const keyCode = keyChars[i % keyChars.length].charCodeAt(0)
        return String.fromCharCode(otpCode ^ keyCode)
    })
    return btoa(encryptedChars.join("")) // Base64 encode
}

export function simpleDecryptOtp(encryptedOtp: string): string {
    const decoded = atob(encryptedOtp)
    const chars = decoded.split("")
    const keyChars = SECRET_KEY.split("")
    const decryptedChars = chars.map((char, i) => {
        const charCode = char.charCodeAt(0)
        const keyCode = keyChars[i % keyChars.length].charCodeAt(0)
        return String.fromCharCode(charCode ^ keyCode)
    })
    return decryptedChars.join("")
}