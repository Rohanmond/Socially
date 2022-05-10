import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */
export const users = [
  {
    _id: 'asassdafdgdk',
    firstName: 'Rohan',
    lastName: 'Mondal',
    email: 'rohan@gmail.com',
    password: '1234abcd',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    pic: 'https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png',
    bio: 'Aspiring Software Developer',
    username: 'mondalrohan108',
  },
];
