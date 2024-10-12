import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { BsBookmarkStarFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';


export default function Home({ name, ...props }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeKey, setActiveKey] = useState(null);

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const [showCreateTable, setShowCreateTable] = useState(false);
  const [newEntry, setNewEntry] = useState({ 
    nama_siswa: '', 
    nama_ortu: '', 
    nomer_wa: '',
    ktp_ortu: '', 
    akte_kelahiran: '', 
    kartu_keluarga: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleCreateEntry = (event) => {
    event.preventDefault();
    
    fetch('/api/insert-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert('Anda Berhasil Mendaftarkan Anak Anda');
          setNewEntry({ 
            nama_siswa: '', 
            nama_ortu: '',
            nomor_wa: '',
            ktp_ortu: '', 
            akte_kelahiran: '', 
            kartu_keluarga: '' 
          });
          setShowCreateTable(false);
        } else {
          alert('Gagal menambahkan data');
        }
      })
      .catch((err) => {
        alert('Terjadi kesalahan: ' + err.message);
      });
  };


  const accordionData = [
    {
      question: "Apakah pendaftaran hanya bisa dilakukan secara online?",
      answer: "Tidak, calon peserta didik bisa juga mendaftar secara langsung ke loket Sekolah Al Barokah atau unit pendidikan yang ingin didaftar.",
    },
    {
      question: "Bagi yang sudah mendaftar secara online, adakah cara lain untuk biaya pendaftaran selain lewat transfer bank ?",
      answer: "Ada, calon peserta didik bisa membayar biaya pendaftaran melalui loket pembayaran di Sekolah Al Barokah pada jam kerja.",
    },
    {
      question: "Bagaimana cara mengubah data pendaftaran?",
      answer: "Anda dapat mengubah data pendaftaran dengan menghubungi tim dukungan atau melalui panel pengguna setelah login.",
    },
    // Tambahkan item lain jika diperlukan
  ];

  return (
    <>
      <div className="index-page">

        <header id="header" className="header d-flex align-items-center sticky-top">
          <div className="container-fluid container-xl position-relative d-flex align-items-center gap-4">

            <Link href="/" className="logo d-flex align-items-center me-auto text-decoration-none">
              <img src="/logo.png" alt="" data-aos="fade-in" className="" />
              <h1 className="text-black">Al Barokah</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
              <ul className='gap-4'>
                <li><Link className='text-decoration-none' href="/">Home</Link></li>
                <li><Link className='text-decoration-none' href="#about">About</Link></li>
                <li><Link className='text-decoration-none' href="#ppdb">PPDB</Link></li>
                <li><Link className='text-decoration-none' href="#agenda">Agenda</Link></li>
                <li><Link className='text-decoration-none' href="#pricing">Biaya</Link></li>
                <li><Link className='text-decoration-none' href="#testimonials">Testimoni</Link></li>
                <li><Link className='text-decoration-none' href="#portfolio">Galeri</Link></li>
                <li><Link className='text-decoration-none' href="#footer">Kontak</Link></li>
                <Link className="btn-getstarted text-decoration-none" href="https://albarokahsemarang.com/login">Login</Link>
              </ul>
              

              <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={handleShow}></i>

              <Offcanvas show={show} onHide={handleClose} placement='end' scroll>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='flex flex-col justify-between border-t border-black'>
                  <ul className='m-0 p-0 flex flex-col gap-2'>
                    <li><Link className='text-decoration-none text-black' href="#hero">Home</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#about">About</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#ppdb">PPDB</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#agenda">Agenda</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#biaya">Biaya</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#contact">Testimoni</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#galeri">Galeri</Link></li>
                    <li><Link className='text-decoration-none text-black' href="#kontak">Kontak</Link></li>
                  </ul>
                  <Link className="btn-getstarted text-decoration-none text-white px-5 py-2 bg-[#38B522] rounded text-center" href="#about">Login</Link>
                </Offcanvas.Body>
              </Offcanvas>
            </nav>

          </div>
        </header>

<main className="main">

  <section id="hero" className="hero section">

    <img src="hero.jpg" alt="" data-aos="fade-in" className=""></img>

    <div className="container">
      <div className="row justify-content-center" data-aos="zoom-out">
        <div className="col-xl-9 col-lg-9 text-center">
          <h1>Pendaftaran Peserta Didik Baru</h1>
        </div>
      </div>

      <div className="row gy-4 mt-5">
        <div className="col-md-6 col-lg-4" data-aos="zoom-out" data-aos-delay="50">
          <div className="icon-box">
            <div className='flex gap-2 hover:text-[#38B522]'>
              <BsBookmarkStarFill className='text-4xl' />
              <h4 className="title">KBIT Al Barokah</h4>
            </div>
            <p className="description">Kelompok Bermain ALBAROKAH merupakan sarana belajar dan bermain anak-anak usia pra sekolah. Jenjang sekolah selama 1 tahun. Apa saja manfaat yang akan didapat oleh putra/putri Anda:
            </p>
            <div className='mt-8'>


            <p className="description">1.Mampu menghafal surat pendek
            a</p>
            <p className="description">2.Mampu menghafal doa-doa</p>
            <p className="description">3.Mampu menghafal kosakata bahasa arab
            </p>
            <p className="description">4.Mengenal angka dan huruf latin dan hijaiyyah
            </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4" data-aos="zoom-out" data-aos-delay="200">
          <div className="icon-box">
            <div className='flex gap-2 hover:text-[#38B522]'>
              <BsBookmarkStarFill className='text-4xl' />
              <h4 className="title">TKIT Al Barokah</h4>
            </div>
            <p className="description">Taman Kanak kanak ALBAROKAH merupakan sarana belajar dan bermain anak-anak usia pra sekolah. Jenjang sekolah selama 1 tahun. Apa saja manfaat yang akan didapat oleh putra/putri Anda:
            </p>
            <div className='mt-8'>
            <p className="description">1.Mampu menghafal surat-surat juz 30 (target hafalan 1/2 sd 1 juz)
            </p>
            <p className="description">2.Mampu menghafal Hadist dan doa
            </p>
            <p className="description">3.Mampu menghafal kosakata bahasa arab
            </p>
            <p className="description">4.Membiasakan adab Islami</p>
            <p className="description">5.Mampu membaca dan menulis huruf latin dan hijaiyyah</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4" data-aos="zoom-out" data-aos-delay="300">
          <div className="icon-box">
            <div className='flex gap-2 hover:text-[#38B522]'>
              <BsBookmarkStarFill className='text-4xl' />
              <h4 className="title">SDIT Al Barokah</h4>
            </div>
            <p className="description">Sekolah Dasar Islam Al Barokah, merupakan sekolah dasar dengan sistem Full Day School dengan kurikulum perpaduan antara kurikulum merdeka dan kurikulum Saudi. Apa saja manfaat yang akan didapat oleh putra/putri Anda:
            </p>
            <p className="description">1.	Mampu menghafal Alquran sebanyak 6 juz selama enam tahun
            a</p>
            <p className="description">2.	Mampu menghafal hadits-hadits pilihan
            </p>
            <p className="description">3.	Mampu membiasakan diri mengamalkan doa dan zikir harian
            a</p>
            <p className="description">4.	Mampu membaca dan menulis latin dengan sangat baik
            </p>
            <p className="description">5.	Berakhlak mulia sesuai tuntunan sunnah Nabi Shallallahu alaihi wa Sallam
            </p>
            <p className="description">6.	Mendapatkan pelajaran ekstrakurikuler

            </p>
            <p className="description">7.	Mendapatkan pelajaran bahasa Arab
            </p>
          </div>
        </div>

      </div>
    </div>

  </section>

  <section id="about" className='about section text-white bg-[#38B522]'>
    <div className="container section-title" data-aos="fade-up py-20">
        <h2>About Us</h2>
        <p className='mx-4'>Sekolah Islam Al Barokah adalah salah satu lembaga layanan pendidikan yang berkonsentrasi pada hafalan Alquran, diimbangi dengan pendidikan pembiasaan akhlak islami sesuai sunnah. Harapannya, Alquran menjadi nilai utama dalam tumbuh kembang anak sejak dini yang akan menjadi bekal hidup bermasyarakat.
        </p>
      </div>
  </section>

  <section id="ppdb" className="about section">

  <div className="container">
      <div className="row gy-4">
        <h2 className='text-center font-bold'>PPDB</h2>

        <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="50">
          <p>
            Yayasan Al Barokah kembali membuka Pendaftaran Peserta Didik Baru untuk tahun pelajaran 2025 / 2026 pada jenjang :
          </p>
          <ul>
            <li><i className="bi bi-check2-circle"></i> <span>KBIB Al Barokah.</span></li>
            <li><i className="bi bi-check2-circle"></i> <span>TKIT Al Barokah.</span></li>
            <li><i className="bi bi-check2-circle"></i> <span>SDIT Al Barokah</span></li>
          </ul>
        </div>

        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <p>Pendaftaran Insyaallah akan dimulai pada tanggal 20 Oktober 2024 sampai dengan tanggal 31 Desember 2024.</p>
          <p>
            Pendaftraran dilakukan secara online pada www.albarokahsemarang.com 
            Isi form pendaftaran, kemudian transfer dan konfirmasi biaya administrasi pendaftaran sebesar Rp. 300.000,- pada rekening dan kontak person panitia PPDB.
          </p>
          <Button onClick={() => setShowCreateTable(true)} className="read-more">
            <span>Mendaftar</span>
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>

      {showCreateTable && (
        <Modal show={showCreateTable} onHide={() => setShowCreateTable(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form Pendaftaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateEntry}>
            <div className="mb-3">
              <label>Nama Anak</label>
              <input
                type="text"
                name="nama_siswa"
                value={newEntry.nama_siswa}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label>Nama Orang Tua</label>
              <input
                type="text"
                name="nama_ortu"
                value={newEntry.nama_ortu}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label>KTP Orang Tua</label>
              <input
                type="text"
                name="ktp_ortu"
                value={newEntry.ktp_ortu}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label>Nomer Whatasapp Orang Tua</label>
              <input
                type="tel"
                name="nomer_wa"
                value={newEntry.nomer_wa}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                maxLength="15" // Sesuaikan dengan panjang maksimal nomor WhatsApp
                pattern="[0-9]*" // Hanya menerima angka
                required
              />
            </div>
            <div className="mb-3">
              <label>Akte Kelahiran</label>
              <input
                type="text"
                name="akte_kelahiran"
                value={newEntry.akte_kelahiran}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                required
              />
            </div>
            <div className="">
              <label>Kartu Keluarga</label>
              <input
                type="text"
                name="kartu_keluarga"
                value={newEntry.kartu_keluarga}
                onChange={handleInputChange}
                className="border-1 border-black py-1 px-2 w-full rounded"
                required
              />
            </div>
            <label className='text-red-500 font-bold italic m-0'>Kirim Bukti Pembayaran ke nomer <a href='https://wa.me/6281325914002/?text='>+6281325914002</a></label>
            <button type="submit" className="bg-[#38B522] text-white px-3 py-2 rounded">
              Daftarkan Anak Anda
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      )}
    </div>

  </section>

  <section id='agenda' className='bg-[#f6fafd]'>
    <div className='container mx-auto'>
      <h2 className='text-center font-bold mb-20'>Agenda</h2>

      <div className='flex flex-wrap'>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
          <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Pendaftaran</h3>
            <p>Pendaftaran Penerimaan Siswa baru dilaksanakan pada 20 Oktober s/d 31 Desember 2024 secara online pada link https://albarokahsemarang.com</p>
          </div>
        </div>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
          <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Biaya Pendafaran</h3>
            <p>Biaya pendaftaran Rp. 300.000,- dan di gratiskan khusus untuk anak yatim. Pembayaran dilakukan pada rekening 7441115002 Atas nama YAYASAN AL BAROKAH</p>
          </div>
        </div>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
        <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Syarat Pendafaran</h3>
            <p>Calon siswa mengisi form pendaftaran, membayar biaya pendaftaran, mengirim bukti pembayaran pada nomor <a href='https://wa.me/6281325914002/?text='>+6281325914002</a>. menyiapkan akte kelahiran dan KK</p>
          </div>
        </div>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
          <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Tes Seleksi</h3>
            <p>Calon siswa mengikuti rangkaian tes penjaringan dan menerima hasil pengumuman PPDB pada jadwal yang telah ditentukan dari masing-masing unit yang didaftar</p>
          </div>
        </div>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
          <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Daftar Ulang</h3>
            <p>Siswa yang dinyatakan diterima melakukan daftar ulang pada jadwal yang ditentukan dan dianggap mengundurkan diri jika tidak melakukan daftar ulang pada rentang waktu tersebut</p>
          </div>
        </div>
        <div className='w-full md:w-6/12 lg:w-4/12 flex'>
          <div className='border-2 rounded py-5 px-4 m-2 text-center shadow-xl'>
            <h3 className='my-3'>Masuk Sekolah</h3>
            <p>Awal kegiatan belajar mengajar insyaallah dilaksanakan sekitar bulan Juli tahun 2025 sesuai dengan pengumuman dari masing-masing unit pendidikan</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                Menyekolahkan ananda  di Al Barokah ini, masyaAllah ....
                <label>
                Ananda jadi berinteraksi dengan alquran setiap hari, belajar melibatkan Allah dalam kesehariannya, perkembangan belajarnya jg lebih meningkat, lebih mandiri dan lebih bertanggung jawab<i className="bi bi-quote quote-icon-right"></i>
                </label>
                
              </p>
              <h3>Ummu Khadijah</h3>
              <h4>Wali Murid Al Barokah</h4>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                Jika dilihat dari perilaku mas amir sekarang, Alhamdulillah Sekolah albarokah sudah baik dan para pengajar yang sangat bijak dalamm mengajarkan kebaikan dalam kegiatan sehari2 sehingga mas amir bisa menerapkan dengan baik apa yang di ajarkan dari sekolah
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
              <h3>Ummu Amir</h3>
              <h4>Wali Murid Al Barokah</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                Kami terkesan dengan cara yg dipakai oleh para ustadzah dalam membimbing anak-anak menjadi pribadi yang sholihah, mandiri, dan lembut dalam bergaul.
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
              <h3>Ummu Fatimah</h3>
              <h4>Wali Murid Al Barokah</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                Alhamdulillah puas dengan Sekolah Islam Al Barokah karena anak kami dibekali ilmu sesuai Al Quran dan Sunnah. Kebiasaan akhlaq islami juga semakin baik, semangat belajar Al Quran, akademik semakin juga meningkat.
                Fasilitas Sekolah semakin baik dan meningkat dari tahun ke tahun.
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
              <h3>Ummu Dzulqarnain</h3>
              <h4>Wali Murid Al Barokah</h4>
            </div>
          </SwiperSlide>

          {/* Add more SwiperSlide components as needed */}
        </Swiper>
      </div>
    </section>

  <section id="portfolio" className="portfolio section">

    <div className="container section-title" data-aos="fade-up">
      <h2>Galeri</h2>
    </div>

    <div className="container">

        <div className="row g-lg-4" data-aos="fade-up" data-aos-delay="200">

          <div className="col-lg-7 col-12">
            <img src="galeri1.jpg" className='col-12'  alt="" style={{ height: '400px', objectFit: 'cover' }}></img>
            <div className='flex flex-col flex-lg-row my-4'>
              <div className='col-lg-7 col-12 lg:pr-5'>
                <img src="galeri3.jpg" className=" col-12"  alt="" style={{ height: '250px', objectFit: 'cover' }}></img>
                <img src="galeri6.jpg" className=" col-12 my-4" alt="" style={{ height: '250px', objectFit: 'cover' }}></img>
              </div>
              <img src="galeri4.jpg" className="col-lg-5 col-12"  alt="" style={{ height: '350px', objectFit: 'cover' }}></img>
            </div>
          </div>

          <div className='col-lg-5 col-12'>
            <img src="galeri2.jpg" className=" col-12" alt="" style={{ height: '250px', objectFit: 'cover' }}></img>
            <img src="galeri5.jpg" className=" col-12 my-4" alt="" style={{ height: '350px', objectFit: 'cover' }}></img>
            <img src="galeri7.jpg" className=" col-12" alt="" style={{ height: '250px', objectFit: 'cover' }}></img>
          </div>

      </div>


    </div>

  </section>

  <section id="pricing" className="pricing section">

    <div className="container section-title" data-aos="fade-up">
      <h2>Biaya Pendidikan</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div>

    <div className="container">

      <div className="row flex g-4 g-lg-5">

        <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="50">
          <div className="pricing-item flex flex-col justify-between">
            <div>
              <h3>KB</h3>
              <ul>
                <li className='flex justify-between border-b'>
                  <label>Uang Pendaftaran</label>
                  <label>200.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label>Uang Pangkal</label>
                  <label>2.500.000</label>
                </li>
                <li className='border-b'>Seragam</li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2'>
                    <label>-</label>
                    <label>Putra</label>
                  </label>
                  <label>580.000</label>
                </li> 
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2'>
                    <label>-</label>
                    <label>Putri</label>
                  </label>
                  <label>680.000</label>
                </li> 
                <li className='flex justify-between border-b'>
                  <label>Buku dan Alat Tulis</label>
                  <label>600.000</label>
                </li>
                <li className='border-b'>
                  SPP Juli 2024
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2'>
                    <label>-</label>
                    <label>Fullday</label>
                  </label>
                  <label>750.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2'>
                    <label>-</label>
                    <label>Non Fullday</label>
                  </label>
                  <label>600.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label>Matras dan Alat Makan</label>
                  <label>235.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label>Kegiatan Semester dan Outing Class</label>
                  <label>300.000</label>
                </li>
              </ul>
            </div>

            <div>
              <ul>
                <li className='font-bold'>Total</li>
              <li className='border-b gap-2'>
                  <label>-</label>
                  <label>Fullday</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putra</label>
                  </label>
                  <label>5.165.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putri</label>
                  </label>
                  <label>5.265.000</label>
                </li>
                <li className='border-b gap-2'>
                  <label>-</label>
                  <label>Non Fullday</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putra</label>
                  </label>
                  <label>5.015.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putri</label>
                  </label>
                  <label>5.115.000</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="50">
          <div className="pricing-item flex flex-col justify-between">
            <div>
            <h3>TK</h3>
            <ul>
              <li className='flex justify-between border-b'>
                <label>Uang Pendaftaran</label>
                <label>200.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>Uang Pangkal</label>
                <label>2.500.000</label>
              </li>
              <li className='border-b'>Seragam</li>
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Putra</label>
                </label>
                <label>580.000</label>
              </li> 
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Putri</label>
                </label>
                <label>680.000</label>
              </li> 
              <li className='flex justify-between border-b'>
                <label>Buku dan Alat Tulis</label>
                <label>900.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>SPP Juli 2024(Fullday)</label>
                <label>400.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>Matras dan Alat Makan</label>
                <label>235.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>Kegiatan Semester dan Outing Class</label>
                <label>300.000</label>
              </li>
            </ul>
            </div>

            <div>
              <ul>
                <li className='font-bold'>Total</li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label>-</label>
                    <label>Putra</label>
                  </label>
                  <label>5.115.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label>-</label>
                    <label>Putri</label>
                  </label>
                  <label>5.215.000</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="50">
          <div className="pricing-item flex flex-col justify-between">
            <div>
            <h3>SD</h3>
            <ul>
              <li className='flex justify-between border-b'>
                <label>Uang Pendaftaran</label>
                <label>200.000</label>
              </li>
              <li className='flex justify-between border-b'>
                Uang Pangkal
              </li>
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Alumni TKIT Al Barokah</label>
                </label>
                <label>4.000.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Umum</label>
                </label>
                <label>5.000.000</label>
              </li>
              <li className='border-b'>Seragam</li>
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Putra</label>
                </label>
                <label>900.000</label>
              </li> 
              <li className='flex justify-between border-b'>
                <label className='flex gap-2'>
                  <label>-</label>
                  <label>Putri</label>
                </label>
                <label>1.050.000</label>
              </li> 
              <li className='flex justify-between border-b'>
                <label>Buku Kelas 1</label>
                <label>450.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>SPP Juli 2024</label>
                <label>425.000</label>
              </li>
              <li className='flex justify-between border-b'>
                <label>Kegiatan Semester dan Outing Class</label>
                <label>300.000</label>
              </li>
            </ul>
            </div>

            <div>
              <ul>
                <li className='font-bold'>Total</li>
              <li className='border-b gap-2'>
                  <label>-</label>
                  <label>Alumni TKIT Al Barokah</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putra</label>
                  </label>
                  <label>6.275.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putri</label>
                  </label>
                  <label>6.425.000</label>
                </li>
                <li className='border-b gap-2'>
                  <label>-</label>
                  <label>Umum</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putra</label>
                  </label>
                  <label>7.275.000</label>
                </li>
                <li className='flex justify-between border-b'>
                  <label className='flex gap-2 items-center'>
                    <label><GoDotFill /></label>
                    <label>Putri</label>
                  </label>
                  <label>7.425.000</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>

  </section>

  <section id="faq" className="faq section">

    <div className="container section-title" data-aos="fade-up">
      <h2>Tanya Jawab</h2>
    </div>

    <div className="container">

      <div className="row justify-content-center">

        <div className="col-lg-10" data-aos="fade-up" data-aos-delay="50">

          <div className="faq-container">

          <Accordion activeKey={activeKey} onSelect={handleSelect} defaultActiveKey="0" className="custom-accordion" flush>
  {accordionData.map((item, index) => (
    <Accordion.Item 
      eventKey={index.toString()} 
      className={activeKey === index.toString() ? "active-accordion-item" : ""} 
      key={index}
    >
      <Accordion.Header className={activeKey === index.toString() ? "active-accordion" : ""}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>{item.question}</span>
          <FontAwesomeIcon 
            icon={activeKey === index.toString() ? faChevronUp : faChevronDown} 
            className="accordion-icon" // Class for additional styling if needed
          />
        </div>
      </Accordion.Header>
      <Accordion.Body className={activeKey === index.toString() ? "active-accordion" : ""}>
        {item.answer}
      </Accordion.Body>
    </Accordion.Item>
  ))}
</Accordion>


          </div>

        </div>

      </div>

    </div>

  </section>

</main>

        <footer id="footer" className="footer light-background">

          <div className="container footer-top">
            <h2 className='text-center font-bold mb-5'>Contact</h2>

            <div className="row gy-4">

              <div className="col-lg-6">
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h3>Address</h3>
                    <p className='lg:w-11/12'>Jl. Tegalsari Raya No.41, Tegalsari, Kec. Candisari, Kota Semarang, Jawa Tengah 50614</p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>Call Us</h3>
                    <a href='https://wa.me/6281325914002/?text='>+6281325914002</a>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>Email Us</h3>
                    <p>sekolahislamalbarokah@gmail.com</p>
                  </div>
                </div>

              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-up" data-aos-delay="200">
                <iframe style={{ border: '0', width: '100%', height: '270px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.00226043160285!2d110.42681552219575!3d-7.007153219882239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c8297778af7%3A0xa4fd1fb07408c629!2sYAYASAN%20ISLAM%20AL-BAROKAH%20SEMARANG!5e0!3m2!1sid!2sid!4v1728707511563!5m2!1sid!2sid" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>

            </div>
          </div>

          <div className="copyright text-center mt-4">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">OnePage</strong> <span>All Rights Reserved</span></p>
          </div>

        </footer>

      </div>

    </>
  );
}
