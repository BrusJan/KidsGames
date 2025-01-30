var currentPage = 1;
const maxPages = 17;
var answers = {};

// Load answers from localStorage
function loadAnswers() {
  const saved = localStorage.getItem("benFurmanAnswers");
  if (saved) {
    answers = JSON.parse(saved);
    // Restore all saved answers to inputs
    for (let i = 1; i <= maxPages; i++) {
      const textArea = document.getElementById(`ta-${i}`);
      if (textArea && answers[`answer${i}`]) {
        textArea.value = answers[`answer${i}`];
      }
      const summaryArea = document.getElementById(`ta-summary-${i}`);
      if (summaryArea && answers[`answer${i}`]) {
        summaryArea.value = answers[`answer${i}`];
      }
    }
    // Restore range input if exists
    const rangeInput = document.getElementById("myRange");
    if (rangeInput && answers.rangeValue) {
      rangeInput.value = answers.rangeValue;
    }
  }
}

// Save answers to localStorage
function saveAnswers() {
  localStorage.setItem("benFurmanAnswers", JSON.stringify(answers));
}

function closeInstructions() {
  const instructionsDiv = document.getElementById("instructions");
  instructionsDiv.classList.add("hidden");
}

function startQuestionnaire() {
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("page-1").classList.remove("hidden");
  document.getElementById("summary").classList.remove("hidden");
  document.querySelector(".buttons").classList.remove("hidden");
  scrollToBottom();
}

function stepAction() {
  if (currentPage === 1) {
    document.getElementById("btn-prev").classList.add("disabled");
  } else {
    document.getElementById("btn-prev").classList.remove("disabled");
  }
  if (currentPage === maxPages) {
    document.getElementById("btn-next").classList.add("disabled");
  } else {
    document.getElementById("btn-next").classList.remove("disabled");
  }
  for (let i = 1; i <= maxPages; i++) {
    if (i < currentPage && i !== 3 && i !== 7) {
      document.getElementById("ta-summary-" + i).classList.remove("hidden");
    } else if (
      !document.getElementById("ta-summary-" + i).classList.contains("hidden")
    ) {
      document.getElementById("ta-summary-" + i).classList.add("hidden");
    }
    if (i === 7) {
      const myRangeValue = document.getElementById("myRange").value;
      document.getElementById(
        "page-8-text"
      ).innerText = `Řekli jste ${myRangeValue}. Co jste udělali, abyste se posunuli z 1 na ${myRangeValue}?`;
    }
  }
}

function deleteAnswers() {
  localStorage.removeItem("benFurmanAnswers");
  location.reload(); // Reload the page to reset the questionnaire
}

