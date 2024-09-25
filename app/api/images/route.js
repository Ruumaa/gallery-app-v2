import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await prisma.image.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(
      { msg: 'Get image success', data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Get image failed', error: error },
      { status: 500 }
    );
  }
};
