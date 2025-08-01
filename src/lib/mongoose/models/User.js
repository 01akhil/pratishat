// models/User.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    nationality: {
      type: String,
      default: '',
    },
    interests: {
      type: [String],
      default: [],
    },
    profession: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    followers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        profile_image_url: String,
      },
    ],
    following: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        profile_image_url: String,
      },
    ],

    followRequests: [
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    profile_image_url: String,
  },
],

    ifOrganization: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
      default: '',
    },
    fullAddress: {
      type: String,
      default: '',
    },
    sector: {
      type: String,
      default: '',
    },
    manager: {
      type: String,
      default: '',
    },
    managerEmailAddress: {
      type: String,
      default: '',
    },
    profile_image_url: {
      type: String,
      default: '',
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// ✅ Prevent model overwrite in dev mode (Next.js hot reload)
export default mongoose.models.User || mongoose.model('User', userSchema);
