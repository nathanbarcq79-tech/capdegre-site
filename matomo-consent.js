/* CAP DEGRÉ° — Matomo Cloud : chargement après consentement explicite. */
(function () {
  'use strict';
  var storageKey = 'capdegre_matomo_choice_v1';
  var matomoUrl = 'https://capdegrenetlifyapp.matomo.cloud/';
  var matomoScript = 'https://cdn.matomo.cloud/capdegrenetlifyapp.matomo.cloud/matomo.js';
  var started = false;
  function readChoice() {
    try { return window.localStorage.getItem(storageKey); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { window.localStorage.setItem(storageKey, value); } catch (e) {}
  }
  function startMatomo() {
    if (started) return;
    started = true;
    var _paq = window._paq = window._paq || [];
    _paq.push(['requireConsent']);
    _paq.push(['setConsentGiven']);
    _paq.push(['setTrackerUrl', matomoUrl + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    var script = document.createElement('script');
    script.async = true;
    script.src = matomoScript;
    document.head.appendChild(script);
  }
  function showNotice() {
    if (document.getElementById('capdegre-matomo-notice')) return;
    var element = document.createElement('aside');
    element.id = 'capdegre-matomo-notice';
    element.setAttribute('aria-label', 'Choix des statistiques');
    element.setAttribute('role', 'region');
    element.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;z-index:9999;max-width:730px;margin:auto;padding:18px 20px;background:#fff;color:#18313b;border:1px solid #dbe4dd;border-radius:16px;box-shadow:0 12px 35px rgba(20,45,55,.22);font:14px/1.5 system-ui,-apple-system,Segoe UI,Arial,sans-serif';
    element.innerHTML = '<strong style="font-size:16px">Aidez-nous à améliorer CAP DEGRÉ°</strong><p style="margin:8px 0 14px">Avec votre accord, Matomo Cloud mesure les visites et les pages consultées pour améliorer ce site. Vous pouvez accepter ou refuser, sans conséquence sur votre navigation.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" data-matomo="accept" style="background:#18313b;color:white;border:1px solid #18313b;border-radius:9px;padding:10px 15px;cursor:pointer;font-weight:700">Accepter</button><button type="button" data-matomo="reject" style="background:#fff;color:#18313b;border:1px solid #aebfb4;border-radius:9px;padding:10px 15px;cursor:pointer;font-weight:700">Refuser</button></div>';
    document.body.appendChild(element);
    element.querySelector('[data-matomo="accept"]').addEventListener('click', function () {
      saveChoice('yes');
      element.remove();
      startMatomo();
    });
    element.querySelector('[data-matomo="reject"]').addEventListener('click', function () {
      saveChoice('no');
      if (window._paq) window._paq.push(['forgetConsentGiven']);
      element.remove();
    });
  }
  function manageChoice(ev) {
    if (ev) ev.preventDefault();
    saveChoice('no');
    if (window._paq) window._paq.push(['forgetConsentGiven']);
    showNotice();
  }
  function init() {
    if (readChoice() === 'yes') startMatomo();
    else if (readChoice() !== 'no') showNotice();
    document.querySelectorAll('[data-manage-matomo]').forEach(function (link) {
      link.addEventListener('click', manageChoice);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
