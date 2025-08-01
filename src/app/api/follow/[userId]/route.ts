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

    // Check if already following
    const isFollowing = currentUser.following.some(
      (follow: any) => follow.userId.toString() === targetUserId
    );

    if (isFollowing) {
      return NextResponse.json({ message: 'Already following this user' }, { status: 400 });
    }

    // Add to current user's following
    currentUser.following.push({
      userId: targetUser._id,
      userName: targetUser.userName,
      profile_image_url: targetUser.profile_image_url
    });

    // Add to target user's followers
    targetUser.followers.push({
      userId: currentUser._id,
      userName: currentUser.userName,
      profile_image_url: currentUser.profile_image_url
    });

    await Promise.all([currentUser.save(), targetUser.save()]);

    return NextResponse.json({ 
      message: 'Followed successfully',
      following: currentUser.following 
    });
  } catch (err) {
    console.error('Follow error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}