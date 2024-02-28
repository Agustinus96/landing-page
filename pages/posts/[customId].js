import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import dynamic from 'next/dynamic';
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
      node.setAttribute('class', 'text-l pb-2');
    } else if (data.tagName === "h2") {
      node.setAttribute('class', 'text-[28px] font-bold py-3')
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
      <article className="prose lg:prose-xl m-auto px-4">
        <h1 
        className="max-w-[60vw] mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white"
        >{post.title}
        </h1>
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
      <article className="prose lg:prose-xl m-auto px-4">
        <h1 
        className="m-auto text-center max-w-[55vw] mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white py-[7vh]"
        >{post.title}
        </h1>
        <div className="text-md tracking-wider dark:text-white text-black max-w-[60%] m-auto" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <button className="bg-emerald-500 py-1 px-5 rounded-md mt-4 mx-auto flex" onClick={() => router.push(`/posts/edit/${encodeURIComponent(post.customId)}`)}>Edit</button>
      </article>
      <Footer />
    </>
  );
};

export default Post;
