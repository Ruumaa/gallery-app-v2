import { BASE_URL } from './base_url';
import prisma from './prisma';

export const getImageNative = async () => {
  try {
    const images = await fetch(`${BASE_URL}/api/images`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
      },
      cache: 'no-store',
    });
    return await images.json();
  } catch (error) {
    console.error('Error get image', error);
  }
};

export const getImageSupa = async () => {
  try {
    const response = await prisma.image.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      msg: 'Get image success',
      data: response,
    };
  } catch (error) {
    console.error('Error get image', error);
  }
};
