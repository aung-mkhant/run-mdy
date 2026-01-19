gsap.registerPlugin(ScrollTrigger);

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (evt) => {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  tl.to(".text", { x: "100%", duration: 1, repeat: -1, yoyo: true });
});
