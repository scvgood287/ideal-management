import React, { useState } from 'react'
import { addGameModalToggleAtom, gameListAtom } from '../state/state'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import axios from 'axios'

const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  font-weight: 200;
  font-size: 12px;
  border: ${props => props.err ? '1.5px solid #f95f5f':null};
  &:focus {
    border: 1.5px solid #9656c6;
    border-radius: 3px;
    outline: none;
  }
  
`;

const CreateGameBtn = styled.button.attrs(props => ({
  
}))`
  width: 100%;
  height: 40px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  background: #b27fd9;
  margin-top: 16px;
  color: #fff;
`;

const InputDesText = styled.p`
  font-weight: ${props => props.err ? '400' : '200'};
  font-size: 10px;
  margin: 4px 0 4px 0;
  color: ${props => props.err ? '#f95f5f' : '#000'};
`;

const ModalContents = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const [gameList, setGameList] = useAtom(gameListAtom);
  const [inputError, setError] = useState([false,false,false]);

  const setGameName = async() => {
    const nameValue = document.getElementById('gameNameField');
    const attrValue1 = document.getElementById('gameFeatureField1').value;
    const attrValue2 = document.getElementById('gameFeatureField2').value;
    const attrValueOption = document.getElementById('gameFeatureFieldOption').value;
    
    const isErrorInNameInput = gameList.some(({name}) => name === nameValue.value) || nameValue.value === '';
    const isErrorInAttr1 = attrValue1 === '';
    const isErrorInAttr2 = attrValue2 === '';

    const errorCheck = [isErrorInNameInput, isErrorInAttr1, isErrorInAttr2];



    if (!(isErrorInNameInput || isErrorInAttr1 || isErrorInAttr2)) {
      const body = {
        name : nameValue.value,
        tagNames : {
          main : attrValue1,
          sub: attrValue2,
          optional: attrValueOption
        }
      }

      const response = await axios.post('/games', body);
      setGameList([...gameList, response.data.data[0]]);
      setToggle(!addGameToggle);
    };

    setError(errorCheck);
  }


  return (
    <>
      <InputDesText id='gameNameDes' err={inputError[0]}>Game Name { inputError[0] ?  " - Error : Already exist name.": null}</InputDesText>
      <ModalInput id='gameNameField' err={inputError[0]} type="text" placeholder="Type game's name" />

      <InputDesText id='attr1' err={inputError[1]}>Attribute 1</InputDesText>
      <ModalInput id='gameFeatureField1' err={inputError[1]} type="text" placeholder="Type Feature 1" />

      <InputDesText id='attr2' err={inputError[2]}>Attribute 2</InputDesText>
      <ModalInput id='gameFeatureField2' err={inputError[2]} type="text" placeholder="Type Feature 2" />

      <InputDesText>Attribute Optional</InputDesText>
      <ModalInput id='gameFeatureFieldOption' type="text" placeholder="Type Feature Option" />
      <CreateGameBtn id='gameCreateBtn' onClick={() => { setGameName() }}>Create Games</CreateGameBtn>
    </>
  );
}
export default ModalContents;