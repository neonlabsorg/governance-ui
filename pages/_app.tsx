import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import '../styles/index.css'
import useWallet from '../hooks/useWallet'
import Notifications from '../components/Notification'
import NavBar from '../components/NavBar'
import PageBodyContainer from '../components/PageBodyContainer'
import useHydrateStore from '../hooks/useHydrateStore'

function App({ Component, pageProps }) {
  useHydrateStore()
  useWallet()

  const title = 'Neon Governance'
  const description =
    'Discuss and vote on Neon Governance proposals. Join us in building Mango, the protocol for permissionless leverage trading & lending.'
  const keywords =
    'Neon Governance, Serum, SRM, Serum DEX, DEFI, Decentralized Finance, Decentralised Finance, Crypto, ERC20, Ethereum, Decentralize, Solana, SOL, SPL, Cross-Chain, Trading, Fastest, Fast, SerumBTC, SerumUSD, SRM Tokens, SPL Tokens'
  const baseUrl = 'https://neonlabs.org/'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/fav_64.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="/fav_192.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}/images/logo_tg.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mangomarkets" />
      </Head>
      <ThemeProvider defaultTheme="Mango">
        <NavBar />
        <Notifications />
        <PageBodyContainer>
          <Component {...pageProps} />
        </PageBodyContainer>
      </ThemeProvider>
    </>
  )
}

export default App
