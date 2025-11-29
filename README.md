# Flight Deck - Mission Control

**Flight Deck** est une application web React présentant les données de l'API SpaceX avec un design épuré aux couleurs de SpaceX. Cette application permet de consulter le catalogue de missions, leurs briefings détaillés et des métriques de vol statistiques.

## Features

### Fonctionnalités principales (Minimum requis)

- **Liste des lancements** : Affichage paginé de tous les lancements SpaceX avec leurs informations principales
- **Vue détaillée** : Page détaillée pour chaque lancement avec informations complètes (fusée, site de lancement, liens)
- **Visualisations graphiques** : Plusieurs graphiques pour analyser les données :
  - **Pie Chart** : Répartition des succès/échecs
  - **Bar Chart** : Lancements par année (10 dernières années)
  - **Histogramme** : Distribution des lancements par période

### Fonctionnalités bonus

- ✅ **Tests d'intégration** : Suite de tests complète avec Vitest et Testing Library
- ✅ **Plusieurs visualisations** : 3 graphiques différents avec analyses pertinentes

## 🏗️ Architecture

### Structure du projet

```
SpaceX/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Layout.jsx       # Layout principal avec header/nav/footer
│   │   └── __tests__/       # Tests des composants
│   ├── pages/               # Pages de l'application
│   │   ├── LaunchList.jsx   # Liste des lancements
│   │   ├── LaunchDetail.jsx # Détails d'un lancement
│   │   ├── Visualizations.jsx # Page de visualisations
│   │   └── __tests__/       # Tests des pages
│   ├── services/            # Services API
│   │   └── spacexApi.js      # Client API SpaceX
│   ├── test/                # Configuration des tests
│   │   └── setup.js
│   ├── App.jsx              # Composant racine
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── package.json
├── vite.config.js
└── README.md
```

### Technologies utilisées

- **React 18** : Framework front-end
- **React Router v6** : Routage avec Routes, Route, Link, useParams, useNavigate, useLocation
- **Vite** : Build tool et dev server
- **Recharts** : Bibliothèque de graphiques
- **Axios** : Client HTTP
- **Vitest** : Framework de tests
- **Testing Library** : Tests d'intégration

### Concepts React utilisés

Cette application utilise les concepts React vus en cours :

- **Composants fonctionnels** : Tous les composants sont des fonctions (pas de classes)
- **Hooks** :
  - `useState` : Gestion de l'état local
  - `useEffect` : Effets de bord (appels API, subscriptions)
- **Props** : Passage de données entre composants
- **JSX** : Syntaxe déclarative avec expressions dynamiques `{}`
- **React Router** :
  - `Routes` et `Route` : Définition des routes
  - `Link` : Navigation
  - `useParams` : Récupération des paramètres d'URL
  - `useNavigate` : Navigation programmatique
  - `useLocation` : Accès à l'emplacement actuel

### API utilisée

L'application utilise l'API publique SpaceX v4 : `https://api.spacexdata.com/v4`

Endpoints utilisés :
- `POST /launches/query` : Récupération des lancements (avec pagination)
- `GET /launches/:id` : Détails d'un lancement
- `GET /rockets/:id` : Informations d'une fusée
- `GET /launchpads/:id` : Informations d'un site de lancement

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances**
   ```bash
   npm i
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - L'application sera accessible sur `http://localhost:5173`

### Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm test` : Lance les tests
- `npm run test:ui` : Lance les tests avec interface graphique

## 🎨 Design

L'application utilise un design épuré et professionnel inspiré d'un cockpit de mission :

