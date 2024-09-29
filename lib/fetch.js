import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { BASE_URL } from './base_url';

export const fetcher = (url) =>
  fetch(url, {
    headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY },
    cache: 'no-store',
  }).then((res) => res.json());

export const displayImages = () => {
  const useImages = () => {
    try {
      const { data, error, isLoading } = useSWR('/api/images', fetcher);
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
    mutate('/api/images', null, { revalidate: true });
    mutate(`/api/images/${userId}`, null, { revalidate: true });

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
  mutate('/api/images', null, { revalidate: true });

  return response;
};

export const displayProduct = () => {
  const useProducts = () => {
    try {
      const { data, error, isLoading } = useSWR('/api/products', fetcher);
      if (error) throw Error;
      return {
        products: data,
        isLoading,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  const uploadProduct = async (product) => {
    try {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
        },
        body: JSON.stringify(product),
      });
      mutate('/api/products');
      return await response.json();
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      mutate('/api/products');
      return response;
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return {
    useProducts,
    uploadProduct,
    deleteProduct,
  };
};
