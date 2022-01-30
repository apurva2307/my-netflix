import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/Banner";
import Navbar from "../components/nav/Navbar";
import { getVideos, getPopularVideos } from "../lib/videos";
import SectionCards from "../components/card/section-cards";

export async function getServerSideProps() {
  // Fetch data from external API
  const disneyVideos = await getVideos("Disney");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  // Pass data to the page via props
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

const Home = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My NETFLIX App</title>
        <meta name="My-Netflix" content="A personal videos library." />
        <link rel="icon" href="/netflix.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <SectionCards
          title="Popular"
          videos={popularVideos}
          size="medium"
          shouldScale
        />
        <SectionCards
          title="Disney"
          videos={disneyVideos}
          size="medium"
          shouldScale
        />
        <SectionCards
          title="Travel"
          videos={travelVideos}
          size="small"
          shouldScale
        />
        <SectionCards
          title="Productivity"
          videos={productivityVideos}
          size="small"
          shouldScale
        />
      </div>
    </div>
  );
};

export default Home;
