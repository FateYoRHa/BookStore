import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

export default function Carousel() {
  const modules = import.meta.glob("../../assets/images/carousel/*.{jpg,png}", {
    eager: true,
  });
  const images = Object.values(modules).map((img) => img.default);
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      navigation={true}
      slidesPerView={1}>
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt="" className="w-full h-full object-fill" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// const Carousel = () => {
//   const images = import.meta.glob("/src/assets/images/carousel/*.{jpg,png}", {
//     eager: true,
//   });
//   const imageList = Object.values(images).map((img) => img.default);

//   return (
//     <div className="carousel">
//       {imageList.map((src, i) => (
//         <img key={i} src={src} alt="" />
//       ))}

//     </div>
//   );
// };

// export default Carousel;
