// ===== DASHBOARD JS =====

document.addEventListener('DOMContentLoaded', () => {
  renderCharts();
  initTabs();
  initDateFilter();
});

function renderCharts() {
  // Earnings bar chart
  const earningsChart = document.getElementById('earningsChart');
  if (earningsChart) {
    const data = [65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 72];
    const maxVal = Math.max(...data);
    earningsChart.innerHTML = data.map((v, i) => `
      <div class="chart-bar" style="height:${(v / maxVal) * 100}%" title="Month ${i + 1}: $${v * 10}"></div>
    `).join('');
  }

  // Leads bar chart
  const leadsChart = document.getElementById('leadsChart');
  if (leadsChart) {
    const data = [8, 14, 6, 18, 11, 16, 9, 20, 13, 17, 12, 15];
    const maxVal = Math.max(...data);
    leadsChart.innerHTML = data.map((v, i) => `
      <div class="chart-bar" style="height:${(v / maxVal) * 100}%; background: linear-gradient(to top, var(--accent), rgba(61,244,176,0.3))" title="Month ${i + 1}: ${v} leads"></div>
    `).join('');
  }
}

function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', function () {
        const container = this.closest('.tab-container');
        container.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const panel = container.querySelector(`#tab-${this.dataset.tab}`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

function initDateFilter() {
  document.querySelectorAll('.date-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.date-filters').querySelectorAll('.date-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // In production: re-fetch data for selected range
      renderCharts();
    });
  });
}

// Mark lead as contacted
function markContacted(leadId) {
  const card = document.getElementById(`lead-${leadId}`);
  if (card) {
    card.querySelector('.badge')?.remove();
    const badge = document.createElement('span');
    badge.className = 'badge badge-success';
    badge.textContent = '✓ Contacted';
    card.querySelector('.lead-header').appendChild(badge);
    showToast('Lead marked as contacted');
  }
}
