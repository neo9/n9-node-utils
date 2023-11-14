

# [3.0.0](https://github.com/neo9/n9-node-utils/compare/3.0.0-rc.0...3.0.0) (2023-11-14)


### github

* Add conditional lcov file generation ([e57576d](https://github.com/neo9/n9-node-utils/commit/e57576d8d16480f2f0d71abf5f45e70c641fb40c))

### yarn

* Fix husky dependency declaration ([7bf3cd9](https://github.com/neo9/n9-node-utils/commit/7bf3cd9615635bd3676a94432e8476553e342a21))
* Upgrade dependencies and drop node 16 support in tests ([9b5f01c](https://github.com/neo9/n9-node-utils/commit/9b5f01c45a30f6ef736897144ea9b517eb5c6428))

# [3.0.0-rc.0](https://github.com/neo9/n9-node-utils/compare/2.2.1...3.0.0-rc.0) (2023-10-13)


### node

* Drop support of node below 16 and support for node 20 #30 ([0e6f807](https://github.com/neo9/n9-node-utils/commit/0e6f807165beca85a932b2001189204f7b49d23f)), closes [#30](https://github.com/neo9/n9-node-utils/issues/30)

### yarn

* Upgrade codecov sending ([000261f](https://github.com/neo9/n9-node-utils/commit/000261fe9409c0dcc6a9438b46a3dd84657497c3))
* Upgrade dependencies #31 ([02a66d1](https://github.com/neo9/n9-node-utils/commit/02a66d16377a69d11e983ab8bb81316de1bb9d48)), closes [#31](https://github.com/neo9/n9-node-utils/issues/31)

## [2.2.1](https://github.com/neo9/n9-node-utils/compare/2.2.0...2.2.1) (2022-07-26)


### types

* Fix type metadata usage on n9-json-stream ([3fdb85a](https://github.com/neo9/n9-node-utils/commit/3fdb85a1673d2049f419fb77a45859709edeb5ab))

# [2.2.0](https://github.com/neo9/n9-node-utils/compare/2.1.0...2.2.0) (2022-07-26)


### build

* Use github-actions for build instead of travis ([b7800bf](https://github.com/neo9/n9-node-utils/commit/b7800bfbf3099d0f97f730e64f71abad646073a2))

### types

* Add type on n9-json-stream metadata ([21e000c](https://github.com/neo9/n9-node-utils/commit/21e000c89db1a62b23a08d0ea22ccdcc1dbd145a))

# [2.1.0](https://github.com/neo9/n9-node-utils/compare/2.0.2...2.1.0) (2021-05-18)


### node

* Drop support of node 10 and add node 16 ([a31ef82](https://github.com/neo9/n9-node-utils/commit/a31ef82638000c88433690eadbffe93789087b45))

### yarn

* Update all dev dependencies ([c3df3f9](https://github.com/neo9/n9-node-utils/commit/c3df3f9320d587844495211c9acb6dcef8833cc1))

## [2.0.2](https://github.com/neo9/n9-node-utils/compare/2.0.1...2.0.2) (2020-10-12)


### n9errors

* Remove readonly on context ([a5dc9ac](https://github.com/neo9/n9-node-utils/commit/a5dc9ac43f2014612be6e7167dc7c9ff51327efa))

## [2.0.1](https://github.com/neo9/n9-node-utils/compare/2.0.0...2.0.1) (2020-10-09)


### types

* Fix types ([0b16f2d](https://github.com/neo9/n9-node-utils/commit/0b16f2d95f50e1968708ced08d7206173f609821))

# [2.0.0](https://github.com/neo9/n9-node-utils/compare/2.0.0-beta.0...2.0.0) (2020-10-09)

# [2.0.0-beta.0](https://github.com/neo9/n9-node-utils/compare/v1.10.0...2.0.0-beta.0) (2020-10-09)


### errors

* Add date and hostname to n9-errors ([1c501a1](https://github.com/neo9/n9-node-utils/commit/1c501a164d4b661dff06c44b0452d25273a72711))

### yarn

* Switch from npm to yarn ([72ce9f2](https://github.com/neo9/n9-node-utils/commit/72ce9f29d3f699da826a60547836a78ac6c5a5f3))



# [1.10.0](https://github.com/neo9/n9-node-utils/compare/v1.10.0...2.0.0-beta.0) (2019-11-14)


### errors

* Keep stack in error when stringify to JSON ([ea5b2a8](https://github.com/neo9/n9-node-utils/commit/ea5b2a8261acbd238f2b06e669347e66db4ba34e))



# [1.9.0](https://github.com/neo9/n9-node-utils/compare/v1.10.0...2.0.0-beta.0) (2019-10-10)


### error

* Handle error message from contexte when stringified ([9a6306a](https://github.com/neo9/n9-node-utils/commit/9a6306a86083996381b5adf4b75f0a4b2dbe911d))

### errors

* Fix errors toJSON function ([7546573](https://github.com/neo9/n9-node-utils/commit/7546573fd0604538b0e057c3b45992c87cfa2c55))
* Keep stack in error context ([698df48](https://github.com/neo9/n9-node-utils/commit/698df486da9c59bef1664b50fc11adcea4107885))

### json

* Fix N9Erro to JSON ([89e1f1b](https://github.com/neo9/n9-node-utils/commit/89e1f1b79f4575fd4188cf617d51ff41786d3f34))

### release

* Release 1.8.0 ([d04a963](https://github.com/neo9/n9-node-utils/commit/d04a96355aaa61551a90fae52a1ff283ec66a93d))
* Release v 1.8.1 ([22766ca](https://github.com/neo9/n9-node-utils/commit/22766ca582b62aa491c8ff3a2ae8cfe57a32a691))



## [1.7.2](https://github.com/neo9/n9-node-utils/compare/v1.10.0...2.0.0-beta.0) (2018-07-13)


### base

* Add N9Error ([4d4f798](https://github.com/neo9/n9-node-utils/commit/4d4f79854c70c5ba4a73d0e250d76fdeb7b3cc81))

### docs

* Update syntax highlight ([002549f](https://github.com/neo9/n9-node-utils/commit/002549f7bf4933cf265ecf2af40dc17339cef557))

### feat

* Add asyncObject ([fd19b7f](https://github.com/neo9/n9-node-utils/commit/fd19b7f365e19ac37b0b5d17cc718c2314c19136))
* Add cb & rename test files ([b2eeca9](https://github.com/neo9/n9-node-utils/commit/b2eeca90e25fd676407f05c54adcbb4bd7b4056d))
* Add ok(promise) ([ceffd7f](https://github.com/neo9/n9-node-utils/commit/ceffd7f95266fd6ba194dc16bdbbd48eacf293a4))
* Add waitFor & waitForEvent ([2e3519b](https://github.com/neo9/n9-node-utils/commit/2e3519b7eea93a2f44dfec1c7ceccda3571cbfc2))

### pacakge

* Upgrade n9-sonar-generate ([8bb789e](https://github.com/neo9/n9-node-utils/commit/8bb789eb67e68b5221944352ce92f7d41f2b4845))

### package

* Add n9-node-sonar-generate ([0bd3605](https://github.com/neo9/n9-node-utils/commit/0bd3605c12b70324a2b3e9b8b338aaebb7bf243c))
* Add sonar TS options ([94bd482](https://github.com/neo9/n9-node-utils/commit/94bd482531882b8bfb0edd969566e97af2e53e6e))

### readme

* fix typo ([9dc04a0](https://github.com/neo9/n9-node-utils/commit/9dc04a0ac73dfd42354f391bd0ce670383c4a8d2))

### sonar

* add sonar project to gitignore ([77ef794](https://github.com/neo9/n9-node-utils/commit/77ef7949295e29144cda4ef9da09219a8441bb58))
* delete project properties ([312307f](https://github.com/neo9/n9-node-utils/commit/312307f65f973435c6ddba6b067aa709e085c548))

### stream

* Add N9JSONStream ([8f0fa02](https://github.com/neo9/n9-node-utils/commit/8f0fa023d445044e270337b65de9a3ba53f550a9))

### tag

* 1.0.0 release ([99e9bd5](https://github.com/neo9/n9-node-utils/commit/99e9bd59b0a718c1ae9fb47499ec4a9cda8cc2b2))
* 1.0.1 release ([6a9cf2b](https://github.com/neo9/n9-node-utils/commit/6a9cf2baff58e251e3d94b35e0329282f70ef4f3))
* 1.1.0 release ([8779b40](https://github.com/neo9/n9-node-utils/commit/8779b4023a26fd88b390d50ad545be6e10e1f4cb))
* 1.2.0 release ([d252952](https://github.com/neo9/n9-node-utils/commit/d252952a5cc0312a121d2904b0cd8391a284fda6))
* 1.3.0 release ([5e4d2e1](https://github.com/neo9/n9-node-utils/commit/5e4d2e1ea8f9e265d7398cc526808b9a5f546a06))
* 1.4.0 release ([b45ef12](https://github.com/neo9/n9-node-utils/commit/b45ef1293d431fc58fd7afa7d0b89d6e0fba0554))
* 1.4.1 release ([88a6e03](https://github.com/neo9/n9-node-utils/commit/88a6e03ea870534d4c26d92849f5f365af7f2040))
* 1.4.2 release ([8a9fb4f](https://github.com/neo9/n9-node-utils/commit/8a9fb4f78adec77b56babf405f7e8baddbb94c5c))
* 1.4.3 release ([5f60494](https://github.com/neo9/n9-node-utils/commit/5f60494a810238aa055810edc2909409e7ad9ffc))

### test

* Add test on asyncObject with no parameter ([48240e9](https://github.com/neo9/n9-node-utils/commit/48240e9f27c8377e90eeb2876ba55b03d1dc6cdc))

### ts

* Add returned types ([5bf084c](https://github.com/neo9/n9-node-utils/commit/5bf084c8bd37998ae384ace1774183fb650d2be3))

### versions

* Update to v 1.6.0 ([a275ff2](https://github.com/neo9/n9-node-utils/commit/a275ff2391e93d1308432b36266e7f2297accdbc))
* Update to v 1.7.0 ([45c61d8](https://github.com/neo9/n9-node-utils/commit/45c61d8446167b66496ba58db044cc935e95c42f))
* Update to v 1.7.1 ([2cbc628](https://github.com/neo9/n9-node-utils/commit/2cbc628318d92754e259a152c50656e2f59160fd))
