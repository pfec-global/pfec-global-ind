"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronDown, FaLocationDot, FaMagnifyingGlass, FaRegAddressBook } from "react-icons/fa6";
import { fadeUp } from "@/lib/motion";

// "Introducing CourseFinder" fold of the home page: pick study areas and/or destinations, then the search
// button opens the matching universities on the CourseFinder website (in a new tab).
// The addresses are set in .env:
//   NEXT_PUBLIC_COURSEFINDER_URL         the CourseFinder website (the search opens <url>/universities?...)
//   NEXT_PUBLIC_COURSEFINDER_API_URL     its CMS: dropdown options and the "are there any results?" check
//   NEXT_PUBLIC_COURSEFINDER_UTM_SOURCE  utm_source of the search link, so CourseFinder knows which site sent the visitor
const SITE_URL = (process.env.NEXT_PUBLIC_COURSEFINDER_URL || "https://coursefinder.pfecglobal.com").replace(/\/+$/, "");
const API_URL = (process.env.NEXT_PUBLIC_COURSEFINDER_API_URL || "https://coursefindercms.pfecglobal.com").replace(/\/+$/, "");
const UTM_SOURCE = process.env.NEXT_PUBLIC_COURSEFINDER_UTM_SOURCE || "pfecglobal";

const badges = [
  "Access Key Information about Top Institutions Across 11 Countries",
  "Get Free Expert Assistance to further your study abroad journey",
  "Backed by PFEC Global's Certified Study Abroad Experts",
];

