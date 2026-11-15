/*
 * ─────────────────────────────────────────────────────────────
 *  All portfolio content lives here. Edit this file to update
 *  the site — both the terminal and the recruiter view read it.
 *  Wrap text in **double asterisks** to highlight a metric.
 * ─────────────────────────────────────────────────────────────
 */
window.PROFILE = {
  name: "Faizan Ahmed Khan",
  first: "Faizan",
  title: "Software Engineer",
  tagline: "Backend · AI/ML systems · Embedded · Forward deployed",
  location: "New York, NY",
  status: "Seeking Summer 2027 internships: AI/ML · Forward Deployed · Backend · Embedded",
  summary:
    "I build reliable systems **from the device to the cloud**, and I take them all the way to the customer. For 3 years at Epicor I shipped production .NET, owning an offline-first field service app as its **sole developer**: sync over flaky connections, memory on real devices, performance at ERP scale, and **fixing real customer issues in production**. Now in an **MS in Computer Engineering at NYU Tandon**, I'm going deeper at both ends of the stack: **AI/ML & MLOps** above, **embedded C++ & real-time systems** below.",

  resume: "assets/Faizan_Ahmed_Khan_Resume.pdf",

  contact: {
    email: "faizanahmedkhan005@gmail.com",
    github: "https://github.com/faizkhan005",
    linkedin: "https://linkedin.com/in/faizan-ahmed-khan-814521191",
  },

  impact: [
    { value: "3 yrs", label: "shipping production .NET at Epicor" },
    { value: "5–6s → 1s", label: "screen loads on 10,000+ record views" },
    { value: "~50%", label: "faster API responses from SQL tuning" },
    { value: "<2 min", label: "offline sync of 25,000+ records (was 3–4 min)" },
  ],

  // "Where I fit": one card per kind of role you're applying for.
  // Set wip: true on a proof point to show it as in progress.
  focus: [
    {
      id: "backend",
      title: "Backend & Distributed Systems",
      level: "3 yrs production",
      lead: "My core. Services, data, and the hard parts that live between them.",
      proof: [
        "Owned the API + SQL layer for multi-tenant ERP customers; **~50% faster** responses",
        "Concurrency done right: row locking against lost updates in **EvalNow Lite**",
        "Retries, backoff, dead-letter queues and audit trails in a **distributed task queue**",
      ],
      keywords: ["C#/.NET", "Python", "PostgreSQL", "Redis", "REST", "Azure"],
    },
    {
      id: "ml",
      title: "AI/ML Systems & MLOps",
      level: "growing fast",
      lead: "Getting models out of notebooks and into reliable production pipelines.",
      proof: [
        "Production **CI/CD, Docker and release engineering**: the backbone of MLOps",
        "Python services with FastAPI, Pydantic and async Postgres, ready for model serving",
        "ML coursework at NYU (scikit-learn, pandas); **MLOps in Spring 2027**",
        { text: "**On-watch classification** of motion features in the SynapSense wearable (edge ML)", wip: true },
      ],
      keywords: ["Python", "FastAPI", "Docker", "GitHub Actions", "scikit-learn", "CI/CD"],
    },
    {
      id: "edge",
      title: "Embedded & Edge",
      level: "hands-on now",
      lead: "Software that has to work on constrained devices, offline, for a whole shift.",
      proof: [
        "Shipped an **offline-first app on field devices**: sync over intermittent connectivity",
        "Fixed long-shift crashes through **memory profiling** and lifecycle-aware resource disposal",
        "Real-Time Embedded Systems + Computer Architecture coursework at NYU",
        { text: "**SynapSense**: designing a seizure-alert **wearable watch** on an nRF52840 (C++), with on-watch sensing and classification and alerts via a paired phone", wip: true },
      ],
      keywords: ["C++", "PlatformIO", "nRF52840", "Real-time systems", "Computer architecture", "Offline sync"],
    },
    {
      id: "fde",
      title: "Forward Deployed Engineering",
      level: "3 yrs customer-facing",
      lead: "Taking software from a customer's problem to a fix running in their production.",
      proof: [
        "Owned a product used by **Epicor Kinetic and P21 ERP customers**; resolved customer-reported production issues end to end",
        "Built **client onboarding** tools (company setup, users, credentials) and per-company configuration",
        "Delivered **customer-specific ERP workflow** modules and scaled the app to large enterprise customers",
      ],
      keywords: ["Customer delivery", "Enterprise ERP", "Production debugging", "Multi-tenant", "Release ownership"],
    },
  ],

  // What you're doing now / next (shown under "Where I fit" and by the `now` command)
  now: [
    { when: "Fall 2026", what: "NYU Tandon: Machine Learning · Computer Architecture · Real-Time Embedded Systems" },
    { when: "Dec 2026", what: "SynapSense: seizure-alert wearable watch, in design (embedded C++ + on-device ML)" },
    { when: "Spring 2027", what: "MLOps" },
    { when: "Summer 2027", what: "Internship: AI/ML · forward deployed · backend · embedded", highlight: true },
  ],

  skills: [
    { group: "languages", items: ["C#", "Python", "C++", "SQL", "JavaScript"] },
    { group: "backend", items: ["ASP.NET Core", "MVC", "Web API", ".NET 8/10", "FastAPI", "Pydantic", "REST", "OData", "LINQ", "EF Core", "JWT"] },
    { group: "databases", items: ["SQL Server", "PostgreSQL", "Redis", "SQLite", "asyncpg", "Stored procedures", "Schema design", "Alembic"] },
    { group: "cloud-devops", items: ["Azure", "Azure AD", "MSAL", "Azure DevOps", "GitHub Actions", "Docker", "Git", "CI/CD"] },
    { group: "embedded", items: ["C++", "PlatformIO", "nRF52840 (XIAO Sense)", "IMU sensing", "On-device feature extraction", "Real-time systems"] },
    { group: "mobile-testing", items: [".NET MAUI", "Xamarin", "MVVM", "Prism", "iOS", "Android", "xUnit", "NUnit", "Testcontainers"] },
    { group: "ml (coursework)", items: ["NumPy", "pandas", "scikit-learn", "Regression", "k-NN"] },
  ],

  experience: [
    {
      company: "Epicor Corporation",
      dates: "Feb 2023 – Jan 2026",
      roles: [
        {
          title: "Associate Product Developer",
          dates: "Aug 2023 – Jan 2026",
          bullets: [
            "Primary and later **sole developer** of a .NET MAUI field service app, sold standalone and as an add-on for Epicor Kinetic and P21 ERP customers; shipped monthly minor and quarterly major releases through Azure DevOps CI/CD.",
            "Redesigned offline sync of billing-critical field data, replacing wipe-and-reload with batched incremental reconciliation over **25,000+ part records**, cutting sync from **3–4 min to under 2** and eliminating hangs.",
            "Led the scale-up to large ERP customers: tuned SQL Server stored procedures for **~50% faster API responses** and built OData server-side pagination with virtualization, cutting 10,000+ record screen loads from **5–6s to ~1s**.",
            "Diagnosed crashes during long field shifts with memory profiling — traced to retained UI components and undisposed camera streams — and fixed them with lifecycle-aware disposal.",
            "Migrated legacy pages to .NET 8 MVC and built Web API / MVC modules for **multi-tenant ERP clients** secured with MSAL and Azure AD.",
            "Built admin tooling for client onboarding, user management, and per-company custom-field configuration.",
          ],
        },
        {
          title: "Software Developer Intern",
          dates: "Feb 2023 – Aug 2023",
          bullets: [
            "Completed, with one teammate, the full **Xamarin → .NET MAUI migration** and UI overhaul of a production mobile app, introducing decoupled MVVM with Prism.",
            "Built configurable ASP.NET MVC modules for customer-specific ERP workflows.",
          ],
        },
      ],
    },
  ],

  projects: [
    {
      name: "SynapSense",
      stack: ["C++", "PlatformIO", "XIAO nRF52840 Sense", "IMU", "On-device ML"],
      url: "", // add the repo link here when it's public
      status: "In design · team project · Dec 2026",
      blurb: "A wearable watch we're designing that watches wrist motion for seizure patterns and alerts a caregiver through the wearer's paired smartphone.",
      bullets: [
        "Designing the **watch firmware in C++ with PlatformIO** on a **Seeed XIAO nRF52840 Sense**, continuously sampling motion and extracting signal features **on the watch**.",
        "Features are evaluated by a rule-based or **machine-learning classifier**; only a sustained pattern consistent with a target seizure pattern creates an **event record**.",
        "When an event is recorded, the watch sends an **alert through a paired smartphone**.",
        "Primary prototype target: **generalized and focal-to-bilateral tonic–clonic seizures**; selected focal motor or tonic events are a research target where a person-specific pattern can be established.",
        "Clearly scoped: it detects motion patterns correlated with seizures, does not measure brain activity, and **is not a diagnostic device**.",
      ],
    },
    {
      name: "EvalNow Lite",
      stack: ["Python", "FastAPI", "PostgreSQL"],
      url: "https://github.com/faizkhan005/evalnow-lite",
      blurb: "Blind mutual-evaluation backend: neither party sees the other's submission until both submit.",
      bullets: [
        "Four-state machine advanced under **SELECT … FOR UPDATE** row locking to prevent lost-update races.",
        "Visibility enforced in SQL, not response filtering; authorization derived from session participation, not token role claims.",
        "Refresh-token rotation with **reuse detection** and family-wide revocation.",
      ],
    },
    {
      name: "ERP Inventory API",
      stack: [".NET 10", "PostgreSQL", "Redis"],
      url: "https://github.com/faizkhan005/Erp-Inventory-API",
      blurb: "Clean Architecture REST API for inventory management.",
      bullets: [
        "JWT auth, **Redis cache-aside** caching, and cursor-based pagination.",
        "Docker Compose setup with GitHub Actions CI.",
      ],
    },
    {
      name: "Distributed Task Queue",
      stack: [".NET 10", "Hangfire", "PostgreSQL"],
      url: "https://github.com/faizkhan005/Distributed-Task-Queue",
      blurb: "Background job service with production-grade failure handling.",
      bullets: [
        "Configurable retry with **exponential backoff**, plus a dead-letter queue and full failure audit trail.",
        "Correlation-ID structured logging; covered by xUnit + Testcontainers tests.",
      ],
    },
  ],

  education: [
    {
      school: "New York University, Tandon School of Engineering",
      degree: "MS, Computer Engineering",
      dates: "Sep 2026 – Dec 2027 (expected)",
      place: "Brooklyn, NY",
      note: "Fall 2026: Machine Learning, Computer Architecture, Real-Time Embedded Systems · Spring 2027: MLOps",
    },
    {
      school: "Vidyavardhaka College of Engineering",
      degree: "BE, Computer Science",
      dates: "Aug 2019 – May 2023",
      place: "Mysuru, India",
      note: "CGPA: 8.79 / 10",
    },
  ],
};
