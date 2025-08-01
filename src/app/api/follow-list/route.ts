import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userId).select('followers following');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      followers: user.followers,
      following: user.following,
    });
  } catch (err) {
    console.error('Fetch follow list error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
