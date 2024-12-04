var currentPage = 1;
const maxPages = 17;

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
      document.getElementById('ta-summary-' + i).classList.remove("hidden");
    } else if (!document.getElementById('ta-summary-' + i).classList.contains("hidden")) {
      document.getElementById('ta-summary-' + i).classList.add("hidden");
    }
    if (i === 7) {
      const myRangeValue = document.getElementById("myRange").value;
      document.getElementById('page-8-text').innerText = `You said ${myRangeValue}. What have you done to move from 1 to ${myRangeValue}?`
    }
  }
}

function nextPage() {
  const currentDiv = document.getElementById(`page-${currentPage}`);
  currentDiv.classList.add("hidden");
  currentPage++;
  if (currentPage > maxPages) {
    currentPage = maxPages;
  }
  const nextDiv = document.getElementById(`page-${currentPage}`);
  nextDiv.classList.remove("hidden");
  stepAction();
  getSummaryTextFromInput();
}

function prevPage() {
  const currentDiv = document.getElementById(`page-${currentPage}`);
  currentDiv.classList.add("hidden");
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const nextDiv = document.getElementById(`page-${currentPage}`);
  nextDiv.classList.remove("hidden");
  stepAction();
}

getSummaryTextFromInput = () => {
  switch (currentPage) {
    case 1: case 2: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: {
      document.getElementById(`ta-summary-${currentPage-1}`).value = document.getElementById(`ta-${currentPage-1}`).value;
      break;
    }
    case 3: {
      document.getElementById(`ta-summary-${currentPage-1}`).value = document.getElementById(`ta-${currentPage-1}`).value;

      break;
    }
    case 4: {
      const input3 = document.getElementById("ta-3").value;
      const div = document.getElementById("page-4-text");
      div.innerText = `Suppose I could talk to ${input3} in the future when you'd have solved your problem. What would ${input3} say is different? How would ${input3} describe the situation when the problem is solved?`;
      const input4 = document.getElementById("ta-4");
      input4.placeholder = `Write the description as if you were ${input3}.`;
      break;
    }
    case 5: {
      const input3 = document.getElementById("ta-3").value;
      document.getElementById(`ta-summary-4`).value = `"Your desired change in the eyes of ${input3}": ${document.getElementById("ta-4").value}`
      break;
    }
    default:
  }
}

(() => {
  const nextButton = document.getElementById("btn-next");
  nextButton.addEventListener("click", nextPage);
  const prevButton = document.getElementById("btn-prev");
  prevButton.addEventListener("click", prevPage);
})();
