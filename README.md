# Mr_BOT - Bot Discord

Bienvenue sur **Mr_BOT**, un bot Discord complet et créé de toutes pièces, prêt à être utilisé et modifié selon vos besoins ! Ce projet est actuellement actif et utilise plusieurs API gratuites pour offrir une variété de fonctionnalités à votre serveur Discord.

[![CodeQL](https://github.com/Ludo-code/Mr_BOT/actions/workflows/github-code-scanning/codeql/badge.svg?branch=master)](https://github.com/Ludo-code/Mr_BOT/actions/workflows/github-code-scanning/codeql)

## Fonctionnalités principales

- Intégration avec l'API Tenor pour la gestion de GIFs.
- Utilisation de l'API Fluxpoint pour des fonctionnalités supplémentaires.
- Support d'une base de données (MariaDB) pour la persistance des données.
- Système de log avec `winston` et gestion de la durée de rétention des logs.
- Personnalisable et open source pour ajouter vos propres fonctionnalités.

## Prérequis

Avant de pouvoir exécuter le bot, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) (version 20.x ou plus)
- [npm](https://www.npmjs.com/)
- Un serveur Discord pour tester le bot
- Un compte sur [Discord Developer Portal](https://discord.com/developers/applications) pour générer un token de bot
- Des clés API pour les services Tenor et Fluxpoint (gratuites)

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/Ludo-code/Mr_BOT.git
   cd Mr_BOT
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement :**

   Créez un fichier `.env` à la racine du projet avec les valeurs suivantes :

   ```env
   BOT_TOKEN=<DISCORD_BOT_TOKEN>
   TENOR_API_KEY_NAME=<TENOR_API_KEY_NAME>
   TENOR_API_KEY=<TENOR_API_KEY>
   FLUXPOINT_API_KEY=<FLUXPOINT_API_KEY>
   REDDIT_CLIENT_ID=<REDDIT_CLIENT_ID>
   REDDIT_CLIENT_SECRET=<REDDIT_CLIENT_SECRET>
   REDDIT_USER_AGENT=<REDDIT_USER_AGENT>
   UPTIME_KUMA_URL=<UPTIME_KUMA_URL>
   DB_NAME=<DATABASE_NAME>
   DB_USERNAME=<DATABASE_USERNAME>
   DB_PASSWORD=<DATABASE_PASSWORD>
   DB_HOST=<DATABASE_ADDRESS_OR_IP>
   DB_PORT=<DATABASE_PORT>
   DB_DIALECT=mariadb
   ```

| Variable               | Description | Obligatoire |
|------------------------|-------------|-------------|
| `BOT_TOKEN`            | 🎮 Token du bot Discord, récupérable depuis [Discord Developer Portal](https://discord.com/developers/applications). | ✅ Oui |
| `TENOR_API_KEY_NAME`   | 🔑 Nom d’identifiant pour la clé Tenor (valeur libre, selon vos préférences). | ✅ Oui |
| `TENOR_API_KEY`        | 🎬 Clé API Tenor (pour les GIFs). | ✅ Oui |
| `FLUXPOINT_API_KEY`    | 🧪 Clé API Fluxpoint (payante, one time buy). | ✅ Oui |
| `REDDIT_CLIENT_ID`     | 👽 Identifiant client Reddit généré via votre application Reddit. | ✅ Oui |
| `REDDIT_CLIENT_SECRET` | 🧠 Secret client Reddit associé à votre App. | ✅ Oui |
| `REDDIT_USER_AGENT`    | 🛰️ Nom d’agent utilisateur Reddit (**obligatoire**, à définir selon votre App, ex. `DiscordBot`). | ✅ Oui |
| `UPTIME_KUMA_URL`      | 📡 URL push Uptime Kuma (laisser vide si non utilisé). | ❌ Non |
| `DB_NAME`              | 🗃️ Nom de la base de données. | ✅ Oui |
| `DB_USERNAME`          | 👤 Utilisateur de la base de données. | ✅ Oui |
| `DB_PASSWORD`          | 🔐 Mot de passe de la base de données. | ✅ Oui |
| `DB_HOST`              | 🌐 Adresse ou IP du serveur de base de données. | ✅ Oui |
| `DB_PORT`              | 🚪 Port utilisé (par défaut MariaDB : `3306`). | ✅ Oui |
| `DB_DIALECT`           | 🛠️ Dialecte utilisé (`mariadb`, `mysql`, etc.). | ✅ Oui |

4. **Lancer le bot :**
   ```bash
   npm start
   ```

## Système de logs

Le bot utilise `winston` pour le logging avec rotation automatique des fichiers :

- Les fichiers de log sont créés quotidiennement avec un nom de fichier basé sur la date (`logs/Mr_BOT-DD-MM-YYYY.log`).
- Les anciens fichiers de log sont automatiquement compressés et conservés pendant 180 jours (6 mois).
- Après 6 mois, les fichiers de log sont automatiquement supprimés.

Pour personnaliser la configuration des logs, vous pouvez modifier le fichier `logger` dans le code source, en particulier les options `filename`, `maxSize`, `maxFiles`, et `zippedArchive` dans le transport `DailyRotateFile`.

## API utilisées

- [Tenor API](https://tenor.com/gifapi/documentation) - Utilisée pour envoyer des GIFs directement dans les canaux Discord.
- [Fluxpoint API](https://docs.fluxpoint.dev/home) - Utilisée pour des fonctionnalités diverses comme des citations, images, etc.

## Contributions

Les contributions sont les bienvenues ! Si vous avez des idées de nouvelles fonctionnalités ou trouvez des bugs, n'hésitez pas à ouvrir une issue ou une pull request.

## Support

Si vous avez besoin d'aide pour configurer ou utiliser le bot, n'hésitez pas à me contacter via un ticket sur GitHub ou sur Discord.

---

**Projet actif et en développement constant !**
