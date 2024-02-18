import { useRouter } from 'next/router';
import Link from 'next/link';

function CustomErrorPage() {
  const { query } = useRouter();
  const message = query.message || 'An unknown error occurred';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Authentication Error</h1>
      <p className="mt-4 text-lg text-gray-700">{message}</p>
      <Link href="/">
        <a className="mt-6 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
          Go Home
        </a>
      </Link>
    </div>
  );
}

export default CustomErrorPage;
