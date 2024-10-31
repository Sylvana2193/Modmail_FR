# ✨ Mise à jour du bot

**Avant de mettre à jour le bot, effectuez toujours une sauvegarde de votre fichier `db/data.sqlite`.**

**⚠ Remarque sur la mise à jour vers la v3.0.0 :** Si vous utilisez actuellement une *très* ancienne version du bot, datant d'avant février 2018, vous devrez d'abord mettre à jour vers la v2.30.1 et exécuter le bot une fois avant de mettre à jour vers la v3.0.0.

## Pour mettre à jour le bot, suivez ces étapes :

1. Arrêtez le bot.
2. Faites une sauvegarde de votre fichier `db/data.sqlite`.
    * Si vous utilisez une autre base de données prise en charge, effectuez des sauvegardes de cette base de données.
3. Téléchargez la dernière version du bot depuis https://github.com/Dragory/modmailbot/releases/latest.
4. Extrayez les fichiers de la nouvelle version sur les anciens fichiers.
5. Lisez le [CHANGELOG](https://github.com/Dragory/modmailbot/blob/master/CHANGELOG.md) pour voir s'il y a des modifications de configuration à effectuer.
    * Notez particulièrement les changements concernant les versions prises en charge de Node.js !
    * Si vous mettez à jour à partir d'une version antérieure à v3.0.0, assurez-vous d'activer l'intention **Server Members** sur la page du bot dans le portail des développeurs Discord ([Image](https://raw.githubusercontent.com/Dragory/modmailbot/master/docs/server-members-intent-2.png)).
6. Démarrez le bot :
    * Si vous utilisez `start.bat` pour exécuter le bot, exécutez-le à nouveau.
    * Si vous exécutez le bot via la ligne de commande, exécutez d'abord `npm ci`, puis démarrez à nouveau le bot.
