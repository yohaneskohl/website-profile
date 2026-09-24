
/* =========================================================
   COMPONENTS
========================================================= */

const components = {
  navbar: "./components/navbar.html",
  hero: "./components/hero.html",
  about: "./components/about.html",
  skills: "./components/skills.html",
  projects: "./components/projects.html",
  journals: "./components/journals.html",
  experience: "./components/experience.html",
  contact: "./components/contact.html",
  footer: "./components/footer.html",
};


/* =========================================================
   JOURNAL DATA
========================================================= */

const journals = [
  {
    title: "EVALUASI KEBERHASILAN SIAMIK UPN \"VETERAN\" JAWA TIMUR DENGAN PENDEKATAN INFORMATION SYSTEM SUCCESS MODEL DELONE AND MCLEAN",
    authors: "Kevin Yohanes Wuryanto",
    year: "2024",
    type: "Research Paper",
    description: "Evaluasi tingkat keberhasilan dan kepuasan pengguna terhadap sistem informasi akademik SIAMIK UPN Veteran Jawa Timur menggunakan kerangka kerja DeLone and McLean.",
    tags: [
      "Information System",
      "DeLone and McLean",
      "SIAMIK",
      "Evaluation"
    ],
    link: "https://ejurnal.unim.ac.id/index.php/submit/article/view/2662/1163",
  },
  {
    title: "Rancang Bangun Restful Api E-Flight Ticket Platform Menggunakan Nodejs Dan Database PostgreSQL Di PT. Lentera Bangsa Benderang",
    authors: "Kevin Yohanes Wuryanto",
    year: "2024",
    type: "Internship Report",
    description: "Laporan Praktik Kerja Lapangan (PKL) mengenai pengembangan RESTful API untuk platform tiket pesawat online menggunakan Node.js dan PostgreSQL.",
    tags: [
      "RESTful API",
      "Node.js",
      "PostgreSQL",
      "Backend"
    ],
    link: "https://repository.upnjatim.ac.id/37767/",
  },
  {
    title: "ANALYSIS OF THE EFFECTIVENESS OF USE OF INDONESIAN LANGUAGE AT UPN \"VETERAN\" JAWA TIMUR ELEARNING WEBSITE",
    authors: "Kevin Yohanes Wuryanto",
    year: "2024",
    type: "Research Paper",
    description: "Analisis efektivitas tata bahasa dan penggunaan bahasa Indonesia pada platform E-Learning UPN \"Veteran\" Jawa Timur.",
    tags: [
      "E-Learning",
      "Indonesian Language",
      "Usability",
      "Content Analysis"
    ],
    link: "https://drive.google.com/file/d/1_an516V8I1cLA982bMX5teKbm_gSj5vx/view",
  },
  {
    title: "Design and Construction of a Sales Information System Using the Reactjs and Expressjs Frameworks: case study of Fa_al.store",
    authors: "Kevin Yohanes Wuryanto",
    year: "2025",
    type: "Research Paper",
    description: "Perancangan dan pembangunan sistem informasi penjualan berbasis web (full-stack) untuk toko online Fa_al.store mengintegrasikan React.js dan Express.js.",
    tags: [
      "React.js",
      "Express.js",
      "Web Development",
      "Information System"
    ],
    link: "https://ejournal.uniks.ac.id/index.php/JTOS/article/view/4985/3460",
  },
];


/* =========================================================
   LOAD COMPONENT
========================================================= */

async function loadComponent(id, path) {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(
      `Element #${id} tidak ditemukan di index.html.`
    );

    return;
  }

  element.innerHTML = `
    <p class="component-loading">
      Loading ${id}…
    </p>
  `;

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} saat mengambil ${path}`
      );
    }

    const html = await response.text();

    element.innerHTML = html;
  } catch (error) {
    console.error(
      `Gagal memuat component "${id}" dari ${path}:`,
      error
    );

    const isFileProtocol =
      window.location.protocol === "file:";

    element.innerHTML = `
      <p class="component-loading">
        Component "${id}" gagal dimuat.

        ${
          isFileProtocol
            ? "Kamu membuka file ini langsung menggunakan file://. Jalankan melalui local server seperti VS Code Live Server."
            : "Periksa path file dan Console (F12) untuk melihat detail error."
        }
      </p>
    `;
  }
}


/* =========================================================
   RENDER JOURNALS
========================================================= */

function renderJournals() {
  const container = document.getElementById("journal-list-container");

  if (!container) {
    console.warn("Element #journal-list-container tidak ditemukan.");
    return;
  }

  container.innerHTML = journals
    .map(
      (journal, index) => `
        <article class="journal-row reveal" style="transition-delay: ${index * 80}ms">

          <div class="journal-index">${String(index + 1).padStart(2, "0")}</div>

          <div class="journal-main">
            <div class="journal-row-top">
              <h3 class="journal-title">${journal.title}</h3>
              <div class="journal-row-meta">
                <span class="journal-type-badge">${journal.type}</span>
                <span class="journal-year">${journal.year}</span>
              </div>
            </div>

            <p class="journal-authors">Oleh: ${journal.authors}</p>

            <div class="journal-details">
              <p class="journal-description">${journal.description}</p>
              <div class="journal-tags">
                ${journal.tags
                  .map((tag) => `<span class="journal-tag">${tag}</span>`)
                  .join("")}
              </div>
            </div>
          </div>

          <a href="${journal.link}" class="journal-link" target="_blank" rel="noopener noreferrer" aria-label="Lihat publikasi ${journal.title}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>

        </article>
      `
    )
    .join("");
}


/* =========================================================
   LOAD ALL COMPONENTS
========================================================= */

async function loadAllComponents() {
  const entries = Object.entries(components);

  await Promise.all(
    entries.map(([id, path]) =>
      loadComponent(id, path)
    )
  );

  /*
    Semua component sudah selesai dimuat.

    Karena journals.html sekarang sudah ada di DOM,
    renderJournals() baru dijalankan setelah proses
    loading selesai.
  */
  renderJournals();

  /*
    Memberitahu scripts.js bahwa semua component
    sudah tersedia di DOM.
  */
  document.dispatchEvent(
    new CustomEvent("components:loaded")
  );
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  loadAllComponents
);
