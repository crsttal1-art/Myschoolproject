
/* =========================================
   محاكي جهاز الكمبيوتر
   إعداد المعلمة: إيمان العصيمي
========================================= */


/* =========================================
   العناصر الرئيسية
========================================= */

const desktop =
  document.getElementById("desktop");

const win =
  document.getElementById("window");

const settings =
  document.getElementById("settingsWindow");

const windowBody =
  document.getElementById("windowBody");

const settingsBody =
  document.getElementById("settingsBody");

const desktopMenu =
  document.getElementById("desktopMenu");

const clock =
  document.getElementById("clock");

const date =
  document.getElementById("date");


/* =========================================
   البيانات
========================================= */

let files = [];

let trash = [];

let nextId = 1;


/* =========================================
   فتح وإغلاق القائمة المنسدلة
========================================= */

function toggleDesktopMenu() {

  desktopMenu.classList.toggle("hidden");

}


function closeDesktopMenu() {

  desktopMenu.classList.add("hidden");

}


/* =========================================
   إغلاق النوافذ
========================================= */

function closeWindow() {

  win.classList.add("hidden");

}


function closeSettings() {

  settings.classList.add("hidden");

}


/* =========================================
   مستكشف الملفات
========================================= */

function openExplorer() {

  closeDesktopMenu();

  settings.classList.add("hidden");

  win.classList.remove("hidden");

  document.getElementById(
    "windowTitle"
  ).textContent =
    "📁 مستكشف الملفات";

  renderExplorer();

}


/* =========================================
   عرض الملفات
========================================= */

