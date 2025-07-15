// api/speaking-evaluation/s3-upload/route.ts

import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const region = process.env.AWS_REGION!
const BUCKET_NAME = process.env.AWS_BUCKET_NAME!

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const blob = formData.get("file") as File
    const filename = formData.get("filename") as string

    if (!blob || !filename) {
        return NextResponse.json({ error: "Missing file or filename" }, { status: 400 })
    }

    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: `speaking-recordings/${filename}`,
        Body: buffer,
        ContentType: blob.type || "audio/webm",
    }

    const command = new PutObjectCommand(uploadParams)

    try {
        await s3.send(command)
        const fileUrl = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/speaking-recordings/${filename}`
        return NextResponse.json({ url: fileUrl })
    } catch (err) {
        console.error("❌ Upload to S3 failed:", err)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
