import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import DOMPurify from 'dompurify';
import SectionTitle from '../../components/sectionTitle';
import Content from '../../components/articleBody';

const Post = () => {
  const router = useRouter();
  const { customId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (customId) {
      fetch(`/api/posts/${encodeURIComponent(customId)}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(error => console.error("Failed to load the post", error));
    }
  }, [customId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Head>
        <title className='text-xl font-bold'>{post.title}</title>
      </Head>
      <Navbar />
      <article className="prose lg:prose-xl m-auto py-12 px-4">
        <SectionTitle 
        title={post.title}>
        </SectionTitle>
        <div className="text-md tracking-wider dark:text-white text-black max-w-[60%] m-auto" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <button className="bg-emerald-500 py-1 px-5 rounded-md mt-4 mx-auto flex" onClick={() => router.push(`/posts/edit/${encodeURIComponent(post.customId)}`)}>Edit</button>
      </article>
      <Footer />
    </>
  );
};

export default Post;
