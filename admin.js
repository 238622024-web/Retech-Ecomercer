// JS do painel administrativo (menu responsivo e futuras funções)
(function(){
  const menuToggle = document.getElementById('menu-toggle');
  const navBar = document.getElementById('main-nav');
  if(menuToggle && navBar){
    menuToggle.addEventListener('click', ()=>{
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', (!expanded).toString());
      navBar.classList.toggle('active');
    });
  }
})();
