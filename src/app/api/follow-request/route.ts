import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userIdToRequest } = await req.json();
    const currentUserId = req.headers.get('x-user-id');
    // const currentUserId='686cbdb6d69f50441a6f1f6d'
    if (!currentUserId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userIdToRequest);
    console.log(currentUser);
    console.log(targetUser);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }

    const alreadyRequested = targetUser.followRequests.some(
      (r: any) => r.userId.toString() === currentUser._id.toString()
    );
    if (alreadyRequested) {
      return NextResponse.json({ success: false, message: 'Already requested' });
    }

    console.log('Before push:', targetUser.followRequests); // should be an array


    targetUser.followRequests.push({
      userId: currentUser._id,
      userName: currentUser.userName,
      profile_image_url: currentUser.profile_image_url,
    });

    await targetUser.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Follow Request Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
