(function(){
var d=document;
var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
var b=d.querySelector('.burger'),n=d.getElementById('nav');
function zamknij(){n.classList.remove('on');b.setAttribute('aria-expanded','false');d.body.style.overflow=''}
b.addEventListener('click',function(){var o=n.classList.toggle('on');b.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':''});
n.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
// tor: przeciaganie mysza + strzalki
var t=d.getElementById('tor'),down=false,sx=0,sl=0,moved=false;
t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft});
window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;t.classList.add('drag')}t.scrollLeft=sl-dx});
window.addEventListener('pointerup',function(){if(!down)return;down=false;t.classList.remove('drag')});
t.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
var krok=function(k){var c=t.querySelector('.kafel');t.scrollBy({left:k*(c.offsetWidth+20)*2,behavior:'smooth'})};
var st=d.querySelectorAll('.strz button');st[0].addEventListener('click',function(){krok(-1)});st[1].addEventListener('click',function(){krok(1)});
// lightbox
var lb=d.getElementById('lb'),li=lb.querySelector('img'),lista=[].slice.call(d.querySelectorAll('[data-lb]')),i=0;
function pokaz(k){i=(k+lista.length)%lista.length;li.src=lista[i].dataset.lb;li.alt=lista[i].querySelector('img').alt;lb.classList.add('on')}
lista.forEach(function(el,k){el.addEventListener('click',function(){pokaz(k)})});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('on')});
lb.querySelector('.p').addEventListener('click',function(){pokaz(i-1)});
lb.querySelector('.n').addEventListener('click',function(){pokaz(i+1)});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')pokaz(i-1);if(e.key==='ArrowRight')pokaz(i+1)});
// formularz pokazowy
var f=d.getElementById('zapytanie');f.addEventListener('submit',function(e){e.preventDefault();f.querySelector('.ok').style.display='block'});
// mapa przy przewinieciu
var m=d.getElementById('mapa');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();var f=d.createElement('iframe');f.src=m.dataset.src;f.title='Mapa: Słutowo 11, 73-210 Recz';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}},{rootMargin:'300px'});io.observe(m)}
})();
