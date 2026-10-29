# Recette avant publication — CAP DEGRÉ°

## Contrôles réalisés dans le code source (28 octobre 2026)
- [x] Formulaire POST vers Formspree `https://formspree.io/f/mljgynqd` conservé.
- [x] Champs `deadline` et `decision` ajoutés et correctement nommés.
- [x] Adresse e-mail, description et consentement toujours requis.
- [x] Valeurs `?sujet=chauffage` et `?sujet=renovation` corrigées pour correspondre aux options réelles.
- [x] Valeurs `?sujet=achat` et `?sujet=global` conservées.
- [x] Gestion des erreurs d'envoi et redirection `/merci.html` conservées.
- [x] Aucune localité précise réintroduite dans les deux pages modifiées.
- [x] Aucune vente, prix ferme ou témoignage fictif ajouté au site.

## Vérifications NON réalisées — ne pas présenter comme validées
- [ ] Prévisualisation visuelle sur mobile et ordinateur.
- [ ] Test navigateur des liens `?sujet=...` et du comportement de validation.
- [ ] Test d'envoi Formspree réel **avec une adresse de test autorisée**, puis réception e-mail et page merci.
- [ ] Vérification d'accessibilité clavier et lecteur d'écran.
- [ ] Contrôle de déploiement Cloudflare Pages.
- [ ] Vérification live de robots.txt, sitemap.xml, canonical, statut HTTP et Search Console.
- [ ] Revue juridique des mentions légales, confidentialité, statut et cumul d'activités.

## Scénarios de recette manuelle
1. Ouvrir `/?sujet=chauffage#contact` : « Choisir un système de chauffage » doit être sélectionné.
2. Ouvrir `/?sujet=renovation#contact` : « Choisir l’ordre des travaux de rénovation » doit être sélectionné.
3. Ouvrir `/?sujet=achat#contact` : « Conseil avant achat immobilier » doit être sélectionné.
4. Ouvrir `/?sujet=global#contact` : « Construction neuve / projet global » doit être sélectionné.
5. Envoyer avec e-mail vide : le navigateur doit bloquer.
6. Envoyer avec consentement non coché : le navigateur doit bloquer.
7. Envoyer un test autorisé : le serveur doit accepter et afficher `/merci.html`.
8. Simuler un échec réseau : le message d'erreur doit s'afficher et le bouton se réactiver.
9. Vérifier que les champs supplémentaires figurent dans la notification Formspree.
10. Vérifier qu'aucun prix commercial n'est publié et qu'aucune information sensible n'est demandée.

## Décision
Ne pas fusionner la PR avant les vérifications navigateur, l'essai Formspree et la revue de conformité. La validation du code source seule n'est pas une validation de production.
