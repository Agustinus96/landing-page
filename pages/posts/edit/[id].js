// pages/posts/edit/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// Dynamically import the Editor to avoid SSR issues
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      // Dynamically import html-to-draftjs only on the client side
      import('html-to-draftjs').then(htmlToDraft => {
        fetch(`/api/posts/${id}`)
          .then(res => res.json())
          .then(data => {
            setTitle(data.title);
            const blocksFromHtml = htmlToDraft.default(data.content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState));
          });
      });
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT', // Assuming you have a PUT method in your API for updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "_id": id, title, content }),
    
    });


    if (res.ok) {
      // Redirect to the updated post's page or to another page of your choice
      console.log(content);
      console.log(id)
      router.push(`/posts/${id}`);
    } else {
      // Handle errors or show a message to the user
    }
  };

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
        <button type="submit" >Update Post</button>
      </form>
      <Footer />
    </>
  );
};

export default EditPost;
