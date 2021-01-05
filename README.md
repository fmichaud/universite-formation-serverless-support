# Serverless

-----

# Au programme...

* Présentation des notions : cloud computing, serverless, FaaS, 
* Mise en oeuvre d'un microservice "déclenchable" par HTTP.
* AWS Lambda (le premier clouder a avoir proposé une offre serverless).
* Présentation du framwork serverless

-----

# Prérequis

* Installeur [NVM](https://github.com/nvm-sh/nvm)
* [Node v12.x](https://www.nodejs.org)
* [Docker](https://www.docker.com/)  
* Cloner le dépôt `git` contenant support, exemples et exercices : 

```bash
git clone https://github.com/fmichaud/universite-formation-serverless-support
```

-----

# L'informatique serverless

* Exécuter du code...
* ... sans se préoccuper de l'infrastructure sous-jacente !

Notion liée au concept de *cloud computing*.

* S'affranchir :
	* monter des serveurs,
	* gérer les configurations réseaux & systèmes,
	* s'occuper de la capacité de charge,
	* 
* Permet de :
	* déléguer au fournisseur d'hébergement/d'infogétance (aka. hosting) la gestion (pénible) de l'infrastructure,
	* de simplifier le process d'intégration et de déploiement (CI/CD)

-----

# FaaS : la fonction en tant que service

Un acronyme marketing recouvrant des logiques technologiques.

* 	**IaaS** : Infrastructure as a Service
	* 	Location à la demande de ressources (machines virtuelles, réseau, espace disque de stockage, etc.)
* 	**PaaS** : Platform as a Service.
	* 	Location d'une stack logicielle.
	* 	Par exemple, déploiement d'application PHP dans [Heroku](https://www.heroku.com/)
* 	**SaaS** : Software as a Service :
	* 	Location d'un logiciel. 
	* 	Par exemple, [Microsoft Office365](https://www.office.com). 
* 	**FaaS** : Function as a Service
	* 	Location de ressources abstraites pour le déploiement de microservices.
	* 	Par exemple, 


**Serverless != FaaS** : 

* toute application serverless n'est pas FaaS (exemple: AWS ECS)
* tout FaaS est serverless.

-----

# Les opérateurs de solutions serverless

Pas de standard serverless.

Les *clouders* proposent chacun leur solution (fonctionnalités similaires mais implémentations différentes) :

* [AWS Lambda](https://aws.amazon.com/fr/lambda/)
* [Azure Functions](https://docs.microsoft.com/fr-fr/azure/azure-functions/)
* [Google Cloud Functions](https://cloud.google.com/functions/)
* ...

-----

# Quelques exemples d'applications

* Fournir des services REST à différents clients : applications mobiles, web, objets connectés.
* Gérer des séquences d'exécution :
	* récupérer la dernière image d'une webcam ;
	* traiter l'image, la recadrer, etc.
	* publier l'image ;
* Utiliser des évènements via d'autres protocoles que HTTP ([message broker](https://fr.wikipedia.org/wiki/Agent_de_messages))
* ...

-----

# Les frameworks

## Déployer une plateforme de FaaS

* Des frameworks sont apparus pour compenser l'absence de normalisation :
	* [OpenFaaS](https://www.openfaas.com/)
	* [FnProject](https://fnproject.io/)
	* [OpenWiskh](https://openwhisk.apache.org/) - _fondation Apache_
	* [Kubeless](https://kubeless.io/)
	* [Fission](https://fission.io/)
* Se déploient généralement sur des clusters, de type Kubernetes.
* [Comparatif des solutions](https://winderresearch.com/a-comparison-of-serverless-frameworks-for-kubernetes-openfaas-openwhisk-fission-kubeless-and-more/) 

## Abstraction du fournisseur

* [Serverless](https://serverless.io) (**attention** ! risque de confusion avec le concept générique d'informatique serverless)

-----

# Qu'est-ce qu'un service ?

* Un service backend (ou dorsal) = traite les opérations à destination d'un frontal.
	* Exemple : un service listant les e-mails reçus.  
* Le frontal se charge de l'interaction avec l'utilisateur.
	* Exemple : une application mobile pour consulter ses e-mails.
* Comme une fonction, on invoque une action (appelée trigger) développé pour répondre à un besoin :
	* d'une entrée ("requête" en HTTP), avec ou sans paramètres
	* généralement, d'une sortie ("réponse" en HTTP)

-----

## Et les microservices, c'est quoi ?

Des services spécialisés ayant pour objectifs :

* d'isoler les fonctionnalités : 
	* un microservice = une tâche métier
* de tester, développer et corriger plus rapidement (couplage faible des services).
* Possible de faire cohabiter différentes technologies en utilisant le langage de programmation le plus adapté au service. Par exemple :
	* un service d'authentification en Java,
	* un service de calcul en R.

-----
# Le transport

Pour être accessible, les services doivent être utiliser un "moyen de transport".

* Services REST (REpresentational State Transfert), accessibles en HTTP :
	* ne constituent qu'un seul type de transport de services.
	* on parle de passerelle d'API (API gateway).
* L'invocation d'un trigger serverless peut être effectué par d'autres mécanismes (généralement très lié au fournisseur de cloud) :
	* messaging (bus de messages, ...), 
	* lecture de données,
	* lecture de flux (streams),
	* gestion de fichiers,
	* batch déclenché par tâche planifiée,
	* ...

-----
# FaaS : les avantages 

* Les _clouders_ proposent une large variété de langages de programmation.
* Le développeur peut se concentrer sur le code en raison...
* ... du déploiement simplifié.
* Orchestration des services
* Tolérance de panne (fault tolerance)
* Mise à l'échelle (scalabilité) autonome 
* Optimiser la gestion des coûts (pay as you go).

Les solutions FaaS reposent principalement, à date, sur des architectures :

* de conteneurs (comme Docker)... 
* (...) généralement pilotés par un orchestrateur de conteneurs (comme Kubernetes) pour gérer la mise à l'échelle (via des clusters "invisibles").


Le FaaS peut s'inscrire dans une démarche *devops* en limitant la partie *ops* aux seuls déploiements applicatifs.

-----
# FaaS : les évènements

* Un évènement (event) est adressé lors de l'invocation de la fonction, incluant les paramètres d'appel.


-----
# S'exercer avec [Lambda-Local](https://github.com/ashiina/lambda-local)

```bash
# Installons lambda-local
npm install -g lambda-local

# Création du projet 
export APP_HOME="/home/workspace/app" # Chemin à adapter
mkdir -p ${APP_HOME} \
  && cd ${APP_HOME} \
  && npm init # Répondre aux questions...
```

-----
# Notre première fonction en tant que service

### Une fonction comme les autres !

```javascript
exports.handler = async function (event, context, callback) {
	LOG.info('Function: returns todo list.')
	try {
		let res = await axios.get('https://jsonplaceholder.typicode.com/todos/')
		callback(null, res.data)
	} catch (err) {
		callback(err)
	}
}
```

### Invocation

Le client [Lambda-Local](https://github.com/ashiina/lambda-local) permet d'invoquer une fonction :
  * afin de la tester localement...
  * avant de déployer celle-ci dans le _cloud_ 

**Attention !** 

* La fonction est opérationnelle, mais toujours inaccessible en HTTP. 
* Pour ce faire, il convient de mettre en place une API Gateway !


#### Exercice

Développer trois fonctions :

1. Filtrer les tâches par identifiant d'utilisateur.
	* l'identifiant de l'utilisateur recherché doit être passé en paramètre de l'appel.
2. Filtrer les tâches par un mot de leur titre.
3. Stocker en base de données 

### Fonction transportée en HTTP AWS Lambda

```javascript
exports.handler =  async (event, context) => {
  const requestBody = JSON.parse(event.body) // le corps de la requête
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hi ${requestBody.name}!`
      },
      null,
      2
    )
  }
  return context
}
```

**Invocation** : par une simple requête HTTP.

-----
# Utiliser [docker-lambda]()

-----

# Avec le framework d'abstraction [Serverless](https://www.serverless.com)

`#todo`

-----

# Risques

`#todo`

* Tests d'intégration des microservices (faire du TDD)
* Performances de chaque service (on peut croire sans impact, mais ne pas oublier les coûts)

-----

# Merci !




