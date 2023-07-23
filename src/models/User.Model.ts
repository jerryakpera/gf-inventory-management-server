import { Schema, model, models } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

// const emailRegex = new RegExp(
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// );

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      /*
        NOTE: Setting the required property of model field to
        an array will allow you to pass a string for the error message
      */
      required: [true, 'Please add a name'],
    },
    phone: {
      type: String,
      /*
        NOTE: Setting the required property of model field to
        an array will allow you to pass a string for the error message
      */
      default: '234',
    },
    bio: {
      type: String,
      default: 'bio',
      maxlength: [250, 'Bio must not be more than 250 characters'],
    },
    email: {
      trim: true,
      type: String,
      unique: true,
      required: [true, 'Please add an email'],
      // NOTE: You can use the match property of a mongoose model to carry out a regex test
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const User = models['User'] || model('User', userSchema);
