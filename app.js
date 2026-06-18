/* Road Trip Bingo Generator — client-side PDF generation with jsPDF.
   Everything runs in the browser, so it works on GitHub Pages (static hosting). */

(function () {
  "use strict";

  // ---- UI references ----
  const el = (id) => document.getElementById(id);
  const titleInput = el("title");
  const numCardsInput = el("numCards");
  const gridSizeInput = el("gridSize");
  const commonPct = el("commonPct");
  const commonPctVal = el("commonPctVal");
  const freeSpace = el("freeSpace");
  const customItems = el("customItems");
  const generateBtn = el("generate");
  const status = el("status");

  // Show the built-in list
  el("defaultCount").textContent = DEFAULT_WORDS.length;
  el("defaultPreview").textContent = DEFAULT_WORDS.join(" · ");

  commonPct.addEventListener("input", () => {
    commonPctVal.textContent = commonPct.value + "%";
  });

  // ---- Helpers ----
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function parseCustom(text) {
    return text
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function dedupe(arr) {
    const seen = new Set();
    const out = [];
    for (const item of arr) {
      const key = item.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(item);
      }
    }
    return out;
  }

  function setStatus(msg, isError) {
    status.textContent = msg;
    status.className = isError ? "error" : "";
  }

  // Build one card's grid of words (array of length cells).
  // commonItems appear on every card (shuffled positions); rest are unique-per-card.
  function buildCard(commonItems, fillPool, cells, useFree, freeIndex) {
    const slots = new Array(cells).fill(null);
    const positions = shuffle([...Array(cells).keys()].filter((i) => !(useFree && i === freeIndex)));

    let p = 0;
    // Place shared/common items first.
    for (const item of commonItems) {
      if (p >= positions.length) break;
      slots[positions[p++]] = item;
    }
    // Fill the rest from a freshly shuffled pool (unique within this card).
    const pool = shuffle(fillPool);
    let f = 0;
    while (p < positions.length) {
      slots[positions[p++]] = pool[f++ % pool.length];
    }
    if (useFree) slots[freeIndex] = "FREE";
    return slots;
  }

  // ---- PDF drawing ----
  function drawCard(doc, title, slots, grid) {
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 40;
    const titleH = 60;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(title, pageW / 2, margin + 18, { align: "center" });

    const gridTop = margin + titleH;
    const available = Math.min(pageW - margin * 2, pageH - gridTop - margin);
    const cell = available / grid;
    const gridLeft = (pageW - cell * grid) / 2;

    doc.setLineWidth(1.2);
    doc.setDrawColor(40, 60, 100);

    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        const x = gridLeft + c * cell;
        const y = gridTop + r * cell;
        const word = slots[r * grid + c] || "";

        if (word === "FREE") {
          doc.setFillColor(45, 108, 223);
          doc.rect(x, y, cell, cell, "FD");
          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.text("FREE", x + cell / 2, y + cell / 2 + 5, { align: "center" });
          doc.setTextColor(0, 0, 0);
          continue;
        }

        doc.rect(x, y, cell, cell);
        doc.setTextColor(20, 30, 45);
        doc.setFont("helvetica", "normal");

        // Fit text: shrink font and wrap to cell width.
        const maxW = cell - 12;
        let fontSize = 12;
        let lines;
        do {
          doc.setFontSize(fontSize);
          lines = doc.splitTextToSize(word, maxW);
          if (lines.length * (fontSize + 2) <= cell - 10) break;
          fontSize -= 1;
        } while (fontSize > 6);

        const lineH = fontSize + 2;
        const startY = y + cell / 2 - ((lines.length - 1) * lineH) / 2 + fontSize / 3;
        lines.forEach((line, i) => {
          doc.text(line, x + cell / 2, startY + i * lineH, { align: "center" });
        });
      }
    }
  }

  // ---- Main ----
  function generate() {
    try {
      const title = (titleInput.value || "Road Trip Bingo").trim();
      const numCards = Math.max(1, Math.min(200, parseInt(numCardsInput.value, 10) || 1));
      const grid = Math.max(3, Math.min(6, parseInt(gridSizeInput.value, 10) || 5));
      const cells = grid * grid;
      const useFree = freeSpace.checked && grid % 2 === 1;
      const freeIndex = useFree ? Math.floor(cells / 2) : -1;
      const fillableCells = cells - (useFree ? 1 : 0);
      const pct = parseInt(commonPct.value, 10) || 0;

      // Word pool: built-in + custom, de-duplicated.
      const custom = parseCustom(customItems.value);
      const allWords = dedupe([...DEFAULT_WORDS, ...custom]);

      if (allWords.length < fillableCells) {
        setStatus(
          `Need at least ${fillableCells} items for a ${grid}×${grid} card, but only have ${allWords.length}. Add more custom items.`,
          true
        );
        return;
      }

      // How many items are shared across all cards.
      let commonCount = Math.round((pct / 100) * fillableCells);
      commonCount = Math.min(commonCount, fillableCells, allWords.length);

      const shuffledAll = shuffle(allWords);
      const commonItems = shuffledAll.slice(0, commonCount);
      const fillPool = shuffledAll.slice(commonCount);

      if (fillPool.length < fillableCells - commonCount) {
        setStatus("Not enough unique items to fill each card without repeats. Add more items or lower the shared %.", true);
        return;
      }

      setStatus("Generating " + numCards + " card(s)…");

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "pt", format: "letter" });

      for (let i = 0; i < numCards; i++) {
        if (i > 0) doc.addPage();
        const slots = buildCard(commonItems, fillPool, cells, useFree, freeIndex);
        drawCard(doc, title, slots, grid);
        // Card number footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(
          "Card " + (i + 1) + " of " + numCards,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 24,
          { align: "center" }
        );
      }

      const safeTitle = title.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "bingo";
      doc.save(safeTitle + "-cards.pdf");
      setStatus("Done! Generated " + numCards + " card(s). Check your downloads.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong: " + err.message, true);
    }
  }

  generateBtn.addEventListener("click", generate);
})();
