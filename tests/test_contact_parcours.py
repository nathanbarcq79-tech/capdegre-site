#!/usr/bin/env python3
"""Contrôles statiques sans dépendance pour le parcours de contact CAP DEGRÉ°.
Exécution : python3 tests/test_contact_parcours.py
Ne teste pas l'envoi réel Formspree ni le rendu navigateur.
"""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]

class ContactParcoursTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.method = (ROOT / "comment-ca-marche.html").read_text(encoding="utf-8")
        cls.thanks = (ROOT / "merci.html").read_text(encoding="utf-8")
        cls.robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        cls.sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")

    def test_form_action_and_fields(self):
        self.assertIn('action="https://formspree.io/f/mljgynqd"', self.home)
        for field in ('email', 'message', 'consent', 'kind', 'deadline', 'decision'):
            self.assertRegex(self.home, rf'id="{field}"')
        self.assertRegex(self.home, r'id="consent"[^>]*required')
        self.assertRegex(self.home, r'id="email"[^>]*required')
        self.assertRegex(self.home, r'id="message"[^>]*required')

    def test_prefill_options_are_present(self):
        for choice in ('Choisir un système de chauffage',
                       'Choisir l’ordre des travaux de rénovation',
                       'Conseil avant achat immobilier',
                       'Construction neuve / projet global'):
            self.assertIn('<option>' + choice + '</option>', self.home)
            self.assertIn(':"' + choice + '"', self.home)

    def test_error_handling_and_thank_you(self):
        self.assertIn('if(!response.ok)', self.home)
        self.assertIn('submit.disabled=false', self.home)
        self.assertIn("window.location.assign('/merci.html')", self.home)
        self.assertIn('name="robots" content="noindex,nofollow"', self.thanks)
        self.assertIn('Disallow: /merci.html', self.robots)
        self.assertNotIn('/merci.html</loc>', self.sitemap)

    def test_anonymisation_of_public_case_studies(self):
        for name in ('etude-cas-maison-ouest-france.html',
                     'etude-cas-renovation-maison-ancienne.html'):
            text = (ROOT / name).read_text(encoding="utf-8")
            for forbidden in ('Parthenay', 'Niort', 'Deux-Sèvres', 'Saint-Aubin-le-Cloud'):
                self.assertNotIn(forbidden.lower(), text.lower(), f"{name}: {forbidden}")

    def test_no_test_price_on_public_pages(self):
        for text in (self.home, self.method):
            self.assertNotIn('690 €', text)
            self.assertNotIn('1 190 €', text)

if __name__ == "__main__":
    unittest.main()
