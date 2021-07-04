import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import WordTable from '../components/WordTable'
import { URLInput } from '../components/URLInput'

const title = "Count Those Words"

export default function Home(): JSX.Element {
  const [words, setWords] = useState([[]])
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Counted for you" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>
          Give me a URL, and I will give you the word count
        </p>
        <URLInput setWords={setWords}>

        </URLInput>
        <WordTable words={words}></WordTable>

      </main>


    </div>
  )
}
