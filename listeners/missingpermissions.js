const { Listener } = require("discord-akairo");

class listenerpasdeperms extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  exec(message, command, type, missing) {
    const permissionFr = {
      CREATE_INSTANT_INVITE: "Créer une invitation",
      KICK_MEMBERS: "Expulser des membres",
      BAN_MEMBERS: "Bannir des membres",
      ADMINISTRATOR: "Administrateur",
      MANAGE_CHANNELS: "Gérer les salons",
      MANAGE_GUILD: "Gérer le serveur",
      ADD_REACTIONS: "Ajouter des réactions",
      VIEW_AUDIT_LOG: "Voir les logs du serveur",
      PRIORITY_SPEAKER: "Voix prioritaire",
      STREAM: "Vidéo",
      VIEW_CHANNEL: "Voir les salons",
      SEND_MESSAGES: "Envoyer des messages",
      SEND_TTS_MESSAGES: "Envoyer des messages de synthèse vocale",
      MANAGE_MESSAGES: "Gérer les messages",
      EMBED_LINKS: "Intégrer des liens",
      ATTACH_FILES: "Joindre des fichiers",
      READ_MESSAGE_HISTORY: "Voir les anciens messages",
      MENTION_EVERYONE: "Mentionner @everyone, @here et tous les rôles",
      USE_EXTERNAL_EMOJIS: "Utiliser des émojis externes",
      VIEW_GUILD_INSIGHTS: "Voir les analyses du serveur",
      CONNECT: "Se connecter",
      SPEAK: "Parler",
      MUTE_MEMBERS: "Couper le micro de membres",
      DEAFEN_MEMBERS: "Mettre en sourdine des membres",
      MOVE_MEMBERS: "Déplacer des membres",
      USE_VAD: "Utiliser la Détection de la voix",
      CHANGE_NICKNAME: "Changer le pseudo",
      MANAGE_NICKNAMES: "Gérer les pseudos",
      MANAGE_ROLES: "Gérer les rôles",
      MANAGE_WEBHOOKS: "Gérer les webhooks",
      MANAGE_EMOJIS: "Gérer les émojis",
      USE_SLASH_COMMANDS: "Utiliser les commandes slash",
      REQUEST_TO_SPEAK: "Demande de prise de parole",
      MANAGE_THREADS: "Uniquement dans l'api v9 de discord",
      USE_PUBLIC_THREADS: "Uniquement dans l'api v9 de discord",
      USE_PRIVATE_THREADS: "Uniquement dans l'api v9 de discord",
    };
    let msgperm =
      type === "user"
        ? `Il te manque la permission \`${permissionFr[missing]}\`.`
        : `Il manque la permission \`${permissionFr[missing]}\` au bot.`;

    message.channel.send(msgperm);
  }
}

module.exports = listenerpasdeperms;
