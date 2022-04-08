import styled from 'styled-components'
import React from 'react'
import AddGameModal from './AddGameModal'
import { useAtom } from 'jotai'
import { addGameModalToggleAtom, fetchDataSetAtom } from '../state/state'
import RenderAllGames from './RenderAllGames'



const Grid = styled.div`
  display: grid;
  grid-auto-rows: minmax(102px, auto);
  grid-template-columns: repeat(3, 291px);
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
`;

const CreateGameBtn = styled.button`
  width: 291px;
  height: 102px;

`;


const Home = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const [test,] = useAtom(fetchDataSetAtom);
  console.log(test);

  return (
    <>
      {addGameToggle ? <AddGameModal /> : null}
      {test ?
        <>
          <Grid>
            <CreateGameBtn onClick={() => {
              document.getElementsByTagName("body").overflow = "hidden";
              setToggle(!addGameToggle);
            }} />
            <RenderAllGames />
          </Grid>
        </> :
        console.log("render Fail")}
    </>
  )
}
export default Home;


// const GameSchema = new Schema({
//   _id
//   isPlayable: { type: Number, default: 0, min: 0, max: 1, },
//   playCount: { type: Number, default: 0, min: 0, },
//   updated: { type: Date, default: Date.now(), index: 1 },
//   name: { type: String, required: true, unique: true, },
//   imagesCount: { type: Number, default: 0, min: 0, },
//   tagNames: {
//     main: { type: String, required: true, },
//     sub: { type: String, required: true, },
//     optional: { type: String, },
//   },
// });