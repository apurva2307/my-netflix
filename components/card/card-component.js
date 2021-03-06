import { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";

const Card = ({ imgUrl, size, shouldScale, id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const cardSizes = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  const handleImgError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };
  return (
    <div className={styles.container}>
      <div
        className={`${styles.imgMotionWrapper} ${cardSizes[size]} ${
          shouldScale && (id === 0 ? styles.scaleY : styles.scale)
        }`}
      >
        <Image
          src={imgSrc}
          alt="movie card"
          layout="fill"
          className={styles.cardImg}
          onError={handleImgError}
        />
      </div>
    </div>
  );
};

export default Card;
