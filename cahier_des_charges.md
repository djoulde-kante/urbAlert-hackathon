# Sujet de Hackathon : Plateforme de Signalement et de Navigation Urbaine en Guinée

## Contexte et Objectif

La Guinée fait face à divers défis urbains tels que l’entretien des routes, les coupures électriques fréquentes et la gestion des déchets. Ces problèmes affectent la mobilité, la sécurité et le bien-être des citoyens.

L’objectif de ce projet est de développer une **application mobile et web** qui permettra aux citoyens et aux touristes de signaler ces problèmes en temps réel et de consulter l’état des infrastructures avant de voyager. De plus, une **cartographie interactive** intégrée aidera les usagers à naviguer plus facilement à travers le pays.

Cette plateforme sera un **outil de communication et d’aide à la décision pour les autorités et les entreprises**, afin d’améliorer la gestion urbaine et optimiser les interventions sur le terrain.

---

## Fonctionnalités principales

### 1. Signalement des problèmes urbains

- Les utilisateurs peuvent **signaler** :
  - Routes endommagées
  - Pannes électriques
  - Dépôts de déchets non collectés, etc.
- Chaque signalement peut inclure :
  - Une **photo**
  - Une **description**
  - Une **localisation GPS**
- Un système de **notation** permettra de voter pour les problèmes les plus urgents.

### 2. Cartographie interactive et navigation

- Intégration d’un **système de carte** pour visualiser les zones problématiques.
- Fonction de **guidage GPS** pour planifier les trajets et éviter les routes en mauvais état.
- Mise à jour en temps réel des **conditions routières**.

### 3. Tableau de bord pour les autorités et entreprises

- Espace dédié aux **municipalités et gestionnaires urbains** pour :
  - Suivre les signalements
  - Coordonner les interventions
- **Statistiques et analyse des données** pour :
  - Identifier les zones critiques
  - Planifier des solutions à long terme

### 4. Intégration d’API pour accès à des services externes

- **API ouverte** pour permettre à :
  - Start-ups
  - Gouvernements
  - ONG
- Exploitation des données pour la gestion des infrastructures.
- Optimisation des itinéraires par les **entreprises de transport**.

---

## Module d'Authentification et Inscription avec Envoi de Mail

### 1. Inscription des utilisateurs

**Données requises :** Nom, email, mot de passe, numéro de téléphone (optionnel)

**Processus :**

1. L’utilisateur remplit un formulaire d’inscription.
2. Un **email de confirmation** est envoyé.
3. Une fois confirmé, l’accès à la plateforme est accordé.

💡 **Méthodes de vérification :**

- Lien de validation par email
- Code OTP par email ou SMS

### 2. Connexion sécurisée

**Méthodes d’authentification :**

- Email + mot de passe
- OAuth2 : **Google, Facebook, etc.**
- Connexion avec **JWT (JSON Web Token)**

💡 **Sécurisation :**

- **Hashage des mots de passe** : `bcrypt` ou `Argon2`
- **Récupération de mot de passe** via email

### 3. Envoi de mails automatisé

📩 **Cas d’usage :**

1. Confirmation d’inscription ✅
2. Notification de changement de mot de passe 🔐
3. Alertes sur les signalements urbains 🏙️

💡 **Bonnes pratiques :**

- Template email **responsive**
- Option de **désinscription** pour les notifications

### 4. Gestion des rôles et accès

**Types d’utilisateurs :**

- **Citoyens/Touristes** : Signalement et consultation
- **Administrateurs** : Validation, gestion et suivi

**Permissions :**

- Accès aux données sensibles réservé aux **administrateurs**
- Limitation des actions des utilisateurs classiques

---

## Impact attendu

✅ **Entretien des infrastructures** facilité via le signalement collaboratif  
✅ **Sécurité des voyageurs et touristes** améliorée  
✅ **Gestion urbaine optimisée** grâce à l’outil numérique  
✅ **Innovation et ouverture des données** encouragées

---

## Conclusion

Ce projet propose une solution technologique aux problèmes urbains en Guinée. Il constitue une opportunité pour les étudiants d’explorer :

- La **programmation mobile**
- Le **développement web**
- La **gestion des données**
- L’**intégration d’API**

Le tout au service d’un projet **utile et impactant** pour leur communauté.
