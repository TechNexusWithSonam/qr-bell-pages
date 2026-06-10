// ===== MAIN JS =====

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Sidebar toggle (dashboard)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // QR Code animation
  const cells = document.querySelectorAll('.qr-cell');
  cells.forEach((cell, i) => {
    cell.style.animationDelay = `${i * 0.015}s`;
    cell.style.opacity = Math.random() > 0.45 ? '1' : '0';
  });
});

// Copy to clipboard
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.borderColor = 'var(--success)';
    btn.style.color = 'var(--success)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  });
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:var(--card-bg); border:1px solid var(--border);
    padding:14px 24px; border-radius:12px; font-size:.9rem;
    backdrop-filter:blur(12px); animation: slideIn .3s ease;
    color:var(--text); box-shadow:var(--shadow);
  `;
  if (type === 'success') toast.style.borderColor = 'rgba(34,197,94,0.4)';
  if (type === 'error') toast.style.borderColor = 'rgba(239,68,68,0.4)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Format number
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
