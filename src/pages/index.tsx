import Head from 'next/head';
import { FeaturesSection, HeroSection } from '@/components/Homepage';

export default function Home() {
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
