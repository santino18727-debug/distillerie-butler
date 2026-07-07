# Distillerie Butler — boutique

Site vitrine & boutique e-commerce pour la **Distillerie Butler** — eaux-de-vie de fruits distillées et embouteillées en Šumadija (Serbie), importées en Suisse.

Produit signature : **eau-de-vie de cidre de pomme** (42 % vol · 700 ml).

## Aperçu

- Design premium *cave à la lueur d'ambre* : noir chaud + or brandy + prune.
- Typographie : Fraunces (display) + Archivo (texte).
- Portique de vérification d'âge (conformité vente d'alcool).
- Catalogue + panier client (localStorage), seuil de livraison offerte.
- Visuels d'ambiance générés localement (clair-obscur).

## Stack

Site **statique**, sans build ni dépendance : `index.html` + `styles.css` + `script.js`.

## Lancer en local

```bash
python -m http.server 8777
# puis ouvrir http://localhost:8777
```

## Structure

```
├── index.html        # page unique (hero, collection, procédé, rakija, maison)
├── styles.css        # design system complet
├── script.js         # portique d'âge, catalogue, panier
└── assets/           # visuels d'ambiance
```

## À faire

- [ ] Confirmer la gamme et les prix réels
- [ ] Paiement (Twint / Stripe)
- [ ] Version allemande (marché suisse bilingue)
- [ ] Vraies photos produits + pages légales (CGV, mentions)

---

*L'abus d'alcool est dangereux pour la santé. À consommer avec modération. Vente interdite aux mineurs.*
