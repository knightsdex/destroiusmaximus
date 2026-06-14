(function () {
  const buyBtns = [
    document.getElementById("navBuyBtn"),
    document.getElementById("heroBuyBtn"),
    document.getElementById("howtoBuyBtn"),
    document.getElementById("joinBuyBtn"),
    document.getElementById("footerBuyBtn"),
  ];

  const chartBtns = [
    document.getElementById("chartLinkBtn"),
    document.getElementById("joinChartBtn"),
    document.getElementById("footerChartBtn"),
  ];

  const contractEl = document.getElementById("contractAddress");
  const embedEl = document.getElementById("dexscreenerEmbed");
  const buyUrl = CONFIG.uniswapUrl();
  const chartUrl = CONFIG.dexscreenerUrl();

  buyBtns.forEach(function (btn) {
    if (btn) btn.href = buyUrl;
  });

  chartBtns.forEach(function (btn) {
    if (btn) btn.href = chartUrl;
  });

  if (contractEl) contractEl.textContent = CONFIG.contractAddress;
  if (embedEl) embedEl.src = CONFIG.dexscreenerEmbedUrl();

  document.getElementById("year").textContent = new Date().getFullYear();

  var copyBtn = document.getElementById("copyContract");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(CONFIG.contractAddress).then(function () {
        copyBtn.textContent = "Copied!";
        setTimeout(function () {
          copyBtn.textContent = "Copy";
        }, 2000);
      });
    });
  }

  var loadingScreen = document.getElementById("loadingScreen");
  var loadingBarFill = document.getElementById("loadingBarFill");
  var progress = 0;

  var loadInterval = setInterval(function () {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(function () {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transform = "translateY(-20px)";
        loadingScreen.style.pointerEvents = "none";
        setTimeout(function () {
          loadingScreen.style.display = "none";
        }, 700);
      }, 300);
    }
    loadingBarFill.style.width = progress + "%";
  }, 120);

  var nav = document.getElementById("nav");
  var scrollProgress = document.getElementById("scrollProgress");

  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = pct + "%";
    nav.classList.toggle("nav--scrolled", scrollTop > 40);
  });

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("nav-links--open");
    navToggle.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("nav-links--open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".step-card, .join-card, .about-grid, .chart-wrap")
    .forEach(function (el) {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.play().catch(function () {});
  }
})();
