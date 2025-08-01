import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q || q.trim().length < 2) {
      return new Response(JSON.stringify({ users: [] }), {
        status: 200,
      });
    }

    const regex = new RegExp(q, 'i'); // case-insensitive match
    const users = await User.find({
      $or: [{ userName: regex }, { email: regex }],
    })
      .select('_id userName email profile_image_url') // limit data
      .limit(10);

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Search API error:', err);
    return new Response(JSON.stringify({ error: 'Search failed' }), {
      status: 500,
    });
  }
}
