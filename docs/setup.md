# 🛠️ Configuration du bot
**Remarque :** Ce bot fonctionne sur votre propre machine ou un serveur.  
Pour le maintenir en ligne, vous devez garder le processus du bot en cours d'exécution.

## Terminologie
* **Serveur principal** (ou guilde principale) est le serveur depuis lequel les utilisateurs contacteront modmail.
* **Serveur de réception** (ou guilde de réception, ou guilde de mail) est le serveur où les fils de discussion modmail seront créés. Dans une "configuration à serveur unique", il s'agit du même serveur que le serveur principal.
* Un **fil de discussion modmail** est un canal sur le **serveur de réception** qui contient l'échange actuel avec l'**utilisateur**. Ces fils peuvent être fermés pour les archiver. Un **utilisateur** ne peut avoir qu'un seul fil de discussion modmail ouvert à la fois.
* Un **modérateur**, dans le contexte de modmail, est un membre du personnel du serveur qui répond et gère les fils de discussion modmail.
* Un **utilisateur**, dans le contexte de modmail, est un utilisateur Discord qui contacte modmail en DMant le bot.

## Prérequis
1. Créez un bot sur le [Portail des développeurs Discord](https://discord.com/developers/)
2. Activez **Server Members Intent** et **Message Content Intent** dans la page de paramètres du bot sur le portail des développeurs ([Image](intents.png))
3. Installez Node.js 18 (LTS) ou supérieur
4. [Téléchargez la dernière version du bot ici](https://github.com/Dragory/modmailbot/releases/latest) (cliquez sur "Code source (zip)")
5. Extrayez le fichier Zip téléchargé dans un nouveau dossier
6. Dans le dossier du bot (celui que vous avez extrait du fichier zip), faites une copie du fichier `config.example.ini` et renommez la copie en `config.ini`
    * Si vous êtes sous Windows, le fichier peut s'appeler `config.example` (sans `.ini` à la fin)

## Configuration à serveur unique
Dans cette configuration, les fils de discussion modmail s'ouvrent sur le serveur principal dans une catégorie spéciale. C'est la configuration recommandée pour les petits et moyens serveurs.

1. **Commencez par passer par les [prérequis](#prérequis) ci-dessus !**
2. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs requises. `mainServerId` et `inboxServerId` doivent tous deux être définis sur l'ID de votre serveur.
3. Invitez le bot sur le serveur.
4. À une nouvelle ligne à la fin de `config.ini`, ajoutez `categoryAutomation.newThread = CATEGORY_ID_HERE`
    * Remplacez `CATEGORY_ID_HERE` par l'ID de la catégorie où les nouveaux fils de discussion modmail doivent aller.
5. Assurez-vous que le bot dispose des permissions `Gérer les canaux`, `Gérer les messages` et `Joindre des fichiers` dans la catégorie.
    * Il n'est pas recommandé de donner au bot des permissions d'administrateur dans *aucune* circonstance.
6. **[🏃 Démarrez le bot !](starting-the-bot.md)**
7. Vous souhaitez modifier d'autres options du bot ? Consultez **[📝 Configuration](configuration.md)**
8. Vous avez d'autres questions ? Consultez les **[🙋 Questions fréquentes](faq.md)** ou
   **[rejoignez le serveur d'assistance !](../README.md#serveur-dassistance)**

## Configuration à deux serveurs
Dans cette configuration, les fils de discussion modmail s'ouvrent sur un serveur de réception séparé. C'est la configuration recommandée pour les grands serveurs qui reçoivent beaucoup de modmails, où une configuration à serveur unique pourrait devenir désordonnée. Vous pourriez également vouloir cette configuration pour des raisons de confidentialité*.

1. **Commencez par passer par les [prérequis](#prérequis) ci-dessus !**
2. Créez un serveur de réception sur Discord.
3. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs requises.
    * Définissez `mainServerId` sur l'ID du serveur *principal* d'où les utilisateurs enverront des messages au bot.
    * Définissez `inboxServerId` sur l'ID du serveur *de réception* créé à l'étape 2.
4. Invitez le bot sur le serveur principal et le nouveau serveur de réception créé.
5. Ouvrez `config.ini` dans un éditeur de texte et remplissez les valeurs.
6. Assurez-vous que le bot dispose des permissions `Gérer les canaux`, `Gérer les messages` et `Joindre des fichiers` sur le **serveur de réception**.
    * Le bot n'a besoin d'aucune permission sur le serveur principal.
7. **[🏃 Démarrez le bot !](starting-the-bot.md)**
8. Vous souhaitez modifier d'autres options du bot ? Consultez **[📝 Configuration](configuration.md)**
9. Vous avez d'autres questions ? Consultez les **[🙋 Questions fréquentes](faq.md)** ou
   **[rejoignez le serveur d'assistance !](../README.md#serveur-dassistance)**

*\* Comme tous les noms de canaux, même pour les canaux que vous ne pouvez pas voir, sont des informations publiques via l'API, un utilisateur avec un client modifié pourrait voir les noms de tous les utilisateurs contactant modmail à travers les noms de canaux modmail.*
