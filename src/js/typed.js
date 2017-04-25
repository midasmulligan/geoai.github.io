
module.exports = function typingEffect() {
  document.addEventListener('DOMContentLoaded', function() {

    window.Typed.new('.typing-effect', {
      strings: ['Political', 'Geopolitical', 'Regulatory'],
      typeSpeed: 0,
      cursorChar: '',
      loop: true,
      backDelay: 3000
    });
  });
}
