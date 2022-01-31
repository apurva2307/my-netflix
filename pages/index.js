import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/Banner";
import Navbar from "../components/nav/Navbar";
import { getVideos, getPopularVideos } from "../lib/videos";
import SectionCards from "../components/card/section-cards";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebase-config";
import { magic } from "../lib/magic-client";
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
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsername(user.email);
        return;
      } else {
        router.push("/login");
      }
    });
    if (localStorage.getItem("magic")) {
      const { email } = await magic.user?.getMetadata();
      if (email) {
        setUsername(email);
        return;
      }
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>My NETFLIX App</title>
        <meta name="My-Netflix" content="A personal videos library." />
        <link rel="icon" href="/netflix.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar username={username} />
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
