
function bindLightbox(){
  const lb = document.querySelector('.lb'); if(!lb) return;
  document.querySelectorAll('[data-lightbox]').forEach(img=>{
    img.addEventListener('click', ()=>{ lb.querySelector('img').src=img.src; lb.classList.add('open'); });
  });
  lb.querySelector('.close').addEventListener('click', ()=>lb.classList.remove('open'));
  lb.addEventListener('click', (e)=>{ if(e.target===lb) lb.classList.remove('open'); });
}
function initMemoryGame(){
  const board = document.querySelector('.board'); if(!board) return;
  const icons = ['🍅','🥦','🥕','🍆','🌽','🥑','🍞','🥗']; // 8 pairs
  let deck = icons.concat(icons).sort(()=>Math.random()-0.5);
  let first=null, lock=false, matched=0, moves=0, time=60, timer=null;
  board.innerHTML = deck.map(i=>`
    <div class="card2" data-v="${i}">
      <div class="card2-inner">
        <div class="face front">?</div>
        <div class="face back">${i}</div>
      </div>
    </div>`).join('');
  const timeEl=document.getElementById('time'); const movesEl=document.getElementById('moves');
  function tick(){ if(time<=0){ end('時間到！'); return; } time--; timeEl.textContent=time; }
  function end(msg){ clearInterval(timer); alert(`${msg} 你總共翻了 ${moves} 次。`); }
  timer=setInterval(tick,1000);
  board.querySelectorAll('.card2').forEach(c=>{
    c.addEventListener('click', ()=>{
      if(lock || c.classList.contains('flipped')) return;
      c.classList.add('flipped'); moves++; movesEl.textContent=moves;
      if(!first){ first=c; return; }
      const match = first.dataset.v === c.dataset.v;
      if(match){ matched+=2; first=null; if(matched===deck.length) end('成功！'); }
      else { lock=true; setTimeout(()=>{ c.classList.remove('flipped'); first.classList.remove('flipped'); first=null; lock=false; }, 700); }
    });
  });
}
document.addEventListener('DOMContentLoaded', ()=>{ bindLightbox(); initMemoryGame(); });
