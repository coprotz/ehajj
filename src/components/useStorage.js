import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../hooks/useAuth";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = ref(storage, file?.name);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            // storageRef.put(file).on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage)
        }, (err) => {
            setError(err);
        }, async () => {
            // const url = await storageRef.getDownloadURL()
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            setUrl(url)
        })
    }, [file])

    return { progress, error, url }
}

export default useStorage;