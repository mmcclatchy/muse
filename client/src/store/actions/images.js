import { 
  IMAGES,
  SET_IMAGE_URL,
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


export const putImage = (newImg, oldImgKey) => {
  return {
    type: IMAGES,
    payload: {
      method: 'PUT',
      endpoint: `/images/${oldImgKey}`,
      body: newImg,
      actionConst: SET_IMAGE_URL
    }
  }
}

