// import React from 'react'
// import Blogs from '../components/blog/blog'

// import Link from 'next/link';



// export default function heroBlog() {
//   return (
//     <><Blogs/></>
//   )
// }


import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PopupWidget from '../components/popupWidget';
import SectionTitle from '../components/sectionTitle';
// import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  // In Blog.js's getServerSideProps
try {
  const res = await fetch(`${baseUrl}/api/posts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch, status: ${res.status}`);
  }
  const posts = await res.json();
  return { props: { posts } };
} catch (error) {
  console.error(error);
  return { props: { error: error.message } };
}
}


export default function Home({ posts }) {

  return (
    <>
    <Head>
        <title>Blogs - testing</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    <div className="text-xl text-gray-500">
      <SectionTitle
        title="Blog Posts">
      </SectionTitle>
      <ul className="flex flex-row flex-wrap justify-center">
        {posts.map((post) => (
          <div className="min-w-[360px] lg:min-w-[360px] lg:w-[20vw] align-middle text-center m-5 py-5 bg-emerald-500 hover:border rounded-lg">
          <li key={post._id} className="text-white">
            <Link href={`/posts/${post._id}`}>
              {post.title}
            </Link>
          </li>
          </div>
        ))}
      </ul>
    </div>
    <Footer />
      <PopupWidget />
    </>
  );
}

