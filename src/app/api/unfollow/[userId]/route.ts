import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
    const currentUserId = req.headers.get('x-user-id');
    const targetUserId = params.userId;

    if (!currentUserId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if users exist
    const [currentUser, targetUser] = await Promise.all([
      User.findById(currentUserId),
      User.findById(targetUserId)
    ]);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Remove from current user's following
    currentUser.following = currentUser.following.filter(
      (follow: any) => follow.userId.toString() !== targetUserId
    );

    // Remove from target user's followers
    targetUser.followers = targetUser.followers.filter(
      (follower: any) => follower.userId.toString() !== currentUserId
    );

    await Promise.all([currentUser.save(), targetUser.save()]);

    return NextResponse.json({ 
      message: 'Unfollowed successfully',
      following: currentUser.following 
    });
  } catch (err) {
    console.error('Unfollow error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}