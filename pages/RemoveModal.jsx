import React from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { ModalWrap, ModalForm, ModalContentsWrap, ModalHeader, ButtonForm } from '../styles/modalStyle'
import { gameListAtom, removeModalToggleAtom, getExistImageAtom } from '../state/state'
import { selectedFile, selectedImage } from '../state/uploadState'
import axios from 'axios'

const RemoveModalForm = styled(ModalForm)`
  width: 380px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled(ButtonForm)`

  color: #fff;
  border: none;
  background: #9656c6;

  &:hover {
    background: #b477e1;
    transition: 0.2s ease-out;
  }
`;

const RemoveBtn = styled(ButtonForm)`
  color: #f95f5f;
  border: 1px solid #f95f5f;
  background: #fff;
  font-weight: 500;
  
  &:hover {
    background: #f95f5f;
    border: none;
    color: #fff;
    transition: 0.2s ease-in;
}
`;




const RemoveModal = ({ removeId, from, resetValue = null }) => {
  const [gameList, setGameList] = useAtom(gameListAtom);
  const [, setRemoveToggle] = useAtom(removeModalToggleAtom);
  const [selectFile, setSelectedFile] = useAtom(selectedFile);
  const [selectImage, setSelectImage] = useAtom(selectedImage);
  const [existImage, setExist] = useAtom(getExistImageAtom);

  console.log(removeId);


  const removeGame = async (key) => {
    const newGames = [...gameList];
    const findItem = newGames.find(game => game._id === key);
    const idx = newGames.indexOf(findItem);
    newGames.splice(idx, 1);
    setGameList(newGames);
    const response = await axios.delete(`/games/${key}`);
    setRemoveToggle(false);
  }

  const removeFiles = async (key) => {

    const { tagMainValue, tagSubValue, tagOptionValue } = resetValue;
    const response = await axios.delete(`/images/${key}`);
    console.log(selectFile);
    setExist(removeId);
    setSelectedFile();
    setSelectImage();
    setRemoveToggle(false);

    tagMainValue.value = '';
    tagSubValue.value = '';
    tagOptionValue.value = '';
  }

  return (
    <>
      {from === 'games' ?
        <ModalWrap>
          <RemoveModalForm>
            <h3 style={{ fontWeight: '500', margin: '0' }}>정말 삭제하시겠습니까?</h3>
            <p>한번 삭제된 게임은 복구할 수 없습니다</p>
            <ModalHeader>
              <RemoveBtn onClick={() => removeGame(removeId._id)}>삭제</RemoveBtn>
              <CloseBtn onClick={() => setRemoveToggle(false)}>취소</CloseBtn>
            </ModalHeader>
          </RemoveModalForm>
        </ModalWrap> :

        <ModalWrap>
          <RemoveModalForm>
            <h3 style={{ fontWeight: '500', margin: '0' }}>정말 삭제하시겠습니까?</h3>
            <p>한번 삭제된 이미지는 복구할 수 없습니다</p>
            <ModalHeader>
              <RemoveBtn onClick={() => removeFiles(selectFile._id)}>삭제</RemoveBtn>
              <CloseBtn onClick={() => setRemoveToggle(false)}>취소</CloseBtn>
            </ModalHeader>
          </RemoveModalForm>
        </ModalWrap>}

    </>
  );
}

export default RemoveModal;