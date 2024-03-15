import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/db-storage-config';
import { Models } from 'appwrite';

interface PostCardProps {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-[250px] h-[200px] bg-apple-300 border border-apple-900 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage).href}
            alt={post.title}
            className="rounded-md object-contain"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
