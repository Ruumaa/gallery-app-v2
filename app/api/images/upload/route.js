import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { userId, imageUrl } = await req.json();
    const image = await prisma.image.create({
      data: {
        imageUrl,
        userId,
      },
    });
    return NextResponse.json(
      { msg: 'Upload image success', data: image },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'POST image failed', error: error },
      { status: 500 }
    );
  }
};
