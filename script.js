const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

document.querySelector("#shareButton").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(window.location.href); showToast("페이지 링크를 복사했어요"); }
  catch { showToast("브라우저 메뉴에서 링크를 공유해 주세요"); }
});


let lastNoteAt = 0;
window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const now = performance.now();
  if (now - lastNoteAt < 85) return;
  lastNoteAt = now;
  const note = document.createElement("span");
  note.className = "cursor-note";
  note.textContent = ["♪", "♫", "♩", "♬"][Math.floor(Math.random() * 4)];
  note.style.left = `${event.clientX + (Math.random() * 18 - 9)}px`;
  note.style.top = `${event.clientY + (Math.random() * 18 - 9)}px`;
  note.style.setProperty("--note-size", `${12 + Math.random() * 8}px`);
  note.style.setProperty("--note-drift", `${Math.random() * 70 - 35}px`);
  note.style.setProperty("--note-spin", `${Math.random() * 50 - 25}deg`);
  document.body.appendChild(note);
  note.addEventListener("animationend", () => note.remove(), { once: true });
});
