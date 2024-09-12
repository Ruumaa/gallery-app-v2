import { NextResponse } from 'next/server';

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    const image = await prisma.image.delete({
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
