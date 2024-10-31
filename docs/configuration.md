# 📝 Configuration
Vous n'avez pas encore configuré le bot ? Consultez d'abord [Configurer le bot](setup.md) !

## Table des matières
- [Fichier de configuration](#fichier-de-configuration) (commencez ici)
- [Ajouter de nouvelles options](#ajouter-de-nouvelles-options)
- [Options requises](#options-requises)
- [Autres options](#autres-options)
- [config.ini vs config.json](#configini-vs-configjson)
- [Autres formats](#autres-formats)
- [Variables d'environnement](#variables-denvironnement)

## Fichier de configuration
Toutes les options du bot sont enregistrées dans un fichier de configuration dans le dossier du bot. Ce fichier est créé lors de la [configuration](setup.md) et est généralement soit `config.ini`, soit, si vous utilisez le bot depuis un certain temps, `config.json`.

Les instructions sur cette page concernent `config.ini`, mais peuvent également être adaptées à `config.json`. Consultez [config.ini vs config.json](#configini-vs-configjson) pour plus de détails. Notez que le format de `.ini` et `.json` est différent : vous ne pouvez pas simplement renommer un `.json` en `.ini` ou vice versa.

## Ajouter de nouvelles options
Pour ajouter une nouvelle option à votre `config.ini`, ouvrez le fichier dans un éditeur de texte tel que Notepad. Chaque option doit être mise sur une nouvelle ligne et suit le format `option = valeur`. Par exemple, `mainServerId = 1234`.

**Vous devez redémarrer le bot pour que les modifications de configuration prennent effet !**

Vous pouvez ajouter des commentaires dans le fichier de configuration en préfixant la ligne avec `#`. Exemple :
```ini
# Ceci est un commentaire
option = valeur
```

### Options à basculement
Certaines options, comme `allowMove`, ne peuvent être activées ou désactivées.  
* Pour activer une option à basculement, définissez sa valeur sur `on`, `true` ou `1`.
* Pour désactiver une option à basculement, définissez sa valeur sur `off`, `false` ou `0`.
* Par exemple : `allowMove = on` ou `allowMove = off`.

### "Accepte plusieurs valeurs"
Certaines options sont marquées comme "**Accepte plusieurs valeurs**". Pour donner plusieurs valeurs à ces options, écrivez l'option sous la forme `option[] = valeur` et répétez pour chaque valeur. Par exemple :
```ini
inboxServerPermission[] = kickMembers
inboxServerPermission[] = manageMessages
```
Vous pouvez également donner une seule valeur à ces options de la manière habituelle, c'est-à-dire `inboxServerPermission = kickMembers`.

### Plusieurs lignes de texte
Pour certaines options, comme `greetingMessage`, vous pourriez vouloir ajouter du texte qui s'étend sur plusieurs lignes. Pour ce faire, utilisez le même format que pour "Accepte plusieurs valeurs" ci-dessus :
```ini
greetingMessage[] = Bienvenue sur le serveur !
greetingMessage[] = Ceci est la deuxième ligne de la salutation.
greetingMessage[] = 
greetingMessage[] = Quatrième ligne ! Avec une ligne vide au milieu.
```

## Options requises

#### token
Le token de l'utilisateur bot provenant du [Portail des développeurs Discord](https://discord.com/developers/).

#### mainServerId
**Accepte plusieurs valeurs.** L'ID de votre serveur.

#### inboxServerId
Pour une configuration à serveur unique, même que [mainServerId](#mainServerId).  
Pour une configuration à deux serveurs, l'ID du serveur de réception.

#### logChannelId
ID d'un canal sur le serveur de réception où les logs sont publiés après la fermeture d'un fil de modmail.

## Autres options

#### accountAgeDeniedMessage
**Par défaut :** `Votre compte Discord n'est pas assez ancien pour contacter le modmail.`  
Voir `requiredAccountAge` ci-dessous.

#### allowMove
**Par défaut :** `off`  
S'il est activé, permet de déplacer des fils entre catégories en utilisant `!move <catégorie>`.

#### allowUserClose
**Par défaut :** `off`  
S'il est activé, les utilisateurs peuvent utiliser la commande de fermeture pour fermer eux-mêmes des fils depuis leurs DMs avec le bot.

#### allowStaffDelete
**Par défaut :** `on`  
S'il est activé, les membres du personnel peuvent supprimer leurs propres réponses dans des fils de modmail avec `!delete`.

#### allowStaffEdit
**Par défaut :** `on`  
S'il est activé, les membres du personnel peuvent éditer leurs propres réponses dans des fils de modmail avec `!edit`.

#### updateMessagesLive
**Par défaut :** `off`  
S'il est activé, les messages édités et supprimés par l'utilisateur seront mis à jour en conséquence dans le fil, mais resteront disponibles dans les logs.

#### allowBlock
**Par défaut :** `on`  
S'il est activé, les membres du personnel peuvent bloquer un utilisateur de l'utilisation du modmail avec `!block`.

#### allowSuspend
**Par défaut :** `on`  
S'il est activé, les membres du personnel peuvent suspendre un utilisateur de l'utilisation du modmail avec `!suspend`.

#### allowSnippets
**Par défaut :** `on`  
S'il est activé, les membres du personnel peuvent utiliser des [Snippets](snippets.md).

#### allowInlineSnippets
**Par défaut :** `on`  
Si `allowSnippets` est activé, cette option contrôle si les snippets peuvent être inclus *dans* les réponses en entourant le nom du snippet de {{ et }}.  
Ex. : `!r Bonjour ! {{rules}}`.

Voir [inlineSnippetStart](#inlineSnippetStart) et [inlineSnippetEnd](#inlineSnippetEnd) pour personnaliser les symboles utilisés.

#### allowChangingDisplayRole
**Par défaut :** `on`  
S'il est activé, les modérateurs peuvent changer le rôle affiché avec leurs réponses à n'importe quel rôle qu'ils possèdent actuellement en utilisant la commande `!role`.

#### allowNotes
**Par défaut :** `on`  
S'il est activé, les modérateurs peuvent ajouter des notes sur les utilisateurs en utilisant la commande `!note`.

#### alwaysReply
**Par défaut :** `off`  
S'il est activé, tous les messages dans les fils de modmail seront envoyés à l'utilisateur sans avoir besoin d'utiliser `!r`.  
Pour envoyer des messages internes dans le fil lorsque cette option est activée, ajoutez votre préfixe de commande (par ex. `!`) et un espace au début des messages. Par exemple, `! Ceci est un message interne`.

#### alwaysReplyAnon
**Par défaut :** `off`  
Si `alwaysReply` est activé, cette option contrôle si la réponse automatique est anonyme.

#### forceAnon
**Par défaut :** `off`  
S'il est activé, toutes les réponses (y compris `!reply` et les snippets réguliers) sont anonymes.

#### anonymizeChannelName
**Par défaut :** `off`  
S'il est activé, les noms de canaux seront le nom de l'utilisateur salé avec l'heure actuelle, puis haché pour protéger la vie privée de l'utilisateur.

#### attachmentStorage
**Par défaut :** `original`  
Contrôle comment les pièces jointes dans les fils de modmail sont stockées. Valeurs possibles :
* `original` - La pièce jointe originale est liée directement.
* `local` - Les fichiers sont enregistrés localement sur la machine exécutant le bot et servis via un serveur web local.
* `discord` - Les fichiers sont enregistrés en tant que pièces jointes dans un canal spécial sur le serveur de réception. Nécessite que `attachmentStorageChannelId` soit défini.

#### attachmentStorageChannelId
**Par défaut :** *Aucun*  
Lorsque `attachmentStorage` est défini sur "discord", l'ID du canal sur le serveur de réception où les pièces jointes sont sauvegardées.

#### autoAlert
**Par défaut :** `off`  
S'il est activé, le dernier modérateur à répondre à un fil de modmail sera automatiquement alerté lorsqu'il recevra une nouvelle réponse.  
Cette alerte entre en jeu après un délai, défini par l'option `autoAlertDelay` ci-dessous.

#### autoAlertDelay
**Par défaut :** `2m`  
Le délai après lequel `autoAlert` entre en jeu. Utilise le même format que la fermeture temporaire ; par exemple `1m30s` pour 1 minute et 30 secondes.

#### botMentionResponse
**Par défaut :** *Aucun*  
S'il est défini, le bot répond automatiquement aux mentions (pings) avec ce message. Utilisez `{userMention}` dans le texte pour mentionner l'utilisateur en retour.

#### categoryAutomation.newThread
**Par défaut :** *Aucun*  
ID de la catégorie où de nouveaux fils sont ouverts. Fonctionne également comme une solution de secours pour `categoryAutomation.newThreadFromServer`.

#### categoryAutomation.newThreadFromGuild.SERVER_ID
Alias pour [`categoryAutomation.newThreadFromServer`](#categoryAutomationNewThreadFromServerServer_id).

#### categoryAutomation.newThreadFromServer.SERVER_ID
**Par défaut :** *Aucun*  
Lors de l'exécution du bot sur plusieurs serveurs principaux, cela vous permet de spécifier quelle catégorie utiliser pour les fils de modmail provenant
