import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { targetUserId } = await req.json();
    const currentUserId = req.headers.get('x-user-id');

    if (!currentUserId) {
      return NextResponse.json({ isFollowing: false, hasRequested: false }, { status: 401 });
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return NextResponse.json({ isFollowing: false, hasRequested: false });
    }

    const hasRequested = targetUser.followRequests.some(
      (r: any) => r.userId.toString() === currentUserId
    );

    const isFollowing = targetUser.followers.some(
      (f: any) => f.userId.toString() === currentUserId
    );

    return NextResponse.json({ isFollowing, hasRequested });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ isFollowing: false, hasRequested: false }, { status: 500 });
  }
}
