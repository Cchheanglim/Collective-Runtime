const stage = document.getElementById('stage');

function render({ pets, settings }) {
  syncPets(stage, pets);
  document.body.classList.toggle('no-labels', !settings.showLabels);
  document.documentElement.style.setProperty('--scale', settings.petSize / 100);
}

window.collective.getState().then(render);
window.collective.onState(render);
