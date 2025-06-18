document.addEventListener("DOMContentLoaded", function () {
  // Loading Screen
  setTimeout(function () {
    document.querySelector(".loading-screen").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".loading-screen").style.display = "none";
    }, 500);
  }, 1500);

  // Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  navToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close sidebar if open on mobile
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active");
          mainContent.classList.remove("shifted");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Submenu Toggle
  const profileLink = document.querySelector(
    '.nav-links li a[href="#profile"]'
  );
  if (profileLink) {
    profileLink.addEventListener("click", function (e) {
      if (window.innerWidth > 992) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        submenu.classList.toggle("active");
      }
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Academic Tabs
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to clicked button and corresponding pane
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Facilities Upload Preview
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const uploadPreview = document.getElementById("uploadPreview");

  if (fileInput && uploadPreview) {
    fileInput.addEventListener("change", function () {
      uploadPreview.innerHTML = "";

      if (this.files.length > 10) {
        alert("Anda hanya dapat mengupload maksimal 10 foto.");
        this.value = "";
        return;
      }

      Array.from(this.files).forEach((file) => {
        if (!file.type.match("image.*")) {
          alert("Hanya file gambar yang diizinkan.");
          this.value = "";
          uploadPreview.innerHTML = "";
          return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
          const previewItem = document.createElement("div");
          previewItem.className = "upload-preview-item";

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = "Preview";

          const removeBtn = document.createElement("button");
          removeBtn.innerHTML = "&times;";
          removeBtn.addEventListener("click", function () {
            previewItem.remove();
          });

          previewItem.appendChild(img);
          previewItem.appendChild(removeBtn);
          uploadPreview.appendChild(previewItem);
        };

        reader.readAsDataURL(file);
      });
    });

    // Drag and Drop functionality
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
      uploadArea.style.backgroundColor = "rgba(26, 86, 167, 0.1)";
    }

    function unhighlight() {
      uploadArea.style.backgroundColor = "";
    }

    uploadArea.addEventListener("drop", handleDrop, false);

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      fileInput.files = files;

      // Trigger change event manually
      const event = new Event("change");
      fileInput.dispatchEvent(event);
    }
  }

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Google Maps Integration
  function initMap() {
    // Replace with your actual coordinates
    const schoolLocation = { lat: 1.1717, lng: 124.8747 };

    const map = new google.maps.Map(document.getElementById("schoolMap"), {
      zoom: 15,
      center: schoolLocation,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              saturation: 36,
            },
            {
              color: "#333333",
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#dedede",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#f2f2f2",
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#e9e9e9",
            },
            {
              lightness: 17,
            },
          ],
        },
      ],
    });

    const marker = new google.maps.Marker({
      position: schoolLocation,
      map: map,
      title: "SMK NEGERI 1 KAKAS",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "<h3>SMKN 1 KAKAS</h3><p>JL. RAYA WASIAN-KAKAS, PAHALETEN</p>",
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }

  function initMap() {
    // Koordinat SMKN 1 Kakas (1.171694, 124.874694)
    const schoolLocation = { lat: 1.171694, lng: 124.874694 };

    const map = new google.maps.Map(document.getElementById("schoolMap"), {
      zoom: 17,
      center: schoolLocation,
      mapTypeId: "satellite", // Tampilan satelit
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            { saturation: 36 },
            { color: "#333333" },
            { lightness: 40 },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
      ],
    });

    const marker = new google.maps.Marker({
      position: schoolLocation,
      map: map,
      title: "SMK NEGERI 1 KAKAS",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div style="padding: 10px;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary-color);">SMKN 1 KAKAS</h3>
        <p style="margin: 0;">JL. RAYA WASIAN-KAKAS, PAHALETEN</p>
        <a href="https://maps.app.goo.gl/eoHEkpA8Yg2Q854n6" 
           target="_blank" 
           style="display: inline-block; margin-top: 8px; color: var(--primary-color); text-decoration: none;">
          <i class="fas fa-external-link-alt"></i> Buka di Google Maps
        </a>
      </div>
    `,
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });

    // Buka info window secara otomatis
    infoWindow.open(map, marker);
  }

  // Form Submission
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the data to a server
      // For demo purposes, we'll just show an alert
      alert(
        `Terima kasih, ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`
      );

      // Reset form
      this.reset();
    });
  }

  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    uploadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the files to a server
      // For demo purposes, we'll just show an alert
      alert("Foto fasilitas berhasil diupload!");

      // Reset form
      this.reset();
      uploadPreview.innerHTML = "";
    });
  }

  // =================================================================
  // START OF REVISI KONSENTRASI
  // Enhanced Concentration Section
  const concentrationSection = document.getElementById("concentration");
  const concentrationContainer = document.querySelector(".concentration-grid");

  // Create detail container
  const concentrationDetail = document.createElement("div");
  concentrationDetail.className = "concentration-detail";
  concentrationDetail.style.display = "none";
  concentrationSection.appendChild(concentrationDetail);

  // Create back button
  const backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.innerHTML =
    '<i class="fas fa-arrow-left"></i> Kembali ke Konsentrasi Keahlian';
  backButton.addEventListener("click", () => {
    concentrationDetail.style.display = "none";
    concentrationContainer.style.display = "grid";
  });
  concentrationDetail.appendChild(backButton);

  // Create detail content container
  const detailContent = document.createElement("div");
  detailContent.className = "detail-content";
  concentrationDetail.appendChild(detailContent);

  // Concentration data
  const concentrationData = {
    ATPH: {
      title: "Agribisnis Tanaman Pangan dan Holtikultura (ATPH)",
      description:
        "Program keahlian ini mempelajari tentang budidaya tanaman pangan dan hortikultura, pengolahan hasil pertanian, serta manajemen agribisnis. Siswa akan dibekali keterampilan untuk menjadi wirausaha di bidang pertanian modern.",
      image: "greenhouse.jpg",
      materials: [
        "Budidaya Tanaman Pangan",
        "Teknik Hortikultura",
        "Pengolahan Hasil Pertanian",
        "Manajemen Agribisnis",
        "Pengendalian Hama Terpadu",
        "Kewirausahaan Pertanian",
      ],
    },
    ATU: {
      title: "Agribisnis Ternak Unggas (ATU)",
      description:
        "Program keahlian ini fokus pada pemeliharaan ternak unggas, manajemen peternakan, dan pengolahan produk ternak. Siswa akan belajar tentang nutrisi ternak, kesehatan hewan, dan bisnis peternakan.",
      image: "kandangayam.jpg",
      materials: [
        "Pemeliharaan Ternak Unggas",
        "Manajemen Peternakan",
        "Kesehatan Hewan",
        "Pengolahan Produk Ternak",
        "Nutrisi dan Pakan Ternak",
        "Kewirausahaan Peternakan",
      ],
    },
    APAT: {
      title: "Agribisnis Perikanan Air Tawar (APAT)",
      description:
        "Program keahlian ini mengajarkan tentang budidaya ikan air tawar, pengelolaan kolam, dan pengolahan hasil perikanan. Siswa akan mendapatkan keterampilan dalam teknik pembenihan, pemberian pakan, dan pengendalian hama.",
      image: "kolamikan.jpg",
      materials: [
        "Budidaya Ikan Air Tawar",
        "Pengelolaan Kolam",
        "Pembenihan Ikan",
        "Pengolahan Hasil Perikanan",
        "Manajemen Kualitas Air",
        "Kewirausahaan Perikanan",
      ],
    },
    APHP: {
      title: "Agribisnis Pengolahan Hasil Pangan (APHP)",
      description:
        "Program keahlian ini mempelajari tentang teknologi pengolahan pangan, pengawetan makanan, dan keamanan pangan. Siswa akan dilatih untuk menjadi teknisi pengolahan pangan yang profesional.",
      image: "lahanpertanian.jpg",
      materials: [
        "Teknologi Pengolahan Pangan",
        "Pengawetan Makanan",
        "Keamanan Pangan",
        "Analisis Mutu Pangan",
        "Sanitasi dan Higiene",
        "Kewirausahaan Pangan",
      ],
    },
    TKJ: {
      title: "Teknik Komputer dan Jaringan (TKJ)",
      description:
        "Program keahlian ini fokus pada perakitan komputer, instalasi jaringan, dan pemrograman dasar. Siswa akan dibekali keterampilan untuk menjadi teknisi komputer dan jaringan yang kompeten.",
      image: "labTKJ.jpg",
      materials: [
        "Perakitan Komputer",
        "Instalasi Jaringan Komputer",
        "Administrasi Jaringan",
        "Pemrograman Dasar",
        "Keamanan Jaringan",
        "Kewirausahaan TI",
      ],
    },
    TKRO: {
      title: "Teknik Kendaraan Ringan Otomotif (TKRO)",
      description:
        "Program keahlian ini mengajarkan tentang perawatan dan perbaikan kendaraan ringan. Siswa akan mempelajari sistem mesin, kelistrikan otomotif, dan diagnosis kerusakan kendaraan.",
      image: "fotolabTKRO.jpg",
      materials: [
        "Sistem Mesin Kendaraan",
        "Kelistrikan Otomotif",
        "Diagnosis Kerusakan",
        "Perawatan Kendaraan",
        "Service Berkala",
        "Kewirausahaan Otomotif",
      ],
    },
    TITL: {
      title: "Teknik Instalasi Tenaga Listrik (TITL)",
      description:
        "Program keahlian ini mempelajari tentang instalasi listrik rumah tangga dan industri, panel listrik, dan pembangkitan tenaga listrik. Siswa akan dilatih untuk menjadi teknisi listrik yang handal.",
      image: "ceklistrik.jpg",
      materials: [
        "Instalasi Listrik Rumah Tangga",
        "Instalasi Listrik Industri",
        "Panel Listrik",
        "Pembangkitan Tenaga Listrik",
        "Pengendalian Motor Listrik",
        "Kewirausahaan Listrik",
      ],
    },
    PERHOTELAN: {
      title: "Perhotelan",
      description:
        "Program keahlian ini fokus pada manajemen perhotelan, pelayanan tamu, dan tata boga. Siswa akan dibekali keterampilan untuk bekerja di industri perhotelan dan pariwisata.",
      image: "perhotelananimasi.jpg",
      materials: [
        "Manajemen Perhotelan",
        "Pelayanan Tamu",
        "Tata Boga",
        "Housekeeping",
        "Front Office",
        "Kewirausahaan Perhotelan",
      ],
    },
  };

  // Add click event to concentration cards
  const concentrationCards = document.querySelectorAll(".concentration-card");
  concentrationCards.forEach((card) => {
    card.addEventListener("click", function () {
      const concentrationId = this.querySelector("h3").textContent;
      showConcentrationDetail(concentrationId);
    });
  });

  function showConcentrationDetail(id) {
    const data = concentrationData[id];
    if (!data) return;

    concentrationContainer.style.display = "none";
    concentrationDetail.style.display = "block";

    detailContent.innerHTML = `
      <h2>${data.title}</h2>
      <div class="detail-image">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <div class="detail-description">
        <p>${data.description}</p>
        
        <h3>Materi yang Dipelajari:</h3>
        <ul class="materials-list">
          ${data.materials.map((material) => `<li>${material}</li>`).join("")}
        </ul>
        
        <div class="additional-info">
          <h3>Prospek Karir:</h3>
          <p>Lulusan program ini dapat bekerja di bidang terkait sesuai konsentrasi keahlian, baik sebagai profesional di industri maupun sebagai wirausaha, serta memiliki kesempatan untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.</p>
        </div>
      </div>
    `;

    // Scroll to top of detail
    window.scrollTo({
      top: concentrationSection.offsetTop,
      behavior: "smooth",
    });
  }
  // END OF REVISI KONSENTRASI
  // =================================================================

  // =================================================================
  // START OF REVISI ADMINISTRASI
  const administrationSection = document.getElementById("administration");
  const administrationContainer = document.querySelector(
    ".administration-content"
  );

  // Create detail container for administration
  const administrationDetail = document.createElement("div");
  administrationDetail.className = "admin-detail";
  administrationDetail.style.display = "none";
  administrationSection.appendChild(administrationDetail);

  // Create back button for administration
  const adminBackButton = document.createElement("button");
  adminBackButton.className = "back-button";
  adminBackButton.innerHTML =
    '<i class="fas fa-arrow-left"></i> Kembali ke Administrasi';
  adminBackButton.addEventListener("click", () => {
    administrationDetail.style.display = "none";
    administrationContainer.style.display = "grid";
  });
  administrationDetail.appendChild(adminBackButton);

  // Create detail content container for administration
  const adminDetailContent = document.createElement("div");
  adminDetailContent.className = "admin-content";
  administrationDetail.appendChild(adminDetailContent);

  // Teacher data from Excel
  const teacherData = [
    {
      name: "Verico Kumakauw, S.Pd",
      nip: "19650528 198703 2 010",
      subjects: "",
    },
    {
      name: "Alfreds Watung",
      nip: "19650422 199003 1 006",
      subjects:
        "Konsentrasi Keahlian APAT, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Ir. Nontje Sanger",
      nip: "19650828 199703 2 004",
      subjects:
        "Konsentrasi Keahlian ATPH, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Ir. Olfie O. Raranta",
      nip: "19691001 199703 2 009",
      subjects:
        "Konsentrasi Keahlian ATU, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Diane Songgigilan, SPd",
      nip: "19680805 199702 2 002",
      subjects: "Bahasa Inggris",
    },
    {
      name: "Arwinse W.J. Rantung, S.Pd",
      nip: "19680727 199802 1 003",
      subjects: "Projek IPAS, Mapel Pilihan TITL",
    },
    {
      name: "Oudy V.F. Kotel, SPd",
      nip: "19681011 199702 1 002",
      subjects: "MATEMATIKA",
    },
    {
      name: "Drs. Freky F. Winokan",
      nip: "19680726 199903 1 004",
      subjects: "PPKn",
    },
    {
      name: "Jantje B. Poluakan. S.Pd",
      nip: "19650408 199103 1 016",
      subjects: "PJOK",
    },
    {
      name: "James Devie Pai, S.Pd",
      nip: "19721005 200312 1 008",
      subjects: "MATEMATIKA",
    },
    {
      name: "Agus Sellie Pasla, S.Pd",
      nip: "19740818 200604 2 004",
      subjects:
        "Projek IPAS, Produk Kreatif dan Kewirausahaan, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Evelina Tampi, S.Pd",
      nip: "19810914 200803 2 003",
      subjects:
        "Bahasa Inggris, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Romi A. H. Pangalila, S.Th., M.Pd.K",
      nip: "19740401 200902 1 002",
      subjects: "Pendidikan Agama Kristen",
    },
    {
      name: "Veine Antje Lombogia, S.Pd",
      nip: "19720406 201102 2 003",
      subjects: "Bahasa Indonesia",
    },
    {
      name: "Agustientje F. Oroh, S.Pd",
      nip: "19650817 199103 2 013",
      subjects: "Sejarah Indonesia",
    },
    {
      name: "Ednie I.D. Wawolumaja, S.Pt",
      nip: "19680727 199802 1 003",
      subjects:
        "Dasar-dasar KK ATU, Konsentrasi Keahlian Perhotelan, Mata Pelajaran Pilihan Perhotelan",
    },
    {
      name: "Nofrike Ingrid Nurita Lukow, S.IK",
      nip: "19781103 201408 2 001",
      subjects:
        "Konsentrasi Keahlian APAT, Mata Pelajaran Pilihan APAT, Produk Kreatif dan Kewirausahaan",
    },
    {
      name: "Christiyany Irot, S.Pd",
      nip: "19901112 202012 2 022",
      subjects: "MATEMATIKA",
    },
    {
      name: "Sunandar Djasba, S.Pd",
      nip: "19951127 202012 1 011",
      subjects: "Dasar-dasar KKATPH, Konsentrasi Keahlian APHP",
    },
    {
      name: "Kamaruddin, S.Pd",
      nip: "19890305 202012 1 008",
      subjects: "Konsentrasi Keahlian TKR",
    },
    {
      name: "Vini Beatrix Sondakh. S.Pi",
      nip: "19950824 202012 2 016",
      subjects:
        "Dasar-dasar Program Keahlian APAT, Dasar-dasar Program Keahlian Perhotelan",
    },
    {
      name: "Jeane Lauw, SP",
      nip: "19810126 201102 2 001",
      subjects:
        "Konsentrasi Keahlian ATPH, Mata Pelajaran Pilihan ATPH, Mata Pelajaran Pilihan APHP, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "John O. Tampil, S.Pd",
      nip: "198608142023211017",
      subjects: "Konsentrasi Keahlian TKJ",
    },
    {
      name: "Ade Sepni Talumewo, S.Pd",
      nip: "19890925 202321 1 015",
      subjects:
        "Dasar-dasar Program Keahlian TKJ, Mata Pelajaran Pilihan TKJ, Informatika, Koordinator Projek Penguatan Profil Pelajar Pancasila",
    },
    {
      name: "Natalisa Pai, S.Pd",
      nip: "",
      subjects:
        "Project IPAS, Produk Kreatif dan Kewirausahaan, Koordinator Projek Penguatan Profil Pelajar Pancasila, Muatan Lokal",
    },
    {
      name: "Megha Fietni Masinambow, S.Pd",
      nip: "199401302023212021",
      subjects: "Bahasa Inggris, Muatan Lokal",
    },
    {
      name: "Astria Mawati, S.Pt",
      nip: "",
      subjects:
        "Mata Pelajaran Pilihan ATU, Produk Kreatif dan Kewirausahaan, Muatan Lokal",
    },
    {
      name: "Theoreza M. Rombot, S.Pd",
      nip: "199803172024211000",
      subjects: "Dasar-dasar KKTITL, Konsentrasi Keahlian TITL, Muartan Lokal",
    },
    {
      name: "Riska Treisye Rumoyor, S.Pd",
      nip: "19910426 202421 2 037",
      subjects: "Bahasa Indonesia, Muatan Lokal",
    },
    {
      name: "Frischa Andriani Sinipirang, S.Pi",
      nip: "19921118202412000",
      subjects: "Muatan Lokal, Seni Budaya, Mata Pelajaran Pilihan APAT",
    },
    {
      name: "Miller Pelengkahu, S.Pd",
      nip: "",
      subjects: "Dasar-dasar KK TKR, Mata Pelajaran Pilihan TKR",
    },
    {
      name: "Grace Najoan, S.Pd",
      nip: "",
      subjects: "Pendidikan Agama Kristen dan Budi Pekerti",
    },
    {
      name: "Anita Sorongan",
      nip: "",
      subjects: "Pendidikan Agama Kristen dan Budi Pekerti",
    },
    {
      name: "Tasya Kalla, S.Pd",
      nip: "",
      subjects: "Informatika",
    },
    {
      name: "Suiti Klaudia Kindangen, SE",
      nip: "",
      subjects: "Produk Kreatif dan Kewirausahaan",
    },
  ];

  // Structure data from Excel
  const structureData = {
    kepalaSekolah: {
      name: "Verico Emma Kumakauw, S.Pd",
      nip: "19650529 198703 2 010",
      position: "KEPALA SEKOLAH",
    },
    wakilKepalaSekolah: [
      {
        name: "James D.Pai, S.Pd",
        nip: "19721005 200312 1 008",
        position: "WAKIL KEPALA SEKOLAH BIDANG KURIKULUM & HUMAS",
      },
      {
        name: "Romy A.H Pangalila, S.Th.,M.PdK",
        nip: "19721005 200312 1 008",
        position: "WAKIL KEPALA SEKOLAH BIDANG KESISWAAN & SARPRAS",
      },
    ],
    kepalaTenagaAdministrasi: {
      name: "Nouva Mogonta",
      nip: "……………………………………………..",
      position: "KEPALA TENAGA ADMINISTRASI",
    },
    kepalaProgram: [
      {
        name: "Ir. Nontje Sanger",
        nip: "19650828 199703 2 004",
        position: "Kapro ATPH",
      },
      {
        name: "Ir. Olfie Raranta",
        nip: "19691001 199703 2 009",
        position: "Kapro ATU",
      },
      {
        name: "Alfreds Watung",
        nip: "19650422 199003 1 006",
        position: "Kapro APAT",
      },
      {
        name: "Sunandar Djasba, SPd",
        nip: "19951127 202012 1 011",
        position: "Kapro APHP",
      },
      {
        name: "Oflier Djon Tampil, S.Pd",
        nip: "198608142023211017",
        position: "Kapro TKJ",
      },
      {
        name: "Oudy V.F Kotel, S.Pd",
        nip: "19681011 199702 1 002",
        position: "Kapro TKR",
      },
      {
        name: "Arwinse W.J Rantung, S.Pd",
        nip: "19680727 199802 1 003",
        position: "Kapro TITL",
      },
      {
        name: "Ednie I.D Wawolumaja, S.Pt",
        nip: "19680727 199802 1 003",
        position: "Kapro PERHOTELAN",
      },
    ],
    kepalaUnit: [
      {
        name: "Agus Selly Pasla, S.Pd",
        nip: "19740818 200604 2 004",
        position: "Kepala Laboratorium",
      },
      {
        name: "Veine Lombogia, S.Pd",
        nip: "19720406 201102 2 003",
        position: "Kepala Perpustakaan",
      },
      {
        name: "Agustientje F. Oroh, S.Pd",
        nip: "19650817 199103 2 013",
        position: "Kepala Unit Produksi",
      },
    ],
    waliKelas: {
      x: [
        {
          name: "Evelina Tampi, S.Pd",
          nip: "19810914 200803 2 003",
          kelas: "X APTH",
        },
        {
          name: "Miler Pelengkahu",
          nip: "",
          kelas: "X ATU",
        },
        {
          name: "Vini Beatrix Sondakh. S.Pi",
          nip: "19950824 202012 2 016",
          kelas: "X APAT",
        },
        {
          name: "Megha Fietni Masinambow, S.Pd",
          nip: "199401302023212021",
          kelas: "X TKJ",
        },
        {
          name: "Veine Lombogia, S.Pd",
          nip: "19720406 201102 2 003",
          kelas: "X TKR",
        },
        {
          name: "Ednie I.D Wawolumaja, S.Pt",
          nip: "19680727 199802 1 003",
          kelas: "X PERHOTELAN",
        },
        {
          name: "Theoreza M. Rombot, S.Pd",
          nip: "199803172024211000",
          kelas: "X TITL",
        },
      ],
      xi: [
        {
          name: "Natalisa Pai, S.Pd",
          nip: "",
          kelas: "XI APTH",
        },
        {
          name: "Agustientje F. Oroh, S.Pd",
          nip: "19650817 199103 2 013",
          kelas: "XI ATU",
        },
        {
          name: "Agus Selly Pasla, S.Pd",
          nip: "19740818 200604 2 004",
          kelas: "XI APAT",
        },
        {
          name: "Ade Sepni Talumewo, S.Pd",
          nip: "19890925 202321 1 015",
          kelas: "XI TKJ",
        },
        {
          name: "Riska Treisye Rumoyor, S.Pd",
          nip: "19910426 202421 2 037",
          kelas: "XI TKR",
        },
        {
          name: "Jeane Lauw, SP",
          nip: "19650828 199703 2 004",
          kelas: "XI APHP",
        },
        {
          name: "Arwinse W.J Rantung, S.Pd",
          nip: "19680727 199802 1 003",
          kelas: "XI TITL",
        },
        {
          name: "Ednie I.D Wawolumaja, S.Pt",
          nip: "19680727 199802 1 003",
          kelas: "XI PERHOTELAN",
        },
      ],
      xii: [
        {
          name: "Sunandar Djasba, SPd",
          nip: "19951127 202012 1 011",
          kelas: "XII APTH",
        },
        {
          name: "Diane Songgigilan, SPd",
          nip: "19680805 199702 2 002",
          kelas: "XII APAT",
        },
        {
          name: "Oflier Djon Tampil, S.Pd",
          nip: "198608142023211017",
          kelas: "XII TKJ",
        },
        {
          name: "Kamaruddin, S.Pd",
          nip: "19890305 202012 1 008",
          kelas: "XII TKR",
        },
      ],
    },
  };

  // Facilities data (sample images)
  const facilitiesData = [
    { name: "Lapangan Sekolah", image: "lapangansekolahdepan.jpg" },
    { name: "Perpustakaan", image: "fotoperpustakaan.jpg" },
    { name: "Ruang Guru", image: "ruangguru.jpg" },
    { name: "Ruang Kelas", image: "ruangkelas.jpg" },
    { name: "unit Produksi", image: "upsekolah.jpg" },
    { name: "Pos Penjagaan", image: "pospenjagaan.jpg" },
    { name: "Aula", image: "aula.jpg" },
    { name: "Asrama Guru & Siswa", image: "gerbangdepan.jpg" },
  ];

  // Student data (sample)
  const studentData = {
    total: 350,
    byClass: {
      "X APTH": 40,
      "X ATU": 35,
      "X APAT": 30,
      "X TKJ": 45,
      "X TKR": 40,
      "X PERHOTELAN": 30,
      "X TITL": 30,
      "XI APTH": 35,
      "XI ATU": 30,
      "XI APAT": 25,
      "XI TKJ": 40,
      "XI TKR": 35,
      "XI APHP": 25,
      "XI TITL": 25,
      "XI PERHOTELAN": 25,
      "XII APTH": 30,
      "XII APAT": 25,
      "XII TKJ": 35,
      "XII TKR": 30,
    },
  };

  // Add click event to admin cards
  const adminCards = document.querySelectorAll(".admin-card");
  adminCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      const adminType = this.getAttribute("data-admin");
      showAdminDetail(adminType);
    });
  });

  function showAdminDetail(type) {
    administrationContainer.style.display = "none";
    administrationDetail.style.display = "block";

    switch (type) {
      case "students":
        showStudentData();
        break;
      case "teachers":
        showTeacherData();
        break;
      case "structure":
        showStructureData();
        break;
      case "facilities":
        showFacilitiesData();
        break;
      default:
        break;
    }

    // Scroll to top of detail
    window.scrollTo({
      top: administrationSection.offsetTop,
      behavior: "smooth",
    });
  }

  function showStudentData() {
    adminDetailContent.innerHTML = `
      <h2>Data Siswa SMKN 1 KAKAS</h2>
      
      <div class="data-info">
        <p>Total Siswa: <strong>${studentData.total}</strong> orang</p>
      </div>
      
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Kelas</th>
              <th>Jumlah Siswa</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(studentData.byClass)
              .map(
                ([kelas, jumlah]) => `
              <tr>
                <td>${kelas}</td>
                <td>${jumlah} siswa</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      
      <div class="additional-info">
        <h3>Informasi Tambahan:</h3>
        <p>Data siswa diperbarui setiap awal tahun ajaran baru. Jumlah siswa dapat berubah seiring dengan penerimaan siswa baru dan kelulusan.</p>
      </div>
    `;
  }

  function showTeacherData() {
    adminDetailContent.innerHTML = `
      <h2>Data Guru SMKN 1 KAKAS</h2>
      
      <div class="data-info">
        <p>Total Guru: <strong>${teacherData.length}</strong> orang</p>
      </div>
      
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Guru</th>
              <th>NIP</th>
              <th>Mata Pelajaran/Jabatan</th>
            </tr>
          </thead>
          <tbody>
            ${teacherData
              .map(
                (teacher, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${teacher.name}</td>
                <td>${teacher.nip || "-"}</td>
                <td>${teacher.subjects || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      
      <div class="additional-info">
        <h3>Informasi Tambahan:</h3>
        <p>Data guru diperbarui setiap tahun. Beberapa guru mungkin mengajar lebih dari satu mata pelajaran atau memiliki jabatan tambahan.</p>
      </div>
    `;
  }

  function showStructureData() {
    adminDetailContent.innerHTML = `
      <h2>Struktur Organisasi SMKN 1 KAKAS</h2>
      
      <div class="org-structure">
        <div class="org-level top-level">
          <div class="org-item">
            <div class="org-position">${
              structureData.kepalaSekolah.position
            }</div>
            <div class="org-name">${structureData.kepalaSekolah.name}</div>
            <div class="org-nip">NIP. ${structureData.kepalaSekolah.nip}</div>
          </div>
        </div>
        
        <div class="org-level middle-level">
          ${structureData.wakilKepalaSekolah
            .map(
              (wakil) => `
            <div class="org-item">
              <div class="org-position">${wakil.position}</div>
              <div class="org-name">${wakil.name}</div>
              <div class="org-nip">NIP. ${wakil.nip}</div>
            </div>
          `
            )
            .join("")}
            
          <div class="org-item">
            <div class="org-position">${
              structureData.kepalaTenagaAdministrasi.position
            }</div>
            <div class="org-name">${
              structureData.kepalaTenagaAdministrasi.name
            }</div>
            <div class="org-nip">NIP. ${
              structureData.kepalaTenagaAdministrasi.nip
            }</div>
          </div>
        </div>
        
        <div class="org-level bottom-level">
          ${structureData.kepalaProgram
            .map(
              (kapro) => `
            <div class="org-item">
              <div class="org-position">${kapro.position}</div>
              <div class="org-name">${kapro.name}</div>
              <div class="org-nip">NIP. ${kapro.nip}</div>
            </div>
          `
            )
            .join("")}
            
          ${structureData.kepalaUnit
            .map(
              (kepala) => `
            <div class="org-item">
              <div class="org-position">${kepala.position}</div>
              <div class="org-name">${kepala.name}</div>
              <div class="org-nip">NIP. ${kepala.nip}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <div class="org-info">
        <h3>Wali Kelas:</h3>
        <div class="org-level">
          <h4>Kelas X:</h4>
          ${structureData.waliKelas.x
            .map(
              (wali) => `
            <div class="org-item">
              <div class="org-position">${wali.kelas}</div>
              <div class="org-name">${wali.name}</div>
              <div class="org-nip">${wali.nip ? "NIP. " + wali.nip : ""}</div>
            </div>
          `
            )
            .join("")}
        </div>
        
        <div class="org-level">
          <h4>Kelas XI:</h4>
          ${structureData.waliKelas.xi
            .map(
              (wali) => `
            <div class="org-item">
              <div class="org-position">${wali.kelas}</div>
              <div class="org-name">${wali.name}</div>
              <div class="org-nip">${wali.nip ? "NIP. " + wali.nip : ""}</div>
            </div>
          `
            )
            .join("")}
        </div>
        
        <div class="org-level">
          <h4>Kelas XII:</h4>
          ${structureData.waliKelas.xii
            .map(
              (wali) => `
            <div class="org-item">
              <div class="org-position">${wali.kelas}</div>
              <div class="org-name">${wali.name}</div>
              <div class="org-nip">${wali.nip ? "NIP. " + wali.nip : ""}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function showFacilitiesData() {
    adminDetailContent.innerHTML = `
      <h2>Fasilitas SMKN 1 KAKAS</h2>
      
      <div class="facilities-container">
        <h3>Dokumentasi Fasilitas Sekolah</h3>
        <div class="facilities-gallery">
          ${facilitiesData
            .map(
              (facility) => `
            <div class="facility-item">
              <img src="${facility.image}" alt="${facility.name}">
              <p>${facility.name}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <div class="additional-info">
        <h3>Informasi Tambahan:</h3>
        <p>SMKN 1 KAKAS memiliki berbagai fasilitas penunjang pembelajaran yang memadai untuk mendukung kegiatan belajar mengajar dan pengembangan bakat siswa.</p>
      </div>
    `;
  }
  // END OF REVISI ADMINISTRASI
  // =================================================================
});
