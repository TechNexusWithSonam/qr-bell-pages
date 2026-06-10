// ===== VENDOR JS =====

document.addEventListener('DOMContentLoaded', () => {
  // Filter chips
  document.querySelectorAll('.filter-chip, .category-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const group = this.closest('.filter-bar, .categories-scroll');
      if (group) group.querySelectorAll('.filter-chip, .category-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      filterVendors();
    });
  });

  // Search input
  const searchInput = document.getElementById('vendorSearch');
  if (searchInput) searchInput.addEventListener('input', filterVendors);
});

function filterVendors() {
  const searchInput = document.getElementById('vendorSearch');
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const activeChip = document.querySelector('.filter-chip.active, .category-chip.active');
  const activeCategory = activeChip ? activeChip.dataset.category : 'all';

  document.querySelectorAll('.vendor-card-wrap').forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    const category = (card.dataset.category || '').toLowerCase();
    const matchesSearch = !query || name.includes(query) || category.includes(query);
    const matchesCategory = activeCategory === 'all' || !activeCategory || category.includes(activeCategory.toLowerCase());
    card.style.display = matchesSearch && matchesCategory ? '' : 'none';
  });
}

// Registration multi-step
let currentStep = 1;
const totalSteps = 4;

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;
  document.querySelectorAll('.reg-step-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`step-${step}`);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('.reg-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
    s.classList.toggle('done', i + 1 < step);
  });
  currentStep = step;
}

function nextStep() { goToStep(currentStep + 1); }
function prevStep() { goToStep(currentStep - 1); }
