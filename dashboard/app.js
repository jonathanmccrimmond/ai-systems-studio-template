(async function () {
  const listEl = document.getElementById("project-list");
  const countEl = document.getElementById("project-count");
  const emptyEl = document.getElementById("empty-state");
  const errorEl = document.getElementById("error-state");
  const nameEl = document.getElementById("studio-name");
  const taglineEl = document.getElementById("studio-tagline");
  const ownerEl = document.getElementById("studio-owner");

  try {
    const res = await fetch("projects.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
    const data = await res.json();

    if (data.studio) {
      if (data.studio.name) {
        nameEl.textContent = data.studio.name;
        document.title = data.studio.name;
      }
      if (data.studio.tagline) taglineEl.textContent = data.studio.tagline;
      if (data.studio.owner) ownerEl.textContent = data.studio.owner;
    }

    if (data.last_updated) {
      const updatedEl = document.getElementById("last-updated");
      const d = new Date(data.last_updated);
      if (!isNaN(d)) {
        updatedEl.textContent = `Last updated ${d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}.`;
        updatedEl.hidden = false;
      }
    }

    const projects = Array.isArray(data.projects) ? data.projects : [];
    countEl.textContent = projects.length === 1 ? "1 project" : `${projects.length} projects`;

    if (projects.length === 0) {
      emptyEl.hidden = false;
      return;
    }

    const frag = document.createDocumentFragment();
    for (const p of projects) frag.appendChild(renderCard(p));
    listEl.appendChild(frag);
  } catch (err) {
    errorEl.textContent = `Could not load dashboard: ${err.message}`;
    errorEl.hidden = false;
  }

  function renderCard(p) {
    const li = document.createElement("li");
    li.className = "card";

    const head = document.createElement("div");
    head.className = "card-head";

    const titleWrap = document.createElement("div");
    const name = document.createElement("h3");
    name.className = "card-name";
    name.textContent = p.name || "Untitled project";
    titleWrap.appendChild(name);
    head.appendChild(titleWrap);

    if (p.status) {
      const status = document.createElement("span");
      status.className = `status status-${p.status}`;
      status.textContent = p.status;
      head.appendChild(status);
    }
    li.appendChild(head);

    if (p.pitch) {
      const pitch = document.createElement("p");
      pitch.className = "card-pitch";
      pitch.textContent = p.pitch;
      li.appendChild(pitch);
    }

    const links = document.createElement("ul");
    links.className = "card-links";
    const linkItem = document.createElement("li");
    if (p.slide_deck) {
      const a = document.createElement("a");
      a.href = p.slide_deck;
      a.textContent = "Slide deck →";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      linkItem.appendChild(a);
    } else {
      linkItem.className = "disabled";
      linkItem.textContent = "Slide deck pending";
    }
    links.appendChild(linkItem);
    li.appendChild(links);

    return li;
  }
})();
