(() => {
  "use strict";
  const P = window.PROFILE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const out = $("#output");
  const input = $("#cmd");
  const form = $("#cmd-form");
  const body = $("#term-body");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ───────────── helpers ───────────── */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hl = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>");
  const cmdLink = (c, label = c) => `<button type="button" class="cmd-link" data-cmd="${esc(c)}">${esc(label)}</button>`;
  const ext = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  const short = (url) => url.replace(/^https?:\/\//, "");
  const tags = (arr) => `<span class="tags">${arr.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>`;
  const proofItem = (p) => (typeof p === "string" ? { text: p } : p);
  const LAYER = { backend: "cloud / services", ml: "models / pipelines", edge: "devices / edge", fde: "customers / field" };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  let skip = false;
  const sleep = (ms) => (skip || reduceMotion ? Promise.resolve() : new Promise((r) => setTimeout(r, ms)));

  const PROMPT =
    '<span class="p-user">guest</span><span class="dim">@</span><span class="p-host">faizan</span><span class="dim">:</span><span class="p-path">~</span><span class="dim">$</span>';
  $("#prompt").innerHTML = PROMPT;

  function print(html, cls = "") {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.innerHTML = html;
    out.appendChild(div);
    scrollDown();
    return div;
  }
  function scrollDown() { body.scrollTop = body.scrollHeight; }
  function echoPrompt(cmd) { print(`<span class="prompt">${PROMPT}</span> <span class="typed">${esc(cmd)}</span>`, "echo"); }

  const BANNER = [
    "███████╗ █████╗ ██╗███████╗ █████╗ ███╗   ██╗",
    "██╔════╝██╔══██╗██║╚══███╔╝██╔══██╗████╗  ██║",
    "█████╗  ███████║██║  ███╔╝ ███████║██╔██╗ ██║",
    "██╔══╝  ██╔══██║██║ ███╔╝  ██╔══██║██║╚██╗██║",
    "██║     ██║  ██║██║███████╗██║  ██║██║ ╚████║",
    "╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝",
  ].join("\n");

  /* ───────────── commands ───────────── */
  const C = {};
  function def(name, desc, run, opts = {}) {
    C[name] = { desc, run, hidden: !!opts.hidden };
    (opts.aliases || []).forEach((a) => (C[a] = { desc, run, hidden: true }));
  }

  def("help", "list available commands", () => {
    const rows = Object.entries(C)
      .filter(([, c]) => !c.hidden)
      .map(([n, c]) => `${cmdLink(n)}<span class="dim">${esc(c.desc)}</span>`)
      .join("");
    print(
      `<div class="help">${rows}</div>` +
        `<p class="dim">Tip: <kbd>Tab</kbd> autocompletes · <kbd>↑</kbd><kbd>↓</kbd> history · <kbd>Ctrl</kbd>+<kbd>L</kbd> clears · everything underlined is clickable. Psst — there are a few hidden commands too.</p>`
    );
  });

  function aboutHtml() {
    return `<div class="block">
      <p><span class="accent bold glow">${esc(P.name)}</span> — ${esc(P.title)}</p>
      <p class="link">${esc(P.tagline)}</p>
      <p>${hl(P.summary)}</p>
      <p class="dim">📍 ${esc(P.location)} · <span class="ok">●</span> ${esc(P.status)}</p>
    </div>`;
  }

  def("whoami", "the short version", () => {
    print(`<pre class="banner" aria-label="${esc(P.first)}">${BANNER}</pre>${aboutHtml()}`);
  });

  def("about", "who I am and what I do", () => {
    print(aboutHtml() + `<p class="dim">next → ${cmdLink("focus")} · ${cmdLink("impact")} · ${cmdLink("experience")} · ${cmdLink("projects")}</p>`);
  }, { aliases: ["bio", "me"] });

  def("focus", "where I fit: backend · AI/ML · embedded · forward deployed", () => {
    const html = P.focus
      .map(
        (f, i) => `<div class="entry">
          <div class="entry-h"><span><span class="dim">[${i + 1}]</span> <span class="accent bold">${esc(f.title)}</span></span><span class="warn">${esc(f.level)}</span></div>
          <p class="dim" style="margin:2px 0 6px">${esc(LAYER[f.id] || "")} · ${esc(f.lead)}</p>
          <ul class="proof">${f.proof
            .map(proofItem)
            .map((p) => `<li class="${p.wip ? "wip" : ""}">${hl(p.text)}${p.wip ? ' <span class="wip-badge">in progress</span>' : ""}</li>`)
            .join("")}</ul>
          ${tags(f.keywords)}
        </div>`
      )
      .join("");
    print(
      `<p class="dim">// I work across the stack, from the device to the cloud.</p>${html}<p class="dim">what's next → ${cmdLink("now")}</p>`
    );
  }, { aliases: ["fit", "tracks", "roles", "pivot"] });

  def("now", "what I'm working on & what's next", () => {
    print(
      `<div class="kv now-kv">${P.now
        .map((n) => `<span class="${n.highlight ? "accent bold" : "dim"}">${esc(n.when)}</span><span class="${n.highlight ? "accent" : ""}">${esc(n.what)}</span>`)
        .join("")}</div><p class="dim">let's talk → ${cmdLink("contact")}</p>`
    );
  }, { aliases: ["next", "roadmap"] });

  def("impact", "numbers I've moved", () => {
    print(
      `<p class="dim">// measurable results from production work</p>
       <div class="stats">${P.impact
         .map((s) => `<div class="stat"><div class="stat-v">${esc(s.value)}</div><div class="stat-l">${esc(s.label)}</div></div>`)
         .join("")}</div>
       <p class="dim">the full story → ${cmdLink("experience")}</p>`
    );
  }, { aliases: ["stats", "metrics"] });

  def("experience", "where I've worked", () => {
    const html = P.experience
      .map(
        (job) => `<div class="entry">
          <div class="entry-h"><span class="accent bold">${esc(job.company)}</span><span class="dim">${esc(job.dates)}</span></div>
          ${job.roles
            .map(
              (r) => `<div class="role">
                <div class="entry-h"><span class="warn">▸ ${esc(r.title)}</span><span class="dim">${esc(r.dates)}</span></div>
                <ul>${r.bullets.map((b) => `<li>${hl(b)}</li>`).join("")}</ul>
              </div>`
            )
            .join("")}
        </div>`
      )
      .join("");
    print(html + `<p class="dim">side projects → ${cmdLink("projects")}</p>`);
  }, { aliases: ["work", "jobs", "exp"] });

  def("projects", "things I've built", () => {
    const html = P.projects
      .map(
        (p, i) => `<div class="entry">
          <div class="entry-h"><span><span class="dim">[${i + 1}]</span> <span class="accent bold">${esc(p.name)}</span>${p.status ? ` <span class="wip-badge">${esc(p.status)}</span>` : ""}</span>${p.url ? ext(p.url, "↗ " + short(p.url)) : ""}</div>
          <p class="dim" style="margin:2px 0 6px">${esc(p.blurb)}</p>
          ${tags(p.stack)}
          <ul>${p.bullets.map((b) => `<li>${hl(b)}</li>`).join("")}</ul>
        </div>`
      )
      .join("");
    print(html + `<p class="dim">more on ${ext(P.contact.github, short(P.contact.github))}</p>`);
  }, { aliases: ["proj", "portfolio"] });

  def("skills", "my tech stack", () => {
    const g = P.skills;
    const rows = g
      .map(
        (grp, i) =>
          `<div class="tree-row"><span class="tree-k"><span class="dim">${i === g.length - 1 ? "└──" : "├──"}</span> ${esc(grp.group)}/</span>${tags(grp.items)}</div>`
      )
      .join("");
    print(`<div class="tree"><div class="accent bold">skills/</div>${rows}</div>`);
  }, { aliases: ["stack", "tech"] });

  def("education", "degrees & coursework", () => {
    const html = P.education
      .map(
        (e) => `<div class="entry">
          <div class="entry-h"><span class="accent bold">${esc(e.school)}</span><span class="dim">${esc(e.dates)}</span></div>
          <div class="warn">▸ ${esc(e.degree)} <span class="dim">· ${esc(e.place)}</span></div>
          <div class="dim">${esc(e.note)}</div>
        </div>`
      )
      .join("");
    print(html);
  }, { aliases: ["edu", "school"] });

  def("contact", "how to reach me", () => {
    const c = P.contact;
    print(
      `<p>Let's talk — I reply fast.</p>
       <div class="kv">
         <span class="dim">email</span><span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a> ${cmdLink("copy-email", "[copy]")}</span>
         <span class="dim">github</span>${ext(c.github, short(c.github))}
         <span class="dim">linkedin</span>${ext(c.linkedin, short(c.linkedin))}
         <span class="dim">résumé</span>${cmdLink("resume", "resume.pdf")}
       </div>`
    );
  }, { aliases: ["email", "hire", "reach"] });

  def("copy-email", "copy my email", async () => {
    try {
      await navigator.clipboard.writeText(P.contact.email);
      print(`<span class="ok">✔</span> copied <span class="accent">${esc(P.contact.email)}</span> to clipboard`);
    } catch {
      print(`<span class="warn">clipboard blocked</span> — here it is: ${esc(P.contact.email)}`);
    }
  }, { hidden: true });

  def("resume", "download my résumé (PDF)", async () => {
    const l = print(`Fetching <span class="accent">resume.pdf</span> <span class="dim">…</span>`);
    await sleep(500);
    l.innerHTML += ` <span class="ok">done</span>`;
    print(`<a href="${esc(P.resume)}" target="_blank" rel="noopener">↓ Open résumé (PDF)</a>`);
  }, { aliases: ["cv", "resume.pdf"] });

  def("gui", "switch to the recruiter-friendly view", async () => {
    print(`<span class="dim">launching graphical interface…</span>`);
    await sleep(350);
    setView("gui");
  }, { aliases: ["recruiter", "startx"] });

  const THEMES = ["green", "amber", "cyan", "violet"];
  def("theme", "change the color: green · amber · cyan · violet", (args) => {
    const t = (args[0] || "").toLowerCase();
    if (!THEMES.includes(t)) {
      print(`usage: theme &lt;name&gt; → ${THEMES.map((n) => cmdLink("theme " + n, n)).join(" · ")}`);
      return;
    }
    setTheme(t);
    print(`<span class="ok">✔</span> theme set to <span class="accent">${t}</span>`);
  });

  def("clear", "clear the screen", () => { out.innerHTML = ""; }, { aliases: ["cls"] });

  // ── filesystem-ish & fun (hidden) ──
  const FILES = ["about.txt", "impact.log", "experience/", "projects/", "skills/", "education/", "contact.txt", "resume.pdf"];
  def("ls", "", () => {
    print(FILES.map((f) => cmdLink(f.replace(/\.(txt|log)$|\/$/, ""), f)).join("&nbsp;&nbsp; "));
  }, { hidden: true, aliases: ["dir", "ll"] });

  const openFile = (args) => {
    const target = (args[0] || "").replace(/^~?\/?/, "").replace(/\.(txt|log|md)$|\/$/, "").toLowerCase();
    if (!target || target === "~" || target === "..") { print(`<span class="dim">you're already home.</span>`); return; }
    if (C[target] && !["clear", "theme", "gui"].includes(target)) return C[target].run([]);
    print(`<span class="err">no such file or directory:</span> ${esc(args[0])} — try ${cmdLink("ls")}`);
  };
  def("cd", "", openFile, { hidden: true });
  def("cat", "", openFile, { hidden: true, aliases: ["open", "less", "more"] });
  def("pwd", "", () => print("/home/guest"), { hidden: true });
  def("date", "", () => print(new Date().toString()), { hidden: true });
  def("echo", "", (args) => print(esc(args.join(" "))), { hidden: true });
  def("history", "", () => print(hist.map((h, i) => `<span class="dim">${String(i + 1).padStart(3)}</span>  ${esc(h)}`).join("<br>")), { hidden: true });
  def("github", "", () => { window.open(P.contact.github, "_blank", "noopener"); print(`opening ${ext(P.contact.github, short(P.contact.github))}…`); }, { hidden: true });
  def("linkedin", "", () => { window.open(P.contact.linkedin, "_blank", "noopener"); print(`opening ${ext(P.contact.linkedin, short(P.contact.linkedin))}…`); }, { hidden: true });

  def("sudo", "", (args) => {
    const s = args.join(" ").toLowerCase();
    if (/hire|offer|interview/.test(s)) {
      print(`<span class="ok">[sudo]</span> permission granted. Excellent judgment. 🎉`);
      print(`Drafting offer letter… <span class="ok">done</span>. Next step: ${cmdLink("contact")}`);
    } else {
      print(`<span class="err">guest is not in the sudoers file.</span> This incident will be reported. <span class="dim">(try: sudo hire faizan)</span>`);
    }
  }, { hidden: true });
  def("rm", "", () => print(`<span class="err">nice try.</span> This portfolio is backed up, version-controlled, and has 3 years of production paranoia.`), { hidden: true });
  def("exit", "", () => print(`There's no escape. ${cmdLink("gui", "Try the recruiter view")} instead.`), { hidden: true, aliases: ["quit", "logout"] });
  def("vim", "", () => print(`<span class="dim">you are now trapped in vim. just kidding —</span> type ${cmdLink("help")}`), { hidden: true, aliases: ["vi", "nano", "emacs"] });
  def("coffee", "", () => print(`<pre class="ascii">   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   \`----'</pre>Brewing… this is how the offline sync got fixed.`), { hidden: true });
  def("hello", "", () => print(`Hey there 👋 — start with ${cmdLink("about")} or ${cmdLink("impact")}.`), { hidden: true, aliases: ["hi", "hey"] });
  def("matrix", "", () => {
    if (reduceMotion || !rain) { print(`<span class="dim">animations are off on this device (reduced motion).</span>`); return; }
    print(`<span class="ok">wake up, recruiter…</span>`);
    rain.burst(6000);
  }, { hidden: true });

  /* ───────────── runner ───────────── */
  const hist = [];
  let hIdx = 0;
  let busy = false;

  function lev(a, b) {
    const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }
  function suggest(word) {
    let best = null, score = 3;
    for (const n of Object.keys(C)) {
      const d = lev(word, n);
      if (d < score) { score = d; best = n; }
    }
    return best;
  }

  async function run(line) {
    const raw = line.trim();
    echoPrompt(raw);
    if (!raw) return;
    hist.push(raw);
    hIdx = hist.length;
    const [name, ...args] = raw.split(/\s+/);
    const c = C[name.toLowerCase()];
    if (c) await c.run(args, raw);
    else {
      const s = suggest(name.toLowerCase());
      print(`<span class="err">command not found:</span> ${esc(name)}${s ? ` — did you mean ${cmdLink(s)}?` : ""} Type ${cmdLink("help")} for the list.`);
    }
    scrollDown();
  }

  async function typeAndRun(cmd) {
    if (busy) return;
    busy = true;
    input.value = "";
    for (const ch of cmd) {
      input.value += ch;
      await sleep(28 + Math.random() * 45);
    }
    await sleep(160);
    input.value = "";
    try { await run(cmd); } finally { busy = false; }
    if (finePointer) input.focus({ preventScroll: true });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;
    const v = input.value;
    input.value = "";
    busy = true;
    try { await run(v); } finally { busy = false; }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx > 0) input.value = hist[--hIdx];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < hist.length - 1) input.value = hist[++hIdx];
      else { hIdx = hist.length; input.value = ""; }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.value.trim().toLowerCase();
      if (!v) return;
      const pool = Object.keys(C).filter((n) => n.startsWith(v));
      const visible = pool.filter((n) => !C[n].hidden);
      const matches = visible.length ? visible : pool;
      if (matches.length === 1) input.value = matches[0] + " ";
      else if (matches.length > 1) { echoPrompt(input.value); print(matches.map((m) => cmdLink(m)).join("&nbsp;&nbsp; ")); }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      out.innerHTML = "";
    } else if (e.key.toLowerCase() === "c" && e.ctrlKey && input.selectionStart === input.selectionEnd && window.getSelection().toString() === "") {
      echoPrompt(input.value + "^C");
      input.value = "";
    }
  });

  // clickable commands anywhere (chips + links in output)
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-cmd]");
    if (!t) return;
    e.preventDefault();
    if (document.body.dataset.view !== "terminal") setView("terminal");
    typeAndRun(t.dataset.cmd);
  });

  // focus input when clicking the terminal (but not when selecting text)
  body.addEventListener("mouseup", (e) => {
    if (!finePointer) return;
    if (e.target.closest("a, button")) return;
    if (window.getSelection().toString()) return;
    input.focus({ preventScroll: true });
  });

  // window dots
  $$("[data-dot]").forEach((b) =>
    b.addEventListener("click", () => {
      const a = b.dataset.dot;
      if (a === "close") setView("gui");
      else if (a === "clear") out.innerHTML = "";
      else document.body.classList.toggle("maximized");
    })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("maximized")) document.body.classList.remove("maximized");
  });

  // clock in the title bar
  const clock = $("#clock");
  const tick = () => (clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  tick();
  setInterval(tick, 15000);

  /* ───────────── boot ───────────── */
  let booted = false;
  async function boot() {
    booted = true;
    busy = true;
    const skipper = () => (skip = true);
    window.addEventListener("keydown", skipper, { once: true });
    body.addEventListener("pointerdown", skipper, { once: true });

    const OK = '[  <span class="ok">OK</span>  ]';
    const lines = [
      `${OK} Booting <span class="accent">faizan-os</span> v3.0 <span class="dim">(uptime: 3 yrs production)</span>`,
      `${OK} Mounting /dev/experience <span class="dim">→ Epicor Corporation</span>`,
      `${OK} Loading modules: <span class="link">dotnet</span> <span class="link">python</span> <span class="link">sql</span> <span class="link">azure</span>`,
      `${OK} Syncing offline data <span class="dim">→ 25,000 records in &lt; 2 min</span>`,
      `${OK} Enrolling in <span class="accent">NYU Tandon</span> · MS Computer Engineering`,
      `${OK} Extending stack ↑ <span class="link">ml</span> <span class="link">mlops</span>  ↓ <span class="link">embedded</span> <span class="link">rtos</span> <span class="link">comp-arch</span>`,
      `${OK} Started <span class="accent">portfolio.service</span>`,
    ];
    for (const l of lines) {
      print(l, "boot");
      await sleep(170);
    }
    await sleep(300);
    busy = false;
    await typeAndRun("whoami");
    print(
      `<p class="dim" style="margin-top:12px">Type ${cmdLink("help")} to see all commands, or click one below. In a hurry? ${cmdLink("gui", "Open the recruiter view")}.</p>`
    );
    skip = false;
    window.removeEventListener("keydown", skipper);
    body.removeEventListener("pointerdown", skipper);
    if (finePointer) input.focus({ preventScroll: true });
  }

  /* ───────────── recruiter view ───────────── */
  const ICON = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.4 4.2 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/></svg>',
  };

  function renderGui() {
    const c = P.contact;
    const sec = (n, title, inner) =>
      `<section><h2 class="sec-h"><span class="num">${n}</span> ${esc(title)}</h2>${inner}</section>`;
    $("#gui-view").innerHTML = `
      <section class="hero">
        <p class="eyebrow"><span class="dim">$</span>whoami</p>
        <h1>${esc(P.name)}</h1>
        <p class="tagline">${esc(P.title)} — ${esc(P.tagline)}</p>
        <p class="summary">${hl(P.summary)}</p>
        <div class="status"><span class="pulse"></span>${esc(P.status)} · ${esc(P.location)}</div>
        <div class="actions">
          <a class="btn primary" href="mailto:${esc(c.email)}">${ICON.mail} Email me</a>
          <a class="btn" href="${esc(P.resume)}" target="_blank" rel="noopener">${ICON.dl} Résumé</a>
          <a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">${ICON.gh} GitHub</a>
          <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICON.li} LinkedIn</a>
        </div>
      </section>

      ${sec("01", "Where I fit", `<p class="sec-lead">Four kinds of roles, one thread: reliable systems from the device to the cloud, delivered to real customers.</p>
        <div class="g-tracks">${P.focus
          .map(
            (f) => `<div class="card g-track reveal">
              <div class="top"><span>${esc(LAYER[f.id] || "")}</span><span class="level">${esc(f.level)}</span></div>
              <h3>${esc(f.title)}</h3>
              <p class="blurb">${esc(f.lead)}</p>
              <ul>${f.proof
                .map(proofItem)
                .map((p) => `<li class="${p.wip ? "wip" : ""}">${hl(p.text)}${p.wip ? ' <span class="wip-badge">in progress</span>' : ""}</li>`)
                .join("")}</ul>
              ${tags(f.keywords)}
            </div>`
          )
          .join("")}</div>
        <ol class="g-now reveal">${P.now
          .map((n) => `<li class="${n.highlight ? "hi" : ""}"><span class="when">${esc(n.when)}</span><span>${esc(n.what)}</span></li>`)
          .join("")}</ol>`)}

      ${sec("02", "Impact", `<div class="g-stats">${P.impact
        .map((s) => `<div class="g-stat reveal"><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`)
        .join("")}</div>`)}

      ${sec("03", "Experience", P.experience
        .map(
          (job) => `<div class="card reveal">
            <div class="job-head"><h3>${esc(job.company)}</h3><span class="when">${esc(job.dates)}</span></div>
            ${job.roles
              .map(
                (r) => `<div class="g-role"><h4><span>${esc(r.title)}</span><span class="when">${esc(r.dates)}</span></h4>
                  <ul>${r.bullets.map((b) => `<li>${hl(b)}</li>`).join("")}</ul></div>`
              )
              .join("")}
          </div>`
        )
        .join(""))}

      ${sec("04", "Projects", `<div class="g-projects">${P.projects
        .map(
          (p, i) => {
            const tag = p.url ? "a" : "div";
            const attrs = p.url ? ` href="${esc(p.url)}" target="_blank" rel="noopener"` : "";
            return `<${tag} class="card g-proj reveal${p.status ? " featured" : ""}"${attrs}>
            <div class="top"><span>project_${String(i + 1).padStart(2, "0")}</span>${
              p.status ? `<span class="wip-badge">${esc(p.status)}</span>` : '<span class="arrow" aria-hidden="true">↗</span>'
            }</div>
            <h3>${esc(p.name)}</h3>
            <p class="blurb">${esc(p.blurb)}</p>
            <ul>${p.bullets.map((b) => `<li>${hl(b)}</li>`).join("")}</ul>
            ${tags(p.stack)}
          </${tag}>`;
          }
        )
        .join("")}</div>`)}

      ${sec("05", "Skills", `<div class="g-skills">${P.skills
        .map((g) => `<div class="card reveal"><h3>${esc(g.group)}</h3>${tags(g.items)}</div>`)
        .join("")}</div>`)}

      ${sec("06", "Education", `<div class="g-edu">${P.education
        .map(
          (e) => `<div class="card reveal"><h3>${esc(e.school)}</h3><p class="deg">${esc(e.degree)}</p>
            <div class="meta">${esc(e.dates)} · ${esc(e.place)}</div><p class="note">${esc(e.note)}</p></div>`
        )
        .join("")}</div>`)}

      <section>
        <div class="card contact-card reveal">
          <h2>Let's build something.</h2>
          <p>I'm ${esc(P.status.toLowerCase())}. The fastest way to reach me is email — I usually reply within a day.</p>
          <div class="actions">
            <a class="btn primary" href="mailto:${esc(c.email)}">${ICON.mail} ${esc(c.email)}</a>
            <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICON.li} LinkedIn</a>
          </div>
        </div>
      </section>

      <p class="gui-foot">Hand-built with HTML, CSS &amp; vanilla JS · prefer the command line? <button type="button" class="link-btn" data-view-btn="terminal">open the terminal &gt;_</button></p>
    `;

    const items = $$(".reveal", $("#gui-view"));
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12 }
    );
    items.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
  }

  /* ───────────── view switching ───────────── */
  let guiRendered = false;
  function setView(v) {
    document.body.dataset.view = v;
    document.body.classList.remove("maximized");
    $$(".view-toggle [data-view-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.viewBtn === v)));
    history.replaceState(null, "", v === "gui" ? "#recruiter" : location.pathname + location.search);
    window.scrollTo(0, 0);
    if (v === "gui") {
      if (!guiRendered) { renderGui(); guiRendered = true; }
    } else {
      if (!booted) boot();
      else if (finePointer) input.focus({ preventScroll: true });
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-view-btn]");
    if (!b) return;
    e.preventDefault();
    setView(b.dataset.viewBtn);
  });

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store.set("theme", t);
    if (rain) rain.recolor();
    const fav = document.querySelector('link[rel="icon"]');
    const col = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    if (fav && col) fav.href = fav.href.replace(/fill='%23[0-9a-fA-F]{6}'%3E%3E_/, `fill='%23${col.slice(1)}'%3E%3E_`);
  }

  /* ───────────── background code rain ───────────── */
  function Rain(canvas) {
    const ctx = canvas.getContext("2d");
    const chars = "01{}[]<>/=;:$#*+()".split("");
    const fs = 16;
    let w, h, cols, drops, color, intense = false, last = 0, timer;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -(h / fs));
    }
    function recolor() { color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#3dffa2"; }
    function frame(t) {
      requestAnimationFrame(frame);
      if (document.hidden || t - last < (intense ? 33 : 70)) return;
      last = t;
      ctx.fillStyle = "rgba(5,7,10,0.16)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        if (!intense && i % 2) continue; // sparser at rest
        const y = drops[i] * fs;
        if (y > 0) ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, y);
        drops[i] += 1;
        if (y > h && Math.random() > 0.975) drops[i] = 0;
      }
    }
    function burst(ms) {
      intense = true;
      canvas.classList.add("intense");
      clearTimeout(timer);
      timer = setTimeout(() => { intense = false; canvas.classList.remove("intense"); }, ms);
    }
    resize(); recolor();
    addEventListener("resize", resize);
    requestAnimationFrame(frame);
    return { recolor, burst };
  }

  /* ───────────── init ───────────── */
  const saved = store.get("theme");
  if (saved && THEMES.includes(saved)) document.documentElement.dataset.theme = saved;
  const rain = reduceMotion ? null : Rain($("#rain"));
  if (saved) setTheme(saved);

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const viewFromHash = () => (/^#(recruiter|gui)$/.test(location.hash) ? "gui" : "terminal");
  addEventListener("hashchange", () => setView(viewFromHash()));
  setView(viewFromHash());
})();