// <SITE_URL>/universities?country=a,b&study=c,d&utm_...
// c: the ?c= of the current page, passed on when there is one (only known in the browser, so it is added on click)
function searchUrl(selected, c) {
  const params = new URLSearchParams();
  const slugs = (items) => items.map((item) => item.slug).filter(Boolean).join(",");
  if (selected.country.length) params.set("country", slugs(selected.country));
  if (selected.course.length) params.set("study", slugs(selected.course));
  params.set("utm_source", UTM_SOURCE);
  params.set("utm_medium", "referral");
  params.set("utm_campaign", "coursefinder_widget");
  params.set("utm_content", "homepage_fold");
  if (c) params.set("c", c);
  return `${SITE_URL}/universities?${params}`;
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[#e53935]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// Small round logo of an option, or a grey square when it has none
function OptionLogo({ item, size = 28 }) {
  if (!item.logo) return <span className="block shrink-0 rounded-md bg-[#eee]" style={{ width: size, height: size }} />;
  return (
    // Plain <img>: the logos come from the CourseFinder CMS, which next/image is not set up to load
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.logo} alt="" width={size} height={size} loading="lazy" className="shrink-0 rounded-md bg-white object-contain p-0.5" style={{ width: size, height: size }} />
  );
}

// One dropdown with a search box; several options can be picked. The picked ones show as tags under it.
function MultiSelect({ label, searchPlaceholder, icon, items, selected, onChange, open, onOpenChange }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1); // option highlighted with the arrow keys
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  const isSelected = (item) => selected.some((picked) => picked.id === item.id);
  const toggle = (item) => onChange(isSelected(item) ? selected.filter((picked) => picked.id !== item.id) : [...selected, item]);

  // Focus the search box when the list opens
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => searchRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [open]);

  // Keep the highlighted option in view
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (event) => {
    if (event.key === "Escape") return onOpenChange(false);
    if (!filtered.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? filtered.length - 1 : index - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      toggle(filtered[active]);
    }
  };

  return (
    // data-cf-select: clicks inside do not count as "outside" (see CourseFinder)
    <div data-cf-select className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setActive(-1); // no option highlighted when the list opens
          onOpenChange(!open);
        }}
        className={`group flex h-12 w-full items-center justify-between gap-3 rounded-[10px] border bg-white px-3.5 text-left transition duration-300 hover:-translate-y-px hover:border-[#f04b37] hover:shadow-[0_4px_14px_rgba(240,75,55,0.15)] ${
          open ? "border-[#f04b37] shadow-[0_6px_18px_rgba(240,75,55,0.2)]" : "border-[#e5e7eb]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="text-base text-[#f04b37] transition-transform duration-300 group-hover:scale-110">{icon}</span>
          <span className="truncate text-sm text-[#374151] sm:text-[15px]">
            {selected.length ? `${selected.length} selected` : label}
          </span>
        </span>
        <FaChevronDown className={`shrink-0 text-sm text-[#f04b37] transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {/* Picked options */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((item) => (
            <span key={item.id} className="inline-flex h-[30px] max-w-full items-center gap-[7px] rounded-full border border-[#f04b37]/20 bg-[#fff1ef] pl-2.5 pr-2 text-[13px] text-[#334155] shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
              {item.logo && <OptionLogo item={item} size={18} />}
              <span className="max-w-[170px] truncate">{item.name}</span>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => toggle(item)}
                className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#f04b37] text-xs leading-none text-white transition hover:bg-[#d93f2e]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* The list. On phones it opens in place (pushing the fields below down) instead of floating. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="z-30 mt-2 w-full rounded-xl bg-white p-2.5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:absolute md:top-[calc(100%+2px)] md:left-0"
          >
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(-1);
              }}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              aria-controls={listId}
              className="mb-2 h-[42px] w-full rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none transition focus:border-[#f04b37]"
            />
            <ul ref={listRef} id={listId} role="listbox" aria-multiselectable="true" className="max-h-[220px] overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-3 py-2.5 text-sm text-[#999]">{items.length ? "No result found" : "Loading..."}</li>
              )}
              {filtered.map((item, index) => {
                const picked = isSelected(item);
                const highlighted = index === active;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={picked}
                    onClick={() => toggle(item)}
                    onMouseEnter={() => setActive(index)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                      picked
                        ? `${highlighted ? "bg-[#ffd6d6]" : "bg-[#ffe5e5]"} font-semibold text-[#d32f2f]`
                        : highlighted
                          ? "bg-[#fff1ef] font-semibold text-[#f04b37]"
                          : "text-[#333]"
                    }`}
                  >
                    <OptionLogo item={item} />
                    <span className="leading-tight">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// "Oops!" card shown when the search would find nothing
function NoResultPopup({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[7px] sm:items-start sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cf-no-result-title"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative flex w-full max-w-[500px] items-center justify-between gap-3 rounded-[10px] bg-white px-5 pb-5 pt-7 shadow-[0_20px_45px_rgba(0,0,0,0.18)] sm:gap-5 sm:px-7 sm:pt-8"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-2 text-3xl font-light leading-none text-black transition hover:text-accent sm:right-4">
              ×
            </button>
            <div className="min-w-0 flex-1">
              <h2 id="cf-no-result-title" className="text-[25px] font-bold leading-tight tracking-tight text-[#e94b3f] sm:text-[29px]">
                Oops!
              </h2>
              <p className="mb-3 mt-0.5 text-[13.5px] leading-[1.45] text-[#171717] sm:text-[15.5px]">
                Your search hasn’t fetched any results <br className="hidden sm:block" />
                currently. Try changing the course/country
              </p>
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#ff4a36] px-3 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#ef3e2b]"
              >
                Explore on CourseFinder
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <Image src="/images/coursefinder_no_result.png" alt="" width={103} height={102} className="h-[76px] w-[76px] shrink-0 object-contain sm:h-[102px] sm:w-[103px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CourseFinder() {
  const [options, setOptions] = useState({ course: [], country: [] });
  const [selected, setSelected] = useState({ course: [], country: [] });
  const [openName, setOpenName] = useState(null); // which dropdown is open: "course", "country" or null
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const closeNoResult = useCallback(() => setNoResult(false), []);

  // Dropdown options from the CourseFinder CMS
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/api/course-finder/dropdown-data`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((data) => setOptions({ course: data.studyAreas ?? [], country: data.studyDestinations ?? [] }))
      .catch((err) => err.name !== "AbortError" && console.error("CourseFinder: could not load the dropdown options", err));
    return () => controller.abort();
  }, []);

  // The link follows the picks, so "open in new tab" / copying the link also works
  const href = searchUrl(selected);

  // A click anywhere outside the dropdowns closes them
  useEffect(() => {
    if (!openName) return;
    const onClick = (event) => !event.target.closest("[data-cf-select]") && setOpenName(null);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openName]);

  const pick = (name) => (items) => {
    setSelected((current) => ({ ...current, [name]: items }));
    setError("");
  };

  const search = async (event) => {
    event.preventDefault();
    if (!selected.course.length && !selected.country.length) {
      setError("Please select at least one Study Area or Study Destination.");
      return;
    }
    if (checking) return;
    const url = searchUrl(selected, new URLSearchParams(window.location.search).get("c"));
    // The tab is opened straight away (browsers block tabs opened after waiting for a network call)
    // and is sent to the results only once CourseFinder confirms there are some.
    const tab = window.open("", "_blank");
    if (tab) tab.opener = null;
    setChecking(true);
    try {
      const response = await fetch(`${API_URL}/api/search-university-check?${url.split("?")[1]}`);
      const data = await response.json();
      if (!data.exists) {
        tab?.close();
        setNoResult(true);
        return;
      }
      if (tab) tab.location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("CourseFinder: search check failed", err);
      // The check failed, not the search: let CourseFinder show the results itself
      if (tab) tab.location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="bg-[#f9f9f9] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <motion.div
        {...fadeUp()}
        className="relative mx-auto flex max-w-7xl flex-col items-center rounded-2xl bg-[linear-gradient(135deg,#0d1340_0%,#1a1f6e_30%,#2232b8_60%,#1a3acf_80%,#2547e0_100%)] px-5 pb-14 pt-12 text-center sm:rounded-[20px] md:px-12 md:pb-[72px] md:pt-[60px]"
      >
        {/* Background: faint dot grid and two soft glows (clipped to the rounded box, the dropdowns are not) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute -right-20 -top-20 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(80,120,255,0.25)_0%,transparent_70%)]" />
          <div className="absolute -bottom-24 -left-20 h-[380px] w-[380px] bg-[radial-gradient(circle,rgba(60,90,220,0.2)_0%,transparent_70%)]" />
        </div>

        <Image src="/images/coursefinder_logo.png" alt="Introducing CourseFinder by PFEC Global" width={591} height={308} className="relative h-20 w-auto" />

        {/* Trust badges */}
        <ul className="relative mt-7 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center md:gap-8">
          {badges.map((text) => (
            <li key={text} className="flex max-w-[260px] items-start gap-2.5 text-left sm:max-w-[200px]">
              <CheckIcon />
              <span className="text-[13px] leading-[1.45] text-white/85 md:text-sm">{text}</span>
            </li>
          ))}
        </ul>

        {/* Search card */}
        <div className="relative z-10 mt-8 w-full max-w-[990px] rounded-2xl bg-white px-4 py-6 sm:px-6 md:px-[42px] md:pb-6 md:pt-7">
          <p className="mb-6 text-base text-[#333] sm:text-lg">
            Search from <strong className="font-bold text-[#ef4035]">550+ Institutions</strong> across{" "}
            <strong className="font-bold text-[#ef4035]">13 Study Destinations</strong>
          </p>

          <div className="grid items-start gap-2.5 md:grid-cols-[1fr_1fr_62px]">
            <MultiSelect
              label="Study Area"
              searchPlaceholder="Search course..."
              icon={<FaRegAddressBook aria-hidden="true" />}
              items={options.course}
              selected={selected.course}
              onChange={pick("course")}
              open={openName === "course"}
              onOpenChange={(open) => setOpenName(open ? "course" : null)}
            />
            <MultiSelect
              label="Study Destination"
              searchPlaceholder="Search country..."
              icon={<FaLocationDot aria-hidden="true" />}
              items={options.country}
              selected={selected.country}
              onChange={pick("country")}
              open={openName === "country"}
              onOpenChange={(open) => setOpenName(open ? "country" : null)}
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={search}
              aria-label="Search universities on CourseFinder"
              aria-busy={checking}
              className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#f04b37] text-xl text-white transition duration-200 hover:scale-[1.03] hover:bg-[#e53935] active:scale-[0.97]"
            >
              {checking ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              ) : (
                <FaMagnifyingGlass aria-hidden="true" />
              )}
            </a>
          </div>

          <p role={error ? "alert" : undefined} className={`mt-4 text-[13px] sm:text-sm ${error ? "font-medium text-[#e53935]" : "text-[#999]"}`}>
            {error || (
              <>
                Type in <strong className="font-semibold text-[#555]">any one (or all)</strong> of the fields and press the search button.
              </>
            )}
          </p>
        </div>
      </motion.div>

      <NoResultPopup open={noResult} onClose={closeNoResult} />
    </section>
  );
}
