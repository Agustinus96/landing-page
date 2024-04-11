import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} >
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-H0NPV552C8');
        `}
      </Script>
      <ThemeProvider attribute="class"r>
      <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
