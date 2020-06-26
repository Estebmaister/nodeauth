# Node authentication, PassportJS

========================================

![GitHub package.json version][gh-pack-json-v] ![Package.json express version][gh-pack-json-dep-v-express] ![Package.json mongodb version][gh-pack-json-dep-v-mongodb] ![Package.json passport version][gh-pack-json-dep-v-passport] ![GitHub code size in bytes][code-size-bdg] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]

[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]

- Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about basic authentication with passport in node.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

## Clone this repo

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/nodeauth.git
```

If you want to run the FCC challenges, you'll have to add the files from the original repo by FCC.

## Scripts

To install all the dependencies:

```npm
npm install
```

To run the server static

```node
npm start
```

To run the server with dynamic refresh

```node
nodemon server.js
```

## Introduction to Advanced Node and Express Challenges from FCC

The path of exploring [ExpressJS](http://expressjs.com/) functionality including working with middleware packages in our Express Application.

Authentication is the process or action of verifying the identity of a user or process. Up to this point you have not been able to create an app utilizing this key concept.

The most common and easiest way to use authentication middleware for Node.js is [PassportJS](https://passportjs.org/). It is easy to learn, light-weight, and extremely flexible allowing for many strategies, which we will talk about in later challenges. We will also explore template engines, specifically [PugJS](https://pugjs.org/api/getting-started.html), and web sockets, [Socket.io](https://socket.io/). Web sockets allow for real time communication between all your clients and your server. Working on these challenges will involve writing your code on Glitch using our starter project. After completing each challenge you can copy your public glitch url (the homepage of your Glitch app) into the challenge screen to test it! Optionally, you may choose to write your project on another platform but it must be publicly visible for our testing.

# License

[MIT](https://choosealicense.com/licenses/mit/)

<!-- General links -->

[version-bdg]: https://img.shields.io/badge/version-1.0.1-blue.svg?style=plastic
[license]: ./LICENSE
[twitter]: https://twitter.com/estebmaister
[twitter-bdg]: https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social
[prs-bdg]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[prs-site]: (https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<!-- Repo badges links -->

[license-bdg]: https://img.shields.io/github/license/estebmaister/nodeauth?style=plastic
[last-commit-bdg]: https://img.shields.io/github/last-commit/estebmaister/nodeauth?style=plastic&logo=git&logoColor=white
[code-size-bdg]: https://img.shields.io/github/languages/code-size/estebmaister/nodeauth?style=plastic
[gh-pack-json-v]: https://img.shields.io/github/package-json/v/estebmaister/nodeauth?color=blue&style=plastic&logo=github
[gh-pack-json-dep-v-express]: https://img.shields.io/github/package-json/dependency-version/estebmaister/nodeauth/express?style=plastic&logo=express
[gh-pack-json-dep-v-mongodb]: https://img.shields.io/github/package-json/dependency-version/estebmaister/nodeauth/mongodb?style=plastic&logo=mongodb&logoColor=white
[gh-pack-json-dep-v-passport]: https://img.shields.io/github/package-json/dependency-version/estebmaister/nodeauth/passport?style=plastic&logo=passport

<!-- Glitch web and workflow -->

[website]: https://nodeauth-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fnodeauth-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/nodeauth/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/nodeauth/blob/master/.github/workflows/main.yml
