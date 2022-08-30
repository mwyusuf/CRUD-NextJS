import type { AppProps } from 'next/app';

import '@/styles/_globals.less';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
