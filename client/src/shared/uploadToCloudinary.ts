import { DEFAULT_IMG_SRC } from './constants';

const url = (cloudName: string) => `https://api.cloudinary.com/v1_1/dwx3ott96/${cloudName}/upload`;

const uploadToCloudinary = async (cloudName: string, file: File | undefined, preset: string): Promise<string> => {
  if (file) {
    const formData = new FormData();
    formData.set('file', file);
    formData.append('upload_preset', preset);

    try {
      const response = await fetch(url(cloudName), { method: 'POST', body: formData });
      const data = await response.json();
      return data.url;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return DEFAULT_IMG_SRC;
};

export default uploadToCloudinary;
