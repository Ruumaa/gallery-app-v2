import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { username, newPassword } = await req.json();
    const hashedPassword = await hash(newPassword, 10);

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUsername) {
      return NextResponse.json(
        { msg: 'Username not exist', user: null },
        { status: 409 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        username,
      },
      data: {
        password: hashedPassword,
      },
    });

    const { password, ...rest } = updatedUser;

    return NextResponse.json(
      { msg: 'Update password success', data: rest },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'Reset password failed', error: error },
      { status: 500 }
    );
  }
};
