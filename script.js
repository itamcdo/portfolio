document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // ANIMAÇÃO AO SCROLL (Otimizada)
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
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Inicializa observação para elementos estáticos
  document.querySelectorAll("[data-animate]").forEach(el => {
    animateObserver.observe(el);
  });

  // ==========================
  // SKILLS – Anima barras individualmente por categoria
  // ==========================
  const skillCategories = document.querySelectorAll(".skill-category");
  
  if (skillCategories.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Quando a categoria aparece, anima as barras dentro dela
            const bars = entry.target.querySelectorAll(".skill-bar");
            bars.forEach((bar, index) => {
              const width = bar.getAttribute("data-width");
              // Pequeno atraso cascata para ficar mais elegante
              setTimeout(() => {
                bar.style.width = width;
              }, index * 150);
            });
            // Para de observar esta categoria após animar
            skillsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillCategories.forEach(category => skillsObserver.observe(category));
  }

  // ==========================
  // CERTIFICADOS – Anima contagem de horas
  // ==========================
  const hoursElements = document.querySelectorAll(".hours");
  if (hoursElements.length > 0) {
    const countUp = (element) => {
      const targetText = element.innerText.replace("h", "").trim();
      const target = parseFloat(targetText);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        current = progress * target;
        
        const displayValue = (target % 1 !== 0) ? current.toFixed(1) : Math.round(current);
        element.innerText = displayValue + "h";

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.innerText = targetText + "h";
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
      { threshold: 0.5 }
    );
    hoursElements.forEach(el => hoursObserver.observe(el));
  }

  // ==========================
  // PROJETOS – Renderização Dinâmica
  // ==========================
  const projects = [
    {
      title: "🏥 Command Center Hospitalar",
      description: "Acompanhamento em tempo real das operações hospitalares para gestão eficiente e tomada de decisão ágil.",
      link: null
    },
    {
      title: "🥗 NutriData Brasil",
      description: "Visualização interativa de indicadores nutricionais por estado brasileiro, com mapas e gráficos.",
      link: "https://github.com/itamcdo/nutridata-brasil"
    },
    {
      title: "🐍 Sistema Bancário em Python",
      description: "Projeto desenvolvido como desafio da DIO para praticar lógica de programação e fundamentos do Python.",
      link: "https://github.com/itamcdo/sistema-bancario-python"
    },
    {
      title: "🛠 Automação",
      description: "Geração automática de recibos via Google Apps Script usando Google Sheets e Docs.",
      link: "https://github.com/itamcdo/google-apps-script-receipt-automation"
    },
    { 
      title: "📊 Análise de Dados",
      description: "Criação de dashboards e indicadores estratégicos com foco em clareza e impacto.",
      link: null
    }
  ];

  const homeContainer = document.getElementById("home-projects");
  const allProjectsContainer = document.getElementById("all-projects");

  if (homeContainer || allProjectsContainer) {
    const isHome = !!homeContainer;
    const container = isHome ? homeContainer : allProjectsContainer;
    const projectsToShow = isHome ? projects.slice(0, 2) : projects;

    projectsToShow.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-animate", "");

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link 
          ? `<a href="${project.link}" target="_blank" class="button primary">Acessar Projeto</a>`
          : `<span class="button secondary" style="cursor: default; opacity: 0.7;">Em Andamento</span>`
        }
      `;

      container.appendChild(card);
      
      // Observa o novo card criado para disparar a animação de entrada
      setTimeout(() => {
        animateObserver.observe(card);
      }, 50);
    });
  }
});
