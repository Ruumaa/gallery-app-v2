import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req, context) => {
  try {
    const { params } = context;
    const response = await prisma.image.findMany({
      where: {
        userId: params.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(
      { msg: 'Get user image success', data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Get user image failed', error: error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    await prisma.image.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Delete image failed', error: error },
      { status: 500 }
    );
  }
};
