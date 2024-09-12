import { BASE_URL } from './base_url';

export const getImages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/images`, {
      cache: 'no-store',
      headers: {
        'x-api-key': process.env.API_SECRET_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const uploadeImage = async (userId, imageUrl) => {
  const response = await fetch(`${BASE_URL}/api/images/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_SECRET_KEY,
    },
    body: JSON.stringify({
      userId: userId,
      imageUrl: imageUrl,
    }),
  });
  return await response.json();
};

export const getUserImages = async (userId) => {
  const response = await getImages();
  const images = await response.data.filter((image) => image.userId === userId);
  return images;
};

export const deleteUserImages = async (id) => {
  const response = await fetch(`${BASE_URL}/api/images/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': process.env.API_SECRET_KEY,
    },
  });

  return response;
};
