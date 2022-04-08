import { atom, useAtom } from 'jotai'
import axios from 'axios'
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/ideals`;
//const getDataUrlAtom = atom('http://pnpserver-av2.ap-northeast-2.elasticbeanstalk.com/api/ideals/games/0');
// const fetchUrlAtom = atom(async (get) => {
//   const response = await fetch(get(getDataUrlAtom));
//   return await response.json
// });
// const response = async () => {
//   const result = await axios.get();
//   return result;
// }



const gameListAtom = atom();

const fetchDataSetAtom = atom((get) => get(gameListAtom),
  (_get,set,url) => {
  const fetchData = async () => {
    //set(testAtom, (prev) => ({...prev, loading: true}));
    try {
      const response = await axios.get(url);
      
      set(gameListAtom, response.data.data);
      console.log(response.data.links);
    } catch (e) {
      set(gameListAtom, e)
    }
  }
  fetchData();
});

fetchDataSetAtom.onMount = (x) => {
  x('/games/0');
}

const selectGamesId = atom();

const existImageAtom = atom(null);
const getExistImageAtom = atom((get) => get(existImageAtom),
  (_get,set,gameId) => {
    const getImage = async() => {
      const response = await axios.get(`/images/${gameId}/0`);
      set(existImageAtom, response.data.data);
      console.log(response.data.links);
    }
    getImage();
  }
);




const gameActiveToggleAtom = atom(false);
const addGameModalToggleAtom = atom(false);
const catchCreateGameErrorAtom = atom(false);
const currentGameAtom = atom();
const removeModalToggleAtom = atom(false);
const editedFileCheckToggleAtom = atom(false);

export {gameActiveToggleAtom, addGameModalToggleAtom, fetchDataSetAtom,gameListAtom, catchCreateGameErrorAtom, selectGamesId, getExistImageAtom,
  existImageAtom, currentGameAtom, removeModalToggleAtom, editedFileCheckToggleAtom};

// [
//   {
//     id: 0,
//     key: uuid(),
//     name: '남자 아이돌 그룹 월드컵',
//     round: 32,
//     images: 63,
//     active: false
//   },
//   {
//     id: 1,
//     key: uuid(),
//     name: '여자 아이돌 그룹 월드컵',
//     round: 64,
//     images: 116,
//     active: false
//   },
//   {
//     id: 2,
//     key: uuid(),
//     name: '남자 아이돌 개인 월드컵',
//     round: 16,
//     images: 31,
//     active: true,
//   },
//   {
//     id: 3,
//     key: uuid(),
//     name: '여자 아이돌 개인 월드컵',
//     round: 128,
//     images: 221,
//     active: false
//   },
// ]
