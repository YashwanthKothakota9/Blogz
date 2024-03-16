import { useEffect, useState } from 'react';
import appWriteService from '../appwrite/db-storage-config';
import { Models } from 'appwrite';
import { Container } from '../components';
import { PostCard } from '../components';
import { Bars } from 'react-loader-spinner';

function Home() {
  const [posts, setPosts] = useState<Models.Document[]>([]);

  useEffect(() => {
    appWriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }

  return (
    <div className="w-full py-8">
      <div className="p-4 mt-4 mb-6">
        <h1 className="text-4xl font-bold text-center md:text-center">
          This is a Blogging Website which makes you fall in love with writing!
        </h1>
        <p className="text-xl text-center md:text-center">
          Sign up and Add your story
        </p>
      </div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-full sm:w-1/2 md:1/3 lg:w-1/4" key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
