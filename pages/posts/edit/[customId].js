import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// Dynamically import the Editor component to avoid SSR issues
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { customId } = router.query;
  const { data: session, status } = useSession();

  const customStyle = {height: "40vh", outline: "2px solid #3b82f6", borderRadius: "0.5rem"};

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    if (customId && typeof window !== "undefined") {
      // Dynamically import html-to-draftjs only client-side
      import('html-to-draftjs').then(htmlToDraft => {
        fetch(`/api/posts/${customId}`)
          .then(res => res.json())
          .then(data => {
            setTitle(data.title);
            setTags(data.tags.join(', '));
            const blocksFromHtml = htmlToDraft.default(data.content);
            if (blocksFromHtml) {
              const { contentBlocks, entityMap } = blocksFromHtml;
              const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
              setEditorState(EditorState.createWithContent(contentState));
            }
          })
          .catch(err => console.error("Failed to load post data:", err));
      });
    }
  }, [customId, router, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      console.error("Not authenticated");
      return;
    }

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    const tagsArray = tags.split(',').map(tag => tag.trim()); // Convert tags string back to array

    const res = await fetch(`/api/posts?customId=${customId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags: tagsArray }),
    });

    if (res.ok) {
      router.push(`/posts/${customId}`);
    } else {
      console.error("Failed to update the post:", await res.text());
    }
  };
  
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <Navbar />
      <div className="flex flex-wrap m-auto justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[90vw] xl:max-w-[60vw] p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Article Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated):</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="text-black">
          <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              wrapperClassName="wrapper-class"
              editorClassName="w-full mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              editorStyle={customStyle}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
              }}
            />
            </div>
        <button className="bg-emerald-500 py-1 px-5 rounded-md flex m-auto" type="submit">Update Post</button>
      </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
