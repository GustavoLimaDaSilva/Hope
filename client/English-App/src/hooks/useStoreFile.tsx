import { useEffect, useRef, useState } from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import type { StateSetter } from "../types/react";

export default function useStoreFile<T>(dataSetter: StateSetter<T[] | []>) {

    const [fileUrl, setFileUrl] = useState<string | undefined>();
    const [file, setFile] = useState<File | {}>()
    const abortController = new AbortController()

    useEffect(() => {
        if (!fileUrl) return

        dataSetter(prev => [...prev.slice(0, prev.length - 1),
        { ...prev[prev.length - 1], imageUrl: fileUrl }]
        )

        setFile(undefined)
        setFileUrl(undefined)
    }, [fileUrl])


    uploadFile()

    return [file, setFile]

    async function uploadFile() {

        if (!file) return;


        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                abortSignal: abortController.signal,
            });
            setFileUrl(uploadResponse.url)
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };
}
async function authenticator() {
    try {

        const response = await fetch("http://localhost:3000/auth/imageKit");

        if (!response.ok) {

            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};