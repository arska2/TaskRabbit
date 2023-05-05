import AWS from 'aws-sdk';
import { useState } from 'react';
import { useCreateImageInfoMutation, useGetImageInfoQuery, useUpdateImageInfoMutation } from '../../main/apiSlice';
import { useSelector } from 'react-redux';
import { width } from '@mui/system';


AWS.config.update({
  accessKeyId: 'AKIA5T564YYYPJWIH6AU',
  secretAccessKey: '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',
  region: 'eu-north-1',
  signatureVersion: 'v4',
});

export default function ImageUploader({ imageType }) {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const user = useSelector(state => state.userReducer.user);
  const [createImageInfo] = useCreateImageInfoMutation()
  const [updateImageInfo] = useUpdateImageInfoMutation()
  const { data: imageInfo, isLoading: isLoadingInfo } = useGetImageInfoQuery(user.id)




  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  }
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: 'taskappbucket',
      Key: `${Date.now()}.${file.name}`,
      Body: file
    };
    const { Location } = await s3.upload(params).promise();
    console.log('Image at', Location)
    console.log('ImageInfo', imageInfo)
    if (imageInfo == null) {
      if (imageType === 'profile') createImageInfo({ profileId: user.id, profileImageUrl: Location }).unwrap().then(response => console.log(response))
      if (imageType === 'header') createImageInfo({ profileId: user.id, headerImageUrl: Location }).unwrap().then(response => console.log(response))

    } else {
      if (imageType === 'profile') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: Location, headerImageUrl: imageInfo?.headerImageUrl }).unwrap().then(response => console.log(response))
      if (imageType === 'header') updateImageInfo({ id: imageInfo.id, profileId: user.id, profileImageUrl: imageInfo?.profileImageUrl, headerImageUrl: Location }).unwrap().then(response => console.log(response))

    }
    setImageUrl(Location);

  }



  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={uploadToS3}>Upload</button>
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