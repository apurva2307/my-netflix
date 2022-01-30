import Card from "./card";
import Link from "next/link";
import styles from "./section-cards.module.css";

const SectionCards = (props) => {
  const { title, videos, size, shouldWrap = false, shouldScale } = props;
  if (!videos) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <h3>No videos to display..</h3>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.cardWrapper} ${shouldWrap ? styles.wrap : ""}`}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`}>
              <a>
                <Card
                  key={idx.toString()}
                  id={idx}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
