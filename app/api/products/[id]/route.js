import prisma from '@/lib/prisma';

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Delete product failed', error: error },
      { status: 500 }
    );
  }
};
