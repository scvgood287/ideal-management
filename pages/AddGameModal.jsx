import { useAtom } from 'jotai';
import styled from 'styled-components'
import React, {memo,} from 'react'
import { addGameModalToggleAtom } from '../state/state'
import ModalContents from './ModalContents'
import {ModalWrap, ModalForm, ModalContentsWrap, ModalHeader, CloseModal} from '../styles/modalStyle'


const AddGameModal = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  // const bodys = addGameToggle ? document.getElementsByTagName('body') : null;
  
  return(
    <ModalWrap>
      <ModalForm>
        <ModalHeader>
          <CloseModal onClick={() => {
            document.getElementsByTagName("body").overflow = "visible";
            setToggle(!addGameToggle);
          }}/>
        </ModalHeader>
        <ModalContentsWrap>
          <ModalContents/>
        </ModalContentsWrap>
      </ModalForm>
    </ModalWrap>
  );
}

export default memo(AddGameModal);