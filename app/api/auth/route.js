import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { username, password } = await req.json();
    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        { msg: 'Username already exist', user: null },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
      select: {
        username: true,
      },
    });

    return NextResponse.json(
      { msg: 'Register success', data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: 'POST user failed', error: error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const response = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        images: true,
      },
    });
    return NextResponse.json(
      {
        message: 'GET user success',
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed GET user', error: error },
      { status: 500 }
    );
  }
};
