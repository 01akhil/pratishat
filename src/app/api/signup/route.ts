// // app/api/signup/route.ts
// import { IncomingForm } from 'formidable';
// import { Readable } from 'stream';
// import cloudinary from '@/lib/cloudinary';
// import connectDB from '@/lib/mongoose/db';
// import User from '@/lib/mongoose/models/User';
// import { hashPassword, generateToken } from '@/lib/auth';
// import type { NextRequest } from 'next/server';
// import { IncomingMessage } from 'http';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper to convert Web ReadableStream (from req.body) to Node.js stream
// function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
//   const reader = webStream.getReader();

//   return new Readable({
//     async read() {
//       const { done, value } = await reader.read();
//       if (done) {
//         this.push(null);
//       } else {
//         this.push(value);
//       }
//     }
//   });
// }

// async function parseForm(req: NextRequest): Promise<{ fields: any; files: any }> {
//   return new Promise((resolve, reject) => {
//     const form = new IncomingForm({
//       maxFileSize: 100 * 1024 * 1024,
//       multiples: false,
//     });

//     const nodeReadable = webStreamToNodeReadable(req.body as any);

//     const mockReq = Object.assign(nodeReadable, {
//       headers: Object.fromEntries(req.headers.entries()),
//     }) as IncomingMessage;

//     form.parse(mockReq, (err, fields, files) => {
//       if (err) reject(err);
//       else resolve({ fields, files });
//     });
//   });
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const { fields, files } = await parseForm(req);
//     const get = (val: any) => (Array.isArray(val) ? val[0] : val);

//     const {
//       name,
//       dob,
//       gender,
//       nationality,
//       state,
//       interests,
//       profession,
//       experience,
//       email,
//       password,
//       ifOrganization = 'false',
//     } = fields;

//     const hashedPassword = await hashPassword(get(password));

//     // Upload image to Cloudinary
//     let imageUrl = '';
//     const imageFile = files.profile_image;
//     if (imageFile && Array.isArray(imageFile)) {
//       const result = await cloudinary.uploader.upload(imageFile[0].filepath, {
//         folder: 'users',
//       });
//       imageUrl = result.secure_url;
//     }

//     const user = await User.create({
//       userName: get(name),
//       email: get(email),
//       password_hash: hashedPassword,
//       bio: '',
//       dob: get(dob),
//       gender: get(gender),
//       nationality: get(nationality),
//       interests: get(interests)?.split(',') || [],
//       profession: get(profession),
//       experience: get(experience),
//       ifOrganization: get(ifOrganization) === 'true',
//       state: get(state),
//       profile_image_url: imageUrl,
//     });

//     const token = generateToken(user._id);
//     return new Response(JSON.stringify({ message: 'User created', token,userId: user._id, }), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (err: any) {
//     console.error('Signup error:', err);
//     return new Response(JSON.stringify({ error: 'Signup failed' }), {
//       status: 500,
//     });
//   }
// }







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

    const isOrganization = get(fields.isOrganization) === 'true';

    // Common fields
    const commonData = {
      userName: get(fields.name) || get(fields.organizationName),
      email: get(fields.email),
      password_hash: await hashPassword(get(fields.password)),
      profile_image_url: '',
      nationality: get(fields.nationality),
      state: get(fields.state),
      ifOrganization: isOrganization,
      interests: JSON.parse(get(fields.interests) || '[]'),
    };

    // Upload image to Cloudinary
    const imageFile = files.profile_image;
    if (imageFile && Array.isArray(imageFile)) {
      const result = await cloudinary.uploader.upload(imageFile[0].filepath, {
        folder: 'users',
      });
      commonData.profile_image_url = result.secure_url;
    }

    // Organization specific fields
    if (isOrganization) {
      const organizationData = {
        ...commonData,
        website: get(fields.website),
        fullAddress: get(fields.address),
        sector: get(fields.sector),
        manager: get(fields.managedBy),
        managerEmail: get(fields.managerEmail),
        managerWhatsapp: get(fields.managerWhatsapp),
        yearEstablished:get(fields.yearEstablished),
        verificationRequested: get(fields.requestVerification) === 'true',
        bio: '', // Default empty
        dob: '', // Not applicable for organizations
        gender: '', // Not applicable for organizations
        profession: '', // Not applicable for organizations
        experience: '', // Not applicable for organizations
      };

      const user = await User.create(organizationData);
      const token = generateToken(user._id);
      
      return new Response(JSON.stringify({ 
        message: 'Organization created', 
        token, 
        userId: user._id 
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Personal user fields
    const personalData = {
      ...commonData,
      dob: get(fields.dob),
      gender: get(fields.gender),
      profession: get(fields.profession),
      experience: get(fields.experience),
      website: '', // Not applicable for personal users
      fullAddress: '', // Not applicable for personal users
      sector: '', // Not applicable for personal users
      manager: '', // Not applicable for personal users
      managerEmail: '', // Not applicable for personal users
      managerWhatsapp: '', // Not applicable for personal users
      verificationRequested: false, // Not applicable for personal users
    };

    const user = await User.create(personalData);
    const token = generateToken(user._id);
    
    return new Response(JSON.stringify({ 
      message: 'User created', 
      token, 
      userId: user._id 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('Signup error:', err);
    
    let errorMessage = 'Signup failed';
    if (err.code === 11000) {
      errorMessage = 'Email already exists';
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: err.code === 11000 ? 409 : 500,
    });
  }
}