let menus = [];
  
document.addEventListener("DOMContentLoaded", () => {
  menus = [...document.querySelectorAll(".ball-context-menu")];
  let balloonMenu = document.querySelector(".balloon-img-menu");
  document.body.addEventListener("click", () => {
    menus.forEach(item => {
      item.style.display = "none";
    });
  });
});
