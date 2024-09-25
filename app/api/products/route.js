import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(
      { msg: 'Get products success', data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Get products failed', error: error },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const { title, desc } = await req.json();
    const product = await prisma.product.create({
      data: {
        title,
        desc,
      },
    });
    return NextResponse.json(
      { msg: 'Add product success', data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Add product failed', error: error },
      { status: 500 }
    );
  }
};
