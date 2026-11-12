const roles = [".NET Backend Developer", "ASP.NET Core API Developer", "Enterprise Integrations", "Messaging Systems"];
const typed = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) { charIndex++; setTimeout(typeRole, 85); }
  else if (!deleting) { deleting = true; setTimeout(typeRole, 1400); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeRole, 38); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 300); }
}
typeRole();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
}, { passive: true });
document.getElementById("year").textContent = new Date().getFullYear();

const projects = {
  whatsapp: { title: "WhatsApp Business Messaging Integration", description: "Developed backend APIs for template-based messaging, token generation and message status tracking. The integration includes provider API communication, request validation and webhook-driven delivery tracking, supported by background processing.", tech: ["ASP.NET Core Web API", "C#", "SQL Server", "Windows Services", "REST APIs"] },
  rcs: { title: "RCS Messaging Platform & Redis Processing", description: "Built RCS send APIs and background processing for standard, rich-card and carousel messages. Worked on Redis-based processing, retry handling, idempotency and delivery webhooks.", tech: ["ASP.NET Core", "C#", "SQL Server", "Redis", "Windows Services", "JWT"] },
  smuc2: { title: "SMUC 2.0 — Authentication & Entity APIs", description: "Developed login, logout, OTP verification and user-entity APIs. The backend uses JWT authentication, repository-pattern separation and SQL stored procedures.", tech: ["ASP.NET Core Web API", "C#", "SQL Server", "JWT"] },
  gotrack: { title: "GoTRACK — Gold Supply Chain Management", description: "Worked on workflows tracking gold movement from miners through aggregators to the Gold Board, including transactions, approvals, reporting and traceability.", tech: ["ASP.NET Core", "Web API", "SQL Server", "C#"] },
  a1r: { title: "A1R Water Transport System", description: "Developed transport and logistics APIs for water supply operations and integrated Microsoft Dynamics 365 Finance & Operations for inventory and financial workflows.", tech: ["ASP.NET MVC", "REST APIs", "Dynamics 365 F&O", "SQL Server", "Windows Services"] },
  smuc: { title: "SMUC — Secure Messaging Unified Communication", description: "Contributed to an SMS messaging platform using SMPP connectivity and TLS encryption for secure communication.", tech: ["ASP.NET MVC", "Web API", "SMPP", "TLS", "C#"] },
  zipnach: { title: "Zipnach — Mandate Registration Platform", description: "Developed mandate registration workflows and backend APIs to digitize data capture and reduce manual processing.", tech: ["ASP.NET Web Forms", "REST APIs", "SQL Server", "C#"] },
  banking: { title: "Banking Direct Debit Integrations", description: "Worked on HDFC mandate registration and OTP verification workflows, including encrypted API responses, bank reference updates and database persistence.", tech: ["C#", "REST APIs", "SQL Server", "Banking APIs"] }
};
const modal = document.getElementById("project-modal");
document.querySelectorAll("[data-project]").forEach(btn => btn.addEventListener("click", () => {
  const project = projects[btn.dataset.project];
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description").textContent = project.description;
  document.getElementById("modal-tech").innerHTML = project.tech.map(t => `<span>${t}</span>`).join("");
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}));
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
