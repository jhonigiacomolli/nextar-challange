import 'styles/globals.css'
import 'styles/variants.css'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from 'context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
       <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp
