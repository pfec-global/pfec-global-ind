"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import AdmissionForm from "./AdmissionForm";

export default function AdmissionSupport() {
  const [counters, setCounters] = useState({
    students: 0,
    destinations: 0,
    institutions: 0,
  });

  const counterSectionRef = useRef(null);
  const counterStarted = useRef(false);

  useEffect(() => {
    const section = counterSectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counterStarted.current) {
          counterStarted.current = true;

          const duration = 2000;
          const startTime = performance.now();
          let animationFrame;

          const animateCounters = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounters({
              students: Math.floor(22000 * easeOut),
              destinations: Math.floor(10 * easeOut),
              institutions: Math.floor(550 * easeOut),
            });

            if (progress < 1) {
              animationFrame =
                requestAnimationFrame(animateCounters);
            } else {
              setCounters({
                students: 22000,
                destinations: 10,
                institutions: 550,
              });
            }
          };

          animationFrame =
            requestAnimationFrame(animateCounters);

          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const fadeUp = {
    initial: {
      opacity: 0,
      y: 30,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.2,
    },
  };

  return (
    <section
      id="admission-support"
      className="w-full bg-white py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1300px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="pt-2">

            {/* HEADING */}
            <motion.h2
              {...fadeUp}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
              className="font-jakarta text-[22px] font-bold leading-tight text-black md:text-[24px]"
            >
              Why Choose PFEC for Admission Support?
            </motion.h2>

            {/* COUNTER CARDS */}
            <div
              ref={counterSectionRef}
              className="mt-7 grid grid-cols-3 gap-2 md:gap-3"
            >

              {/* STUDENTS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                }}
                whileHover={{
                  y: -7,
                  scale: 1.02,
                }}
                className="flex min-h-[145px] flex-col justify-between rounded-xl bg-[#fff0ec] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.13)] md:p-4"
              >
                <div>
                  <h3 className="font-jakarta text-[27px] font-bold leading-none text-[#ed4b37] md:text-[30px]">
                    {counters.students.toLocaleString()}+
                  </h3>

                  <p className="mt-1 font-jakarta text-[13px] leading-tight text-[#333] md:text-[14px]">
                    Students Assisted
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="mt-3 flex justify-center"
                >
                  <img
                    src="/images/Education-pana-1.png"
                    alt="Students assisted"
                    className="h-[62px] w-auto object-contain md:h-[70px]"
                  />
                </motion.div>
              </motion.div>

              {/* DESTINATIONS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.13,
                }}
                whileHover={{
                  y: -7,
                  scale: 1.02,
                }}
                className="flex min-h-[145px] flex-col justify-between rounded-xl bg-[#fff8df] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.13)] md:p-4"
              >
                <div>
                  <h3 className="font-jakarta text-[27px] font-bold leading-none text-[#ed4b37] md:text-[30px]">
                    {counters.destinations}
                  </h3>

                  <p className="mt-1 font-jakarta text-[13px] leading-tight text-[#333] md:text-[14px]">
                    Study Destinations
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="mt-3 flex justify-center"
                >
                  <img
                    src="/images/Globalization-pana-1.png"
                    alt="Study destinations"
                    className="h-[62px] w-auto object-contain md:h-[70px]"
                  />
                </motion.div>
              </motion.div>

              {/* INSTITUTIONS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.21,
                }}
                whileHover={{
                  y: -7,
                  scale: 1.02,
                }}
                className="flex min-h-[145px] flex-col justify-between rounded-xl bg-[#e8f8fb] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.13)] md:p-4"
              >
                <div>
                  <h3 className="font-jakarta text-[27px] font-bold leading-none text-[#ed4b37] md:text-[30px]">
                    {counters.institutions}+
                  </h3>

                  <p className="mt-1 font-jakarta text-[13px] leading-tight text-[#333] md:text-[14px]">
                    Partner
                    <br />
                    Institutions
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="mt-3 flex justify-center"
                >
                  <img
                    src="/images/college students-pana 1.png"
                    alt="Partner institutions"
                    className="h-[62px] w-auto object-contain md:h-[70px]"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* FREE BANNER */}
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.55,
                delay: 0.15,
              }}
              whileHover={{
                scale: 1.015,
              }}
              className="mt-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#10175d] to-[#273488] px-4 py-4 text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
            >
              <h3 className="font-jakarta text-[26px] font-bold leading-none text-[#ef503a] md:text-[29px]">
                FREE
              </h3>

              <p className="mt-1 font-jakarta text-[13px] leading-snug text-white/90 md:text-[14px]">
                End-to-End Guidance, Profile assessment,
                Career Guidance, University Application
                Assistance and much more!
              </p>
            </motion.div>

            {/* DESCRIPTION */}
            <div className="mt-7 space-y-5 font-jakarta text-[14px] leading-[1.55] text-[#111] md:text-[15px]">
              <motion.p
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                }}
              >
                <strong>
                  Receive an individual consultation with the
                  best educational consultants in India
                </strong>{" "}
                to obtain a trouble-free experience and
                discover the right possibilities for overseas
                study.
              </motion.p>

              <motion.p
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: 0.12,
                }}
              >
                Every year thousands of students in India aim
                to start their careers abroad. In this respect,
                PFEC Global has established themselves as the
                best admission consultants in India. At PFEC
                Global, we understand that students often feel
                apprehensive about the surplus of information
                available on the internet while preparing for
                a new journey.
              </motion.p>

              <motion.p
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: 0.19,
                }}
              >
                With over a decade of experience and
                professional recognition, our dedicated team
                ensures that the entire admission and visa
                application process is hassle-free for
                students. We are the official representative
                of over{" "}
                <strong>
                  550+ universities, colleges, and institutions
                </strong>{" "}
                that have global prestige, offering phenomenal
                courses, academic ethos, innovative delivery
                formats, affordable costs, international
                student support, work opportunities,
                diversity, and excellent locations.
              </motion.p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            <AdmissionForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}