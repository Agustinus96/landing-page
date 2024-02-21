// pages/index.js
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
    return { props: { posts } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message } };
  }
}

export default function Home({ posts }) {
  // Ensure posts is always an array to prevent .map() errors
  if (!posts || posts.error) {
    return (
      <>
        <Head>
          <title>Error Loading Posts</title>
        </Head>
        <Navbar />
        <p>Failed to load posts.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Blogs - Testing</title>
        <meta name="description" content="A Next.js blog showcasing posts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SectionTitle title="Blog Posts" />
      <div className="flex flex-wrap justify-center">
        {posts.map((post) => (
          <div key={post.customId} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-emerald-500 text-white">
            <div className="parent flex flex-col px-6 py-4 sm:h-[30vh] min-h-[300px]">
              <div className="child flex-1 h-full">
              <Link className="font-bold text-xl mb-3 grow h-full" href={`/posts/${post.customId}`}>
                {post.title.length > 24 ? `${post.title.substring(0, 24)}...` : post.title}
              </Link>
              <div className="pt-4" dangerouslySetInnerHTML={{ __html: post.content.length > 240 ? post.content.substring(0, 240) + '...' : post.content }} />
              </div>
              <div className="flex justify-end">
              <Link className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-4 justify-end" href={`/posts/${post.customId}`}>
                Continue reading
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <PopupWidget />
    </>
  );
}
