import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import DOMPurify from 'dompurify';
import SectionTitle from '../../components/sectionTitle';
import Content from '../../components/articleBody';
import { useSession } from 'next-auth/react';

const Post = () => {
  const { data: session, status } = useSession();
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

  DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'p') {
      node.setAttribute('class', 'text-xl pb-2');
    } else if (data.tagName === "h2") {
      node.setAttribute('class', 'text-[24px] font-bold border p-2 rounded-xl text-center')
    } else if (data.tagName === "ol") {
      node.setAttribute('class', 'list-decimal pl-10')
    }
  });
  
  const sanitizedContent = DOMPurify.sanitize(post.content);

  if (status === "unauthenticated") {
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
      </article>
      <Footer />
    </>
    );
  }

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
