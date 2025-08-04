

// // app/api/suggested-profiles/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongoose/db';
// import User from '@/lib/mongoose/models/User';
// import { Types } from 'mongoose';

// interface Connection {
//   userId: Types.ObjectId;
//   // Add any other fields that might be in your connection objects
// }

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();
//     const userId = req.headers.get('x-user-id');

//     if (!userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Get current user's connections
//     const currentUser = await User.findById(userId)
//       .select('following followers followRequests');

//     if (!currentUser) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Get IDs to exclude (people already connected)
//     const excludedIds = [
//       new Types.ObjectId(userId),
//       ...currentUser.following.map((f: Connection) => f.userId.toString()),
//       ...currentUser.followers.map((f: Connection) => f.userId.toString()),
//       ...currentUser.followRequests.map((f: Connection) => f.userId.toString())
//     ];

//     // Get random 10 users not already connected
//     const suggestedUsers = await User.aggregate([
//       { $match: { _id: { $nin: excludedIds } } },
//       { $sample: { size: 10 } },
//       { $project: { 
//         userName: 1,
//         profile_image_url: 1,
//         profession: 1,
//         interests: 1
//       }}
//     ]);

//     return NextResponse.json(suggestedUsers);
//   } catch (err) {
//     console.error('Suggested profiles error:', err);
//     return NextResponse.json(
//       { message: 'Failed to get suggestions' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import { Types } from 'mongoose';

interface Connection {
  userId: Types.ObjectId;
  // Add any other fields that might be in your connection objects
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's following list only (excluding followers and requests)
    const currentUser = await User.findById(userId).select('following');

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get IDs to exclude (only people we're already following + ourselves)
    const excludedIds = [
      new Types.ObjectId(userId),
      ...currentUser.following.map((f: Connection) => f.userId)
    ];

    // Get random 10 users not already followed
    const suggestedUsers = await User.aggregate([
      { $match: { _id: { $nin: excludedIds } } },
      { $sample: { size: 10 } },
      { $project: { 
        userName: 1,
        profile_image_url: 1,
        profession: 1,
        interests: 1
      }}
    ]);

    return NextResponse.json(suggestedUsers);
  } catch (err) {
    console.error('Suggested profiles error:', err);
    return NextResponse.json(
      { message: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}