import useSWR, { mutate } from 'swr';
import axios from 'axios';

export const uploadeImage = async (userId, imageUrl) => {
  try {
    const response = await fetch(`/api/images/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
      body: JSON.stringify({
        userId: userId,
        imageUrl: imageUrl,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const postCloudinary = async (fromData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ID}/image/upload`,
      {
        method: 'POST',
        body: fromData,
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error uploading image to cloudinary:', error);
  }
};

export const deleteUserImages = async (id) => {
  const response = await fetch(`/api/images/${id}`, {
    method: 'DELETE',
  });
  return response;
};

export const fetcher = (url) =>
  axios
    .get(url, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY },
    })
    .then((res) => res.data);

export const displayImages = () => {
  const useImages = () => {
    try {
      const { data, error, isLoading } = useSWR('/api/images', fetcher, {
        refreshInterval: 1000,
      });
      if (error) throw Error;
      return {
        images: data,
        isLoading,
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  const useImageById = (userId) => {
    try {
      const { data, error, isLoading } = useSWR(
        `/api/images/${userId}`,
        fetcher
      );
      if (error) throw Error;
      return {
        images: data,
        isLoading,
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  return {
    useImages,
    useImageById,
  };
};
