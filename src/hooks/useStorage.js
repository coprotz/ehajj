import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from './useAuth';

const useStorage = (file) => {

    const [perc, setPerc] = useState(0)
    // const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const uploadFile = () => {
      
            const name = new Date().getTime() + file.name
            console.log(name)
            
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("upload is " + progress + "% done");
                    setPerc(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log("upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (err) => {
                    setError(err)
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref)
                        setUrl(url)
                        console.log("File available at", url)
                        
                    
             
                }
             
            );
        };
        file && uploadFile()
        },[file]);

        return { perc, error, url }
}

export default useStorage;