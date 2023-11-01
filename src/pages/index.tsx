import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { FeaturesSection, HeroSection } from '@/components/Homepage';
import { api } from '@/utils/api';

export default function Home() {
  const hello = api.post.hello.useQuery({ text: 'from tRPC' });
  const { data: sessionData } = useSession();

  const isLoggedIn = Boolean(sessionData?.user);

  return (
    <>
      <Head>
        <title>Piedule</title>
        <meta
          name="description"
          content="Piedule is a personal schedule visualizer in the form of a pie chart."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
