# 🙋 Questions Fréquemment Posées

## Quels sont ces numéros devant les réponses du personnel dans les fils de discussion modmail ?
Chaque réponse du personnel reçoit un numéro interne. Ce numéro peut être utilisé avec les commandes `!edit`, `!delete`, `!message` et potentiellement d'autres commandes à l'avenir.

## Dans une [configuration à serveur unique](setup.md#single-server-setup), comment puis-je cacher les modmails aux utilisateurs réguliers ?
1. Créez une catégorie privée pour les fils de discussion modmail, visible uniquement par votre personnel de serveur et le bot, et définissez l'option `categoryAutomation.newThread = 1234` (remplacez `1234` par l'ID de la catégorie).
2. Définissez l'option `inboxServerPermission` pour limiter qui peut utiliser les commandes du bot.  
   [Cliquez ici pour plus d'informations.](configuration.md#inboxserverpermission)

## Mes logs ne se chargent pas !
Comme les logs sont stockés et envoyés directement depuis la machine exécutant le bot, assurez-vous que cette machine n'a pas de pare-feu bloquant le bot et qu'elle dispose des redirections de port appropriées.  
[Vous pouvez trouver plus d'informations et des instructions pour le redirectionnement de port ici.](https://portforward.com/)  
Par défaut, le bot utilise le port **8890**.

## Je veux catégoriser mes fils de discussion modmail dans plusieurs catégories
Définissez `allowMove = on` pour permettre à votre personnel de déplacer les fils dans d'autres catégories avec `!move`.
