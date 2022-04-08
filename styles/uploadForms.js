import styled from 'styled-components'

 const FormDiv = styled.div`
  width: 376px;
  height: 700px;
  background: #dfdfdf;
  margin: 0 8px 0 8px;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  

`;

 const ImageListForm = styled.div`
  width: 100%;
  height: 70px;
  background: #ffffff;
  margin: 0px 0 16px 0;
  filter: drop-shadow(0px 4px 10px rgba(171, 171, 171, 0.3));
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 4px;
  & > p {

  }
`;

 const ImageWrap = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: px;
  & > img {
    width: 60px;
    height: auto;
  }
`;

 const TypeTagsInput = styled.input`
  margin-top: 8px;
  height: 40px;
  width: 100%;
  border: ${props => props.err ? '1.5px solid #f95f5f':null};
  font-size: 12px;
  font-weight: 200;
  &:focus {
    border: 2px solid #9656c6;
    border-radius: 3px;
    outline: none;
  }
`;

 const PrevImageWrap = styled.div`
display: flex;
width: 350px;
height: 350px;
align-items: center;
justify-content: center;

  & > img {
    max-width: 350px;
    max-height: 350px;
    overflow: hidden;
    
  }
`;

 const ViewArea = styled.div`
width: 100%;
height: 100%;
background: #f9f9f9;
border-radius: 7px;
padding: 16px;
overflow: scroll;
`;

 export {FormDiv,ImageListForm,ImageWrap,TypeTagsInput,PrevImageWrap,ViewArea};