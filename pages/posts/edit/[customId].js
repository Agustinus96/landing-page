import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react'; // Import useSession
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { customId } = router.query;
  const { data: session, status } = useSession(); // Use the useSession hook

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") { // Check authentication status
      router.push("/auth/signin");
    }

    if (customId) {
      import('html-to-draftjs').then(htmlToDraft => {
        fetch(`/api/posts/${customId}`)
          .then(res => res.json())
          .then(data => {
            setTitle(data.title);
            const blocksFromHtml = htmlToDraft.default(data.content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState));
          }).catch(err => console.error("Failed to load post data:", err));
      });
    }
  }, [customId, router, status]); // Add `status` to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) { // Additional check for session before submitting
      console.error("Not authenticated");
      return;
    }

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);

    try {
      const res = await fetch(`/api/posts?customId=${customId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push(`/posts/${customId}`);
      } else {
        // Handle HTTP errors
        console.error("Failed to update the post:", await res.text());
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <button onClick={() => router.push("/auth/signin")}>Log in</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        <button className="bg-emerald-500 py-1 px-5 rounded-md flex m-auto" type="submit">Update Post</button>
      </form>
      <Footer />
    </>
  );
};

export default EditPost;
