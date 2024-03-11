import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/db-storage-config';

interface PostCardProps {
  $id: string;
  title: string;
  featuredImage: string;
}

const PostCard = ({ $id, title, featuredImage }: PostCardProps) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
