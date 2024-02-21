// api/auth/signin.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'; // Import signIn from next-auth/react
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PopupWidget from '../../components/popupWidget';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use signIn method from NextAuth.js instead of fetch
    const result = await signIn('credentials', {
      redirect: false, // Do not redirect on failure so we can handle errors locally
      id,
      password,
    });
    console.log(result);
    // Check if signIn was successful based on the error status
    if (result.error) {
      console.log(error);
      // Handle error, e.g., show an error message to the user
      alert(result.error); 
    } else {
      // If signIn was successful, redirect to the desired page
      router.push('/editor');
    }
  };

  return (
    <>
    
    <Head>
        <title>Blogs - login page</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="grid justify-center h-full p-[2%] m-auto overflow-auto text-center drop-shadow-xl bg-gray-100 border-emerald-200 dark:border-gray-600 border max-w-[600px] rounded-xl dark:bg-gray-950">
      <h1 className="text-3xl">Please login</h1>
      <form
       className="flex flex-col py-5"
       onSubmit={handleSubmit}>
        <label className="mb-2 px-2">Admin ID</label>
        <input
          className="mb-5 px-2 py-1 rounded-md focus:border-[2px] focus:border-emerald-500"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Admin ID"
          required
        />
        <label className="mb-2 px-2">Password :</label>
        <input
          className="mb-5 px-2 py-1 rounded-md focus:border-emerald-700 focus:border-[2px]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="bg-emerald-500 rounded-md px-2 py-1 m-auto my-5 min-w-[60%] active:scale-110 active:bg-emerald-400" type="submit">Login</button>
      </form>
    </div>
    <Footer />
    <PopupWidget />
    </>
  );
}

export default LoginPage;
