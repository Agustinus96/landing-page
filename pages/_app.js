import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} >
      <ThemeProvider attribute="class"r>
      <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
