#### 4.6.3 (2022-07-15)

##### Chores

*  updated jd-date-utils ([4b9e3f52](https://github.com/firstlovecenter/fl-pastoral-care/commit/4b9e3f52bcd820343fa27985db4e25798c9f19c9))
*  named anonymous graphql queries according to conventions ([9060d629](https://github.com/firstlovecenter/fl-pastoral-care/commit/9060d6296f962bf02f1e160e6e761e943a4d15c1))
*  audited package.json files ([9ed37816](https://github.com/firstlovecenter/fl-pastoral-care/commit/9ed37816ff4b035c72cfa26643135e3c01c358fe))

##### Bug Fixes

*  fixed issue where leaders were unable to bank their offerings if they had old services unbanked ([0ebedb49](https://github.com/firstlovecenter/fl-pastoral-care/commit/0ebedb496cdc9ff326f411276660d2413c8db1f9))

##### Performance Improvements

*  edited gitignore to track apollo.config.js file ([350088d7](https://github.com/firstlovecenter/fl-pastoral-care/commit/350088d7ca89544f15b6bdb9fc3215103b8e37be))

#### 4.6.1 (2022-07-15)

##### Chores

*  uninstalled gql parser in favour of a global install ([1e97fbdb](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e97fbdb52df96012bae9d7d09d22dc3bcf5720b))
*  fixed merge conflicts bringing deploy into arrivals ([bbce0745](https://github.com/firstlovecenter/fl-pastoral-care/commit/bbce0745bb8cb188d911c51bbea4608df6324b73))

##### New Features

* **arrivals:**
  *  implemented feature to prevent users from giving themselves arrivals roles ([b788f264](https://github.com/firstlovecenter/fl-pastoral-care/commit/b788f264c6c340cfe8d8e5689e4a0768b67f7b9f))
  *  admin-205 made isArrivalsToday function ready for prod ([c929d268](https://github.com/firstlovecenter/fl-pastoral-care/commit/c929d268eb4619454111dda2d6f47c44904f1599))
  *  admin-205 implemented 'Bacentas Below 8' button on all church pages ([ac72d0ea](https://github.com/firstlovecenter/fl-pastoral-care/commit/ac72d0eaf79a9bbce9272d124cc0768d03bf0b10))
  *  admin-205 implemented SMS notifications for those who have confirmed attendance ([7ec54b62](https://github.com/firstlovecenter/fl-pastoral-care/commit/7ec54b627fe3563b526370722a5d17dfcd1b9aca))
  *  admin-205 added a 5 minute buffer for arrivals confirmers ([deac14ab](https://github.com/firstlovecenter/fl-pastoral-care/commit/deac14ab52538b4a6a2625f440e652d95204541c))
  *  admin-211 changed attendance to bus payment attendance ([16561236](https://github.com/firstlovecenter/fl-pastoral-care/commit/165612365f8224582206f9a2a5fe871b0bd41af0))
  *  implemented feature to check whether today is a day of bussing per stream ([3e3d9538](https://github.com/firstlovecenter/fl-pastoral-care/commit/3e3d9538e1d7aafde5ebd73a72ad8dadec55f9a0))

##### Bug Fixes

*  fixed issue where newDuplicateServiceLog was not being created in createHistorySubstructure ([031fc8b6](https://github.com/firstlovecenter/fl-pastoral-care/commit/031fc8b6c43efa49d20aef6258d0fa59d618a406))
*  implemented mnotify fix of changing the word code to OTP ([39b153c4](https://github.com/firstlovecenter/fl-pastoral-care/commit/39b153c407ed3ed3989d76de3ba3b3fe1193eedd))
*  added date function in front of dates to prevent wrong date in lastButOneServiceRecord cypher ([#208](https://github.com/firstlovecenter/fl-pastoral-care/pull/208)) ([a7a8a27b](https://github.com/firstlovecenter/fl-pastoral-care/commit/a7a8a27baaaf427b82ad5cd5a93c3def0ab1ec8b))
*  admin-213 implemented alert to show when the arrivals window is open ([a044d6f4](https://github.com/firstlovecenter/fl-pastoral-care/commit/a044d6f4c7c8fe39cbf2e99ee66c5c34cda8fbd8))
* **banking:**  admin-219 corrected cypher query for getting the last service record ([3251d228](https://github.com/firstlovecenter/fl-pastoral-care/commit/3251d228e9bd5a3a2606bc7bc17c024e2a8eb277))

##### Performance Improvements

*  updated date-utils package ([7285e511](https://github.com/firstlovecenter/fl-pastoral-care/commit/7285e511894333cd5fc8a5ef4c0fe14f607d01c2))
*  included config for using official apollo vscode extension ([8f3c8e39](https://github.com/firstlovecenter/fl-pastoral-care/commit/8f3c8e3913e7993586c792029879c4e9a3f222ed))
*  added a package to check graphql queries ([b5389e68](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5389e680830d79cb461824c25eea7cea2d9e25d))
*  admin-214 implemented constraints on database ([5f420843](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f420843b2eb5bedbe99d51b80e54c541d28ee28))

##### Refactors

* **banking:**
  *  replaced double quotes with single quotes ([9979f456](https://github.com/firstlovecenter/fl-pastoral-care/commit/9979f45679336c13d214cf7b01b0f2371b8d2154))
  *  made the typing stricter on the lastServiceBanked function ([3c3a483b](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c3a483bdb6734d923a86f3370574cc46af9734c))
  *  rewrote the lastButOneServiceRecord for easier legibility ([a6e6418a](https://github.com/firstlovecenter/fl-pastoral-care/commit/a6e6418a4be0172d45eb36310809aae27c4ce458))
* **arrivals:**  converted all arrivals js files to ts ([2b268539](https://github.com/firstlovecenter/fl-pastoral-care/commit/2b268539c5b231c1329b927f2abb983009a80628))

### 4.6.0 (2022-07-13)

##### Chores

*  version bump 4.5.1 ([9bf52b12](https://github.com/firstlovecenter/fl-pastoral-care/commit/9bf52b12a80aff5d60a7449a6daf45d4d0365b77))

##### New Features

* **anagkazo-banking:**  admin-159 implmented flow for adding and removing treasurers ([13b70d81](https://github.com/firstlovecenter/fl-pastoral-care/commit/13b70d81a8081b40948839d08c71e60c4ddf0142))
*  implement confirm anagkazo banking ([#200](https://github.com/firstlovecenter/fl-pastoral-care/pull/200)) ([faa57942](https://github.com/firstlovecenter/fl-pastoral-care/commit/faa579424d2ef83cab6919c7580bcae852dc0ad2))

##### Bug Fixes

*  console.log resolvers in netlify functions ([82a3f69f](https://github.com/firstlovecenter/fl-pastoral-care/commit/82a3f69f8262a578da7466867f6e5608aea11772))
*  trying to get resolvers to work in prod ([66fd460b](https://github.com/firstlovecenter/fl-pastoral-care/commit/66fd460b95d4e6fb366785213a89ed0eaf01a8f5))
*  fixed minor bugs that occurred after the refactor ([d2a063a8](https://github.com/firstlovecenter/fl-pastoral-care/commit/d2a063a832be43f62e407542dd35bb1a013666ed))

##### Refactors

*  typed front end files ([ce03ebae](https://github.com/firstlovecenter/fl-pastoral-care/commit/ce03ebae9cd681cda1665a7de3bc129b25f978fd))
*   converted frontend components to typescript ([3eec1381](https://github.com/firstlovecenter/fl-pastoral-care/commit/3eec13816905969fafb81c0e9ffde8757098dfd4))
*  typed front end files ([7296d5d2](https://github.com/firstlovecenter/fl-pastoral-care/commit/7296d5d2b654259bf16c149e44ede49f5f54b131))
*  corrected types after merge operation ([30e1bff8](https://github.com/firstlovecenter/fl-pastoral-care/commit/30e1bff8113af502b07caca676fb4f07551e1dc2))
*  converted backend resolvers to typescript ([93907cde](https://github.com/firstlovecenter/fl-pastoral-care/commit/93907cde51262812fd90b73ee486e434b447bd8f))
*  typed global-utils in frontend ([aa613b11](https://github.com/firstlovecenter/fl-pastoral-care/commit/aa613b119c0a1ec20cccf8ab81cca8bfee698e1a))
*  proper implementation of default export ([7e87db1f](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e87db1f4f32436b884a02f61719a14ff2bb4289))
*  switched from named export to default export in graphql.js ([c1d871db](https://github.com/firstlovecenter/fl-pastoral-care/commit/c1d871db9cd2730f0b84b84e0113f6c4c78d38cb))
*  updated tsconfig to transpile to es2020 ([f902d9c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/f902d9c7e279055758e29a7933923c2db60637db))
*  updated tsconfig to transpile to es2022 ([cdd33d7c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cdd33d7c078611c6a8efec760ae49b7649b62155))
*  updated dependencies on api ([ed2a25ea](https://github.com/firstlovecenter/fl-pastoral-care/commit/ed2a25ea2a4955ec8ebebcef2df32faf926eaff0))
*  changed the version of javascript transpiled ([30caa183](https://github.com/firstlovecenter/fl-pastoral-care/commit/30caa1830411d4c89798e9aa8279d18935394065))
*  added command in netlify.toml to copy resolvers to functions file ([5aab0ca6](https://github.com/firstlovecenter/fl-pastoral-care/commit/5aab0ca6ed81466df33c07949d233d4927035ff3))
*  removed prebuild script ([8e17e5db](https://github.com/firstlovecenter/fl-pastoral-care/commit/8e17e5db7cefd2ee4cec15d3577c9511bd00b6ff))
*  reverted to last good typescript backend ([2255f706](https://github.com/firstlovecenter/fl-pastoral-care/commit/2255f7065c967d54f8f39b7e1e5cbb3fb160eb58))
*  cracked the bugs and got the server running ([3797b867](https://github.com/firstlovecenter/fl-pastoral-care/commit/3797b86740fdfcb3725e614fdceac7185e3b5ebb))
*  corrected import statements ([fa12a3c9](https://github.com/firstlovecenter/fl-pastoral-care/commit/fa12a3c973021adc39ddcfe87afc6fe2bc664836))
*  corrected import of aggregates ([21d6d311](https://github.com/firstlovecenter/fl-pastoral-care/commit/21d6d31172ee9df59c80024f7383dbf359ca266c))
*  reorganised resolvers import order ([5bf67b18](https://github.com/firstlovecenter/fl-pastoral-care/commit/5bf67b18dbb1a63378a5c78ecf6134eca09dcd9f))
*  added notification function in backend ([61f97700](https://github.com/firstlovecenter/fl-pastoral-care/commit/61f9770042e73e0514041452de017ededa07e50b))
*  added an any type to Errors ([e3988da3](https://github.com/firstlovecenter/fl-pastoral-care/commit/e3988da3d62d12c4740c9d51fb59c0236257688d))
*  refactored notify and servant cypher for disconnectTeller ([cce1f660](https://github.com/firstlovecenter/fl-pastoral-care/commit/cce1f660dd1780459d328fbd2e2447063ce100d5))
*  converted aggregates folder to typescript ([5f07660f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f07660fdfeea5411e3a1aaddc7cd393c4362ae4))
*  taken out mailgun package so that the backend runs ([e6d9819a](https://github.com/firstlovecenter/fl-pastoral-care/commit/e6d9819a4040043349837fe011791dea17516f62))
*  converted arrivals to typescript ([314c66fe](https://github.com/firstlovecenter/fl-pastoral-care/commit/314c66feec97611bf039756f1ea4b8967455908b))
*  banking resolvers ([18e825dc](https://github.com/firstlovecenter/fl-pastoral-care/commit/18e825dc346a0f1b2945a9fa79af8bbbee8a873a))
*  testing if backend will deploy ([27c1be16](https://github.com/firstlovecenter/fl-pastoral-care/commit/27c1be1655438bfef8ba365bd0a0981f701b6fee))
*  refactored services folder ([d0fb5926](https://github.com/firstlovecenter/fl-pastoral-care/commit/d0fb5926922e8bf6fad1f1a071a06ab203a9720e))
*  refactored no-income folder ([33f12837](https://github.com/firstlovecenter/fl-pastoral-care/commit/33f1283761f3e529a34c12ec00c2e502e42fccfc))
*  refactored remove servant mutation to typescript ([be70a707](https://github.com/firstlovecenter/fl-pastoral-care/commit/be70a70751ada954721cc711dd9adf4f45b53a39))
*  refactored make servant mutation ([aaaa17bd](https://github.com/firstlovecenter/fl-pastoral-care/commit/aaaa17bd8e821cfc407539ca6de3ebc08038a347))
*  converted anagkazo treasury to typescript ([02b58351](https://github.com/firstlovecenter/fl-pastoral-care/commit/02b583515b75545aa6a78733e68a221654627939))
*  reforing backedn part 1 ([c65a6a51](https://github.com/firstlovecenter/fl-pastoral-care/commit/c65a6a515e25790fd474293be11dd352d4e18986))
*  refactored financial-utils ([c6c2c8fa](https://github.com/firstlovecenter/fl-pastoral-care/commit/c6c2c8faf31589cbee4c356035ee30639871a9ff))

#### 4.5.1 (2022-07-09)

##### Chores

*  updated package-lock.json ([981f52ec](https://github.com/firstlovecenter/fl-pastoral-care/commit/981f52ecce443127568bf0ed1a74fa35466c227c))
*  merge branch 'fldata22-feature-implement-uk-no-income' into deploy ([01137b76](https://github.com/firstlovecenter/fl-pastoral-care/commit/01137b76c4a7cd975abebf8292fdb42f280d796a))
*  updated outdated dependencies ([3176d109](https://github.com/firstlovecenter/fl-pastoral-care/commit/3176d109192e6bc432d725483c0985bb5c678325))
*  updated outdated dependencies ([68cbc5ea](https://github.com/firstlovecenter/fl-pastoral-care/commit/68cbc5ea949cc1bb3425c558568f76718365daa3))

##### New Features

*  finished front end for choosing treasurers ([43df24e6](https://github.com/firstlovecenter/fl-pastoral-care/commit/43df24e6a9623b0d4f83c198f9b3dd244f49e65c))
*  implemented front end for choosing anagkazo treasurers ([affd483d](https://github.com/firstlovecenter/fl-pastoral-care/commit/affd483d750d8ee8964c116b85f4dc3bfaf9ff52))
*  implemented anagkazo menu item ([ca65f2bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/ca65f2bf76116935f3c6cc5ef28a815519f03d8f))
*  cleaned component service logs with multiple HAS_COMPONENT rels ([c2051491](https://github.com/firstlovecenter/fl-pastoral-care/commit/c20514917a563f7327f3811d5982c54f0a8f062d))
*  cleaned component service logs with multiple HAS_COMPONENT rels ([08fd22e1](https://github.com/firstlovecenter/fl-pastoral-care/commit/08fd22e15a79b66f4d4c4ec62071bab55dc389c9))
*  merged with deploy ([78c4a15b](https://github.com/firstlovecenter/fl-pastoral-care/commit/78c4a15bae5adae4bac382a8c8314d3083817059))
*  implemented types on a few components ([44a18c75](https://github.com/firstlovecenter/fl-pastoral-care/commit/44a18c75a1fa9eba059d61a62d7bbb4b024f0508))
*  installed typescript in the app ([#196](https://github.com/firstlovecenter/fl-pastoral-care/pull/196)) ([0f79da21](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f79da211294d067b2627ccee972a282c69f0035))
*  refactor pages to include UK defaulters and service details-fix ([bf2d864d](https://github.com/firstlovecenter/fl-pastoral-care/commit/bf2d864dfec39673881a8587ac374a5734fa6be6))
*  added google analytics tracking to web site ([4f5d5e9b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f5d5e9b30de2802fd4000585c487e281875ffc4))
*  refactor pages to include UK defaulters and service details-fix ([46462479](https://github.com/firstlovecenter/fl-pastoral-care/commit/46462479fd2ad36492ddaead314f0b6c73ee6162))
*  refactor pages to include UK defaulters and service details ([8121fe46](https://github.com/firstlovecenter/fl-pastoral-care/commit/8121fe467b0b3d8c631bd77274ceb3bd27a84110))
*  refactor pages to include UK ([b8cc3cc1](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8cc3cc14b80d50d79734b43cb51130e6782a39b))
*  update cypher to support UK submission ([a4255d7b](https://github.com/firstlovecenter/fl-pastoral-care/commit/a4255d7bb738c466e14cb94516edefc86dd8f1a1))
*  added transactionId to self banking receipt for easy debugging ([e87fcadd](https://github.com/firstlovecenter/fl-pastoral-care/commit/e87fcadd844eb47fcce07da7f4211fb3141eecb2))
*  admin-159 implemented backend mutations for creating anagkazo tellers ([8a8c6326](https://github.com/firstlovecenter/fl-pastoral-care/commit/8a8c6326975528505032cfb9f5268635c2157768))
*  added a property on currentUser called 'noIncome' for UK port ([b35a4405](https://github.com/firstlovecenter/fl-pastoral-care/commit/b35a4405e516f632564c5d5588f858bfe5548609))
*  admin-171 implemented a map that loads with First Love Center in view ([bb0f43d7](https://github.com/firstlovecenter/fl-pastoral-care/commit/bb0f43d731b999a66bd3bc5b977ecad2897b48e9))

##### Bug Fixes

*  testing new eslint settings ([5da978ce](https://github.com/firstlovecenter/fl-pastoral-care/commit/5da978ce5499532985945cef58ead0e932795bce))
*  fixed @fldata22 bug where services with income could not be filled ([a5d8ed1f](https://github.com/firstlovecenter/fl-pastoral-care/commit/a5d8ed1feee983309ec118fe3646ec27389f9a67))
*  corrected readme ([1b7df982](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b7df9824f3206ae9bb9b542faa3d00dfa3370f4))
*  downgraded neo4j/graphql library to 3.4.0 ([5b2296aa](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b2296aa81bea9ffe8a3fa934dceec9d6f245e37))
*  added @dabick task of connecting service records withouth LOGGED_BY ([3f5fc96a](https://github.com/firstlovecenter/fl-pastoral-care/commit/3f5fc96a12266870a03d27021cfa280dd58bbaf1))
*  cleaned up service records which had multiple HAS_SERVICE and HAS_BUSSING ([e0a2b12d](https://github.com/firstlovecenter/fl-pastoral-care/commit/e0a2b12d619680bd6f9c187a18737027c5ee692f))
*  updated api deps and increased icon sizes ([8e492865](https://github.com/firstlovecenter/fl-pastoral-care/commit/8e492865a2b16dd756175413059d89042feb951f))
*  updated state of the cypher TODOs ([4e380221](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e38022132d574c0d666ac3719caa465e785975a))
*  downgraded neo4j/graphql library to 3.4.0 ([5e3dbf43](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e3dbf435d8797215a1a5248e93d6ec6b258d579))
*  added @dabick task of connecting service records withouth LOGGED_BY ([ed009a3a](https://github.com/firstlovecenter/fl-pastoral-care/commit/ed009a3a9c4822aa296d1086e9d427b13275d4a9))
*  cleaned up service records which had multiple HAS_SERVICE and HAS_BUSSING ([1d40a87d](https://github.com/firstlovecenter/fl-pastoral-care/commit/1d40a87d44f984b38316f148b5da194c87a22a90))
*  updated api deps and increased icon sizes ([b231532f](https://github.com/firstlovecenter/fl-pastoral-care/commit/b231532fa3cd0470c1a8afd8abfdd416088f5c64))
*  updated state of the cypher TODOs ([26fb5dd2](https://github.com/firstlovecenter/fl-pastoral-care/commit/26fb5dd2b124f5674a6fea8ae6d0c3d5a5c64eb4))
*  updated ApolloWrapper Component ([4f49b03f](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f49b03fd552668f8179c5c6a9dea8ce4d2e7796))
*  updated color of text on error screen for visibility ([60a9d0d1](https://github.com/firstlovecenter/fl-pastoral-care/commit/60a9d0d1c034819d9cfcaff5e0352c81c99166a3))
*  updated cyphher todos ([c33c0387](https://github.com/firstlovecenter/fl-pastoral-care/commit/c33c0387534e1a09c2be7fb452033910a50caabc))
*  wrote 4 cypher query todos ([fa65dd9d](https://github.com/firstlovecenter/fl-pastoral-care/commit/fa65dd9d5944dc4e68bcec7752efbcdaf9aef14b))
*  changed from using localStorage to sessionStorage ([85eea3cc](https://github.com/firstlovecenter/fl-pastoral-care/commit/85eea3ccaa4ac267275b82eebaf6519c17991cbc))
*  admin-199 removed typescript and fixed no service bug ([8516b679](https://github.com/firstlovecenter/fl-pastoral-care/commit/8516b679856160e90dfde49c29b261769368ca88))
*  admin-197 fixed bug where updating name of constituency not working ([981fc70b](https://github.com/firstlovecenter/fl-pastoral-care/commit/981fc70bf4dc3779a44bfe3d91371fb978092501))
*  implemented overseeing pastor on the user profile page ([6f03459c](https://github.com/firstlovecenter/fl-pastoral-care/commit/6f03459cf4fe4f3da72d0cadb6bcde41b688a5d8))
*  updated neo4j dependencies for memberdisplay ([54b8df1f](https://github.com/firstlovecenter/fl-pastoral-care/commit/54b8df1fcced326ff43228f912954c3a646f8ece))
*  exposed maps for gathering and stream admins ([bd56acc3](https://github.com/firstlovecenter/fl-pastoral-care/commit/bd56acc3045e73ff43b6f09bd3e25d34c7320c94))
*  ux improvements for the self banking feature ([f1132989](https://github.com/firstlovecenter/fl-pastoral-care/commit/f11329896985cf19f1b59c719699e568852b4224))
*  corrected permissions for self banking ([815f597e](https://github.com/firstlovecenter/fl-pastoral-care/commit/815f597e83a1b791eebaa2881321465e73799528))
*  update cypher to support UK submission ([2c3cf29f](https://github.com/firstlovecenter/fl-pastoral-care/commit/2c3cf29f98e8799bd668bd50deec329d21dcc7b6))
*  corrected roles for menu items ([13ec0f13](https://github.com/firstlovecenter/fl-pastoral-care/commit/13ec0f13adf30e203b90a47872a899b7461e0251))
*  removed member count from servant list ([3a940663](https://github.com/firstlovecenter/fl-pastoral-care/commit/3a940663325607036609ad2b5cbd2e261b5f892b))
*  admin-195 fixed issue where users were not gettig option to fill service from service menu" ([a7bd10df](https://github.com/firstlovecenter/fl-pastoral-care/commit/a7bd10df9df26601830e53ffdd7ca133382769d8))
*  admin-194 fix cypher error in log member history mutation ([d76ca07e](https://github.com/firstlovecenter/fl-pastoral-care/commit/d76ca07ef9781cf52e8e6b8f76f2fc3b2ea4ca40))
*  removed console log ([7e39ba66](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e39ba66d190c5dedea606d6e9e472ca0892be4a))
*  increase the width of the Login button ([0814fff3](https://github.com/firstlovecenter/fl-pastoral-care/commit/0814fff3cbd828dbdd1bd5a7a784b2e682fb9d24))
*  fix login page to Klenam standard ([77d6359a](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d6359a174ef584135d786a2f9f2b1370017385))
*  updated memberByEmail Query ([abefd6c3](https://github.com/firstlovecenter/fl-pastoral-care/commit/abefd6c38a12cc30e8fa42df449e0c4ab4ebbf9e))
*  fix issue where quick facts details is undefined ([dd128b60](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd128b60072c324ee7d14925de916f840aa27d82))
*  admin-182 fixed bug with banking slip picture upload ([3507ec75](https://github.com/firstlovecenter/fl-pastoral-care/commit/3507ec750d51c349b092ec54a8c08098acc46f54))
*  added roles for arrivals in servant church list ([a2e30f9a](https://github.com/firstlovecenter/fl-pastoral-care/commit/a2e30f9af3cf665018886b50c808d73e01bb8639))
*  removed irritating border from bussing dropdown ([1b3e2704](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b3e27047226db1a5ddfb24881d9bc93200e76c2))

##### Other Changes

* //github.com/firstlovecenter/fl-admin-portal into feature-ADMIN-187-refactor-role-view ([2f7542fb](https://github.com/firstlovecenter/fl-pastoral-care/commit/2f7542fbaee09802b0037c4bbaaf425e8634214c))
* //github.com/i-mmanuel/fl-admin-portal into feature-ADMIN-187-refactor-role-view ([bfcbc167](https://github.com/firstlovecenter/fl-pastoral-care/commit/bfcbc16758e70f0ca4460f05d6ebe04532b5ec5a))
* //github.com/i-mmanuel/fl-admin-portal into feature-ADMIN-187-refactor-role-view ([4eeee606](https://github.com/firstlovecenter/fl-pastoral-care/commit/4eeee6062d5f6d6bb8a97a12e547e45e1b1b4a33))

##### Performance Improvements

*  fixed issue of 404 page showing up on refresh ([3a5fdc42](https://github.com/firstlovecenter/fl-pastoral-care/commit/3a5fdc42e1289f4ab414ff37e8bd398e90856c8f))
*  converted base-component to typescript ([97d58fab](https://github.com/firstlovecenter/fl-pastoral-care/commit/97d58fabe698f5137f52eb54823803e02794ce9f))
*  cleaned up churches which have more than one current history log ([e69c3b55](https://github.com/firstlovecenter/fl-pastoral-care/commit/e69c3b55360ca99511359cdb398f6c92e17b1faf))
*  implemented better ux when the service form fails ([33ace975](https://github.com/firstlovecenter/fl-pastoral-care/commit/33ace975bd80106a839ac12b9fe26387d33c7d7c))
*  moved sabbath higher in the component tree ([918270c1](https://github.com/firstlovecenter/fl-pastoral-care/commit/918270c1f9f71ca5595ff4f69013b0e83e6f9819))
*  brought make the unified roles query ([e39e05b5](https://github.com/firstlovecenter/fl-pastoral-care/commit/e39e05b552a9f01d7eec94a3ebbbadee5d8136bb))
*  removed memberCount from servant list query ([e3f08684](https://github.com/firstlovecenter/fl-pastoral-care/commit/e3f08684e6b153d27707dacfe3d08e383d011ee6))
*  optimised queries for user roles on app load ([fbc70d2c](https://github.com/firstlovecenter/fl-pastoral-care/commit/fbc70d2cde3b52e027eccdd67dfadb276668ccaf))

##### Refactors

*  began converting arrivals to typescript ([04ab086f](https://github.com/firstlovecenter/fl-pastoral-care/commit/04ab086f4f58362ac563a4e35885c9a75ec2c449))
*  converted some general componenets to typescript ([fd68e8f5](https://github.com/firstlovecenter/fl-pastoral-care/commit/fd68e8f57541e6bed093f2c8b719ac426848cc9d))
*  converted a few more components to typescript ([cfd24de7](https://github.com/firstlovecenter/fl-pastoral-care/commit/cfd24de7d96e9c16a42e8d8395c24609a19a9d41))
*  converted deetails, church lists, and banking components to typescript ([34695aa8](https://github.com/firstlovecenter/fl-pastoral-care/commit/34695aa8a65f72e08fc82c57eea878ca6f9ea974))
*  record services components changed to typescript ([bd1d4a3e](https://github.com/firstlovecenter/fl-pastoral-care/commit/bd1d4a3e439cf3f6592b8135dd529afeb9b0515d))
*  refactored RoleView into typescript ([48f8934c](https://github.com/firstlovecenter/fl-pastoral-care/commit/48f8934ca921b998504ca9b11a8d3dafe6234ecf))
*  renamed components with 'london' and 'uk' ([5e27ccb7](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e27ccb71f88b70c027a63ca9c5ef4b46591a795))
*  refactored more components into typescript 2 ([33c19eeb](https://github.com/firstlovecenter/fl-pastoral-care/commit/33c19eeb1217dad7a8985a524c548cca7c392631))
*  refactored more components into typescript 2 ([5bd83c19](https://github.com/firstlovecenter/fl-pastoral-care/commit/5bd83c19c1845a3eb57e88be36b905169ec599aa))
*  refactored more components into typescript ([8ae1dba6](https://github.com/firstlovecenter/fl-pastoral-care/commit/8ae1dba69d4b354b4155bf798faadbb62691c3e7))
*  refactor slider into a component and added a placeholder ([5a2b0dd9](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a2b0dd9cd7ae3ebc7abe0c5bafb9d81917ce764))
*  deleted useless code ([c7f2f0f5](https://github.com/firstlovecenter/fl-pastoral-care/commit/c7f2f0f51b1bf0c604d62a94ea4dec6bd127314a))

#### 0.5.22 (2022-05-28)

##### New Features

*  poimen-44 implemented a floating sidenav menu button ([f44a06cf](https://github.com/firstlovecenter/fl-pastoral-care/commit/f44a06cf0bdb798e143240664b8fb8e08f97a5c6))

##### Bug Fixes

*  added missing dependency for react-scripts ([e78834e1](https://github.com/firstlovecenter/fl-pastoral-care/commit/e78834e1e3efc9f480c58c5beea02b1854bccabb))
*  implemented typescript on resolvers.ts ([07faf298](https://github.com/firstlovecenter/fl-pastoral-care/commit/07faf298b832097c3283a9294ac1a6be89fc4ec4))
*  modified exports from graphql-schema.js ([dc25aeb6](https://github.com/firstlovecenter/fl-pastoral-care/commit/dc25aeb69d55bfba8dde584ab10551678c57f1e8))
*  disable graphql-schema ([0f878ea6](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f878ea6a0c3dec6a0ed301bde17adf4551c7439))
*  minor fixes ([e771c03b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e771c03b479a2babee71cbef0f0de9d5c2911058))
*  converted import to module statements ([84e06076](https://github.com/firstlovecenter/fl-pastoral-care/commit/84e0607662e9f942077486bd8095954d80992ded))
*  removed type module ([4ab1a6a1](https://github.com/firstlovecenter/fl-pastoral-care/commit/4ab1a6a188d9229c75cff3b80bc54574d425e466))
*  added type module ([cf8f6eb7](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf8f6eb76daa62877b7ae6103be1d6dd71a83c44))

#### 0.5.22 (2022-05-28)

##### New Features

*  poimen-44 implemented a floating sidenav menu button ([f44a06cf](https://github.com/firstlovecenter/fl-pastoral-care/commit/f44a06cf0bdb798e143240664b8fb8e08f97a5c6))

##### Bug Fixes

*  added missing dependency for react-scripts ([e78834e1](https://github.com/firstlovecenter/fl-pastoral-care/commit/e78834e1e3efc9f480c58c5beea02b1854bccabb))
*  implemented typescript on resolvers.ts ([07faf298](https://github.com/firstlovecenter/fl-pastoral-care/commit/07faf298b832097c3283a9294ac1a6be89fc4ec4))
*  modified exports from graphql-schema.js ([dc25aeb6](https://github.com/firstlovecenter/fl-pastoral-care/commit/dc25aeb69d55bfba8dde584ab10551678c57f1e8))
*  disable graphql-schema ([0f878ea6](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f878ea6a0c3dec6a0ed301bde17adf4551c7439))
*  minor fixes ([e771c03b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e771c03b479a2babee71cbef0f0de9d5c2911058))
*  converted import to module statements ([84e06076](https://github.com/firstlovecenter/fl-pastoral-care/commit/84e0607662e9f942077486bd8095954d80992ded))
*  removed type module ([4ab1a6a1](https://github.com/firstlovecenter/fl-pastoral-care/commit/4ab1a6a188d9229c75cff3b80bc54574d425e466))
*  added type module ([cf8f6eb7](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf8f6eb76daa62877b7ae6103be1d6dd71a83c44))

#### 0.5.21 (2022-05-21)

##### Bug Fixes

*  rewrote api backend as js ([5e92294b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e92294b9f8a396fd85ade04be720ab4929e866c))

#### 0.5.20 (2022-05-21)

#### 0.5.19 (2022-05-21)

#### 0.5.18 (2022-05-21)

#### 0.5.17 (2022-05-21)

#### 0.5.16 (2022-05-21)

##### Documentation Changes

*  updated CHANGELOG.md ([84b43dfd](https://github.com/firstlovecenter/fl-pastoral-care/commit/84b43dfd881ef3117c0c8cee82f0bd8fc9ad7fb2))
*  updated CHANGELOG.md ([834d9362](https://github.com/firstlovecenter/fl-pastoral-care/commit/834d9362ebe1148b5b53f470856a9f5938469f0f))
*  updated CHANGELOG.md ([2a053311](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a0533110568a3eb347a73f6abb485497debeafe))
*  updated CHANGELOG.md ([e517287b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e517287bdc8041d8930c4c67e0e7b3f2b372797b))

##### Bug Fixes

*  fixing issue with the graphql.js ([dcb01258](https://github.com/firstlovecenter/fl-pastoral-care/commit/dcb01258b1c3a0ab9dfaf8212a87535182652f54))
*  fixing issue with the graphql.js ([77d0feb9](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d0feb96d659f2f3204a90a8164f4433bfb0faa))

#### 0.5.15 (2022-05-21)

##### Documentation Changes

*  updated CHANGELOG.md ([834d9362](https://github.com/firstlovecenter/fl-pastoral-care/commit/834d9362ebe1148b5b53f470856a9f5938469f0f))
*  updated CHANGELOG.md ([2a053311](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a0533110568a3eb347a73f6abb485497debeafe))
*  updated CHANGELOG.md ([e517287b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e517287bdc8041d8930c4c67e0e7b3f2b372797b))

##### Bug Fixes

*  fixing issue with the graphql.js ([77d0feb9](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d0feb96d659f2f3204a90a8164f4433bfb0faa))

#### 0.5.15 (2022-05-21)

##### Documentation Changes

*  updated CHANGELOG.md ([2a053311](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a0533110568a3eb347a73f6abb485497debeafe))
*  updated CHANGELOG.md ([e517287b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e517287bdc8041d8930c4c67e0e7b3f2b372797b))

##### Bug Fixes

*  fixing issue with the graphql.js ([77d0feb9](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d0feb96d659f2f3204a90a8164f4433bfb0faa))

#### 0.5.15 (2022-05-21)

##### Documentation Changes

*  updated CHANGELOG.md ([e517287b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e517287bdc8041d8930c4c67e0e7b3f2b372797b))

##### Bug Fixes

*  fixing issue with the graphql.js ([77d0feb9](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d0feb96d659f2f3204a90a8164f4433bfb0faa))

#### 0.5.15 (2022-05-21)

##### Bug Fixes

*  fixing issue with the graphql.js ([77d0feb9](https://github.com/firstlovecenter/fl-pastoral-care/commit/77d0feb96d659f2f3204a90a8164f4433bfb0faa))

#### 0.5.14 (2022-05-21)

##### Bug Fixes

*  fixing issue with the graphql.js ([5e4ad5fe](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e4ad5fefd14a72b45da82608bdf8045be27fff3))

#### 0.5.13 (2022-05-21)

##### Bug Fixes

*  fixing issue with the graphql.js ([f10e7cef](https://github.com/firstlovecenter/fl-pastoral-care/commit/f10e7cef9791ca88845069ad5e5aada07d87e92e))

#### 0.5.12 (2022-05-21)

##### Bug Fixes

*  solved issue with apollo client settings ([38a8aad8](https://github.com/firstlovecenter/fl-pastoral-care/commit/38a8aad85fb5b7d78f9f30a30daad09e64e8df40))

#### 0.5.11 (2022-05-21)

##### Bug Fixes

*  logging env variables ([393b95e3](https://github.com/firstlovecenter/fl-pastoral-care/commit/393b95e3a1176f82416574723d230ee565ebc3c0))

#### 0.5.10 (2022-05-21)

##### Bug Fixes

*  set up so that auth0 id is used to get the current user ([953a3e89](https://github.com/firstlovecenter/fl-pastoral-care/commit/953a3e890b0a6242bb6014d80c2136ce99b5c63d))

#### 0.5.9 (2022-05-20)

##### New Features

*  poimen-38 implemented a drawer component ([dfcc9601](https://github.com/firstlovecenter/fl-pastoral-care/commit/dfcc96018607e25b9f1539c251402acce6eaa200))
*  poimen-42 implemented a CacheBuster component for cache invalidation ([668b909c](https://github.com/firstlovecenter/fl-pastoral-care/commit/668b909c47c4b9b6dcc52ce9666e5c5d58f774df))

#### 0.5.8 (2022-05-20)

##### Chores

*   pulled from remote deploy ([151cfc0d](https://github.com/firstlovecenter/fl-pastoral-care/commit/151cfc0dfdafdff8fd03610fe099ec4a3f6f99ca))

##### Documentation Changes

*  updated CHANGELOG.md ([fa76dfab](https://github.com/firstlovecenter/fl-pastoral-care/commit/fa76dfab30c670078b5d5c256621ac9d38e7edd9))
*  updated CHANGELOG.md ([3a5b6013](https://github.com/firstlovecenter/fl-pastoral-care/commit/3a5b6013218cba06dec2e5c27eae1aedb1114ab6))
*  updated CHANGELOG.md ([2a5a9868](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a5a98681dadb70aae489ddbf31105197c7e3220))
*  updated CHANGELOG.md ([e4dd338c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4dd338c263fc2c6b289025af3f4a39c145f7e69))

##### New Features

*  poimen-40 memberlist shows  for only the church in question ([8b291edf](https://github.com/firstlovecenter/fl-pastoral-care/commit/8b291edfbf00fb3c79af0086dd6e41fa8c40c765))

##### Bug Fixes

*  implemented  clickCard on bacenta ([048ab790](https://github.com/firstlovecenter/fl-pastoral-care/commit/048ab790da81939ed7c89f8a5d932ed9a0e2ba6e))
*  fixed bug preventing graphqlschema from being imported correctly ([f0d8c54b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0d8c54b64a456d6261e5d15ff7a84224044a985))

##### Refactors

*  began refactoring of members list ([d9908b97](https://github.com/firstlovecenter/fl-pastoral-care/commit/d9908b972a797e937e6b1bb6b73d3266e17239a7))
*  refactored profile-choose to use native chakra-ui features ([14131c73](https://github.com/firstlovecenter/fl-pastoral-care/commit/14131c732f16a137504386250ef5bbe2d011e453))

#### 0.5.7 (2022-05-20)

##### Documentation Changes

*  updated CHANGELOG.md ([3a5b6013](https://github.com/firstlovecenter/fl-pastoral-care/commit/3a5b6013218cba06dec2e5c27eae1aedb1114ab6))
*  updated CHANGELOG.md ([2a5a9868](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a5a98681dadb70aae489ddbf31105197c7e3220))
*  updated CHANGELOG.md ([e4dd338c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4dd338c263fc2c6b289025af3f4a39c145f7e69))

##### Bug Fixes

*  fixed bug preventing graphqlschema from being imported correctly ([f0d8c54b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0d8c54b64a456d6261e5d15ff7a84224044a985))

##### Refactors

*  refactored profile-choose to use native chakra-ui features ([14131c73](https://github.com/firstlovecenter/fl-pastoral-care/commit/14131c732f16a137504386250ef5bbe2d011e453))

#### 0.5.7 (2022-05-20)

##### Documentation Changes

*  updated CHANGELOG.md ([2a5a9868](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a5a98681dadb70aae489ddbf31105197c7e3220))
*  updated CHANGELOG.md ([e4dd338c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4dd338c263fc2c6b289025af3f4a39c145f7e69))

##### Bug Fixes

*  fixed bug preventing graphqlschema from being imported correctly ([f0d8c54b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0d8c54b64a456d6261e5d15ff7a84224044a985))

##### Refactors

*  refactored profile-choose to use native chakra-ui features ([14131c73](https://github.com/firstlovecenter/fl-pastoral-care/commit/14131c732f16a137504386250ef5bbe2d011e453))

#### 0.5.7 (2022-05-20)

##### Documentation Changes

*  updated CHANGELOG.md ([e4dd338c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4dd338c263fc2c6b289025af3f4a39c145f7e69))

##### Bug Fixes

*  fixed bug preventing graphqlschema from being imported correctly ([f0d8c54b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0d8c54b64a456d6261e5d15ff7a84224044a985))

##### Refactors

*  refactored profile-choose to use native chakra-ui features ([14131c73](https://github.com/firstlovecenter/fl-pastoral-care/commit/14131c732f16a137504386250ef5bbe2d011e453))

#### 0.5.7 (2022-05-20)

##### Bug Fixes

*  fixed bug preventing graphqlschema from being imported correctly ([f0d8c54b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0d8c54b64a456d6261e5d15ff7a84224044a985))

##### Refactors

*  refactored profile-choose to use native chakra-ui features ([14131c73](https://github.com/firstlovecenter/fl-pastoral-care/commit/14131c732f16a137504386250ef5bbe2d011e453))

#### 0.5.6 (2022-05-14)

##### Chores

*  removed pre build commands ([5e03e551](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e03e5516362ebba89bf548366044ea1de0d1dd3))

#### 0.5.5 (2022-05-14)

##### Chores

*  deleted setup proxy ([d54e0fef](https://github.com/firstlovecenter/fl-pastoral-care/commit/d54e0fef971f2174aa076700bf919132d534e86c))
*  updated packages ([2c801831](https://github.com/firstlovecenter/fl-pastoral-care/commit/2c8018312d2210a632ff48e4c4c9c1e8d6f77203))

#### 0.5.4 (2022-05-14)

##### New Features

*  implemented using typescript in the backend ([081a11d0](https://github.com/firstlovecenter/fl-pastoral-care/commit/081a11d0ca1050de1116522d82afa94fe4379cf6))

#### 0.5.3 (2022-05-14)

##### New Features

*  implemented Apollo Wrapper Component for wrapping components which have data from useQuery ([28f57565](https://github.com/firstlovecenter/fl-pastoral-care/commit/28f5756529820482fadd0b9af445128c5de07b64))
*  implemented basic types for the church throughout the app ([115e642c](https://github.com/firstlovecenter/fl-pastoral-care/commit/115e642c957b6f00518be48f6bd1ac69efa98344))

##### Refactors

*  refactored code to use context ([2dd75e85](https://github.com/firstlovecenter/fl-pastoral-care/commit/2dd75e85194cbf0254e0c3bf9edcfa4354c1e356))
*   rewrote the landing page ([b5f4185e](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5f4185ede3cd3919e6df21e0bc08757549b6694))
*  scaffolding the app, getting ready to use Context ([6d5ed055](https://github.com/firstlovecenter/fl-pastoral-care/commit/6d5ed0556d1e3725a51098eeeab9620687a964da))

#### 0.5.2 (2022-04-20)

##### Chores

*  upgraded build.js ([5d530767](https://github.com/firstlovecenter/fl-pastoral-care/commit/5d5307679349b6048547be734d5adafd2fc7fdd0))

#### 0.5.1 (2022-04-20)

##### Chores

*  upgraded concurrently ([1339a839](https://github.com/firstlovecenter/fl-pastoral-care/commit/1339a839c66e845595710099880e7a63cd646d3e))

### 0.5.0 (2022-04-20)

##### Chores

*  downgraded concurrently to a working version ([fff44cb1](https://github.com/firstlovecenter/fl-pastoral-care/commit/fff44cb175fac0bc934ddf19a78e84f2cdcfe40e))
*  refactored release.js to eliminate eslint warnings ([2d0e04f1](https://github.com/firstlovecenter/fl-pastoral-care/commit/2d0e04f1ab9c65ddac4653ae163a222566f1ee42))
*  cleaned up dependencies ([b864d8db](https://github.com/firstlovecenter/fl-pastoral-care/commit/b864d8db342b45c6fbed9a1e36a556e426244699))
*  fixed merge conflicts ([4382e47b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4382e47b8acbab67ab30e7bfd141d52eb031df06))
*  updated dependencies ([db7f2c7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/db7f2c7e0437413fb112483c533644a21221e08c))
*  updated lambda function ([0fba922e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0fba922e44046f77547c67c3cafe2ed0c471f005))
*  updateed readme ([21efeff0](https://github.com/firstlovecenter/fl-pastoral-care/commit/21efeff0c6e9e0330ea9f0ac4e92896be7e1bd82))
*  updated graphql package ([36b967ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/36b967ae35808aff104b53d3708bda0bceafa13f))
*  updated @neo4j/graphql library ([9c60cef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/9c60cef0e0076cc57ba1bb1cd8d89f9b6bb49b7e))
*  installed airbnb style guide ([2fbd4525](https://github.com/firstlovecenter/fl-pastoral-care/commit/2fbd452519871e682448be659f086165265310e8))
*  edited readme ([b3622c14](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3622c14959965d1ec0fddf3576a014d7294cb67))
*  edited readme ([5fa4598f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5fa4598fc3e8c22bce9cde5259fd8a02ec3ae16e))

##### Documentation Changes

*  updated CHANGELOG.md ([e8ac9df8](https://github.com/firstlovecenter/fl-pastoral-care/commit/e8ac9df8a3bcc3195a8ccc3b48330b3eda0d8412))
*  updated CHANGELOG.md ([84d1a7bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/84d1a7bf68005e015cecd677569e0b7e3db145fa))
*  updated CHANGELOG.md ([af3b5035](https://github.com/firstlovecenter/fl-pastoral-care/commit/af3b5035f6f03eee12447e60f0bb5ff84f7ae51e))
*  updated CHANGELOG.md ([3c5a5a61](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c5a5a61e2c3bd8b19f28430f814de685191ae37))

##### New Features

*  implement membership and dashboard pages ([dd0c5fce](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd0c5fcee1899c1a9a95b6b6305dd8b3b56b02ea))
*  fix login issue ([06f895cb](https://github.com/firstlovecenter/fl-pastoral-care/commit/06f895cbb1e27eb31dd37c5c8c8b9ee6214418c6))
* implement memberlist ([2a47e86c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a47e86c116b739ac4977ac89029acdbefcb51cb))
*  implement bacenta membership flow ([985f00ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/985f00ad1414af96c1ebef384c4cfd363c1d3c00))
* implement memberlist ([5a416242](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a416242d83b09b4872c340ac5e2758edf6359b8))
*  implement bacenta membership flow ([63336072](https://github.com/firstlovecenter/fl-pastoral-care/commit/63336072a532f7e2cb795ea6cd7e708e6ad50bd2))
*  introduced a cloudinary image component with support for lazy loading and placeholders ([f4c6957e](https://github.com/firstlovecenter/fl-pastoral-care/commit/f4c6957e3547a4c9cfe7b8c9c8cc82e1f08372c1))
*  poimen-12 implemented types for sheep, goat, deer ([64d93bc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/64d93bc5f2a96e27624c25d5d84d430521c02327))
*  graphql ([9b3c7d80](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b3c7d8037b0e48198f151823638287d0e271cc5))
* **membership:**  implemented sheep, deer, goat types for members and bacentas ([5e28c43b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e28c43bd5e4cde27bf297307a47c7f43b242409))

##### Bug Fixes

*  replace the membership graphql name ([557db059](https://github.com/firstlovecenter/fl-pastoral-care/commit/557db0596819b3341d279a7b2038165f01bd842d))
*  merge conflicts from deploy ([644bcf00](https://github.com/firstlovecenter/fl-pastoral-care/commit/644bcf00120959466b9d0467126198fea439f450))
*  merge conflicts from deploy ([c200e633](https://github.com/firstlovecenter/fl-pastoral-care/commit/c200e633f24b891cebc87aeb268dc85588118b98))
*  replaced cloudinary img comp with a transformImage function compatible with Avatar comp ([577e2194](https://github.com/firstlovecenter/fl-pastoral-care/commit/577e2194041e9efd288abfc50fc87419748d3e95))
*  merged member list page with cloudinary commit ([5e38e83e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e38e83e432cf61cc47d95915c02b68f361e38a7))
*  tweaked netlify.toml ([cf3f504c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf3f504ce4e17261328a9998633f813ef7da5e13))
*  took out code that was breaking the deploy ([2bd5ee94](https://github.com/firstlovecenter/fl-pastoral-care/commit/2bd5ee94e908e46a76ccbe012fdd3ae8f02d84b4))
*  poimen-4 Implemented login functionality using auth0 and apollo client ([cbddf09d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cbddf09de45cf5f73285f6cbf25cb6607506e149))
*  implemented login functionality with auth0 provider ([60117f1e](https://github.com/firstlovecenter/fl-pastoral-care/commit/60117f1e4918a84bd2d1576ca7da86a56bdf67c9))
*  partially implemented auth0 wrapper ([0c971f51](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c971f51cb49ffee85b8defbadc305130d0c4337))
*  fixed import statement in graphql.js ([4e3599a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e3599a4fa40a76fbd1caf5ed9d2e1f6a3ff8af4))

##### Other Changes

* //github.com/firstlovecenter/fl-pastoral-care into develop ([76be2301](https://github.com/firstlovecenter/fl-pastoral-care/commit/76be2301063b17be1b628ed2b978c42f6fbcc6a7))
* //github.com/firstlovecenter/fl-pastoral-care into deploy ([61bf14a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/61bf14a28839769b60b5e5e1d798ae2b3cfc1f0e))

##### Refactors

*  resolved peer dependency conflicts with react-loading-overlay ([c02c2a37](https://github.com/firstlovecenter/fl-pastoral-care/commit/c02c2a37630100588c7fd8aae7ea6c3d1970bf27))
*  restructured the front end folder directory ([9fe4a243](https://github.com/firstlovecenter/fl-pastoral-care/commit/9fe4a243d3e3669f7be07ff5c15fb8bb38a1e6b7))

### 0.4.0 (2022-04-20)

##### Chores

*  refactored release.js to eliminate eslint warnings ([2d0e04f1](https://github.com/firstlovecenter/fl-pastoral-care/commit/2d0e04f1ab9c65ddac4653ae163a222566f1ee42))
*  cleaned up dependencies ([b864d8db](https://github.com/firstlovecenter/fl-pastoral-care/commit/b864d8db342b45c6fbed9a1e36a556e426244699))
*  fixed merge conflicts ([4382e47b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4382e47b8acbab67ab30e7bfd141d52eb031df06))
*  updated dependencies ([db7f2c7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/db7f2c7e0437413fb112483c533644a21221e08c))
*  updated lambda function ([0fba922e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0fba922e44046f77547c67c3cafe2ed0c471f005))
*  updateed readme ([21efeff0](https://github.com/firstlovecenter/fl-pastoral-care/commit/21efeff0c6e9e0330ea9f0ac4e92896be7e1bd82))
*  updated graphql package ([36b967ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/36b967ae35808aff104b53d3708bda0bceafa13f))
*  updated @neo4j/graphql library ([9c60cef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/9c60cef0e0076cc57ba1bb1cd8d89f9b6bb49b7e))
*  installed airbnb style guide ([2fbd4525](https://github.com/firstlovecenter/fl-pastoral-care/commit/2fbd452519871e682448be659f086165265310e8))
*  edited readme ([b3622c14](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3622c14959965d1ec0fddf3576a014d7294cb67))
*  edited readme ([5fa4598f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5fa4598fc3e8c22bce9cde5259fd8a02ec3ae16e))

##### Documentation Changes

*  updated CHANGELOG.md ([84d1a7bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/84d1a7bf68005e015cecd677569e0b7e3db145fa))
*  updated CHANGELOG.md ([af3b5035](https://github.com/firstlovecenter/fl-pastoral-care/commit/af3b5035f6f03eee12447e60f0bb5ff84f7ae51e))
*  updated CHANGELOG.md ([3c5a5a61](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c5a5a61e2c3bd8b19f28430f814de685191ae37))

##### New Features

*  implement membership and dashboard pages ([dd0c5fce](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd0c5fcee1899c1a9a95b6b6305dd8b3b56b02ea))
*  fix login issue ([06f895cb](https://github.com/firstlovecenter/fl-pastoral-care/commit/06f895cbb1e27eb31dd37c5c8c8b9ee6214418c6))
* implement memberlist ([2a47e86c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a47e86c116b739ac4977ac89029acdbefcb51cb))
*  implement bacenta membership flow ([985f00ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/985f00ad1414af96c1ebef384c4cfd363c1d3c00))
* implement memberlist ([5a416242](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a416242d83b09b4872c340ac5e2758edf6359b8))
*  implement bacenta membership flow ([63336072](https://github.com/firstlovecenter/fl-pastoral-care/commit/63336072a532f7e2cb795ea6cd7e708e6ad50bd2))
*  introduced a cloudinary image component with support for lazy loading and placeholders ([f4c6957e](https://github.com/firstlovecenter/fl-pastoral-care/commit/f4c6957e3547a4c9cfe7b8c9c8cc82e1f08372c1))
*  poimen-12 implemented types for sheep, goat, deer ([64d93bc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/64d93bc5f2a96e27624c25d5d84d430521c02327))
*  graphql ([9b3c7d80](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b3c7d8037b0e48198f151823638287d0e271cc5))
* **membership:**  implemented sheep, deer, goat types for members and bacentas ([5e28c43b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e28c43bd5e4cde27bf297307a47c7f43b242409))

##### Bug Fixes

*  replace the membership graphql name ([557db059](https://github.com/firstlovecenter/fl-pastoral-care/commit/557db0596819b3341d279a7b2038165f01bd842d))
*  merge conflicts from deploy ([644bcf00](https://github.com/firstlovecenter/fl-pastoral-care/commit/644bcf00120959466b9d0467126198fea439f450))
*  merge conflicts from deploy ([c200e633](https://github.com/firstlovecenter/fl-pastoral-care/commit/c200e633f24b891cebc87aeb268dc85588118b98))
*  replaced cloudinary img comp with a transformImage function compatible with Avatar comp ([577e2194](https://github.com/firstlovecenter/fl-pastoral-care/commit/577e2194041e9efd288abfc50fc87419748d3e95))
*  merged member list page with cloudinary commit ([5e38e83e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e38e83e432cf61cc47d95915c02b68f361e38a7))
*  tweaked netlify.toml ([cf3f504c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf3f504ce4e17261328a9998633f813ef7da5e13))
*  took out code that was breaking the deploy ([2bd5ee94](https://github.com/firstlovecenter/fl-pastoral-care/commit/2bd5ee94e908e46a76ccbe012fdd3ae8f02d84b4))
*  poimen-4 Implemented login functionality using auth0 and apollo client ([cbddf09d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cbddf09de45cf5f73285f6cbf25cb6607506e149))
*  implemented login functionality with auth0 provider ([60117f1e](https://github.com/firstlovecenter/fl-pastoral-care/commit/60117f1e4918a84bd2d1576ca7da86a56bdf67c9))
*  partially implemented auth0 wrapper ([0c971f51](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c971f51cb49ffee85b8defbadc305130d0c4337))
*  fixed import statement in graphql.js ([4e3599a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e3599a4fa40a76fbd1caf5ed9d2e1f6a3ff8af4))

##### Other Changes

* //github.com/firstlovecenter/fl-pastoral-care into develop ([76be2301](https://github.com/firstlovecenter/fl-pastoral-care/commit/76be2301063b17be1b628ed2b978c42f6fbcc6a7))
* //github.com/firstlovecenter/fl-pastoral-care into deploy ([61bf14a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/61bf14a28839769b60b5e5e1d798ae2b3cfc1f0e))

##### Refactors

*  resolved peer dependency conflicts with react-loading-overlay ([c02c2a37](https://github.com/firstlovecenter/fl-pastoral-care/commit/c02c2a37630100588c7fd8aae7ea6c3d1970bf27))
*  restructured the front end folder directory ([9fe4a243](https://github.com/firstlovecenter/fl-pastoral-care/commit/9fe4a243d3e3669f7be07ff5c15fb8bb38a1e6b7))

### 0.4.0 (2022-04-20)

##### Chores

*  refactored release.js to eliminate eslint warnings ([2d0e04f1](https://github.com/firstlovecenter/fl-pastoral-care/commit/2d0e04f1ab9c65ddac4653ae163a222566f1ee42))
*  cleaned up dependencies ([b864d8db](https://github.com/firstlovecenter/fl-pastoral-care/commit/b864d8db342b45c6fbed9a1e36a556e426244699))
*  fixed merge conflicts ([4382e47b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4382e47b8acbab67ab30e7bfd141d52eb031df06))
*  updated dependencies ([db7f2c7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/db7f2c7e0437413fb112483c533644a21221e08c))
*  updated lambda function ([0fba922e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0fba922e44046f77547c67c3cafe2ed0c471f005))
*  updateed readme ([21efeff0](https://github.com/firstlovecenter/fl-pastoral-care/commit/21efeff0c6e9e0330ea9f0ac4e92896be7e1bd82))
*  updated graphql package ([36b967ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/36b967ae35808aff104b53d3708bda0bceafa13f))
*  updated @neo4j/graphql library ([9c60cef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/9c60cef0e0076cc57ba1bb1cd8d89f9b6bb49b7e))
*  installed airbnb style guide ([2fbd4525](https://github.com/firstlovecenter/fl-pastoral-care/commit/2fbd452519871e682448be659f086165265310e8))
*  edited readme ([b3622c14](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3622c14959965d1ec0fddf3576a014d7294cb67))
*  edited readme ([5fa4598f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5fa4598fc3e8c22bce9cde5259fd8a02ec3ae16e))

##### Documentation Changes

*  updated CHANGELOG.md ([af3b5035](https://github.com/firstlovecenter/fl-pastoral-care/commit/af3b5035f6f03eee12447e60f0bb5ff84f7ae51e))
*  updated CHANGELOG.md ([3c5a5a61](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c5a5a61e2c3bd8b19f28430f814de685191ae37))

##### New Features

*  implement membership and dashboard pages ([dd0c5fce](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd0c5fcee1899c1a9a95b6b6305dd8b3b56b02ea))
*  fix login issue ([06f895cb](https://github.com/firstlovecenter/fl-pastoral-care/commit/06f895cbb1e27eb31dd37c5c8c8b9ee6214418c6))
* implement memberlist ([2a47e86c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a47e86c116b739ac4977ac89029acdbefcb51cb))
*  implement bacenta membership flow ([985f00ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/985f00ad1414af96c1ebef384c4cfd363c1d3c00))
* implement memberlist ([5a416242](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a416242d83b09b4872c340ac5e2758edf6359b8))
*  implement bacenta membership flow ([63336072](https://github.com/firstlovecenter/fl-pastoral-care/commit/63336072a532f7e2cb795ea6cd7e708e6ad50bd2))
*  introduced a cloudinary image component with support for lazy loading and placeholders ([f4c6957e](https://github.com/firstlovecenter/fl-pastoral-care/commit/f4c6957e3547a4c9cfe7b8c9c8cc82e1f08372c1))
*  poimen-12 implemented types for sheep, goat, deer ([64d93bc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/64d93bc5f2a96e27624c25d5d84d430521c02327))
*  graphql ([9b3c7d80](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b3c7d8037b0e48198f151823638287d0e271cc5))
* **membership:**  implemented sheep, deer, goat types for members and bacentas ([5e28c43b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e28c43bd5e4cde27bf297307a47c7f43b242409))

##### Bug Fixes

*  replace the membership graphql name ([557db059](https://github.com/firstlovecenter/fl-pastoral-care/commit/557db0596819b3341d279a7b2038165f01bd842d))
*  merge conflicts from deploy ([644bcf00](https://github.com/firstlovecenter/fl-pastoral-care/commit/644bcf00120959466b9d0467126198fea439f450))
*  merge conflicts from deploy ([c200e633](https://github.com/firstlovecenter/fl-pastoral-care/commit/c200e633f24b891cebc87aeb268dc85588118b98))
*  replaced cloudinary img comp with a transformImage function compatible with Avatar comp ([577e2194](https://github.com/firstlovecenter/fl-pastoral-care/commit/577e2194041e9efd288abfc50fc87419748d3e95))
*  merged member list page with cloudinary commit ([5e38e83e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e38e83e432cf61cc47d95915c02b68f361e38a7))
*  tweaked netlify.toml ([cf3f504c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf3f504ce4e17261328a9998633f813ef7da5e13))
*  took out code that was breaking the deploy ([2bd5ee94](https://github.com/firstlovecenter/fl-pastoral-care/commit/2bd5ee94e908e46a76ccbe012fdd3ae8f02d84b4))
*  poimen-4 Implemented login functionality using auth0 and apollo client ([cbddf09d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cbddf09de45cf5f73285f6cbf25cb6607506e149))
*  implemented login functionality with auth0 provider ([60117f1e](https://github.com/firstlovecenter/fl-pastoral-care/commit/60117f1e4918a84bd2d1576ca7da86a56bdf67c9))
*  partially implemented auth0 wrapper ([0c971f51](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c971f51cb49ffee85b8defbadc305130d0c4337))
*  fixed import statement in graphql.js ([4e3599a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e3599a4fa40a76fbd1caf5ed9d2e1f6a3ff8af4))

##### Other Changes

* //github.com/firstlovecenter/fl-pastoral-care into develop ([76be2301](https://github.com/firstlovecenter/fl-pastoral-care/commit/76be2301063b17be1b628ed2b978c42f6fbcc6a7))
* //github.com/firstlovecenter/fl-pastoral-care into deploy ([61bf14a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/61bf14a28839769b60b5e5e1d798ae2b3cfc1f0e))

##### Refactors

*  resolved peer dependency conflicts with react-loading-overlay ([c02c2a37](https://github.com/firstlovecenter/fl-pastoral-care/commit/c02c2a37630100588c7fd8aae7ea6c3d1970bf27))
*  restructured the front end folder directory ([9fe4a243](https://github.com/firstlovecenter/fl-pastoral-care/commit/9fe4a243d3e3669f7be07ff5c15fb8bb38a1e6b7))

### 0.4.0 (2022-04-20)

##### Chores

*  refactored release.js to eliminate eslint warnings ([2d0e04f1](https://github.com/firstlovecenter/fl-pastoral-care/commit/2d0e04f1ab9c65ddac4653ae163a222566f1ee42))
*  cleaned up dependencies ([b864d8db](https://github.com/firstlovecenter/fl-pastoral-care/commit/b864d8db342b45c6fbed9a1e36a556e426244699))
*  fixed merge conflicts ([4382e47b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4382e47b8acbab67ab30e7bfd141d52eb031df06))
*  updated dependencies ([db7f2c7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/db7f2c7e0437413fb112483c533644a21221e08c))
*  updated lambda function ([0fba922e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0fba922e44046f77547c67c3cafe2ed0c471f005))
*  updateed readme ([21efeff0](https://github.com/firstlovecenter/fl-pastoral-care/commit/21efeff0c6e9e0330ea9f0ac4e92896be7e1bd82))
*  updated graphql package ([36b967ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/36b967ae35808aff104b53d3708bda0bceafa13f))
*  updated @neo4j/graphql library ([9c60cef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/9c60cef0e0076cc57ba1bb1cd8d89f9b6bb49b7e))
*  installed airbnb style guide ([2fbd4525](https://github.com/firstlovecenter/fl-pastoral-care/commit/2fbd452519871e682448be659f086165265310e8))
*  edited readme ([b3622c14](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3622c14959965d1ec0fddf3576a014d7294cb67))
*  edited readme ([5fa4598f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5fa4598fc3e8c22bce9cde5259fd8a02ec3ae16e))

##### Documentation Changes

*  updated CHANGELOG.md ([3c5a5a61](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c5a5a61e2c3bd8b19f28430f814de685191ae37))

##### New Features

*  implement membership and dashboard pages ([dd0c5fce](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd0c5fcee1899c1a9a95b6b6305dd8b3b56b02ea))
*  fix login issue ([06f895cb](https://github.com/firstlovecenter/fl-pastoral-care/commit/06f895cbb1e27eb31dd37c5c8c8b9ee6214418c6))
* implement memberlist ([2a47e86c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a47e86c116b739ac4977ac89029acdbefcb51cb))
*  implement bacenta membership flow ([985f00ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/985f00ad1414af96c1ebef384c4cfd363c1d3c00))
* implement memberlist ([5a416242](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a416242d83b09b4872c340ac5e2758edf6359b8))
*  implement bacenta membership flow ([63336072](https://github.com/firstlovecenter/fl-pastoral-care/commit/63336072a532f7e2cb795ea6cd7e708e6ad50bd2))
*  introduced a cloudinary image component with support for lazy loading and placeholders ([f4c6957e](https://github.com/firstlovecenter/fl-pastoral-care/commit/f4c6957e3547a4c9cfe7b8c9c8cc82e1f08372c1))
*  poimen-12 implemented types for sheep, goat, deer ([64d93bc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/64d93bc5f2a96e27624c25d5d84d430521c02327))
*  graphql ([9b3c7d80](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b3c7d8037b0e48198f151823638287d0e271cc5))
* **membership:**  implemented sheep, deer, goat types for members and bacentas ([5e28c43b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e28c43bd5e4cde27bf297307a47c7f43b242409))

##### Bug Fixes

*  replace the membership graphql name ([557db059](https://github.com/firstlovecenter/fl-pastoral-care/commit/557db0596819b3341d279a7b2038165f01bd842d))
*  merge conflicts from deploy ([644bcf00](https://github.com/firstlovecenter/fl-pastoral-care/commit/644bcf00120959466b9d0467126198fea439f450))
*  merge conflicts from deploy ([c200e633](https://github.com/firstlovecenter/fl-pastoral-care/commit/c200e633f24b891cebc87aeb268dc85588118b98))
*  replaced cloudinary img comp with a transformImage function compatible with Avatar comp ([577e2194](https://github.com/firstlovecenter/fl-pastoral-care/commit/577e2194041e9efd288abfc50fc87419748d3e95))
*  merged member list page with cloudinary commit ([5e38e83e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e38e83e432cf61cc47d95915c02b68f361e38a7))
*  tweaked netlify.toml ([cf3f504c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf3f504ce4e17261328a9998633f813ef7da5e13))
*  took out code that was breaking the deploy ([2bd5ee94](https://github.com/firstlovecenter/fl-pastoral-care/commit/2bd5ee94e908e46a76ccbe012fdd3ae8f02d84b4))
*  poimen-4 Implemented login functionality using auth0 and apollo client ([cbddf09d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cbddf09de45cf5f73285f6cbf25cb6607506e149))
*  implemented login functionality with auth0 provider ([60117f1e](https://github.com/firstlovecenter/fl-pastoral-care/commit/60117f1e4918a84bd2d1576ca7da86a56bdf67c9))
*  partially implemented auth0 wrapper ([0c971f51](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c971f51cb49ffee85b8defbadc305130d0c4337))
*  fixed import statement in graphql.js ([4e3599a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e3599a4fa40a76fbd1caf5ed9d2e1f6a3ff8af4))

##### Other Changes

* //github.com/firstlovecenter/fl-pastoral-care into develop ([76be2301](https://github.com/firstlovecenter/fl-pastoral-care/commit/76be2301063b17be1b628ed2b978c42f6fbcc6a7))
* //github.com/firstlovecenter/fl-pastoral-care into deploy ([61bf14a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/61bf14a28839769b60b5e5e1d798ae2b3cfc1f0e))

##### Refactors

*  resolved peer dependency conflicts with react-loading-overlay ([c02c2a37](https://github.com/firstlovecenter/fl-pastoral-care/commit/c02c2a37630100588c7fd8aae7ea6c3d1970bf27))
*  restructured the front end folder directory ([9fe4a243](https://github.com/firstlovecenter/fl-pastoral-care/commit/9fe4a243d3e3669f7be07ff5c15fb8bb38a1e6b7))

### 0.4.0 (2022-04-20)

##### Chores

*  refactored release.js to eliminate eslint warnings ([2d0e04f1](https://github.com/firstlovecenter/fl-pastoral-care/commit/2d0e04f1ab9c65ddac4653ae163a222566f1ee42))
*  cleaned up dependencies ([b864d8db](https://github.com/firstlovecenter/fl-pastoral-care/commit/b864d8db342b45c6fbed9a1e36a556e426244699))
*  fixed merge conflicts ([4382e47b](https://github.com/firstlovecenter/fl-pastoral-care/commit/4382e47b8acbab67ab30e7bfd141d52eb031df06))
*  updated dependencies ([db7f2c7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/db7f2c7e0437413fb112483c533644a21221e08c))
*  updated lambda function ([0fba922e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0fba922e44046f77547c67c3cafe2ed0c471f005))
*  updateed readme ([21efeff0](https://github.com/firstlovecenter/fl-pastoral-care/commit/21efeff0c6e9e0330ea9f0ac4e92896be7e1bd82))
*  updated graphql package ([36b967ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/36b967ae35808aff104b53d3708bda0bceafa13f))
*  updated @neo4j/graphql library ([9c60cef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/9c60cef0e0076cc57ba1bb1cd8d89f9b6bb49b7e))
*  installed airbnb style guide ([2fbd4525](https://github.com/firstlovecenter/fl-pastoral-care/commit/2fbd452519871e682448be659f086165265310e8))
*  edited readme ([b3622c14](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3622c14959965d1ec0fddf3576a014d7294cb67))
*  edited readme ([5fa4598f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5fa4598fc3e8c22bce9cde5259fd8a02ec3ae16e))

##### New Features

*  implement membership and dashboard pages ([dd0c5fce](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd0c5fcee1899c1a9a95b6b6305dd8b3b56b02ea))
*  fix login issue ([06f895cb](https://github.com/firstlovecenter/fl-pastoral-care/commit/06f895cbb1e27eb31dd37c5c8c8b9ee6214418c6))
* implement memberlist ([2a47e86c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a47e86c116b739ac4977ac89029acdbefcb51cb))
*  implement bacenta membership flow ([985f00ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/985f00ad1414af96c1ebef384c4cfd363c1d3c00))
* implement memberlist ([5a416242](https://github.com/firstlovecenter/fl-pastoral-care/commit/5a416242d83b09b4872c340ac5e2758edf6359b8))
*  implement bacenta membership flow ([63336072](https://github.com/firstlovecenter/fl-pastoral-care/commit/63336072a532f7e2cb795ea6cd7e708e6ad50bd2))
*  introduced a cloudinary image component with support for lazy loading and placeholders ([f4c6957e](https://github.com/firstlovecenter/fl-pastoral-care/commit/f4c6957e3547a4c9cfe7b8c9c8cc82e1f08372c1))
*  poimen-12 implemented types for sheep, goat, deer ([64d93bc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/64d93bc5f2a96e27624c25d5d84d430521c02327))
*  graphql ([9b3c7d80](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b3c7d8037b0e48198f151823638287d0e271cc5))
* **membership:**  implemented sheep, deer, goat types for members and bacentas ([5e28c43b](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e28c43bd5e4cde27bf297307a47c7f43b242409))

##### Bug Fixes

*  replace the membership graphql name ([557db059](https://github.com/firstlovecenter/fl-pastoral-care/commit/557db0596819b3341d279a7b2038165f01bd842d))
*  merge conflicts from deploy ([644bcf00](https://github.com/firstlovecenter/fl-pastoral-care/commit/644bcf00120959466b9d0467126198fea439f450))
*  merge conflicts from deploy ([c200e633](https://github.com/firstlovecenter/fl-pastoral-care/commit/c200e633f24b891cebc87aeb268dc85588118b98))
*  replaced cloudinary img comp with a transformImage function compatible with Avatar comp ([577e2194](https://github.com/firstlovecenter/fl-pastoral-care/commit/577e2194041e9efd288abfc50fc87419748d3e95))
*  merged member list page with cloudinary commit ([5e38e83e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e38e83e432cf61cc47d95915c02b68f361e38a7))
*  tweaked netlify.toml ([cf3f504c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cf3f504ce4e17261328a9998633f813ef7da5e13))
*  took out code that was breaking the deploy ([2bd5ee94](https://github.com/firstlovecenter/fl-pastoral-care/commit/2bd5ee94e908e46a76ccbe012fdd3ae8f02d84b4))
*  poimen-4 Implemented login functionality using auth0 and apollo client ([cbddf09d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cbddf09de45cf5f73285f6cbf25cb6607506e149))
*  implemented login functionality with auth0 provider ([60117f1e](https://github.com/firstlovecenter/fl-pastoral-care/commit/60117f1e4918a84bd2d1576ca7da86a56bdf67c9))
*  partially implemented auth0 wrapper ([0c971f51](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c971f51cb49ffee85b8defbadc305130d0c4337))
*  fixed import statement in graphql.js ([4e3599a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/4e3599a4fa40a76fbd1caf5ed9d2e1f6a3ff8af4))

##### Other Changes

* //github.com/firstlovecenter/fl-pastoral-care into develop ([76be2301](https://github.com/firstlovecenter/fl-pastoral-care/commit/76be2301063b17be1b628ed2b978c42f6fbcc6a7))
* //github.com/firstlovecenter/fl-pastoral-care into deploy ([61bf14a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/61bf14a28839769b60b5e5e1d798ae2b3cfc1f0e))

##### Refactors

*  resolved peer dependency conflicts with react-loading-overlay ([c02c2a37](https://github.com/firstlovecenter/fl-pastoral-care/commit/c02c2a37630100588c7fd8aae7ea6c3d1970bf27))
*  restructured the front end folder directory ([9fe4a243](https://github.com/firstlovecenter/fl-pastoral-care/commit/9fe4a243d3e3669f7be07ff5c15fb8bb38a1e6b7))

#### 0.3.7 (2022-02-08)

##### Chores

*  updated eslint config ([cc8397f4](https://github.com/firstlovecenter/fl-pastoral-care/commit/cc8397f43a690565b5d1383f06d5f138277bfee9))
*  updated netlify badge ([42895ad4](https://github.com/firstlovecenter/fl-pastoral-care/commit/42895ad4e85707a8e44f8a8c06eb41378b83ecbe))
*  updated readme ([d88a4ed6](https://github.com/firstlovecenter/fl-pastoral-care/commit/d88a4ed61b8bdb696f5fc634b00390a1850534e3))
*  updated readme ([50a460b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/50a460b4b6d9525f622c58c95518973b32346bd1))
*  updated the husky config ([5c79f4b5](https://github.com/firstlovecenter/fl-pastoral-care/commit/5c79f4b5237a4833a9d2b62c72219a9b8d6e303e))

##### Bug Fixes

*  implemented membership and church types FPC-10 ([f5bfefa0](https://github.com/firstlovecenter/fl-pastoral-care/commit/f5bfefa0ef298ad881653e3c41a584ae81ec6a19))

#### 0.3.6 (2022-02-08)

