import { GridItem } from "..";
import style from "./PhotosGalleryItem.module.css";

export const PhotosGalleryItem = ({ alt, avg_color, src, openModal }) => {
  return (
    <GridItem>
      <div
        className={style.thumb}
        style={{ backgroundColor: avg_color, borderColor: avg_color }}
      >
        <img
          src={src.large}
          alt={alt}
          onClick={() => openModal(src.large, alt)}
        />
      </div>
    </GridItem>
  );
};
