// assets/js/menuOverlay.js

export function menuOverlay() {
  return {
    open: false,
    init() {
      this.$watch('open', (val) => {
        if (val) {
          document.addEventListener('keydown', this.escHandler);
          this.$nextTick(() => this.trapFocus());
        } else {
          document.removeEventListener('keydown', this.escHandler);
        }
      });
    },
    escHandler(e) {
      if (e.key === 'Escape') this.open = false;
    },
    trapFocus() {
      const overlay = document.getElementById('menuOverlay');
      if (!overlay) return;
      const focusables = overlay.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      overlay.addEventListener('keydown', (e) => {
        if (!this.open || e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });
    }
  };
}
