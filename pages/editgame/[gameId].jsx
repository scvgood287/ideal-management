import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
// import { ExistImageArea, PrevImageArea, UploadImageArea } from '../uploadForm/index'
import ExistImageArea from './ExistImageArea'
import PrevImageArea from './PrevImageArea'
import UploadImageArea from './UploadImageArea'
import { selectGamesId, currentGameAtom, getExistImageAtom } from '../../state/state'
import { useAtom } from 'jotai'
import axios from 'axios'

const UploaderForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Post = () => {
  const router = useRouter();
  const { gameId } = router.query;
  const [current, setCurrentGame] = useAtom(currentGameAtom);
  const [, setImages] = useAtom(getExistImageAtom);

  useEffect(() => {
    if(gameId) {
      const refreshCheck = async () => {
        console.log(gameId);
        setImages(gameId);
        if (!current) {
          const response = await axios.get('/games/0');
          setCurrentGame(...response.data.data.filter((game) => game._id === gameId));
        }
      }
      refreshCheck();
    }

  }, [gameId])

  // setGameId(_id);


  if(gameId && current) {
    return (
      <UploaderForm>
        <UploadImageArea id={gameId} />
        <PrevImageArea id={current._id} tags={current.tagNames} update={current.updated} gameName={current.name} />
        <ExistImageArea />
      </UploaderForm>
  );
  } else {
    return (
      <>loading...
      {console.log(current)}</>
    );
  }
}

export default Post;