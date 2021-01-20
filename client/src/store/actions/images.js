import { 
  API,
  SET_IMAGE_URL,
} from '../constants/constants';



export const postImage = img => {
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: '/images',
      body: img,
      actionConst: SET_IMAGE_URL
    }
  }
}


export const putImage = (newImg, oldImgKey) => {
  return {
    type: API,
    payload: {
      method: 'PUT',
      endpoint: `/images/${oldImgKey}`,
      body: newImg,
      actionConst: SET_IMAGE_URL
    }
  }
}