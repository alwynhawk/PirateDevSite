//code for changing the active link in the navbar
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar a:not(.logo)');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
//code for changing the active link in the navbar

//code for changing the dark mode
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.dark-mode-toggle');
  const icon = document.querySelector('.moon-icon');
  const body = document.body;
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    sun.classList.toggle('sun-moved');
    moon.classList.toggle('moon-moved');
    
    if (icon.src.includes('night.png')) {
      icon.src = 'images/light.png';
    } else {
      icon.src = 'images/night.png';
    }
  });
});
//code for changing the dark mode

document.addEventListener('DOMContentLoaded', () => {
  const chest = document.querySelector('.treasure-chest');
  
  document.addEventListener('mousemove', (e) => {
    const chestRect = chest.getBoundingClientRect();
    const chestCenterX = chestRect.left + chestRect.width / 2;
    const chestCenterY = chestRect.top + chestRect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - chestCenterX, 2) + 
      Math.pow(e.clientY - chestCenterY, 2)
    );
    
    const visibilityThreshold = 200; // Adjust this value to change when the chest starts becoming visible
    
    if (distance <= visibilityThreshold) {
      const opacity = 1 - (distance / visibilityThreshold);
      chest.style.opacity = opacity.toFixed(2);
    } else {
      chest.style.opacity = '0';
    }
  });
});
//anchor scroll animation
console.log('Script is running');

document.addEventListener('DOMContentLoaded', () => {
  const anchor = document.querySelector('.anchor-container');
  const keyImage = document.querySelector('.key-image');
  let currentPosition = 400;
  const scrollSpeed = 0.02;
  const maxOffscreenPosition = -350;
  const keyVisibilityThreshold = -320;
  let keyVisible = false;

  function updateAnchorPosition() {
    if (currentPosition <= keyVisibilityThreshold) {
      keyVisible = true;
    }
    
    keyImage.style.opacity = keyVisible ? 1 : 0;
    
    anchor.style.bottom = `${currentPosition}px`;
    console.log('Anchor position:', currentPosition);
  }

  window.addEventListener('wheel', (event) => {
    const scrollAmount = event.deltaY * scrollSpeed;
    currentPosition -= scrollAmount;
    currentPosition = Math.max(maxOffscreenPosition, currentPosition);
    updateAnchorPosition();
  });

  updateAnchorPosition();
});

function spawnBird(direction) {
  const bird = document.createElement('img');
  bird.src = direction === 'left' ? 'images/birds.gif' : 'images/birds2.gif';
  bird.className = direction === 'left' ? 'bird-left' : 'bird-right';
  
  const topPosition = Math.random() * (window.innerHeight - 200);
  bird.style.top = `${topPosition}px`;
  bird.style.left = direction === 'left' ? '-100px' : '100%';
  
  document.body.appendChild(bird);
  
  const animation = bird.animate([
    { left: direction === 'left' ? '-100px' : '100%' },
    { left: direction === 'left' ? '100%' : '-100px' }
  ], {
    duration: 6000, // Reduced from 10000 to make it faster
    easing: 'linear'
  });
  
  animation.onfinish = () => bird.remove();
}

setInterval(() => {
  spawnBird(Math.random() < 0.5 ? 'left' : 'right');
}, 8000);