function nextPage() {
  const currentDiv = document.getElementById(`page-${currentPage}`);
  currentDiv.classList.add("hidden");
  currentPage++;
  if (currentPage > maxPages) {
    currentPage = maxPages;
    // Show final summary when reaching the last page
    document.getElementById("summary").classList.add("hidden");
    document.getElementById("instructions").classList.add("hidden"); // Ensure instructions are hidden
    document.getElementById("finalSummary").classList.remove("hidden");
    generateFinalSummary();
    // Scroll to top for final summary
    [document.body, document.documentElement].forEach((element) => {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    // Replace next button with delete answers button
    const nextButton = document.getElementById("btn-next");
    nextButton.classList.add("hidden");
    const deleteAnswersButton = document.getElementById("btn-delete");
    deleteAnswersButton.classList.remove("hidden");
    return;
  }
  const nextDiv = document.getElementById(`page-${currentPage}`);
  nextDiv.classList.remove("hidden");
  stepAction();
  getSummaryTextFromInput();

  scrollToBottom();
}

function scrollToBottom() {
  // Scroll to bottom of the content
  const scrollContent = document.querySelector("html");
  const scrollHeight = window.innerWidth < 1580 ? scrollContent.scrollHeight - window.innerHeight - document.querySelector(".donation").clientHeight : scrollContent.scrollHeight;
  scrollContent.scrollTo({
    top: scrollHeight,
    behavior: "smooth",
  });
}

function prevPage() {
  const currentDiv = document.getElementById(`page-${currentPage}`);
  currentDiv.classList.add("hidden");

  // Hide final summary when going back
  if (currentPage === maxPages) {
    document.getElementById("finalSummary").classList.add("hidden");
    document.getElementById("summary").classList.remove("hidden");
  }

  // If we're on page 1, show instructions and hide other content
  if (currentPage === 1) {
    document.getElementById("instructions").classList.remove("hidden");
    document.getElementById("summary").classList.add("hidden");
    document.querySelector(".buttons").classList.add("hidden");
    return;
  }
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const nextDiv = document.getElementById(`page-${currentPage}`);
  nextDiv.classList.remove("hidden");
  stepAction();

  scrollToBottom();
}

function getSummaryTextFromInput() {
  switch (currentPage) {
    case 1:
    case 2:
    case 6:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17: {
      const value = document.getElementById(`ta-${currentPage - 1}`).value;
      answers[`answer${currentPage - 1}`] = value;
      document.getElementById(`ta-summary-${currentPage - 1}`).value = value;
      break;
    }
    case 3: {
      const value = document.getElementById(`ta-${currentPage - 1}`).value;
      answers[`answer${currentPage - 1}`] = value;
      document.getElementById(`ta-summary-${currentPage - 1}`).value = value;
      break;
    }
    case 4: {
      const input3 = document.getElementById("ta-3").value;
      const div = document.getElementById("page-4-text");
      div.innerText = `Předpokládejme, že bych mohl mluvit s ${input3} v budoucnosti, když byste vyřešili svůj problém. Co by ${input3} řekl, že je jinak? Jak by ${input3} popsal situaci, když je problém vyřešen?`;
      const input4 = document.getElementById("ta-4");
      input4.placeholder = `Napište popis, jako byste byli ${input3}.`;
      break;
    }
    case 5: {
      const input3 = document.getElementById("ta-3").value;
      const value = document.getElementById("ta-4").value;
      answers["answer4"] = value;
      document.getElementById(
        `ta-summary-4`
      ).value = `"Vaše požadovaná změna očima ${input3}": ${value}`;
      break;
    }
    case 7: {
      const rangeValue = document.getElementById("myRange").value;
      answers.rangeValue = rangeValue;
      break;
    }
  }
  saveAnswers();
}

function generateFinalSummary() {
  const summaryText = `**Víte, co chcete změnit:**
${answers.answer1 || ""}

**Definovali jste jasný cíl:**
${answers.answer2 || ""}

**Jméno pozorovatele:**
${answers.answer3 || ""}

**Perspektiva pozorovatele:**
${answers.answer4 || ""}

**Vidíte výhody svého cíle:**
${answers.answer5 || ""}
${answers.answer6 || ""}

**Jste již na cestě:**
${answers.answer8 || ""}
${answers.answer9 || ""}

**Víte, jaký je váš další krok:**
${answers.answer10 || ""}

**Máte podporovatele:**
${answers.answer11 || ""}
${answers.answer12 || ""}

**Máte důvěru:**
${answers.answer13 || ""}
${answers.answer14 || ""}

**Jste připraveni čelit možným výzvám:**
${answers.answer15 || ""}

**Víte, jak budete chtít oslavit svůj úspěch:**
${answers.answer16 || ""}

**Komu byste byli vděční:**
${answers.answer17 || ""}`;

  // Convert markdown-style bold syntax to HTML
  const formattedText = summaryText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  document.getElementById("finalSummaryText").innerHTML = formattedText;
}

(() => {
  const nextButton = document.getElementById("btn-next");
  nextButton.addEventListener("click", nextPage);
  const prevButton = document.getElementById("btn-prev");
  prevButton.addEventListener("click", prevPage);
  const deleteButton = document.getElementById("btn-delete");
  deleteButton.addEventListener("click", deleteAnswers);

  // Add event listeners for all textareas to save on input
  for (let i = 1; i <= maxPages; i++) {
    const textArea = document.getElementById(`ta-${i}`);
    if (textArea) {
      textArea.addEventListener("input", () => {
        answers[`answer${i}`] = textArea.value;
        saveAnswers();
      });
    }
  }

  // Add event listener for range input
  const rangeInput = document.getElementById("myRange");
  if (rangeInput) {
    rangeInput.addEventListener("input", () => {
      answers.rangeValue = rangeInput.value;
      saveAnswers();
    });
  }

  // Load saved answers when page loads
  loadAnswers();
})();
