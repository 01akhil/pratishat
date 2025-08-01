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

    if (!currentUser) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }

    currentUser.followRequests = currentUser.followRequests.filter(
      (r: any) => r.userId.toString() !== requesterId
    );

    await currentUser.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reject Follow Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
