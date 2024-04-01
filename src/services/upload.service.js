export const uploadService = {
    uploadImg
  }
  async function uploadImg(ev) {
    const CLOUD_NAME = "die0jjugu"
    const UPLOAD_PRESET = "toy_uploads"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  
    try {
      const formData = new FormData()
      console.log('ev',ev.name);
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('file', file)
  
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
      })
      const imgUrl = await res.json()
      console.log(imgUrl)
      return imgUrl
    } catch (err) {
      console.error('Failed to upload', err)
      throw err
    }
  }
  
  