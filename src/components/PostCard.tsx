import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/db-storage-config';
import { Models } from 'appwrite';

interface PostCardProps {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage).href}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
