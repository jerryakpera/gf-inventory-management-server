import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

import Service from '@src/Service';

const userService = Service('User');

function createFirebaseAuth(payload: {}) {
  return new Promise((resolve, reject) => {
    getAuth()
      .createUser(payload)
      .then(userRecord => {
        // See the UserRecord reference doc for the contents of userRecord.
        resolve(userRecord.uid);
      })
      .catch(reject);
  });
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const emailExists = await userService.getOne({ email });
  if (emailExists) {
    return res.status(400).json({
      error: 'Email already exists',
    });
  }

  // Save User in DB
  const { _id } = await userService.create({
    name,
    email,
  });

  // Create Firebase auth
  await createFirebaseAuth({
    email,
    password,
    disabled: false,
    uid: String(_id),
    displayName: name,
    emailVerified: false,
  });

  return res.status(201).json({
    success: true,
    message: 'User registered',
    data: {
      userId: _id,
    },
  });
};
