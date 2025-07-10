const languages = {
  en: {
    title: "Study/Work Schedule",
    add: "Add",
    delete: "Delete",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  ar: {
    title: "جدول أوقات الدراسة / العمل",
    add: "إضافة",
    delete: "حذف",
    days: [
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
      "الأحد",
    ],
  },
  fr: {
    title: "Emploi du temps",
    add: "Ajouter",
    delete: "Supprimer",
    days: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ],
  },
};

const titleEl = document.getElementById("title");
const languageSelect = document.getElementById("language");
const toggleDarkBtn = document.getElementById("toggle-dark");
const addBtn = document.getElementById("add-btn");
const scheduleDiv = document.getElementById("schedule");
let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

function saveSchedule() {
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

function render() {
  scheduleDiv.innerHTML = "";
  const lang = languageSelect.value;
  schedule.forEach((item, index) => {
    const entry = document.createElement("div");
    entry.className = "entry";

    // 🆕 قائمة اختيار الأيام
    const daySelect = document.createElement("select");
    daySelect.className = "day-select";
    languages[lang].days.forEach((day) => {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      if (item.day === day) option.selected = true;
      daySelect.appendChild(option);
    });
    daySelect.onchange = (e) => {
      schedule[index].day = e.target.value;
      saveSchedule();
    };
    entry.appendChild(daySelect);

    // 🕒 حقل الوقت
    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.placeholder = "Time";
    timeInput.value = item.time;
    timeInput.oninput = (e) => {
      schedule[index].time = e.target.value;
      saveSchedule();
    };
    entry.appendChild(timeInput);

    // 📝 حقل المهمة
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Task";
    taskInput.value = item.task;
    taskInput.oninput = (e) => {
      schedule[index].task = e.target.value;
      saveSchedule();
    };
    entry.appendChild(taskInput);

    // 🗑️ زر الحذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = languages[lang].delete;
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      schedule.splice(index, 1);
      saveSchedule();
      render();
    };
    entry.appendChild(deleteBtn);

    scheduleDiv.appendChild(entry);
  });
}

addBtn.onclick = () => {
  schedule.push({
    day: languages[languageSelect.value].days[0],
    time: "",
    task: "",
  });
  saveSchedule();
  render();
};

languageSelect.onchange = () => {
  const lang = languageSelect.value;
  titleEl.textContent = languages[lang].title;
  addBtn.textContent = languages[lang].add;
  render();
};

toggleDarkBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleDarkBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
};

window.onload = () => {
  languageSelect.dispatchEvent(new Event("change"));
  render();
  toggleDarkBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
};
