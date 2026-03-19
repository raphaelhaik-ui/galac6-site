(function () {
  if (localStorage.getItem('galac6-cookie-consent')) return;

  var style = document.createElement('style');
  style.textContent = [
    '#galac6-cookie-banner {',
    '  position: fixed;',
    '  bottom: 0;',
    '  left: 0;',
    '  right: 0;',
    '  z-index: 99999;',
    '  background: #13131f;',
    '  border-top: 1px solid #1e1e32;',
    '  padding: 16px 24px;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 16px;',
    '  flex-wrap: wrap;',
    '}',
    '#galac6-cookie-banner p {',
    '  color: #8a8aa3;',
    '  font-size: 14px;',
    '  line-height: 1.5;',
    '  margin: 0;',
    '  flex: 1 1 300px;',
    '}',
    '#galac6-cookie-banner a {',
    '  color: #a78bfa;',
    '  text-decoration: underline;',
    '}',
    '#galac6-cookie-banner .cookie-btns {',
    '  display: flex;',
    '  gap: 10px;',
    '  flex-wrap: wrap;',
    '  flex-shrink: 0;',
    '}',
    '#galac6-cookie-accept {',
    '  background: linear-gradient(135deg, #7c3aed, #a855f7);',
    '  color: #fff;',
    '  border: none;',
    '  border-radius: 8px;',
    '  padding: 10px 20px;',
    '  font-size: 14px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '  white-space: nowrap;',
    '}',
    '#galac6-cookie-accept:hover {',
    '  background: linear-gradient(135deg, #6d28d9, #9333ea);',
    '}',
    '#galac6-cookie-refuse {',
    '  background: transparent;',
    '  color: #8a8aa3;',
    '  border: 1px solid #2e2e45;',
    '  border-radius: 8px;',
    '  padding: 10px 20px;',
    '  font-size: 14px;',
    '  cursor: pointer;',
    '  white-space: nowrap;',
    '}',
    '#galac6-cookie-refuse:hover {',
    '  border-color: #4a4a6a;',
    '  color: #b0b0c8;',
    '}',
    '@media (max-width: 480px) {',
    '  #galac6-cookie-banner { padding: 16px; }',
    '  #galac6-cookie-banner .cookie-btns { width: 100%; }',
    '  #galac6-cookie-accept,',
    '  #galac6-cookie-refuse { flex: 1; text-align: center; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  var isEN = localStorage.getItem('galac6-lang') === 'en';

  var banner = document.createElement('div');
  banner.id = 'galac6-cookie-banner';
  banner.innerHTML = isEN
    ? '<p>Galac6 uses functional cookies to remember your preferences (theme, accessibility). ' +
      'No advertising or tracking cookies. ' +
      '<a href="/privacy">Learn more</a></p>' +
      '<div class="cookie-btns">' +
      '<button id="galac6-cookie-accept">Accept</button>' +
      '<button id="galac6-cookie-refuse">Continue without accepting</button>' +
      '</div>'
    : '<p>Galac6 utilise des cookies fonctionnels pour mémoriser vos préférences (thème, accessibilité). ' +
      'Aucun cookie publicitaire ni de traçage. ' +
      '<a href="/privacy">En savoir plus</a></p>' +
      '<div class="cookie-btns">' +
      '<button id="galac6-cookie-accept">Accepter</button>' +
      '<button id="galac6-cookie-refuse">Continuer sans accepter</button>' +
      '</div>';
  document.body.appendChild(banner);

  document.getElementById('galac6-cookie-accept').addEventListener('click', function () {
    localStorage.setItem('galac6-cookie-consent', 'accepted');
    banner.remove();
  });

  document.getElementById('galac6-cookie-refuse').addEventListener('click', function () {
    localStorage.setItem('galac6-cookie-consent', 'refused');
    banner.remove();
  });
})();
