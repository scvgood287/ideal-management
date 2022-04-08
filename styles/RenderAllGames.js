import styled from 'styled-components'

const SepDivLeft = styled.div`
& > h1 {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  margin: 0;
  margin-bottom: 8px;
}
& > p {
  font-size: 12px;
  font-weight: light;
  letter-spacing: -0.5px;
  margin: 0;
}
`;
const SepDivRight = styled.div`
display: flex;
flex-direction: row;

margin-left: auto;
`;
const ToggleArea = styled.div`
display: flex;
justify-content: flex-end;
flex: 1;
`;
const SettingArea = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
flex: 1;
`;
const SettingBtn = styled.div`
width: 20px;
height: 20px;
margin-left: 8px;
position: relative;
&:hover {
  border: 1px solid #000;
  
}
`;

const RightWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
width: 100%;
`;

const GameListItem = styled.div`
width: 291px;
height: 103px;
padding: 16px;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
border-radius: 10px;
display: flex;


& > SepDivLeft {
  display: flex;
  flex: 1;
}
& > SepDivRight {
  display: flex;
  flex: 1;
}
`;

const ToggleBtn = styled.input.attrs(props => ({
type: 'checkbox',
}))`
height: 0;
width: 0;
visibility: hidden;

&:checked + label {
  background: #9656c6;
}
&:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

`;
const ToggleLabel = styled.label.attrs(props => ({

}))`
  cursor: pointer;
  text-indent: -9999px;
  width: 37px;
  height: 20px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  &:active:after {
    width: 18px;
  }
`;
const GameSettingModal = styled.div`
width: 400px;
height: 500px;
display: fixed;
position: absolute;
z-index: 999;
border: 1px solid #000;
background: #fff;
`;

export {SepDivLeft, SepDivRight, ToggleArea, SettingArea, SettingBtn, ToggleBtn, ToggleLabel, RightWrap, GameListItem, GameSettingModal};