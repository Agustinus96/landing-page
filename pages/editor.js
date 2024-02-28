import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Head from "next/head";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFocus, setIsFocus] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const router = useRouter();

  // Define your tag options
  const tagOptions = [
    "日本語",
    "English",
    "ニュース",
    "News",
    "ブログ",
    "Blog",
  ];
  const customStyle = isFocus
    ? { height: "40vh", outline: "2px solid #3b82f6", borderRadius: "0.5rem" }
    : { height: "40vh", borderRadius: "0.5rem" };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);

    if (!session) {
      console.error("You must be logged in to submit a post.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags: selectedTags }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/posts/${data.customId}`);
    } else {
      console.error("Failed to submit post");
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <Navbar />
      <SectionTitle title="Post Editor">Welcome</SectionTitle>
      <div className="flex flex-wrap justify-center">
        <form className="min-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Article Title :
            </label>
            <input
              id="title"
              className="input-field"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <fieldset className="mb-5">
            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tags:
            </legend>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <div key={tag} className="flex items-center">
                  <input
                    id={tag}
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="checkbox"
                  />
                  <label
                    htmlFor={tag}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Editor */}
          <div className="editor-container">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              wrapperClassName={"demo-wrapper"}
              editorClassName="w-[720px] mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              editorStyle={customStyle}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "list",
                  "textAlign",
                  "history",
                ],
              }}
            />
          </div>
          <button className="submit-button" type="submit">
            Save Post
          </button>
        </form>
      </div>
      <Footer />
      <PopupWidget />
    </>
  );
}

// Note: Add actual class names for `input-field`, `editor-container`, and `submit-button` based on your CSS or TailwindCSS utilities.
