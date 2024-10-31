# 🧩 Plugins
Le bot prend en charge le chargement de plugins externes.

## Spécification des plugins à charger
Les plugins peuvent être chargés à partir de fichiers locaux ou de NPM. Exemples :
```ini
# Fichier local
plugins[] = ./path/to/plugin.js
# Package NPM
plugins[] = npm:some-plugin-package
```
Les chemins vers les fichiers locaux sont toujours relatifs au dossier du bot. Les plugins NPM sont automatiquement installés au démarrage du bot.

## Création d'un plugin
Les plugins sont simplement des fichiers `.js` qui exportent une fonction qui est appelée lorsque le plugin est chargé.

Pour plus de détails sur les arguments de la fonction, consultez [API des plugins](#plugin-api) ci-dessous.

### Exemple de plugin
Cet exemple ajoute une commande `!mycommand` qui répond par `"Réponse de mon plugin personnalisé !" ` lorsque la commande est utilisée dans un canal de fil de boîte de réception Modmail.
```js
module.exports = function({ bot, knex, config, commands }) {
  commands.addInboxThreadCommand('mycommand', [], (msg, args, thread) => {
    thread.replyToUser(msg.member, 'Réponse de mon plugin personnalisé !');
  });
}
```

(Remarque sur l'utilisation de [la déstructuration d'objets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter) dans les paramètres de la fonction)

### Exemple d'un type de stockage d'attachement personnalisé
Cet exemple ajoute un type personnalisé pour l'option `attachmentStorage` appelé `"original"` qui renvoie simplement l'URL de l'attachement d'origine sans le réhéberger de quelque manière que ce soit.
```js
module.exports = function({ attachments }) {
  attachments.addStorageType('original', attachment => {
    return { url: attachment.url };
  });
};
```
Pour utiliser ce type de stockage d'attachement personnalisé, vous devez définir l'option de configuration `attachmentStorage` sur `"original"`.

### Exemple d'un type de stockage de journal personnalisé
Cet exemple ajoute un type personnalisé pour l'option `logStorage` appelé `"pastebin"` qui télécharge les journaux sur Pastebin.

```js
module.exports = function({ logs, formatters }) {
  logs.addStorageType('pastebin', {
    async save(thread, threadMessages) {
      const formatLogResult = await formatters.formatLog(thread, threadMessages);
      const pastebinUrl = await saveToPastebin(formatLogResult); // saveToPastebin est une fonction d'exemple qui renvoie l'URL pastebin pour le journal sauvegardé
      return { url: pastebinUrl };
    },

    getUrl(thread) {
      return thread.log_storage_data.url;
    }
  });
};
```

### API des plugins
Le premier et unique argument de la fonction du plugin est un objet avec les propriétés suivantes :

| Propriété | Description |
| --------- | ----------- |
| `bot` | Instance [Eris Client](https://abal.moe/Eris/docs/Client) |
| `knex` | Objet [Knex database](https://knexjs.org/#Builder) |
| `config` | La configuration chargée |
| `commands` | Un objet avec des fonctions pour ajouter et gérer des commandes |
| `attachments` | Un objet avec des fonctions pour sauvegarder des attachements et gérer les types de stockage d'attachement |
| `logs` | Un objet avec des fonctions pour obtenir des URLs/fichiers d'attachement et gérer les types de stockage de journaux |
| `hooks` | Un objet avec des fonctions pour ajouter des *hooks* qui sont appelés à des moments spécifiques, par exemple, avant qu'un nouveau fil soit créé |
| `formats` | Un objet avec des fonctions qui vous permettent de remplacer les fonctions par défaut utilisées pour formater des messages et des journaux |
| `webserver` | Un objet [Express Application](https://expressjs.com/en/api.html#app) qui fonctionne comme le serveur web du bot |
| `threads` | Un objet avec des fonctions pour trouver et créer des fils |
| `displayRoles` | Un objet avec des fonctions pour définir et obtenir les rôles d'affichage des modérateurs |

Consultez la page auto-générée [API des plugins](plugin-api.md) pour plus de détails.

## Stabilité de l'API des plugins
Les versions du bot peuvent contenir des changements dans l'API des plugins. Assurez-vous de vérifier le [CHANGELOG](../CHANGELOG.md) avant de mettre à jour !

Veuillez envoyer toutes les suggestions de fonctionnalités au [suivi des problèmes](https://github.com/Dragory/modmailbot/issues) !
