/**
 * Personal Portfolio Website - Main JavaScript
 * Author: Sreejith Gopinathan
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Theme Toggle (Dark/Light Mode) ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    body.classList.add("light-mode");
  }

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");

      // Save theme preference
      const theme = body.classList.contains("light-mode") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  }

  // --- 2. Mobile Navigation Toggle ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  });

  // --- 2. Sticky Header Shadow on Scroll ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 3. Interactive Timeline Expand/Collapse ---
  const timelineHeaders = document.querySelectorAll(".timeline-item-header");

  timelineHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const timelineItem = header.parentElement;

      // Optional: Close other items when one is opened
      // Uncomment below to enable accordion behavior
      // document.querySelectorAll('.timeline-item.active').forEach(item => {
      //     if (item !== timelineItem) {
      //         item.classList.remove('active');
      //     }
      // });

      timelineItem.classList.toggle("active");
    });
  });

  // Auto-open the first timeline item
  if (timelineHeaders.length > 0) {
    timelineHeaders[0].parentElement.classList.add("active");
  }

  // --- 4. Fade-in Section on Scroll (Intersection Observer) ---
  const sectionsToFade = document.querySelectorAll(".fade-in-section");

  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  ); // Trigger when 15% of the section is visible

  sectionsToFade.forEach((section) => {
    fadeObserver.observe(section);
  });

  // --- 5. Active Nav Link Highlighting on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll("section[id]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          // Remove active class from all links
          document.querySelectorAll(".nav-link.active").forEach((link) => {
            link.classList.remove("active");
          });
          // Add active class to the matching link
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-30% 0px -70% 0px", // Triggers when section is in the middle 30% of viewport
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // --- 6. Scroll to Top Button ---
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // --- 7. Add smooth scroll behavior for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- 8. Performance: Reduce animations on low-end devices ---
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.scrollBehavior = "auto";
  }

  // --- 9. Log initialization (can be removed in production) ---
  console.log("Portfolio website initialized successfully!");
});