function renderExplorer() {

  windowBody.innerHTML = `

    <div class="toolbar">

      <button
        onclick="newFolder()"
      >
        📁 إنشاء مجلد
      </button>

      <button
        onclick="newImage()"
      >
        🖼️ إنشاء ملف صورة
      </button>

      <button
        onclick="newVideo()"
      >
        🎬 إنشاء ملف فيديو
      </button>

    </div>

    <div
      class="files"
      id="files"
    ></div>

  `;


  const container =
    document.getElementById("files");


  if (files.length === 0) {

    container.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:55px 20px;
          color:#777;
        "
      >

        <div style="font-size:65px;">
          📁
        </div>

        <h3>
          هذا المجلد فارغ
        </h3>

        <p>
          يمكنك إنشاء مجلد أو صورة أو فيديو.
        </p>

      </div>

    `;

    return;

  }


  files.forEach(file => {

    const item =
      document.createElement("div");

    item.className = "file";


    item.innerHTML = `

      <span class="emoji">
        ${file.icon}
      </span>

      <b>
        ${escapeHTML(file.name)}
      </b>

      <button
        onclick="openFile(${file.id})"
      >
        فتح
      </button>

      <button
        onclick="deleteFile(${file.id})"
      >
        🗑️ حذف
      </button>

    `;


    container.appendChild(item);

  });

}


/* =========================================
   إنشاء مجلد
========================================= */

function newFolder() {

  const name =
    prompt(
      "اكتبي اسم المجلد:",
      "مجلدي الجديد"
    );


  if (
    name === null ||
    name.trim() === ""
  ) {

    return;

  }


  files.push({

    id: nextId++,

    icon: "📁",

    name: name.trim(),

    type: "folder"

  });


  renderExplorer();

}


/* =========================================
   إنشاء ملف صورة
========================================= */

function newImage() {

  let name =
    prompt(
      "اكتبي اسم ملف الصورة:",
      "صورتي"
    );


  if (
    name === null ||
    name.trim() === ""
  ) {

    return;

  }


  name =
    name.trim();


  name =
    name.replace(
      /\.(jpg|jpeg|png|webp)$/i,
      ""
    );


  files.push({

    id: nextId++,

    icon: "🖼️",

    name:
      name + ".jpg",

    type: "image"

  });


  renderExplorer();

}


/* =========================================
   إنشاء ملف فيديو
========================================= */

function newVideo() {

  let name =
    prompt(
      "اكتبي اسم ملف الفيديو:",
      "فيديوي"
    );


  if (
    name === null ||
    name.trim() === ""
  ) {

    return;

  }


  name =
    name.trim();


  name =
    name.replace(
      /\.(mp4|mov|webm)$/i,
      ""
    );


  files.push({

    id: nextId++,

    icon: "🎬",

    name:
      name + ".mp4",

    type: "video"

  });


  renderExplorer();

}


/* =========================================
   فتح ملف
========================================= */

function openFile(id) {

  const file =
    files.find(
      item =>
        item.id === id
    );


  if (!file) {
    return;
  }


  document.getElementById(
    "windowTitle"
  ).textContent =
    file.icon +
    " " +
    file.name;


  /* المجلد */

  if (
    file.type === "folder"
  ) {

    windowBody.innerHTML = `

      <div
        style="
          text-align:center;
          padding:55px 20px;
        "
      >

        <div
          style="font-size:85px;"
        >
          📁
        </div>

        <h2>
          ${escapeHTML(file.name)}
        </h2>

        <p>
          هذا مجلد داخل جهاز الكمبيوتر.
        </p>

        <button
          onclick="openExplorer()"
          style="
            padding:10px 22px;
            border:0;
            border-radius:9px;
            background:#368c91;
            color:white;
          "
        >
          ↩ العودة
        </button>

      </div>

    `;

    return;

  }


  /* الصورة */

  if (
    file.type === "image"
  ) {

    windowBody.innerHTML = `

      <div
        style="
          text-align:center;
          padding:35px 20px;
        "
      >

        <div
          style="font-size:85px;"
        >
          🖼️
        </div>

        <h2>
          ${escapeHTML(file.name)}
        </h2>

        <p>
          هذا ملف صورة تجريبي.
        </p>

        <button
          onclick="openExplorer()"
          style="
            padding:10px 22px;
            border:0;
            border-radius:9px;
            background:#368c91;
            color:white;
          "
        >
          ↩ العودة إلى الملفات
        </button>

      </div>

    `;

    return;

  }


  /* الفيديو */

  if (
    file.type === "video"
  ) {

    windowBody.innerHTML = `

      <div
        style="
          text-align:center;
          padding:35px 20px;
        "
      >

        <div
          style="font-size:85px;"
        >
          🎬
        </div>

        <h2>
          ${escapeHTML(file.name)}
        </h2>

        <p>
          هذا ملف فيديو تجريبي.
        </p>

        <button
          onclick="openExplorer()"
          style="
            padding:10px 22px;
            border:0;
            border-radius:9px;
            background:#368c91;
            color:white;
          "
        >
          ↩ العودة إلى الملفات
        </button>

      </div>

    `;

  }

}


/* =========================================
   حذف ملف
========================================= */

function deleteFile(id) {

  const index =
    files.findIndex(
      file =>
        file.id === id
    );


  if (index === -1) {
    return;
  }


  const deleted =
    files.splice(
      index,
      1
    )[0];


  trash.push(deleted);

  renderExplorer();

}


/* =========================================
   سلة المحذوفات
========================================= */

function openTrash() {

  closeDesktopMenu();

  settings.classList.add("hidden");

  win.classList.remove("hidden");

  document.getElementById(
    "windowTitle"
  ).textContent =
    "🗑️ سلة المحذوفات";


  if (trash.length === 0) {

    windowBody.innerHTML = `

      <div
        style="
          text-align:center;
          padding:60px 20px;
        "
      >

        <div style="font-size:80px;">
          🗑️
        </div>

        <h2>
          سلة المحذوفات فارغة
        </h2>

        <p>
          لا توجد ملفات محذوفة.
        </p>

      </div>

    `;

    return;

  }


  windowBody.innerHTML = `

    <div class="toolbar">

      <button
        onclick="emptyTrash()"
      >
        🗑️ إفراغ سلة المحذوفات
      </button>

    </div>

    <div class="files">

      ${
        trash.map(
          file => `

            <div class="file">

              <span class="emoji">
                ${file.icon}
              </span>

              <b>
                ${escapeHTML(file.name)}
              </b>

            </div>

          `
        ).join("")
      }

    </div>

  `;

}


function emptyTrash() {

  trash = [];

  openTrash();

}


/* =========================================
   الإعدادات
========================================= */

function openSettings() {

  closeDesktopMenu();

  win.classList.add("hidden");

  settings.classList.remove("hidden");

  showSetting("date");

}


/* =========================================
   صفحات الإعدادات
========================================= */

function showSetting(type) {


  /* الوقت والتاريخ */

  if (
    type === "date"
  ) {

    settingsBody.innerHTML = `

      <div class="setting-content">

        <h3>
          🕐 الوقت والتاريخ
        </h3>

        <p>
          يمكنك تحديد الوقت والتاريخ
          الظاهرين على جهاز الكمبيوتر.
        </p>

        <input
          id="customTime"
          type="time"
        >

        <input
          id="customDate"
          type="date"
        >

        <button
          onclick="applyDateTime()"
        >
          تطبيق
        </button>

      </div>

    `;

    return;

  }


  /* الخلفيات */

  if (
    type === "bg"
  ) {

    settingsBody.innerHTML = `

      <div class="setting-content">

        <h3>
          🖼️ تغيير خلفية سطح المكتب
        </h3>

        <p>
          اختاري صورة طبيعية لخلفية الجهاز:
        </p>


        <div class="background-gallery">


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80"
              alt="طبيعة"
            >

            <span>
              🌿 طبيعة
            </span>

          </button>


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"
              alt="جبال"
            >

            <span>
              🏔️ جبال
            </span>

          </button>


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80"
              alt="غروب"
            >

            <span>
              🌅 غروب
            </span>

          </button>


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
              alt="شاطئ"
            >

            <span>
              🌊 شاطئ
            </span>

          </button>


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80"
              alt="بحيرة"
            >

            <span>
              🏞️ بحيرة
            </span>

          </button>


          <button
            class="background-card"
            onclick="setBackground(
              'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85'
            )"
          >

            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80"
              alt="منظر طبيعي"
            >

            <span>
              🌲 منظر طبيعي
            </span>

          </button>


        </div>

      </div>

    `;

    return;

  }


  /* الصوت */

  if (
    type === "sound"
  ) {

    settingsBody.innerHTML = `

      <div class="setting-content">

        <h3>
          🔊 إعدادات الصوت
        </h3>

        <p>
          يمكنك التحكم في مستوى صوت الجهاز.
        </p>

        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value="70"
        >

        <p>
          مستوى الصوت:
          <b id="volumeValue">
            70%
          </b>
        </p>

      </div>

    `;


    const volume =
      document.getElementById(
        "volume"
      );


    volume.addEventListener(
      "input",
      function () {

        document.getElementById(
          "volumeValue"
        ).textContent =
          this.value + "%";

      }
    );

  }

}


/* =========================================
   تغيير الخلفية
========================================= */

function setBackground(url) {

  desktop.style.backgroundImage =
    `
      linear-gradient(
        rgba(30,65,75,0.12),
        rgba(30,65,75,0.12)
      ),
      url("${url}")
    `;

  desktop.style.backgroundSize =
    "cover";

  desktop.style.backgroundPosition =
    "center";

  desktop.style.backgroundRepeat =
    "no-repeat";

}


/* =========================================
   تطبيق الوقت والتاريخ
========================================= */

function applyDateTime() {

  const selectedTime =
    document.getElementById(
      "customTime"
    ).value;


  const selectedDate =
    document.getElementById(
      "customDate"
    ).value;


  if (selectedTime) {

    clock.textContent =
      selectedTime;

  }


  if (selectedDate) {

    const parts =
      selectedDate.split("-");


    date.textContent =
      parts[2] +
      "/" +
      parts[1] +
      "/" +
      parts[0];

  }

}


/* =========================================
   الساعة
========================================= */

function updateClock() {

  const now =
    new Date();


  clock.textContent =
    now.toLocaleTimeString(
      "ar-SA",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  date.textContent =
    now.toLocaleDateString(
      "ar-SA"
    );

}


updateClock();


setInterval(
  updateClock,
  60000
);


/* =========================================
   حماية النصوص
========================================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* =========================================
   إغلاق القائمة عند الضغط خارجها
========================================= */

document.addEventListener(
  "click",
  function (event) {

    const clickedInsideMenu =
      desktopMenu.contains(event.target);


    const clickedButton =
      event.target.closest(
        ".desktop-menu-icon"
      );


    const clickedTaskbar =
      event.target.closest(
        ".start-button"
      );


    if (
      !clickedInsideMenu &&
      !clickedButton &&
      !clickedTaskbar
    ) {

      closeDesktopMenu();

    }

  }
);