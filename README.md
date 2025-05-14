# UrbanAlert Guinée 🌍

Une plateforme de signalement et de navigation urbaine pour améliorer la gestion des infrastructures en Guinée.

## 📋 À propos

UrbanAlert est une application web et mobile qui permet aux citoyens et aux touristes de signaler en temps réel les problèmes d'infrastructure urbaine en Guinée, tels que :
- Routes endommagées
- Coupures électriques
- Dépôts de déchets non collectés

## 🚀 Fonctionnalités principales

- **Signalement en temps réel** : Possibilité de signaler des problèmes avec photos et géolocalisation
- **Cartographie interactive** : Visualisation des signalements sur une carte dynamique
- **Tableau de bord** : Suivi des interventions et des statistiques
- **Authentification sécurisée** : Système de connexion et d'inscription des utilisateurs

## 🛠 Technologies utilisées

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Leaflet (cartographie)
- Radix UI (composants)
- TypeScript

### Backend
- Next.js
- Firebase Auth
- Firebase Storage
- Firebase Firestore

## 📦 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/urbalert.git
```

2. Installez les dépendances du frontend :
```bash
cd urbAlert-Plateform-web
npm install --legacy-peer-deps
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```

## 🚀 Démarrage

```bash
cd urbAlert-Plateform-web
npm run dev
```
L'application sera accessible sur `http://localhost:3000`

## 📱 Structure du projet

```
urbalert/
└── urbAlert-Plateform-web/    # Frontend Next.js
    ├── app/                   # Pages et routes
    ├── components/            # Composants React
    ├── hooks/                 # Custom hooks
    |── lib/                   # Utilitaires et configurations
    └── lib/api                # Configurations
```

## 👥 Équipe

- Mamadou Djouldé Kanté

## 📞 Contact

- Email : k4nt3.os@gmail.com
- Tel : 623 08 64 01
