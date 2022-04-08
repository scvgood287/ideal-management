import React from 'react'
import { FormDiv, ImageListForm, ViewArea, ImageWrap } from '../../styles/uploadForms'
import { selectGamesId, getExistImageAtom } from '../../state/state'
import { selectedImage, selectedFile } from '../../state/uploadState'
import { useAtom } from 'jotai'
import uuid from 'react-uuid'

const ExistImageArea = () => {
  const [gameId, setGameId] = useAtom(selectGamesId);
  const [existImage, setExistImage] = useAtom(getExistImageAtom);
  const [selectImage, setSelectImage] = useAtom(selectedImage);
  const [selectFile, setSelectedFile] = useAtom(selectedFile);
  console.log(existImage);
  console.log(selectImage);
  console.log(selectFile);
  

  const selectImages = (url,image) => {
    setSelectImage(url);
    setSelectedFile(image);
    console.log(selectImage);
  }

  return (
    <FormDiv>
      <ViewArea>
        {existImage ?
          existImage.map((image) => {
            const { host, pathname } = image.imageUrl;
            const imageUrl = `${host}/${pathname}`;

            return (
              <ImageListForm key={uuid()} onClick={() => selectImages(imageUrl,image)}>
                <ImageWrap>
                  <img src={imageUrl} alt="#" />
                </ImageWrap>
                {image.name}
              </ImageListForm> 
            )
          }) : "아직 로딩중"
      }
      </ViewArea>
    </FormDiv>
  );
}

export default ExistImageArea;