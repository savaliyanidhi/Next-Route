import '../styles/globals.css'
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Card, Button } from '@shopify/polaris';


function MyApp({ Component, pageProps }) {

  return <AppProvider i18n={enTranslations}>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
