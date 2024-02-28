// pages/index.js
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PopupWidget from '../components/popupWidget';
import SectionTitle from '../components/sectionTitle';

export async function getServerSideProps(context) {
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = `${protocol}://${context.req.headers.host}`;

  try {
    const res = await fetch(`${baseUrl}/api/posts`);
    if (!res.ok) {
      throw new Error(`Failed to fetch, status: ${res.status}`);
    }
    const posts = await res.json();
    // Assume each post includes a tags array
    return { props: { posts } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message } };
  }
}

export default function Home({ posts }) {
  const [filterTag, setFilterTag] = useState('');

    // Guard against posts not being an array
    if (!Array.isArray(posts)) {
      console.error('Posts is not an array', posts);
      // You can handle this case more gracefully depending on your app's needs
      return <p>Error: Posts data is not available.</p>;
    }
  
    // Extract all tags from posts, ensuring posts is always treated as an array
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));
  
    // Filter posts based on selected tag, guarding against posts not having a tags array
    const filteredPosts = filterTag
      ? posts.filter(post => post.tags && post.tags.includes(filterTag))
      : posts;
  return (
    <>
      <Head>
        <title>Blogs - Testing</title>
        <meta name="description" content="A Next.js blog showcasing posts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SectionTitle title="News" />
      
      {/* Dropdown for tag filtering */}
      <div className="flex justify-center my-4">
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="rounded p-2">
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
  {filteredPosts.map((post) => (
    <div key={post.customId} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-emerald-500 text-white flex flex-col">
      <div className="px-6 py-4 flex flex-col flex-grow">
        <Link href={`/posts/${post.customId}`} className="font-bold text-xl mb-2">{post.title.length > 18 ? `${post.title.substring(0, 16)}...` : post.title}</Link>
        <div className="text-gray-300 text-base mb-4" dangerouslySetInnerHTML={{ __html: post.content.length > 145 ? `${post.content.substring(0, 140)}...` : post.content }}></div>
        <div className="flex-grow">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 text-right">
        <Link href={`/posts/${post.customId}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Continue reading</Link>
      </div>
    </div>
  ))}
</div>

      <Footer />
      <PopupWidget />
    </>
  );
}
