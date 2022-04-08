import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { selectedImage, selectedFile, uploadedFilesLengthAtom, uploadFiles, sepUploadFiles } from '../../state/uploadState'
import { editedFileCheckToggleAtom } from '../../state/state'
import { FormDiv, ImageListForm, ImageWrap, ViewArea } from '../../styles/uploadForms'

const UploadCTA = styled.div`
  width: 100%;
  height: 40px;
  background: #f9f9f9;
  margin-bottom: 16px;
  border-radius: 7px;
`;

const SepCTAWrap = styled.div`
  display: flex;
`;


const UploadImageArea = ({ id }) => {
  const [files, setFiles] = useState(null);
  const uploadFileInputRef = useRef(null);
  const [, setSelectImage] = useAtom(selectedImage);
  const [, setSelectFile] = useAtom(selectedFile);
  const [uploadFile, setUploadFiles] = useAtom(uploadFiles);
  const [fileLength, setLength] = useAtom(uploadedFilesLengthAtom);
  const [editCheck, setEdited] = useAtom(editedFileCheckToggleAtom);
  const [sepUploadFile, setSepFile] = useAtom(sepUploadFiles);
  let newFileList = [];

  useEffect(() => {
    if (uploadFile) {
      if (uploadFile.length) {
        const imageUrl = URL.createObjectURL(uploadFile[0]);
        setSelectImage(imageUrl);
        setSelectFile(uploadFile[0]);
      }
    } else {
      setSelectImage(null)
      setSelectFile(null)
    }
  }, [uploadFile])

  const changeByUploadedImages = (e) => {
    const filesInfo = [...e.target.files];
    const uploadFiles = document.getElementById('fileUpload');
    const imageUrl = URL.createObjectURL(filesInfo[0]);


    console.log(uploadFiles.files);
    console.log(newFileList);
    setUploadFiles(uploadFiles.files);
    setFiles(filesInfo);
    setSelectFile(uploadFiles.files[0]);
    setLength(filesInfo.length);
    setSelectImage(imageUrl);
  }

  const clickUploadBtn = () => {
    uploadFileInputRef.current.click();
  }

  const selectImage = (imageURL, File) => {
    console.log(File._id);
    setSelectImage(imageURL);
    setSelectFile(File);
  }

  const renderUploadImage = (uploadFile ? Object.values(uploadFile) : [])
    .map((image) => {
      const imageURL = URL.createObjectURL(image);
      image['gameId'] = id;
      image['edited'] = false;
      console.log(image);

      return (
        files ?
          <ImageListForm onClick={() => selectImage(imageURL, image)}>
            <ImageWrap>
              <img src={imageURL} alt="#" />
            </ImageWrap>
            {image.name}
          </ImageListForm> : null
      );
    })

  const renderEditedImage = (editCheck ? Object.values(sepUploadFile) : [])
    .map((image) => {
      const imageURL = URL.createObjectURL(image);
      image['edited'] = true;
      return (
        files ?
          <ImageListForm onClick={() => selectImage(imageURL, image)}>
            <ImageWrap>
              <img src={imageURL} alt="#" />
            </ImageWrap>
            {image.name}
          </ImageListForm> : null
      );
    })

  return (
    <FormDiv>
      <input id='fileUpload' type="file" multiple onChange={changeByUploadedImages} hidden ref={uploadFileInputRef} />
      <UploadCTA onClick={() => clickUploadBtn()}></UploadCTA>
      {/* <SepCTAWrap>
        <div onClick={() => setEdited(false)}>수정 전</div>
        <div onClick={() => setEdited(true)}>수정 후</div>
      </SepCTAWrap> */}
      <ViewArea>
        {renderUploadImage}
        {console.log(files)}
      </ViewArea>
    </FormDiv>
  );
}

export default UploadImageArea;