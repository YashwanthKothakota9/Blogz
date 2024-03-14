import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appWriteService from '../appwrite/db-storage-config';
import { Container } from '../components';
import { PostForm } from '../components';

function EditPost() {
  const [post, setPost] = useState<Models.Document>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
