import React, { useState, memo, useEffect } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import axios from 'axios'
import { selectedImage, selectedFile, uploadedFilesLengthAtom, uploadFiles, sepUploadFiles } from '../../state/uploadState'
import { getExistImageAtom, removeModalToggleAtom, editedFileCheckToggleAtom } from '../../state/state'
import { FormDiv, TypeTagsInput, PrevImageWrap, ViewArea} from '../../styles/uploadForms'
import RemoveModal from '../RemoveModal'

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`;
const CTA = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  font-weight: 500;
`;

const ServerRequestCTA = styled(CTA)`
  color: #fff;
  border: none;
  background: #9656c6;
  border-radius: 5px;
  &:hover {
    background: #b477e1;
    transition: 0.2s ease-out;
  }

`;

const RemoveFileCTA = styled(CTA)`
  color: #f95f5f;
  border: 2px solid #f95f5f;
  background: #f9f9f9;
  font-weight: 500;
  border-radius: 5px;
  &:hover {
    background: #f95f5f;
    border: none;
    color: #fff;
    transition: 0.2s ease-in;
  }
`;

const PrevImageArea = ({ id, tags, update, gameName }) => {
  if (tags) {
    const { main, sub, optional } = tags;
  console.log(id);
  const [selectImage, setSelectImage] = useAtom(selectedImage);
  const [selectFile, setSelectedFile] = useAtom(selectedFile);
  const isTagsAvailable = selectFile ? selectFile.hasOwnProperty('tags') : false;

  const [addedFiles, setFiles] = useState([]);
  const [toPostFiles, setPostFiles] = useState();
  const [fileLength,] = useAtom(uploadedFilesLengthAtom);
  const [checked, setChecked] = useState(0);
  const [existImage, setExist] = useAtom(getExistImageAtom);
  const [uploadFile, setUploadFile] = useAtom(uploadFiles);
  const [sepUploadFile, setSepFile] = useAtom(sepUploadFiles);
  const [removeToggle, setRemoveToggle] = useAtom(removeModalToggleAtom);
  const [editCheck, setEdited] = useAtom(editedFileCheckToggleAtom);

  const tagMainValue = document.getElementById('main');
  const tagSubValue = document.getElementById('sub');
  const tagOptionValue = document.getElementById('option');
  const removeCTA = document.getElementById('removebtn');
  const postCTA = document.getElementById('postbtn');

  console.log(selectFile);
  

  useEffect(() => {
    if(checked == fileLength) {
      console.log("same");
      setSelectImage();
      postCTA ? postCTA.focus() : null;
    }
    
  }, [checked, postCTA])



  if (selectFile) {
    selectFile.hasOwnProperty('tags') ?
      (tagMainValue.value = selectFile.tags.main,
        tagSubValue.value = selectFile.tags.sub,
        tagOptionValue.value = selectFile.tags.optional,
        removeCTA.removeAttribute('disabled')) :
      (tagMainValue ?
        (tagMainValue.value = '',
          tagSubValue.value = '',
          tagOptionValue.value = '',
          removeCTA.setAttribute('disabled', 'disabled'),
          tagMainValue.placeholder = main,
          tagSubValue.placeholder = sub,
          tagOptionValue.placeholder = optional) : null);
  }

  console.log(checked + '/' + fileLength);



  let fileList = [];
  let imageUrl = selectImage ? selectImage : null;



  const setFileTags = (selectFilesInfo) => {

    let newFileList = [...addedFiles];
    let editUploadFile = [...uploadFile];
    let editedUploadFile = [...uploadFile];
    selectFilesInfo.edited = true;

    const combFile = {
      gameId: id,
      tags: {
        main: tagMainValue.value,
        sub: tagSubValue.value,
        optional: tagOptionValue.value,
      },
      name: `${tagMainValue.value}-${tagSubValue.value}${tagOptionValue.value ? '-' + tagOptionValue.value : ''}`,
      imageUrl: selectFilesInfo
    };

    // 수정된 파일 목록에서 삭제
    const filteredEditedFile = editUploadFile.filter((item) =>item.edited === false);
    const filteredAfterEditeFile = editUploadFile.filter((item) => item.edited === true);
    console.log(filteredEditedFile);
    console.log(filteredAfterEditeFile);
    setUploadFile(filteredEditedFile);
    setSepFile(filteredAfterEditeFile);


    Object.values(uploadFile).map((file) => {
      const blob = file.slice(0, file.size, 'image/jpg');
      const newFile = new File([blob], `${id}/${combFile.name}`, { type: 'image/png' });
      console.log(newFile);
    });

    newFileList.push(combFile);
    setFiles(newFileList);
    console.log(newFileList);

    const filteredFileList = (newFileList ? newFileList : [])
      .filter((item, index, arr) =>
        arr.findIndex(compare => (compare.name === item.name)) === index);

    console.log(checked);
    console.log(filteredFileList);
    setChecked(filteredFileList.length);
    setPostFiles(filteredFileList);
    checked == filteredFileList.length ? setSelectImage() : null;
    tagMainValue.focus();
    tagMainValue.value = '';
    tagSubValue.value = '';
    tagOptionValue.value = '';


  }



  const postFiles = async () => {

    await Promise.all(toPostFiles.map(async (toPostFile) => {
      const formData = new FormData();
      formData.append(`${gameName}`, toPostFile.imageUrl);

      const { data } = await axios.post(`/toS3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { imageUrl } = data;
      const response = await axios.post(`/images/${id}`, { ...toPostFile, imageUrl });
      console.log(response.data.data);
    }));

    setExist(id);
    setSelectImage(null);
    setChecked(0);
    setFiles([]);
    setPostFiles();
  }

  const patchFiles = async () => {

    const body = {
      tags: {
        main: tagMainValue.value,
        sub: tagSubValue.value,
        optional: tagOptionValue.value
      },
      name: `${tagMainValue.value}-${tagSubValue.value}${tagOptionValue.value ? '-' + tagOptionValue.value : ''}`
    }
    const response = await axios.patch(`/images/${selectFile._id}`, body);
    console.log(response.data);
    setSelectedFile();
    setExist(id);
    setSelectImage();
    setChecked(0);
    setFiles([]);
    setPostFiles();
    tagMainValue.value = '';
    tagSubValue.value = '';
    tagOptionValue.value = '';
  }





  return (
    <>
    {removeToggle ? <RemoveModal removeId={id} from='files' resetValue={{tagMainValue, tagSubValue, tagOptionValue}}/> : null}
    <FormDiv style={{width:'400px'}}>
      <ViewArea>
        <PrevImageWrap>
          <img src={imageUrl} alt="" />
        </PrevImageWrap>
        <InputWrap>
          <TypeTagsInput tabIndex='1' id='main' type="text" placeHolder={main} />
          <TypeTagsInput tabIndex='2' id='sub' type="text" placeHolder={sub} />
          <TypeTagsInput tabIndex='3' id='option' type="text" placeHolder={optional} />
          {isTagsAvailable ? <ServerRequestCTA onClick={() => patchFiles()}>수정</ServerRequestCTA>:
            (checked == fileLength ?
              <ServerRequestCTA id='postbtn' onClick={() => postFiles()}>업로드</ServerRequestCTA>:
              <ServerRequestCTA id='addbtn' onClick={() => { selectFile ? (tagMainValue.value === '' && tagSubValue.value === '' ? null : setFileTags(selectFile)) : null }}>추가</ServerRequestCTA>)}
          <RemoveFileCTA id='removebtn' onClick={() => { selectFile ? setRemoveToggle(true) : null }}>삭제</RemoveFileCTA>
        </InputWrap>
      </ViewArea>
    </FormDiv>
    </>
  );
  } else {
    return (<div>Loading</div>)
  }
}


export default memo(PrevImageArea);



