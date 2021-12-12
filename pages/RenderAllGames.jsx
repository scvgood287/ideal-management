import React, { useRef, useState } from 'react'
import Link from 'next/link'
import uuid from 'react-uuid'
import { useAtom } from 'jotai'
import { addGameModalToggleAtom, gameListAtom, currentGameAtom, removeModalToggleAtom } from '../state/state'
import { SepDivLeft, SepDivRight, ToggleArea, SettingArea, SettingBtn, ToggleBtn, ToggleLabel, RightWrap, GameListItem } from '../styles/RenderAllGames'
import RemoveModal from './RemoveModal'
import axios from 'axios'
import RemoveImg from '../resource/remove.png'
import EditImg from '../resource/edit.png'
import Image from 'next/image'

const RenderAllGames = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const [gameList, setGameList] = useAtom(gameListAtom);
  const [current, setCurrentGame] = useAtom(currentGameAtom);
  const [removeToggle, setRemoveToggle] = useAtom(removeModalToggleAtom);
  const clickToLink = useRef(null);

  const handleToggleChange = async (game) => {
    const { _id, isPlayable } = game;
    const games = document.getElementById(_id);
    // setGameList([{
    //   ...game,
    //   isPlayable: !isPlayable
    // }, ...gameList.filter(({ _id: gameId }) => gameId !== _id)]);
    game['isPlayable'] = !isPlayable;
    games.checked = !isPlayable;
    const response = await axios.patch(`/games/${_id}`, { isPlayable: isPlayable ? 0 : 1 });
    console.log(response);
  }

  const settingGame = (currentGame) => {
    setCurrentGame(currentGame);
  }

  const renderGame = (gameList ? gameList : []).map((game, i) => {
    const { _id, name, tagNames, imagesCount, isPlayable, updated } = game;
    console.log(_id);
    let maxRound = imagesCount <= 2 ? 0 : 2;
    if (maxRound) {
      while (maxRound * 2 <= imagesCount) {
        maxRound = maxRound * 2;
      }
    }

    return (
      <GameListItem key={uuid()}>
        <SepDivLeft>
          {console.log(maxRound)}
          <h1>{name}</h1>
          <p>최대 라운드 : <strong>{maxRound}</strong></p>
          <p>전체 이미지 : <strong>{imagesCount}</strong></p>
        </SepDivLeft>

        <SepDivRight>
          <RightWrap>
            <ToggleArea>
              <ToggleBtn key={uuid()} id={_id} onClick={(e) => { handleToggleChange(game) }} defaultChecked={isPlayable} /><ToggleLabel htmlFor={_id}></ToggleLabel>
            </ToggleArea>
            <SettingArea>
              <Link href={{
                pathname: `/editgame/[gameId]`,
                query: {
                  name: _id
                }
              }} as={`/editgame/${[_id]}`} style='display: none'>
                <SettingBtn key={uuid()} id="setting" onClick={() => settingGame(game)}>
                  <Image src={EditImg} layout='fill' objectFit='cover'/>
                </SettingBtn>
              </Link>
              <SettingBtn key={uuid()} id="remove" onClick={() => {setRemoveToggle(true), setCurrentGame(game)}}>
                <Image src={RemoveImg} layout='fill' objectFit='cover'/>
              </SettingBtn>
            </SettingArea>
          </RightWrap>
        </SepDivRight>
      </GameListItem>
    );
  });

  return (
    <>
      {removeToggle ? <RemoveModal removeId={current} from='games' /> : null}
      {renderGame}
      <div>
        {/* <iframe src='http://localhost:8081/' width='400px' height='600px' frameborder='0' framespacing='0' marginheight='0' marginwidth='0' scrolling='no' vspace='0'></iframe> */}
      </div>
    </>
    
  );

}



export default RenderAllGames;
