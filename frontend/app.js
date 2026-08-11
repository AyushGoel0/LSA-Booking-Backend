const sampleLsas = [
  {
    id: 101,
    name: "Amelia Grant",
    skills: ["Maths", "Science"],
    availability: "Weekdays, 09:00–15:00",
  },
  {
    id: 102,
    name: "Daniel Brooks",
    skills: ["Writing", "Dyslexia support"],
    availability: "Tuesday–Saturday, 10:00–17:00",
  },
  {
    id: 103,
    name: "Priya Shah",
    skills: ["Maths", "Writing", "Study skills"],
    availability: "Monday–Friday, 12:00–19:00",
  },
];

const searchForm = document.querySelector("#search-form");
const skillInput = document.querySelector("#skill");
const searchMessage = document.querySelector("#search-message");
const resultsContainer = document.querySelector("#lsa-results");
const bookingForm = document.querySelector("#booking-form");
const bookingSubmit = document.querySelector("#booking-submit");
const selectedLsaText = document.querySelector("#selected-lsa");
const bookingMessage = document.querySelector("#booking-message");
const bookingPreview = document.querySelector("#booking-preview");

let selectedLsa = null;

function setMessage(element, message, kind = "") {
  element.textContent = message;
  element.className = `form-message${kind ? ` ${kind}` : ""}`;
}

function renderResults(lsas) {
  resultsContainer.replaceChildren();

  if (lsas.length === 0) {
    setMessage(searchMessage, "No sample LSAs match that skill. Try another search.", "error");
    return;
  }

  setMessage(
    searchMessage,
    `${lsas.length} sample LSA${lsas.length === 1 ? "" : "s"} found. The production version will query the API.`,
    "success",
  );

  for (const lsa of lsas) {
    const card = document.createElement("article");
    card.className = "lsa-card";

    const name = document.createElement("h3");
    name.textContent = lsa.name;

    const skills = document.createElement("p");
    skills.className = "lsa-meta";
    skills.textContent = `Skills: ${lsa.skills.join(", ")}`;

    const availability = document.createElement("p");
    availability.className = "lsa-meta";
    availability.textContent = `Availability: ${lsa.availability}`;

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.textContent = "Select LSA";
    selectButton.addEventListener("click", () => selectLsa(lsa));

    card.append(name, skills, availability, selectButton);
    resultsContainer.append(card);
  }
}

function selectLsa(lsa) {
  selectedLsa = lsa;
  selectedLsaText.textContent = `${lsa.name} selected`;
  selectedLsaText.classList.add("is-selected");
  bookingSubmit.disabled = false;
  setMessage(bookingMessage, "Enter the booking details to prepare a request.");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = skillInput.value.trim().toLowerCase();
  const matches = query
    ? sampleLsas.filter((lsa) => lsa.skills.some((skill) => skill.toLowerCase().includes(query)))
    : sampleLsas;

  renderResults(matches);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingPreview.hidden = true;

  if (!selectedLsa) {
    setMessage(bookingMessage, "Select an LSA before preparing a booking request.", "error");
    return;
  }

  const formData = new FormData(bookingForm);
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");

  if (new Date(endTime) <= new Date(startTime)) {
    setMessage(bookingMessage, "The end time must be after the start time.", "error");
    return;
  }

  const draftPayload = {
    parent: {
      name: formData.get("parentName"),
      email: formData.get("parentEmail"),
      phone: formData.get("parentPhone"),
    },
    lsa_id: selectedLsa.id,
    start_time: startTime,
    end_time: endTime,
  };

  setMessage(
    bookingMessage,
    "Demo request prepared. It has not been sent because the matching backend API is not implemented yet.",
    "success",
  );
  bookingPreview.textContent = JSON.stringify(draftPayload, null, 2);
  bookingPreview.hidden = false;
});

renderResults(sampleLsas);
