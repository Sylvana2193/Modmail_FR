# 🤖 Commandes

## Table des matières
* [Dans un fil Modmail](#dans-un-fil-modmail)
* [Partout sur le serveur de la boîte de réception](#partout-sur-le-serveur-de-la-boîte-de-réception)
* [Extraits (messages préenregistrés)](#extraits-messages-préenregistrés)

## Dans un fil Modmail
Ces commandes ne peuvent être utilisées que dans le canal d'un fil Modmail sur le serveur de la boîte de réception.

### `!reply <texte>` / `!r <texte>`
Envoyer une réponse à l'utilisateur.

**Exemple :** `!r Comment puis-je vous aider ?`

Pour répondre automatiquement sans utiliser `!reply`, [activez `alwaysReply` dans les paramètres du bot](configuration.md).

### `!anonreply <texte>` / `!ar <texte>`
Envoyer une réponse anonyme à l'utilisateur. Les réponses anonymes affichent uniquement le rôle du modérateur dans la réponse.

**Exemple :** `!ar Veuillez n'utiliser Modmail que pour des messages sérieux`

Pour répondre automatiquement sans utiliser `!reply`, [activez `alwaysReply` dans les paramètres du bot](configuration.md).

### `!realreply <texte>` / `!rr <texte>`
Envoyer une réponse à l'utilisateur. Cela inclura toujours le nom du modérateur, même si l'option `forceAnon` est activée.

### `!close`
Fermer le fil Modmail.

### `!close <temps>`
Fermer le fil Modmail après un minuteur. L'envoi d'un message à l'utilisateur ou la réception d'un message de l'utilisateur annulera la fermeture programmée.

**Exemple :** `!close 15m`

### `!close -s` / `!close -s <temps>`
Fermer le fil Modmail sans notifier l'utilisateur qu'il a été fermé.

### `!close cancel`
Annuler une fermeture programmée.

### `!logs`
Lister les journaux Modmail précédents avec l'utilisateur.

### `!block`
Bloquer l'utilisateur d'utiliser Modmail.

### `!block <temps>`
Bloquer l'utilisateur d'utiliser Modmail pour une période spécifiée.

**Exemple :** `!block 7d`

### `!unblock`
Débloquer l'utilisateur, lui permettant d'utiliser à nouveau Modmail.

### `!move <catégorie>`
Déplacer le fil Modmail vers une autre catégorie. Nécessite que `allowMove` soit activé dans les paramètres du bot.

### `!suspend`
Suspendre le fil. Le fil agira comme fermé et ne recevra aucun message jusqu'à ce qu'il soit suspendu via `!unsuspend`.

### `!unsuspend`
Reprendre le fil. Voir `!suspend` ci-dessus.

### `!alert`
Vous alerte lorsque le fil reçoit une nouvelle réponse.

### `!alert cancel`
Annuler l'alerte définie par `!alert`.

### `!edit <numéro> <nouveau texte>`
Modifier votre propre réponse précédente envoyée avec `!reply`.  
`<numéro>` est le numéro du message affiché devant les réponses du personnel dans le canal du fil.

### `!delete <numéro>`
Supprimer votre propre réponse précédente envoyée avec `!reply`.  
`<numéro>` est le numéro du message affiché devant les réponses du personnel dans le canal du fil.

### `!role`
Voir votre rôle d'affichage pour le fil - le rôle qui est affiché devant votre nom dans vos réponses.

### `!role reset`
Réinitialiser votre rôle d'affichage pour le fil à la valeur par défaut.

### `!role <nom du rôle>`
Changer votre rôle d'affichage pour le fil vers tout rôle que vous avez actuellement.

### `!loglink`
Obtenir un lien vers le journal du fil Modmail ouvert.

### `!loglink -s`
Obtenir un lien vers le journal du fil Modmail ouvert, n'affichant que les messages à/de l'utilisateur (ignore les discussions des modérateurs dans le fil).

### `!loglink -v`
Obtenir un lien vers le journal du fil Modmail ouvert, affichant des détails supplémentaires sur les ID de canal et de message entre le bot et l'utilisateur. Cela est principalement utile lors du signalement de messages à l'équipe de confiance et sécurité de Discord.

### `!id`
Affiche l'ID de l'utilisateur.

### `!note <texte>`
Ajouter une note pour l'utilisateur.

### `!notes <userID>`
Afficher toutes les notes pour l'utilisateur.

### `!delete_note <noteID>`
Supprimer la note spécifiée. L'ID de la note est affiché lors de l'exécution de `!notes`.

### `!dm_channel_id`
Affiche l'ID du canal DM actuel avec l'utilisateur.

### `!message <numéro>`
Affiche l'ID du canal DM, l'ID du message DM et le lien du message de la réponse spécifiée de l'utilisateur. `<numéro>` est le numéro du message affiché devant les réponses du personnel dans le canal du fil.

## Partout sur le serveur de la boîte de réception
Ces commandes peuvent être utilisées partout sur le serveur de la boîte de réception, même en dehors des fils Modmail.

### `!newthread <userID>`
Ouvrir un fil Modmail avec un utilisateur.

**Exemple :** `!newthread 106391128718245888`

### `!logs <userID>`
Lister les journaux Modmail précédents avec l'utilisateur spécifié.

**Exemple :** `!logs 106391128718245888`

### `!block <userID>`
Bloquer l'utilisateur spécifié de Modmail.

**Exemple :** `!block 106391128718245888`

### `!block <userID> <temps>`
Bloquer l'utilisateur spécifié de Modmail pour une période spécifiée.

**Exemple :** `!block 106391128718245888 7d`

### `!unblock <userID>`
Débloquer l'utilisateur spécifié, lui permettant d'utiliser à nouveau Modmail.

**Exemple :** `!unblock 106391128718245888`

### `!is_blocked <userID>`
Vérifier si l'utilisateur spécifié est bloqué.

**Exemple :** `!is_blocked 106391128718245888`

### `!role`
(Hors d'un fil modmail) Voir votre rôle d'affichage par défaut - le rôle qui est affiché devant votre nom dans vos réponses.

### `!role reset`
(Hors d'un fil modmail) Réinitialiser votre rôle d'affichage par défaut.

### `!role <nom du rôle>`
(Hors d'un fil modmail) Changer votre rôle d'affichage par défaut vers tout rôle que vous avez actuellement.

### `!note <userID> <texte>`
Ajouter une note pour l'utilisateur spécifié.

### `!notes <userID>`
Afficher toutes les notes pour l'utilisateur spécifié.

### `!delete_note <noteID>`
Supprimer la note spécifiée. L'ID de la note est affiché lors de l'exécution de `!notes`.

### `!version`
Afficher la version du bot Modmail.

## Extraits (messages préenregistrés)
Voir la page [📋 Extraits](snippets.md) pour plus d'informations !
