// app/api/user/search/route.ts
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
