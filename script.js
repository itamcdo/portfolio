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
  // SKILLS – anima barras
  // ==========================
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          skillBars.forEach((bar, index) => {
            const width = bar.dataset.width;
            setTimeout(() => { bar.style.width = width; }, index * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    skillsObserver.observe(skillBars[0]);
  }

  // ==========================
  // CERTIFICADOS – anima horas
  // ==========================
  const hoursElements = document.querySelectorAll(".hours");
  if (hoursElements.length > 0) {
    const countUp = (element) => {
      const targetText = element.innerText.replace("h", "");
      const target = parseFloat(targetText);
      let current = 0;
      const duration = 1200;
      const startTime = performance.now();

      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        current = progress * target;
        element.innerText = (target % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + "h";
        if (progress < 1) requestAnimationFrame(animate);
        else element.innerText = target + "h";
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
      link: null
    },
    {
      title: "🛠 Automação",
      description: "Geração automática de recibos via Google Apps Script. Automatiza a geração de recibos usando Google Sheets e Docs.",
      link: "https://github.com/itamcdo/google-apps-script-receipt-automation"
    },
    {
      title: "📊 Análise de Dados",
      description: "Criação de dashboards e indicadores estratégicos com foco em clareza e impacto.",
      link: null
    }
  ];

// ==========================
  // DETECTAR HOME OU PROJECTS
  // ==========================
  let container = document.getElementById("home-projects");
  let projectsToShow = projects;

  // Se não achar home-projects, procura o all-projects (página de projetos)
  if (!container) {
    container = document.getElementById("all-projects");
    projectsToShow = projects; // Mostra todos
  } else {
    // Se estiver na home, mostra apenas 2
    projectsToShow = projects.slice(0, 2);
  }

  if (container) {
    projectsToShow.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");
      // Importante: o CSS usa opacity 0. O script precisa observar para adicionar a classe "show"
      card.setAttribute("data-animate", ""); 

      // Estrutura Interna
      const title = document.createElement("h3");
      title.innerText = project.title;
      card.appendChild(title);

      const desc = document.createElement("p");
      desc.innerText = project.description;
      card.appendChild(desc);

      // Lógica do Botão
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
        span.style.cursor = "default"; // Indica que não é clicável
        span.innerText = "Em Andamento";
        card.appendChild(span);
      }

      container.appendChild(card);
      
      // Força o IntersectionObserver a observar o novo card criado
      animateObserver.observe(card);
    });
  }
});
