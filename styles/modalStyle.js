import styled from 'styled-components'


const ModalWrap = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: calc(100%);
  background: rgba(0,0,0,0.4);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalForm = styled.div`
  width: ${props => props.mobile ? "290px" : "660px"};
  height:${props => props.mobile ? "414px" : "500px"};
  background: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 24px;
  display: flex;

  
  flex-direction: column;
`;
const CloseModal = styled.div`
  width: 20px;
  height:20px;
  background: #000;
`;
const ModalContentsWrap = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;
const ModalHeader = styled.div`
  display: flex;
`;

const ButtonForm = styled.button`
  width: 140px;
  height: 40px;
  margin: 0 8px 0 8px;
  border-radius: 5px;
`;

export {ModalWrap, ModalForm, ModalContentsWrap, ModalHeader, CloseModal, ButtonForm};