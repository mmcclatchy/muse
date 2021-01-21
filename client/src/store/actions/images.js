import { 
  IMAGES,
  SET_IMAGE_URL,
  PUT_IMAGE,
} from '../constants/constants';



export const postImage = formData => {
  return {
    type: IMAGES,
    payload: {
      method: 'POST',
      endpoint: '/images',
      body: formData,
      actionConst: SET_IMAGE_URL
    }
  }
}


export const putImage = (newImg, oldImgKey, characterId) => {
  return {
    type: IMAGES,
    payload: {
      method: 'PUT',
      endpoint: `/images/${oldImgKey}/${characterId}`,
      body: newImg,
      actionConst: PUT_IMAGE
    }
  }
}


