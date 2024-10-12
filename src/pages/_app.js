import "@/styles/globals.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/vendor/bootstrap/css/bootstrap.min.css';
import '../styles/vendor/bootstrap-icons/bootstrap-icons.css';
import '../styles/vendor/aos/aos.css';
import '../styles/vendor/glightbox/css/glightbox.min.css';
import '../styles/vendor/swiper/swiper-bundle.min.css';
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return <Component {...pageProps} />;
}
