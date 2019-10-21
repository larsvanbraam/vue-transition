[![Travis](https://img.shields.io/travis/larsvanbraam/vue-transition-component.svg?maxAge=2592000)](https://travis-ci.org/larsvanbraam/vue-transition-component)
[![npm](https://img.shields.io/npm/dm/vue-transition-component.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-transition-component)
[![GitHub issues](https://img.shields.io/github/issues/larsvanbraam/vue-transition-component.svg?style=flat-square)](https://github.com/larsvanbraam/vue-transition-component/issues)

<p align="center">
    <img src="http://vue-transition-component.larsvanbraam.nl/vue-transition-component-1024.png?v=2" alt="vue-transition-component" width="512"/>
</p>

Provides GreenSock transition functionality to vue.js components.

## Installation

```sh
yarn add vue-transition-component
```

```sh
npm i -S vue-transition-component
```

## Documentation

- [📗 General documentation](https://vue-transition-component.larsvanbraam.nl/mkdocs/)
- [📘 TypeDoc documentation](https://vue-transition-component.larsvanbraam.nl/typedoc/)
- [📚 All documentation](https://vue-transition-component.larsvanbraam.nl)


## Example
I've included an example setup where you can see the transition controller in action, to run the project follow these steps:

- `git clone https://github.com/larsvanbraam/vue-transition-component.git`
- `cd vue-transition-component/example`
- `yarn`
- `yarn dev`
- Open your browser `localhost:8080`

or click [this link](https://larsvanbraam.github.io/vue-transition-component/example/) to preview online

## Building

In order to build vue-transition-component, ensure that you have [Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/larsvanbraam/vue-transition-component.git
```

Change to the vue-transition directory:
```sh
cd vue-transition-component
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build            # build this project
yarn dev              # run compilers in watch mode, both for babel and typescript
yarn test             # run the unit tests incl coverage
yarn test:dev         # run the unit tests in watch mode
yarn lint             # run eslint and tslint on this project
yarn doc              # generate typedoc documentation
```

When installing this module, it adds a pre-commit hook, that runs lint and prettier commands
before committing, so you can be sure that everything checks out.

## Authors
View [AUTHORS.md](./AUTHORS.md)

## Contribute
View [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
[MIT](./LICENSE) © Lars van Braam
