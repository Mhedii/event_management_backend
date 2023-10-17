import express from 'express';
import { usersRoutes } from '../modules/Users/users.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { profileRoutes } from '../modules/Profile/profile.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
