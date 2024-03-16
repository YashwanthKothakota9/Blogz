import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import appwriteService from '../appwrite/db-storage-config';
import { Button } from '../components';
import { Container } from '../components';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Models } from 'appwrite';
import ParseHTML from '../components/ParseHTML';
import { Hourglass } from 'react-loader-spinner';

function Post() {
  const [post, setPost] = useState<Models.Document | null>(null);

  const [deleting, setIsDeleting] = useState<boolean>(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    setIsDeleting(true);
    appwriteService.deletePost(post?.$id ?? '').then((status) => {
      if (status) {
        appwriteService.deleteFile(post?.featuredImage ?? '');
        navigate('/');
      }
    });
    setIsDeleting(false);
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col gap-4 justify-center mb-4 relative border border-apple-500 rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage).href}
            alt={post.title}
            className="rounded-xl object-cover"
          />
          {isAuthor && (
            <div className="flex gap-2 items-center justify-center">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3" bgColor="bg-apple-500">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                bgColor="bg-red-500"
                className="hover:bg-red-700"
              >
                {deleting ? (
                  <Hourglass
                    visible={true}
                    width="18"
                    height="18"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#c2f0c2', '#f1fcf1']}
                  />
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 text-left ml-6 mt-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {/* <div className="browser-css">{parse(post.content)}</div> */}
          <ParseHTML data={post.content} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
