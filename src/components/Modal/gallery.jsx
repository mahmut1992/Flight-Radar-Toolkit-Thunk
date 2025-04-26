import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";

const Gallery = ({ data }) => {
  const arr = data?.large
    ? data?.large
    : data?.medium
    ? data?.medium
    : data?.thumbnails
    ? data?.thumbnails
    : "?";
  return (
    <div className="gallery">
      {arr?.length > 0 ? (
        <Splide>
          {arr.map((item, key) => (
            <SplideSlide key={key}>
              <img src={item.src} alt="plane" />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="warning">
          <p>Fotoğraf İçeriği Bulunmuyor</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
