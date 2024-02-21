// // Assuming this page is for creating a new post or editing an existing one.

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Head from 'next/head';
import Navbar from '../components/navbar'; // Adjust the import path as necessary
import SectionTitle from '../components/sectionTitle'; // Adjust the import path as necessary
import Footer from '../components/footer'; // Adjust the import path as necessary
import PopupWidget from '../components/popupWidget'; // Adjust the import path as necessary
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isFocus, setIsFocus] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; // Or any loading state you prefer
  }

  if (!session) {
    // Redirect or show a login prompt if not authenticated
    // This could be a call to signIn(), or a custom message with a signIn button
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <button onClick={router.push("/auth/signin")}>Log in</button>
      </div>
    );
  }

  const customStyle = isFocus ? {height: "40vh", outline: "2px solid #3b82f6", borderRadius: "0.5rem"} : {height: "40vh", borderRadius: "0.5rem"};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might want to include the session token in your request for server-side verification
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (res.ok) {
        router.push(`/posts/${data.customId}`);
    } else {
        router.push('/login')
    }
  };

  return (
    <>
      <Head />
      <Navbar />
      <SectionTitle title="Post Editor">Welcome</SectionTitle>
      <div className="flex flex-wrap m-auto justify-center">
        <form className="min-w-xl mx-auto" onSubmit={handleSubmit}>
          {/* Input fields for title, introduction, and subtitle remain unchanged */}
          <div className="mb-5">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Article Title :
            </label>
            <input
              className="w-[720px] mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-[720px] mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Article Contents :
            </label>
            <div >
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              wrapperClassName={"demo-wrapper"}
              editorClassName="w-[720px] mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              editorStyle={customStyle}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
              }}
            />
            </div>
          </div>
          <button
            className="bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit">
            Save Post
          </button>
        </form>
      </div>
      <Footer />
      <PopupWidget />
    </>
  );
}


