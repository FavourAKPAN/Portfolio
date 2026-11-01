export type ProjectLink = { label: string; href: string };

export type TestCase = {
  id: string;
  scenario: string;
  expected: string;
  actual: string;
  status: "Pass" | "Fail" | "Blocked";
};

export type Project = {
  slug: string;
  title: string;
  /** Short label shown in the eyebrow on the card. */
  eyebrow: string;
  featured?: boolean;
  summary: string;
  /** Bullet list shown on the card (featured only) and the case-study page. */
  highlights?: string[];
  /** Shown beneath the summary when present. */
  note?: string;
  /** A factual result statement, only where there is evidence for it. */
  result?: string;
  /** Facts taken from the resume; each entry is rendered only when present. */
  role?: string;
  period?: string;
  /** What the project covers, in plain terms. */
  covers: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** "contain" for screenshots that should not be cropped. */
    fit: "cover" | "contain";
  };
  links: ProjectLink[];
  /** Real test cases only. Leave undefined until evidence exists; the table is then omitted. */
  testCases?: TestCase[];
};

export const projects: Project[] = [
  {
    slug: "trexpal",
    title: "Trexpal — Travel Companion App",
    eyebrow: "UX / UI Design · Travel Tech",
    featured: true,
    summary:
      "A travel companion app concept for Nigerian travellers, designed to bring flight bookings, accommodation bookings and itinerary planning together in one experience.",
    highlights: [
      "Flight-booking experience",
      "Accommodation-booking experience",
      "Itinerary-planning experience",
    ],
    note: "Presented as a design project.",
    role: "Solo UI/UX designer",
    period: "August–November 2025",
    covers: [
      "Flight booking",
      "Accommodation booking",
      "Itinerary planning",
    ],
    image: {
      src: "/images/trexpal_cover.jpg",
      alt: "Trexpal travel app case study cover showing accommodation search, welcome and flight search screens",
      width: 1616,
      height: 1264,
      fit: "cover",
    },
    links: [
      {
        label: "View the case study on Behance",
        href: "https://www.behance.net/gallery/237749185/Trexpal-Travel-Companion-App-UXUI-Design-Case-Study",
      },
    ],
  },
  {
    slug: "padijar",
    title: "Padijar — Community Fintech UX",
    eyebrow: "UX / UI Design",
    summary:
      "A fintech Android app concept focused on community savings and budgeting, covering its wallet experience, onboarding, design system and interface decisions.",
    note: "Presented as a design project.",
    role: "Solo UI/UX designer",
    period: "May–June 2025",
    covers: ["Wallet experience", "Onboarding", "Design system"],
    image: {
      src: "/images/padijar_cover.jpg",
      alt: "Padijar fintech app case study cover showing the wallet home screen",
      width: 2576,
      height: 1832,
      fit: "cover",
    },
    links: [
      {
        label: "View the case study on Behance",
        href: "https://www.behance.net/gallery/230753991/PadiJar-Fintech-App-Case-Study-%28Android-App%29?platform=direct",
      },
    ],
  },
  {
    slug: "rest-api-testing",
    title: "REST API Testing — Postman",
    eyebrow: "API Testing · Software QA",
    summary:
      "Hands-on practice with HTTP methods, response validation, authentication, negative scenarios and JavaScript test assertions. DummyJSON is a practice API, not a production e-commerce application. Some write operations simulate creation, updates, and deletion rather than permanently changing stored data. Passing assertions confirms only that the observed responses met the checks defined in this collection; it does not guarantee that all possible API behaviour is defect-free.",
    result:
      "The final Postman collection run reports 122 tests: 122 passed, 0 failed, 0 errors.",
    negativeExample: {
      scenario:
        "AUTH-NEG-002 (Postman): send GET /auth/me with an invalid bearer token, this_is_an_invalid_token_12345, to check that protected user data cannot be reached without valid credentials.",
      expected:
        "The API rejects the request with 401 Unauthorized and an invalid or expired token message, and returns no protected user information.",
      actual:
        "401 Unauthorized with the message invalid/expired token. Access to the protected endpoint was denied. Result: Pass.",
    },
    covers: [
      "Request methods",
      "Response validation",
      "Authentication",
      "Negative testing",
      "JavaScript assertions",
    ],
    image: {
      src: "/images/collection_runner_screenshot.png",
      alt: "Postman collection runner results for DummyJSON API Testing: 122 tests, 122 passed, 0 failed, 0 errors, 1 iteration, 57 seconds",
      width: 1380,
      height: 229,
      fit: "contain",
    },
    links: [
      {
        label: "View the repository on GitHub",
        href: "https://github.com/FavourAKPAN/DummyJSON-API-Testing",
      },
    ],
  },
  {
    slug: "saucedemo-functional-testing",
    title: "SauceDemo — Functional Testing",
    eyebrow: "Manual QA",
    summary:
      "A manual functional testing exercise on the SauceDemo e-commerce web application, covering login validation, checkout scenarios, negative testing, test execution and defect documentation.",
    covers: [
      "Login validation",
      "Checkout scenarios",
      "Negative testing",
      "Test execution",
      "Defect documentation",
    ],
    image: {
      src: "/images/saucedemo_readme.png",
      alt: "SauceDemo Manual QA Testing repository README: project overview of manual functional testing, defect reporting and test summarisation",
      width: 1599,
      height: 436,
      fit: "contain",
    },
    links: [
      {
        label: "View the repository on GitHub",
        href: "https://github.com/FavourAKPAN/saucedemo-manual-qa-testing",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
