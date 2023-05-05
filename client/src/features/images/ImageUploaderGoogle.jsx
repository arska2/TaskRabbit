import { useState } from 'react';
import { useCreateImageInfoMutation, useGetImageInfoQuery, useUpdateImageInfoMutation } from '../../main/apiSlice';
import { useSelector } from 'react-redux';
import { Storage } from '@google-cloud/storage';


const storage = new Storage({
    projectId: 'test-project-381905',
    keyFilename: './test-project-381905-66810c80ec58.json', // path to your service account key file
});

export default function ImageUploader({ imageType }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const user = useSelector(state => state.userReducer.user);
    const [createImageInfo] = useCreateImageInfoMutation()
    const [updateImageInfo] = useUpdateImageInfoMutation()
    const { data: imageInfo, isLoading: isLoadingInfo } = useGetImageInfoQuery(user.id)

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    }

    const uploadToBucket = async () => {
        if (!file) {
            return;
        }
        const bucketName = 'taskrabbit-bucket';
        const bucket = storage.bucket(bucketName);
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const fileRef = bucket.file(fileName);
        const fileStream = file.createReadStream();
        await fileStream.pipe(fileRef.createWriteStream());
        const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        console.log('Image at', url);
        console.log('ImageInfo', imageInfo);

        if (imageInfo == null) {
            if (imageType === 'profile') createImageInfo({ profileId: user.id, profileImageUrl: url }).unwrap().then(response => console.log(response))
            if (imageType === 'header') createImageInfo({ profileId: user.id, headerImageUrl: url }).unwrap().then(response => console.log(response))
        } else {
            if (imageType === 'profile') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: url, headerImageUrl: imageInfo?.headerImageUrl }).unwrap().then(response => console.log(response))
            if (imageType === 'header') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: imageInfo?.profileImageUrl, headerImageUrl: url }).unwrap().then(response => console.log(response))
        }
        setImageUrl(url);
    }

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            {file && (
                <div style={{ marginTop: '10px' }}>
                    <button onClick={uploadToBucket}>Upload</button>
                </div>
            )}
            {imageUrl && (
                <div style={{ marginTop: '10px', width: '200px' }}>
                    <img src={imageUrl} alt="uploaded" />
                </div>
            )}
        </div>
    );
}
