// import { useRouter } from 'next/router';
// import useSWR from 'swr';
// import Head from 'next/head';
// import Navbar from '../../components/navbar';
// import Footer from '../../components/footer';
// import PopupWidget from '../../components/popupWidget';
// import SectionTitle from '../../components/sectionTitle';
// import Container from '../../components/container';
// // import styles from '../../styles/Home.module.css';

// function fetcher(url) {
//   return fetch(url).then((r) => r.json());
//   console.log(url)
// }

// export default function Post() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: post, error } = useSWR(id ? `/api/posts/${id}` : null, fetcher);


//   if (error) return <div>Failed to load</div>;
//   if (!post) return <div>Loading...</div>;

//   return (
//     <>
//           <Head>
//         <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
//         <meta
//           name="description"
//           content="Nextly is a free landing page template built with next.js & Tailwind CSS"
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Navbar />
//     <div className="text-black dark:text-white text-center">
//         <h1 className="text-center mt-1 text-3xl font-bold leading-snug tracking-tight text-emerald-500 lg:leading-tight lg:text-4xl dark:text-white">{post.title}</h1>
// {post.content}
//     </div>
//     <Footer />
//       <PopupWidget />
//     </>
//   );
// }


// pages/posts/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the post using its ID
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Assuming the API returns the post's data directly
          setPost(data);
        });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Navbar />
      <article>
        <h1 className="text-center mt-1 text-3xl font-bold leading-snug tracking-tight text-emerald-500 lg:leading-tight lg:text-4xl dark:text-white">{post.title}</h1>
        <div className="flex flex-col flex-wrap text-black dark:text-white mt-1 text-justify mx-[auto] w-[70vw] justify-center" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </article>
      {/* // Example button in your post component */}
<button onClick={() => router.push(`/posts/edit/${post._id}`)}>Edit</button>

      <Footer />
    </>
  );
};

export default Post;
