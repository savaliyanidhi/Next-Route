import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Home() {
    const router = useRouter()
    return (
        <div className={styles.container}>

            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>
                <button onClick={() => { router.push('/bundle1') }}>Clicked me</button>
            </p>


        </div>
    )
}
