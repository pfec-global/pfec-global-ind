import { blogContent } from "@/data/blogContent";

// Dummy data for the blog pages - replace with real data (CMS / API).
// A post can also have an image: "/images/..." for its cover.

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum nisi eget ante varius, at dapibus justo dignissim. Praesent interdum pretium turpis. Suspendisse nec neque sodales, bibendum velit id, ultrices augu";

// Each category has a page at /blogs/category/<slug>.
// name is the short label (card tag, category bar), title is the heading of its page.
// inBar: true = listed in the "Explore by Category" bar under the hero of the blog list page.
export const categories = [
  { slug: "australia", name: "Australia", title: "Australia Blogs", description: lorem, inBar: true },
  { slug: "uk", name: "UK", title: "UK Blogs", description: lorem, inBar: true },
  { slug: "usa", name: "USA", title: "USA Blogs", description: lorem, inBar: true },
  { slug: "canada", name: "Canada", title: "Canada Blogs", description: lorem, inBar: true },
  { slug: "exams", name: "Exams", title: "Exam Blogs", description: lorem, inBar: true },
  { slug: "ielts", name: "IELTS", title: "IELTS Blogs", description: lorem },
  { slug: "pte", name: "PTE", title: "PTE Blogs", description: lorem },
  { slug: "gre", name: "GRE", title: "GRE Blogs", description: lorem },
  { slug: "english-skills", name: "English Skills", title: "English Skills Blogs", description: lorem },
];

const categoryHref = (slug) => `/blogs/category/${slug}`;

// Each author has a page at /blogs/author/<slug>
export const authors = [
  {
    slug: "lady-gaga",
    name: "Lady Gaga",
    avatar: "/images/avater.webp",
    bio: lorem,
    linkedin: "#",
    activeSince: "May 2026",
  },
];

// Categories used as the tag on the dummy post cards
const tags = ["pte", "gre", "ielts", "english-skills"];

// The dummy posts. Each one has a details page at /blogs/<slug>
const postList = [
  { slug: "pte-score-for-canada-2025", title: "PTE Score for Canada 2025: Accepted Colleges and Universities", category: "pte" },
  { slug: "ielts-band-requirements-australia", title: "IELTS Band Requirements for Australian Universities", category: "ielts" },
  { slug: "gre-preparation-plan", title: "GRE Preparation Plan: How to Study in 3 Months", category: "gre" },
  { slug: "why-study-in-australia-2025", title: "Why Should you study in Australia in 2025?", category: "australia" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Timestamp -> "19th February 2024 · 1:55PM"
const formatUpdated = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getUTCDate();
  const suffix = day > 3 && day < 21 ? "th" : (["th", "st", "nd", "rd"][day % 10] ?? "th");
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day}${suffix} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} · ${hours % 12 || 12}:${minutes}${hours < 12 ? "AM" : "PM"}`;
};

const NEWEST = Date.UTC(2024, 1, 19, 13, 55); // 19th February 2024, 1:55PM
const DAY = 24 * 60 * 60 * 1000;

// count posts, each one 3 days older than the one before it.
// tag is a category slug, post is an entry of postList. No tag / post given = mixed tags / posts.
const makePosts = (slug, count, { tag, post } = {}) =>
  Array.from({ length: count }, (_, i) => {
    const date = NEWEST - i * 3 * DAY;
    const item = post ?? postList[i % postList.length];
    const category = categories.find((item) => item.slug === (tag ?? tags[i % tags.length]));
    return {
      id: `${slug}-${i + 1}`,
      tag: category.name,
      tagHref: categoryHref(category.slug),
      title: item.title,
      author: authors[0].name,
      authorHref: `/blogs/author/${authors[0].slug}`,
      date, // used for sorting
      updated: formatUpdated(date),
      readTime: "8 Min Read",
      href: `/blogs/${item.slug}`, // the post itself
    };
  });

// Blog list page: links of the "Explore by Category" bar
export const blogCategories = categories
  .filter((category) => category.inBar)
  .map((category) => ({ label: category.name, href: categoryHref(category.slug) }));

// Blog list page: one slider per section. href is where the section's "Explore All" button goes.
export const blogSections = [
  { slug: "featured", title: "Featured Articles", href: "#", posts: makePosts("featured", 8, { post: postList[0] }) },
  ...["ielts", "pte", "gre"].map((slug) => ({
    slug,
    title: categories.find((category) => category.slug === slug).title,
    href: categoryHref(slug),
    posts: makePosts(slug, 8, { tag: slug, post: postList[0] }),
  })),
];

// Category page: every post of the category.
// The categories that are not a card tag (Australia, UK...) get mixed tags.
export const getCategoryPosts = (slug) => makePosts(slug, 40, { tag: tags.includes(slug) ? slug : undefined });

// Author page: every post written by the author
export const getAuthorPosts = (slug) => makePosts(slug, 40);

// Blog details page: the slug of every post
export const postSlugs = postList.map((post) => post.slug);

// Blog details page: one full post, or undefined if there is no post with that slug.
// content is markdown. image (cover) and summary are optional.
// Sidebar: showCta: false hides the default promo card, banners is the list of extra dark promo cards (can be empty).
export const getPost = (slug) => {
  const post = postList.find((item) => item.slug === slug);
  if (!post) return undefined;
  const category = categories.find((item) => item.slug === post.category);
  return {
    slug: post.slug,
    title: post.title,
    tag: category.name,
    tagHref: categoryHref(category.slug),
    author: authors[0].name,
    authorHref: `/blogs/author/${authors[0].slug}`,
    updated: formatUpdated(NEWEST),
    readTime: "8 Min Read",
    image: "/images/study_area_image.webp",
    summary: lorem,
    showCta: true,
    banners: [
      {
        title: "Want to Study in the UK?",
        text: "Join us at the UK Admission Day & Get into a top University, hassle-free",
        buttonLabel: "Sign me Up",
        href: "/#contact",
      },
    ],
    content: blogContent, // every dummy post has the same body
  };
};

// Blog details page: the posts of the "Related Blogs" slider (the post being read is left out)
export const getRelatedPosts = (slug) => makePosts("related", 8).filter((post) => post.href !== `/blogs/${slug}`);