- **Couleurs** : Palette bleu marine (#005288) sur fond noir, avec accents blancs
- **Typographie** : Police système moderne et lisible
- **Interface** : Design minimaliste avec micro-interactions subtiles
- **Système de nommage** : Vocabulaire thématique "Mission Control" pour une cohérence technique
- **Classes CSS** : Préfixe unique `fd-` (Flight Deck) pour une identification claire

## 📊 Visualisations

### 1. Pie Chart - Répartition succès/échecs
Affiche la proportion de lancements réussis, échoués et en attente.

### 2. Bar Chart - Lancements par année
Graphique en barres montrant le nombre de lancements par année sur les 10 dernières années.

### 3. Histogramme - Distribution par période
Répartition des lancements sur différentes périodes (2010-2012, 2013-2015, etc.).

## 🧪 Tests

L'application inclut une suite de tests d'intégration couvrant :

- **LaunchList** : Affichage de la liste, chargement, gestion d'erreurs
- **LaunchDetail** : Affichage des détails, chargement des données associées
- **Visualizations** : Affichage des graphiques, traitement des données
- **Layout** : Navigation et structure de l'interface

Pour lancer les tests :
```bash
npm test
```

## 🐛 Points de blocage rencontrés

### 1. API SpaceX v4 et pagination
**Problème** : L'API v4 utilise une méthode POST avec query pour la pagination, différente de l'API v3.
**Solution** : Adaptation du service API pour utiliser `POST /launches/query` avec les options de pagination.

### 2. Gestion des données asynchrones multiples
**Problème** : Chargement des données de lancement, fusée et site de lancement de manière séquentielle.
**Solution** : Utilisation de `Promise.all` et gestion d'erreurs individuelle pour chaque appel API.

### 3. Formatage des dates
**Problème** : Les dates de l'API sont en UTC et nécessitent un formatage pour l'affichage.
**Solution** : Fonction utilitaire `formatDate` utilisant `toLocaleDateString`.

### 4. Design responsive
**Problème** : Maintenir un design épuré tout en étant responsive.
**Solution** : Media queries adaptatives avec layout flexible (grid, flexbox).

## 🤖 Utilisation de l'IA

### Outils IA utilisés

Cette application a été développée avec l'assistance de **Cursor AI** uniquement pour :

1. **Styles CSS** :
   - Création des styles CSS avec palette SpaceX
   - Design simple et épuré
   - Responsive design et media queries

2. **Tests unitaires** :
   - Structure des tests d'intégration
   - Mocks des services API
   - Cas de test pour chaque composant

### Auto-complétion Cursor

L'**auto-complétion de Cursor** a été utilisée pendant le développement pour :
- Suggestions de code pendant l'écriture
- Complétion automatique des fonctions et variables
- Aide à la rédaction des commentaires

### Où l'IA a été utilisée

- ✅ **Styles CSS** : Créés et refondus par l'IA
- ✅ **Tests unitaires** : Écrits avec l'assistance de l'IA
- ✅ **Auto-complétion** : Utilisée pendant l'écriture du code (composants React, services API, logique métier)

## 📝 Qualité du code

### Bonnes pratiques appliquées

- **Nommage clair et thématique** : Vocabulaire cohérent "Mission Control" (missions, briefings, métriques)
- **Système CSS structuré** : Préfixe unique `fd-` (Flight Deck) pour éviter les collisions
- **Séparation des concerns** : Services API séparés des composants
- **Réutilisabilité** : Composants modulaires et réutilisables
- **Gestion d'erreurs** : Try/catch et affichage d'erreurs utilisateur
- **Loading states** : Indicateurs de chargement pour toutes les opérations async
- **Responsive design** : Media queries pour mobile/tablette/desktop

### Code mort

Aucun code mort présent dans l'application. Tous les fichiers et fonctions sont utilisés.

### Répétitions

Minimisation des répétitions grâce à :
- Fonctions utilitaires réutilisables (`formatDate`, `getStatusColor`, etc.)
- Composants modulaires (Layout, sections de graphiques)
- Styles CSS avec variables CSS et système de préfixe `fd-` pour la cohérence
- Vocabulaire thématique unifié dans tout le projet

## 📄 Licence

Ce projet est un projet éducatif utilisant l'API publique SpaceX.

## 👤 Auteur

**Ariazoox**

- GitHub: [@Ariazoox](https://github.com/Ariazoox)