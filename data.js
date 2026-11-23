/*
 * ─────────────────────────────────────────────────────────────
 *  All portfolio content lives here. Edit this file to update
 *  the site — both the terminal and the recruiter view read it.
 *  Wrap text in **double asterisks** to highlight a metric.
 *
 *  Rule of thumb: everything here should match the résumé PDF.
 * ─────────────────────────────────────────────────────────────
 */
window.PROFILE = {
  name: "Faizan Ahmed Khan",
  first: "Faizan",
  title: "Backend Engineer",
  tagline: "Offline-first sync · Production reliability · Forward deployed",
  location: "New York, NY",
  status: "Seeking Summer 2027 internships: backend & forward-deployed engineering",
  summary:
    "Backend engineer who spent **3 years at Epicor** making production software work where the network doesn't, reducing data synchronization failures between technicians' offline devices and the server from **1 in 3 runs to nearly zero**. Now pursuing an **MS in Computer Engineering at NYU Tandon** and expanding into Python and machine learning systems.",

  resume: "assets/Faizan_Ahmed_Khan_Resume.pdf?v=2026-11",

  contact: {
    email: "faizanahmedkhan005@gmail.com",
    github: "https://github.com/faizkhan005",
    linkedin: "https://linkedin.com/in/faizan-ahmed-khan-814521191",
  },

  impact: [
    { value: "1 in 3 → ~0", label: "failed offline syncs, ending loss of technicians' unsynced, billable work" },
    { value: "0 reinstalls", label: "forced app reinstalls across 20+ releases, via versioned on-device SQL migrations" },
    { value: "30–40s → <1s", label: "load times on legacy pages migrated to .NET 8 MVC" },
    { value: "5–6s → ~1s", label: "load times on 10,000+ record screens" },
  ],

  // Role tracks. stage "proven" = backed by shipped work (shown first, as the headline).
  // stage "building" = where you're heading (shown later, clearly labeled).
  // Set wip: true on a proof point to show it as in progress.
  focus: [
    {
      id: "backend",
      stage: "proven",
      title: "Backend & Data Sync",
      level: "3 yrs production",
      lead: "Making production software work where the network doesn't.",
      proof: [
        "Rebuilt an offline **sync engine** with batched incremental sync over 25,000+ records and conflict handling: failed syncs **1 in 3 → nearly zero**",
        "**Versioned SQL migrations** for the on-device database: no forced reinstalls across **20+ releases**, upgrading and downgrading across up to 5 app versions",
        "Server-side pagination and stored-procedure tuning: **30–40s → under 1s** on migrated pages",
        "**EvalNow Lite**: lost updates prevented with PostgreSQL SELECT … FOR UPDATE row locks",
      ],
      keywords: ["C# / .NET", "Python / FastAPI", "SQL Server", "PostgreSQL", "Azure", "REST"],
    },
    {
      id: "fde",
      stage: "proven",
      title: "Forward Deployed Engineering",
      level: "3 yrs with field users",
      lead: "Owning software that real customers depend on, from their problem to a fix in their hands.",
      proof: [
        "Primary and later **sole developer** of the Epicor FSM app, used by service businesses and **Kinetic and P21 customers**",
        "Drove the fix for a **memory leak that crashed the app on site** after about 10 minutes, traced via memory profiling",
        "Designed the **multi-view scheduling calendar** for rescheduling technician jobs, and built **web reports** on technician time use and budget adherence",
        "Shipped the Xamarin → .NET MAUI migration in **about 2.5 months**, ahead of Xamarin's end of support",
      ],
      keywords: ["Customer workflows", "Field users", "Production debugging", "Release ownership", "Azure AD / MSAL"],
    },
    {
      id: "ml",
      stage: "building",
      title: "AI/ML Systems & MLOps",
      level: "building toward",
      lead: "Where I'm heading: the systems side of machine learning.",
      proof: [
        "Taking **Machine Learning** at NYU this semester (NumPy, pandas, scikit-learn, regression, k-NN)",
        { text: "**MLOps** course", wip: true, badge: "Spring 2027" },
        "Python / FastAPI backend experience from **EvalNow Lite**, the serving layer I plan to build on",
        { text: "Motion classifier for the **SynapSense** watch (rule-based or ML)", wip: true, badge: "in design" },
      ],
      keywords: ["Python", "scikit-learn", "pandas", "FastAPI"],
    },
    {
      id: "edge",
      stage: "building",
      title: "Embedded & Edge",
      level: "building toward",
      lead: "Taking what I learned on offline field devices down to the hardware.",
      proof: [
        "Taking **Real-Time Embedded Systems** and **Computer Architecture** at NYU this semester",
        "3 years building an **offline-first app** for technicians' devices with unreliable connectivity",
        { text: "**SynapSense**: designing a seizure-alert wearable watch in C++ (PlatformIO) on an nRF52840", wip: true, badge: "in design" },
      ],
      keywords: ["C++", "PlatformIO", "nRF52840", "Real-time systems"],
    },
  ],

  // What you're doing now / next (shown under "Building toward" and by the `now` command)
  now: [
    { when: "Fall 2026", what: "NYU Tandon: Machine Learning · Computer Architecture · Real-Time Embedded Systems" },
    { when: "Dec 2026", what: "SynapSense: seizure-alert wearable watch, in design" },
    { when: "Spring 2027", what: "MLOps" },
    { when: "Summer 2027", what: "Internship: backend · forward deployed · ML systems · embedded", highlight: true },
  ],

  skills: [
    { group: "languages", items: ["C#", "Python", "SQL", "JavaScript"] },
    { group: "backend", items: ["ASP.NET Core", ".NET 8/10", "Web API", "MVC", "EF Core", "LINQ", "REST", "OData", "JWT", "FastAPI", "Pydantic"] },
    { group: "databases", items: ["SQL Server", "PostgreSQL", "SQLite", "Redis", "Stored procedures", "Schema design", "asyncpg", "Alembic"] },
    { group: "cloud-devops", items: ["Azure", "Azure DevOps", "Azure AD", "MSAL", "Docker", "GitHub Actions", "CI/CD", "Git"] },
    { group: "mobile", items: [".NET MAUI", "Xamarin", "MVVM", "Prism", "iOS", "Android"] },
    { group: "testing", items: ["xUnit", "NUnit"] },
    { group: "machine-learning", items: ["NumPy", "pandas", "scikit-learn", "Linear & logistic regression", "k-nearest neighbors"] },
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
            "Owned, as primary and later **sole developer**, the .NET MAUI app for Epicor FSM, used by service businesses and Kinetic and P21 customers to schedule technicians' jobs, track parts and labor offline, and sync that work to the server for billing.",
            "Reduced failed syncs from **about 1 in 3 to nearly zero** by rebuilding the offline sync engine with batched incremental sync over 25,000+ records and conflict handling, ending loss of technicians' unsynced, billable work.",
            "Implemented Azure AD sign-in with MSAL that remembers the last user, so a returning technician skips the full resync and a different user gets a clean wipe and fresh sync.",
            "Eliminated forced app reinstalls across **20+ releases** by building versioned SQL migrations for the on-device database, supporting upgrades and downgrades across up to 5 app versions.",
            "Drove the fix for a memory leak that **crashed the app for technicians on site** after about 10 minutes of use, tracing it via memory profiling to retained UI components and undisposed camera streams.",
            "Designed the app's multi-view scheduling calendar for viewing and rescheduling technician jobs, and built web reports on technician time use and adherence to budgets and estimates.",
            "Improved load times from **5–6s to about 1s** on 10,000+ record screens and from **30–40s to under 1s** on legacy pages migrated to .NET 8 MVC, using server-side pagination and stored procedure tuning.",
          ],
        },
        {
          title: "Software Developer Intern",
          dates: "Feb 2023 – Aug 2023",
          bullets: [
            "Migrated the production field service app from **Xamarin to .NET MAUI** with one teammate in about 2.5 months ahead of Xamarin's end of support, ramping up on both frameworks from scratch.",
            "Redesigned the app's UI in Figma to Epicor design standards and built it once approved, introducing MVVM with Prism and rebuilding broken navigation across iOS, Android, and Windows.",
          ],
        },
      ],
    },
  ],

  // First project should be one that runs. In-design work goes last.
  projects: [
    {
      name: "EvalNow Lite",
      stack: ["Python", "FastAPI", "PostgreSQL"],
      url: "https://github.com/faizkhan005/evalnow-lite",
      blurb: "Backend for clinical training evaluations: a student and faculty member review each other, and neither sees the other's review until both submit.",
      bullets: [
        "Prevented lost updates when both parties submit at once with a four-state machine guarded by PostgreSQL **SELECT … FOR UPDATE** row locks.",
        "Kept reviews hidden by enforcing blindness **in the SQL query** instead of filtering responses, and derived access from session participation, not the token's role claim.",
        "Secured sessions with **refresh-token rotation**, family-wide revocation on token reuse, and a 20-minute inactivity timeout.",
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
        "Correlation-ID structured logging.",
      ],
    },
    {
      name: "SynapSense",
      stack: ["C++", "PlatformIO", "XIAO nRF52840 Sense", "IMU"],
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
  ],

  education: [
    {
      school: "New York University, Tandon School of Engineering",
      degree: "Master of Science (MS), Computer Engineering",
      dates: "Sep 2026 – Dec 2027 (expected)",
      place: "Brooklyn, NY",
      note: "Current coursework: Machine Learning, Computer Architecture, Real-Time Embedded Systems",
    },
    {
      school: "Vidyavardhaka College of Engineering",
      degree: "Bachelor of Engineering (BE), Computer Science",
      dates: "Aug 2019 – May 2023",
      place: "Mysuru, India",
      note: "CGPA: 8.79 / 10",
    },
  ],
};
