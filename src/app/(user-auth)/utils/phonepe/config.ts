export const getPhonePeBaseUrl = () => {
    return process.env.NODE_ENV === "production"
        ? "https://api.phonepe.com/apis/pg"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox";
};