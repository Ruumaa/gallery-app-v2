import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
};
