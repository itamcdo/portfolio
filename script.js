// ==========================
// AGUARDA DOM CARREGAR
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // ANIMAÇÃO AO SCROLL
  // ==========================
  const animateObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-animate]").forEach(el => {
    animateObserver.observe(el);
  });

  // ==========================
  // SKILLS – anima barras só se existirem
  // ==========================
  const skillBars = document.querySelectorAll(".skill-bar");

  if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          skillBars.forEach((bar, index) => {
            const width = bar.dataset.width;
            setTimeout(() => {
              bar.style.width = width;
            }, index * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    skillsObserver.observe(skillBars[0]);
  }

  // ==========================
  // CERTIFICADOS – anima contagem de horas
  // ==========================
  const hoursElements = document.querySelectorAll(".hours");

  if (hoursElements.length > 0) {
    const countUp = (element) => {
      const targetText = element.innerText.replace("h", "");
      const target = parseFloat(targetText);
      let current = 0;

      const duration = 1200; // ms
      const startTime = performance.now();

      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        current = progress * target;

        element.innerText =
          (target % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + "h";

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.innerText = target + "h";
        }
      };

      requestAnimationFrame(animate);
    };

    const hoursObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    hoursElements.forEach(el => hoursObserver.observe(el));
  }

  // ==========================
  // PROJETOS – array central
  // ==========================
  const projects = [
    {
      title: "🏥 Command Center Hospitalar",
      description: "Acompanhamento em tempo real das operações hospitalares para gestão eficiente e tomada de decisão ágil.",
      link: "https://seulink.com/command-center"
    },
    {
      title: "🛠 Automação",
      description: "Geração automática de recibos via Google Apps Script. Este projeto automatiza a geração de recibos financeiros utilizando o Google Sheets como fonte de dados e o Google Docs para criação dos documentos.",
      link: null
    },
    {
      title: "📊 Análise de Dados",
      description: "Criação de dashboards e indicadores estratégicos com foco em clareza e impacto.",
      link: "https://seulink.com/analise-dados"
    }
    // Adicione novos projetos aqui
  ];

  // ==========================
  // Determinar página e quantidade de projetos
  // ==========================
  const path = window.location.pathname;
  let projectsToShow = projects;

  let container = null;

  if (path.includes("index.html") || path === "/" || path.includes("home")) {
    // Home → mostrar só 2 projetos
    projectsToShow = projects.slice(0, 2);
    container = document.getElementById("home-projects");
  } else if (path.includes("projects.html")) {
    // Página de projetos → todos
    container = document.getElementById("all-projects");
  }

  if (container) {
    projectsToShow.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-animate", "");

      const title = document.createElement("h3");
      title.innerText = project.title;

      const desc = document.createElement("p");
      desc.innerText = project.description;

      card.appendChild(title);
      card.appendChild(desc);

      if (project.link) {
        const a = document.createElement("a");
        a.href = project.link;
        a.target = "_blank";
        a.classList.add("button", "primary");
        a.innerText = "Acessar Projeto";
        card.appendChild(a);
      } else {
        const span = document.createElement("span");
        span.classList.add("button", "secondary");
        span.innerText = "Em Andamento";
        card.appendChild(span);
      }

      container.appendChild(card);

      // Observador para animação
      animateObserver.observe(card);
    });
  }

});
