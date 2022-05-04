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
  },
  {
    _id: 'asfdfdfsa',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    password: '1234abcd',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
