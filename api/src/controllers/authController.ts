import { Request, Response } from 'express';
import { USERS_DATABASE } from '../data/mockDb';

export const register = (req: Request, res: Response) => {
  const { name, email, password, companyName } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  const existingUser = USERS_DATABASE.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'A user with this email address already exists.'
    });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name || 'Supplier User',
    email,
    companyName: companyName || '',
    role: 'supplier' as const,
    plan: 'free' as const,
    savedTenderIds: [],
    createdAt: new Date().toISOString()
  };

  USERS_DATABASE.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User registration successful.',
    data: {
      user: newUser,
      token: `jwt_token_${newUser.id}_${Date.now()}`
    }
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  const user = USERS_DATABASE.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    });
  }

  res.json({
    success: true,
    message: 'Login successful.',
    data: {
      user,
      token: `jwt_token_${user.id}_${Date.now()}`
    }
  });
};

export const toggleFavorite = (req: Request, res: Response) => {
  const { tenderId } = req.body;
  const user = USERS_DATABASE[0]; // Default mock session

  if (!tenderId) {
    return res.status(400).json({ success: false, message: 'tenderId is required' });
  }

  const index = user.savedTenderIds.indexOf(tenderId);
  if (index > -1) {
    user.savedTenderIds.splice(index, 1);
  } else {
    user.savedTenderIds.push(tenderId);
  }

  res.json({
    success: true,
    savedTenders: user.savedTenderIds
  });
};
