// app/api/signup/route.ts
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';
import cloudinary from '@/lib/cloudinary';
import connectDB from '@/lib/mongoose/db';
import User from '@/lib/mongoose/models/User';
import { hashPassword, generateToken } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert Web ReadableStream (from req.body) to Node.js stream
function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
  const reader = webStream.getReader();

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    }
  });
}

async function parseForm(req: NextRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 100 * 1024 * 1024,
      multiples: false,
    });

    const nodeReadable = webStreamToNodeReadable(req.body as any);

    const mockReq = Object.assign(nodeReadable, {
      headers: Object.fromEntries(req.headers.entries()),
    }) as IncomingMessage;

    form.parse(mockReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { fields, files } = await parseForm(req);
    const get = (val: any) => (Array.isArray(val) ? val[0] : val);

    const {
      name,
      dob,
      gender,
      nationality,
      state,
      interests,
      profession,
      experience,
      email,
      password,
      ifOrganization = 'false',
    } = fields;

    const hashedPassword = await hashPassword(get(password));

    // Upload image to Cloudinary
    let imageUrl = '';
    const imageFile = files.profile_image;
    if (imageFile && Array.isArray(imageFile)) {
      const result = await cloudinary.uploader.upload(imageFile[0].filepath, {
        folder: 'users',
      });
      imageUrl = result.secure_url;
    }

    const user = await User.create({
      userName: get(name),
      email: get(email),
      password_hash: hashedPassword,
      bio: '',
      dob: get(dob),
      gender: get(gender),
      nationality: get(nationality),
      interests: get(interests)?.split(',') || [],
      profession: get(profession),
      experience: get(experience),
      ifOrganization: get(ifOrganization) === 'true',
      state: get(state),
      profile_image_url: imageUrl,
    });

    const token = generateToken(user._id);
    return new Response(JSON.stringify({ message: 'User created', token,userId: user._id, }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return new Response(JSON.stringify({ error: 'Signup failed' }), {
      status: 500,
    });
  }
}
