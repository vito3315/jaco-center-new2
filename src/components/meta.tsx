import React from 'react';

import Head from 'next/head';

type Props = {
  title: string;
  children: React.ReactNode;
}

export default function Meta({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}
