import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { requesterId } = await req.json();
    const currentUserId = req.headers.get('x-user-id');

    if (!currentUserId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await User.findById(currentUserId);
    const requester = await User.findById(requesterId);

    if (!currentUser || !requester) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }

    // Remove request
    currentUser.followRequests = currentUser.followRequests.filter(
      (r: any) => r.userId.toString() !== requesterId
    );

    // Add to followers/following
    currentUser.followers.push({
      userId: requester._id,
      userName: requester.userName,
      profile_image_url: requester.profile_image_url,
    });

    requester.following.push({
      userId: currentUser._id,
      userName: currentUser.userName,
      profile_image_url: currentUser.profile_image_url,
    });

    await currentUser.save();
    await requester.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Accept Follow Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
