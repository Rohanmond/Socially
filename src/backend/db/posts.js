import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 'fsjfhjsdh434jhsjd3',
    pic: 'https://res.cloudinary.com/donqbxlnc/image/upload/v1652342774/photo-1652298926911-9d628f82e7de_xnxfvn.jpg',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam veniam, voluptates illum repellendus vitae blanditiis voluptatum omnis reprehenderit corrupti officia.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    userId: 'asassdafdgdk',
    createdAt: '2022-01-25T10:38:12+05:30',
    updatedAt: formatDate(),
  },
  {
    _id: '343asa232sfdgt45',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, esse.',
    pic: 'https://res.cloudinary.com/donqbxlnc/image/upload/v1652342874/photo-1652335223113-9919b4e052d5_ecguab.jpg',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    userId: 'asassdafdgdk',
    createdAt: '2022-01-25T10:38:12+05:30',
    updatedAt: formatDate(),
  },
];
