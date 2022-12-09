#### 5.3.20 (2022-12-09)

##### Bug Fixes

*  clean up flow for self banking for constituencies ([7e96c840](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e96c840ab76df39aa035b71285546f0f0ecb45f))

#### 5.3.19 (2022-12-09)

##### Bug Fixes

*  solve issue where constituency transactionStatuses were not showing ([1ecc6db8](https://github.com/firstlovecenter/fl-pastoral-care/commit/1ecc6db88b1f6385b2a5ea2454797717222efb9a))

#### 5.3.18 (2022-12-09)

##### Bug Fixes

*  add backend permissions for constituency admin to use self banking ([448aa3b9](https://github.com/firstlovecenter/fl-pastoral-care/commit/448aa3b9c8e9c9fbba944a3f2c7b5aa33452d04a))
*  remove trailing decimal on charges ([4afc5673](https://github.com/firstlovecenter/fl-pastoral-care/commit/4afc5673561a0c4cd3c0b433b735f3e9197f7f7d))

#### 5.3.17 (2022-12-09)

##### Bug Fixes

*  update permissions for adminConstituency to do self banking for constituency services ([0e3ac794](https://github.com/firstlovecenter/fl-pastoral-care/commit/0e3ac7949275b51e75d8b0ec4ccd98cba4c024d8))

#### 5.3.16 (2022-12-09)

##### Bug Fixes

*  fix breaking change in incomeCharges data type ([dd898e7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd898e7e41cc151628ff80ec9866c25c17437629))
*  remove trailing decimals on charges, round to 2 dp ([9acac02c](https://github.com/firstlovecenter/fl-pastoral-care/commit/9acac02c5ed4936ee85dd16b3e395cd5ed743867))
*  allow RemoveServant cypher to run when closing down bacenta and constituency ([a4777415](https://github.com/firstlovecenter/fl-pastoral-care/commit/a47774156a500d89dba3486882a3d6a8c4dd4948))
*  allow RemoveServant cypher to run when closing down fellowship ([38ca1e07](https://github.com/firstlovecenter/fl-pastoral-care/commit/38ca1e0774e3ba2bc9025306e24918bfaa617318))
*  update permissions so that all roles can update emails ([d24eff83](https://github.com/firstlovecenter/fl-pastoral-care/commit/d24eff83ca841fab078fd5689abfc3c1558bcc87))
*  implement initialisation of pastoral care values when creating members ([ee367d4b](https://github.com/firstlovecenter/fl-pastoral-care/commit/ee367d4be900c53925302c634a1198576a7774e2))

#### 5.3.15 (2022-12-07)

##### Chores

*  version bump ([c157684e](https://github.com/firstlovecenter/fl-pastoral-care/commit/c157684e58fe97d69ce9b8868929ddd77ec0aa6a))

##### New Features

*  automate bacenta status ([766d44d8](https://github.com/firstlovecenter/fl-pastoral-care/commit/766d44d81b88b1241d528732e53c03fbd1c0b478))
*  automate bacenta status ([634f1763](https://github.com/firstlovecenter/fl-pastoral-care/commit/634f1763f0aa8eef38a94edb6913a5aad6688576))
*  automate bacenta status ([5e124af2](https://github.com/firstlovecenter/fl-pastoral-care/commit/5e124af2cc7d35262cbcfaa31c159d19e3f65c29))
*  set-bacenta-status ([0621c8aa](https://github.com/firstlovecenter/fl-pastoral-care/commit/0621c8aa3cdf14c5dc0e57b542492c84ea6a8415))
*  resolvers for set-bacenta-status ([ad56a890](https://github.com/firstlovecenter/fl-pastoral-care/commit/ad56a890addf4f47ea72894cd4a5a803d421690a))
*  set bacenta status to IC or graduated ([8da3e61f](https://github.com/firstlovecenter/fl-pastoral-care/commit/8da3e61f7768dd0644b4114e2ee6e205df9d2776))

##### Bug Fixes

*  resolve merge conflict merging automated bacenta status ([ffe11920](https://github.com/firstlovecenter/fl-pastoral-care/commit/ffe11920511445b45272eed81c9b3ad471c9447f))
*  resolve merge conflict merging deploy into pr 355 ([4ac4ee0f](https://github.com/firstlovecenter/fl-pastoral-care/commit/4ac4ee0f8ba38b6a59af99c8ef4c28a93dd8998a))
*  fix bug preventing teller and sheep seekers from being removed final ([9cca4090](https://github.com/firstlovecenter/fl-pastoral-care/commit/9cca40901095bba57f1faff2b7ad2717a514d49f))
*  fix bug preventing teller and sheep seekers from being removed ([be136933](https://github.com/firstlovecenter/fl-pastoral-care/commit/be13693332cf1246bda810b0a21b15b5c1352c5f))
*  solve issue where people  can't self bank constituency services ([b0d0000f](https://github.com/firstlovecenter/fl-pastoral-care/commit/b0d0000f3567a17b1b7ac62dd58e9b48f7771a4c))
*  remove unused import in bacentaform.tsx ([64c15d22](https://github.com/firstlovecenter/fl-pastoral-care/commit/64c15d2299446d4949987ede787920dc2e273931))
*  remove option to change bacenta status from bacenta update form ([a7e7a18d](https://github.com/firstlovecenter/fl-pastoral-care/commit/a7e7a18d8d42bf33e3b30746e3a20704fce13182))
*  merge conflicts by accepting changes from remote ([afb338eb](https://github.com/firstlovecenter/fl-pastoral-care/commit/afb338ebb2b2f9065493c84a51d236f7ce349478))
*  cypher query to check if member exists ([25f06424](https://github.com/firstlovecenter/fl-pastoral-care/commit/25f06424e3d8ccfe8aea65b4ce366004bb0caf50))

#### 5.3.9 (2022-12-04)

##### Bug Fixes

*  remove non alphanumeric characters from image filename ([2088c868](https://github.com/firstlovecenter/fl-pastoral-care/commit/2088c868e4831b7ffef9a4f2302310d9a3e7acf9))
*  fix bug preventing council arrivals admins from being  changed ([8eb0a34b](https://github.com/firstlovecenter/fl-pastoral-care/commit/8eb0a34b860bbbe1ec0e2d8c41a60ad15023e58a))

#### 5.3.8 (2022-12-04)

##### New Features

*  support search for leaders as well as churches in churchSearch ([37310fcb](https://github.com/firstlovecenter/fl-pastoral-care/commit/37310fcbfaf8778b784ae807453f491eb028e51a))
*  add banking slip to multiplication details page ([b44a7722](https://github.com/firstlovecenter/fl-pastoral-care/commit/b44a77220fd3c41b36ed45ac719d7d24ae8e7e69))
*  implement upload multiplication banking receipts ([fbe9acb2](https://github.com/firstlovecenter/fl-pastoral-care/commit/fbe9acb242a8402f462abab00bdd05e77d49c653))
*  admin-448 mutation for uploading banking slip ([4abc1e83](https://github.com/firstlovecenter/fl-pastoral-care/commit/4abc1e83215740e6e8d0abf401823ca92b899cfe))

##### Bug Fixes

*  add in support for holy ghost encounter ([3d37eada](https://github.com/firstlovecenter/fl-pastoral-care/commit/3d37eadab27483dea0c2d29ab5dbfc1b88c32106))
*  add bankingSlip property to multiplication record ([f89748d4](https://github.com/firstlovecenter/fl-pastoral-care/commit/f89748d40a68ef770b89e25d14239c3b214a3c4c))
*  correct query name mistake in multiplication queries ([cd291017](https://github.com/firstlovecenter/fl-pastoral-care/commit/cd29101735b544cbe98c330e4474ed9b6fb6d01e))

#### 5.3.7 (2022-12-01)

##### New Features

*  implement multiplication crusade trends ([#353](https://github.com/firstlovecenter/fl-pastoral-care/pull/353)) ([13bffea1](https://github.com/firstlovecenter/fl-pastoral-care/commit/13bffea1fab26f041c2a1c835d3af0d9aa4cb9e3))

##### Bug Fixes

*  fix bug where roles of old admins were not being removed ([e97fc758](https://github.com/firstlovecenter/fl-pastoral-care/commit/e97fc7587e8e6aa9eefa3093e30c38529a21d744))
*  improve width for form attendance confirmation picture ([01c59645](https://github.com/firstlovecenter/fl-pastoral-care/commit/01c59645ea38a692255a7801a519637dadcfe66c))

#### 5.3.6 (2022-11-26)

#### 5.3.5 (2022-11-26)

##### Bug Fixes

*  implement padding for vehicle form details ([1662b083](https://github.com/firstlovecenter/fl-pastoral-care/commit/1662b083b78a0b258259b1348672f387818cf9a0))
*  prevent people from filling vehicle data using the time change hack on the client ([53c945a2](https://github.com/firstlovecenter/fl-pastoral-care/commit/53c945a2ba5163aa23e37cbc58ebc07df528d446))
*  add time form was filled to vehicle count ([dd2defca](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd2defca617abdc75320304e2230737b64d0361b))

##### Other Changes

* //github.com/firstlovecenter/fl-admin-portal into deploy ([f81e1bb7](https://github.com/firstlovecenter/fl-pastoral-care/commit/f81e1bb744aed2ccde7b17d9661808f767bcefdf))

#### 5.3.4 (2022-11-26)

##### Bug Fixes

*  remove bug preventing viewing self banking details ([617f2296](https://github.com/firstlovecenter/fl-pastoral-care/commit/617f2296141062ef802798935b16295ac59a304b))
*  improve padding on service details page ([6e129344](https://github.com/firstlovecenter/fl-pastoral-care/commit/6e129344168b1e3b24851b4935da8b594f68cf8e))
*  implement padding for vehicle details ([e358c6f2](https://github.com/firstlovecenter/fl-pastoral-care/commit/e358c6f2a13d6b3408c4b299ddaae1b166f054ec))
*  enable deleting arrivals counters ([3c20f46d](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c20f46d7f1933d3c067cdae39710628d223442c))
*  fix bug in submit banking slip function ([c62f8c98](https://github.com/firstlovecenter/fl-pastoral-care/commit/c62f8c98870eb3a1a99ed2bdc3623983ceb14d52))
*  fix sentry error reporting error when it should display a user message ([f94355c2](https://github.com/firstlovecenter/fl-pastoral-care/commit/f94355c2e750ca7591129a7d913bafe94e31a8a6))
*  adjust image size for vehicle pictures ([801005d3](https://github.com/firstlovecenter/fl-pastoral-care/commit/801005d3e6b4ff32b5346a6355b6950534d1c97d))
*  fix error where service from the same week but different year were added to aggregate ([86b3b959](https://github.com/firstlovecenter/fl-pastoral-care/commit/86b3b959920253acf58cad325bd817bda16680f1))
*  fix error calculating self banking charges to the 2nd decimal place ([e32a699c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e32a699c3e056d3180b0ead7a28d8c01bb7100f3))
*  remove block button on service details page ([4f145563](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f145563200a5c9c3bd200795c33bc5e5617d141))
*  remove typedef breakiing the build ([e34cf863](https://github.com/firstlovecenter/fl-pastoral-care/commit/e34cf863e5afb36bf7182ce65a5f8af8375e52dc))
*  downgrade npm packages ([bbd2b601](https://github.com/firstlovecenter/fl-pastoral-care/commit/bbd2b601b612d2b5a079d0b7ca80a25eee2fc1b3))
*  implement block button for viewing banking details ([e96dcfef](https://github.com/firstlovecenter/fl-pastoral-care/commit/e96dcfefdfd3638e814c8bab1030517d53e9278d))

#### 5.3.3 (2022-11-23)

##### Chores

*  update package-lock.json file ([00e3b858](https://github.com/firstlovecenter/fl-pastoral-care/commit/00e3b858d809db8179212068c12dcbad99366b86))

##### Bug Fixes

*  implement validation for momo  number on offering payment ([9a8f6ae7](https://github.com/firstlovecenter/fl-pastoral-care/commit/9a8f6ae7a0d3713045e4e674691dcd5152e60cb6))

#### 5.3.2 (2022-11-22)

##### New Features

*  implement apollo client query retry ([ab2504ab](https://github.com/firstlovecenter/fl-pastoral-care/commit/ab2504ab8895bf9a506401fee1e2f469780bdf2b))

##### Bug Fixes

*  remove functionality to report to sentry when a query returns no data ([dcdfe32d](https://github.com/firstlovecenter/fl-pastoral-care/commit/dcdfe32d6cb5e7ebe5f2d7572a0576c271fd3b7c))

#### 5.3.1 (2022-11-20)

##### New Features

*  implement visible charges when using the self banking feature ([db940ba6](https://github.com/firstlovecenter/fl-pastoral-care/commit/db940ba6565a44d4ebb9ec828eadecb95b8e11d3))

##### Bug Fixes

*  make all members leaders ([d248278b](https://github.com/firstlovecenter/fl-pastoral-care/commit/d248278b9676437b0f07b01445fab34c5edc846f))
*  add momo name to arrivals payment excel sheet ([c1039261](https://github.com/firstlovecenter/fl-pastoral-care/commit/c1039261dcafc2f4b864e371a19ec47caace13ec))
*  order arrivals payment sheet by society ([7e2e8eb3](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e2e8eb3b98d311e77d73c2bf7b0e748dacf2c63))
*  add momo number to arrivals payment excel sheet ([2c2f0497](https://github.com/firstlovecenter/fl-pastoral-care/commit/2c2f0497a447eac980f4dc9541a96d32635b7c58))
*  remove unnecessary comma from before next update file ([471d1f91](https://github.com/firstlovecenter/fl-pastoral-care/commit/471d1f9153b752d4e4c213990665e55827cf37e7))
*  change bacenta.bacentaCode property on bacenta to bacenta.code ([20598d23](https://github.com/firstlovecenter/fl-pastoral-care/commit/20598d235a912fdd08beddcf04883861362070e4))
*  import bacenta codes from Lp Ivy's list ([86008015](https://github.com/firstlovecenter/fl-pastoral-care/commit/86008015e4dbcf280fe24b11c5ba9e341631a6ef))
*  update banking slip mutation so that admins can use it ([ff4272f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/ff4272f814ca3423ecb10fd1a3f9950c4ec2af8d))
*  capitalise arrivals payment data filename ([51b3f0c0](https://github.com/firstlovecenter/fl-pastoral-care/commit/51b3f0c0a26c5749df5c36664880bf97b31b7de8))
*  update code that forms leader relationships ([a0916ec1](https://github.com/firstlovecenter/fl-pastoral-care/commit/a0916ec1563e3af171d6a7a1049b9aca46f53f64))
*  remove unnecessary code in setupDevInstance ([53e9511c](https://github.com/firstlovecenter/fl-pastoral-care/commit/53e9511c2be1fd37403eea034f76ad2d536ae1c4))

### 5.3.0 (2022-11-18)

##### New Features

*  implement a table in the frontend to display the data for the bussing of that day ([d5ff00aa](https://github.com/firstlovecenter/fl-pastoral-care/commit/d5ff00aaf797641a4b81b979b63041683ad866fd))
*  admin-418 add cypher to retrieve bussing data per stream ([5bf39c21](https://github.com/firstlovecenter/fl-pastoral-care/commit/5bf39c21dc9d1f2f6d4b1d8c00be57c98cfeb7e2))
*  admin-416 add cypher to import bussing topups ([f01af476](https://github.com/firstlovecenter/fl-pastoral-care/commit/f01af476abe4abb0c871c7172de3a35c6c197da0))
*  admin-417 add cypher to create bussing society nodes ([9a59e271](https://github.com/firstlovecenter/fl-pastoral-care/commit/9a59e271e2e5bafc2a685db8fad6720387961fe5))
*  admin-415 add town codes  and edit createbacenta mutation to create codes for new bacentas ([ef7e2819](https://github.com/firstlovecenter/fl-pastoral-care/commit/ef7e2819fd77668812a3001c0f4797d3fd53ce07))

##### Bug Fixes

*  fix error in resolvers.ts where stream resolvers was being overwritten ([67f8b170](https://github.com/firstlovecenter/fl-pastoral-care/commit/67f8b170423ea105c5ef50b9964432baf46697e1))
*  clean up cypher query for fetching bussing data ([85539891](https://github.com/firstlovecenter/fl-pastoral-care/commit/855398911eb544b297b5e00ab35cb16f12247983))
*  remove unused comments ([7c2f07f4](https://github.com/firstlovecenter/fl-pastoral-care/commit/7c2f07f4772095b6ce4964267206b0adbefb9fa2))
*  implement fix for rearrangeCypher Object to return table-like data as an array of objects ([657673a7](https://github.com/firstlovecenter/fl-pastoral-care/commit/657673a7a1a2d6fe6f1976e76faafe79301b34eb))

#### 5.2.13 (2022-11-18)

##### New Features

*  admin-422 add cypher scripts for members and churches in test env script ([79688e24](https://github.com/firstlovecenter/fl-pastoral-care/commit/79688e2468361b6ffa4724755ff0f34558ddf65a))
*  admin-430 replace telepastoring with shepherding control from bacenta upwards ([a312c4f7](https://github.com/firstlovecenter/fl-pastoral-care/commit/a312c4f7e68f716d3e55011c5e3a402afdb3baa1))

##### Bug Fixes

*  edit mutation so that users can really register members without emails ([485d84f2](https://github.com/firstlovecenter/fl-pastoral-care/commit/485d84f20195562fa16074c1b71e4ef6d3e6e8f0))
*  add Martha Adomako's email to list of testers ([30c64452](https://github.com/firstlovecenter/fl-pastoral-care/commit/30c64452a39bb2beed41d07b4ce64771c972c676))

#### 5.2.12 (2022-11-11)

##### Bug Fixes

*  fix issue where joint service calculation was getting mangled ([df3d2a32](https://github.com/firstlovecenter/fl-pastoral-care/commit/df3d2a32385e85593c14982c5c1373e6973eb214))

#### 5.2.11 (2022-11-09)

##### Bug Fixes

*  fix issue where joint services where not being added in aggregate service record ([afbfffa4](https://github.com/firstlovecenter/fl-pastoral-care/commit/afbfffa4269acd8bc26edf3ef9103a4d6f697f87))
*  fix broken link to sheep seeking graphql file ([fdfbca89](https://github.com/firstlovecenter/fl-pastoral-care/commit/fdfbca89c15c73faf71c6028b443efc6ff18c3b9))

#### 5.2.10 (2022-11-08)

##### Chores

*  edited readme file ([45f3c75c](https://github.com/firstlovecenter/fl-pastoral-care/commit/45f3c75c2cdb841bc911c1ae427d5e298cb21353))

##### New Features

*  add a sheep seeker flow to the frontend ([9ac69447](https://github.com/firstlovecenter/fl-pastoral-care/commit/9ac694473d57a7abb761cfdbfe5bdcd15d70080d))
*  add sheep seeking campaign to list of campaings from stream upwards ([ddb40e33](https://github.com/firstlovecenter/fl-pastoral-care/commit/ddb40e33581f5ae8bcfeff5e45eba0ab85e2469f))
*  add make and remove stream sheep seeker mutations ([10432c9d](https://github.com/firstlovecenter/fl-pastoral-care/commit/10432c9d75324a1a81492be1265fb92e3ef6a2e4))

##### Bug Fixes

*  fixed 'no bussing details' crash' ([1e3686e0](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e3686e07d96aa393389d64a6eb38443ebf0fc45))
*  adjust image dimensions for vehicle pictures ([a6c4a4fc](https://github.com/firstlovecenter/fl-pastoral-care/commit/a6c4a4fc1bcb4dde5ef71ca2a5f8ce24f1446073))
*  remove email as an optional field for registering members ([ec67822c](https://github.com/firstlovecenter/fl-pastoral-care/commit/ec67822c6497fa248730eb92d3102d97ec88bbc6))
*  cypher query to check if member exists ([4c087da8](https://github.com/firstlovecenter/fl-pastoral-care/commit/4c087da83b9042e62abd01a4af1e30d93329f33e))
*  remove scheduled-data aggregation function ([8da6576b](https://github.com/firstlovecenter/fl-pastoral-care/commit/8da6576b760422c282e0d5605692f4f654c073ca))
*  optimise ux flow for send otp ([bcd2633b](https://github.com/firstlovecenter/fl-pastoral-care/commit/bcd2633b199912f7afb1cc7c6252de83df0f324d))
*  implement handling for abandoned transactions ([5bb5be2f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5bb5be2f30207655f98a37db4564727d04d05a77))
*  remove placeholder loading for council, stream, gathering pages ([d7ea1c44](https://github.com/firstlovecenter/fl-pastoral-care/commit/d7ea1c44ce5a383d2e0aaf59e9b7d2e8e1b06ddb))

##### Refactors

*  rename sheep-seeking.graphql to campaigns-sheep-seeking.graphql ([b3b901f2](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3b901f2c8789da1f2c1dad6068c75a6139694b0))

#### 5.2.9 (2022-10-30)

##### Bug Fixes

*  remove tilde from image filenames being uploaded ([97a1bc22](https://github.com/firstlovecenter/fl-pastoral-care/commit/97a1bc223f3e2de71e040355d0eb6aa932ca3815))
*  fix bug preventing seconds from showing when value is 0 ([a140fa7b](https://github.com/firstlovecenter/fl-pastoral-care/commit/a140fa7bd1b02541a57878436a5d2151527163ff))

#### 5.2.8 (2022-10-29)

##### Bug Fixes

*  prefer <> to <React.Fragment> syntax ([ab58d4be](https://github.com/firstlovecenter/fl-pastoral-care/commit/ab58d4bee33dd34e24a01e36a569deab839b0d93))
*  place loader in the pop up on confirm anagkazo banking page ([dace8d1b](https://github.com/firstlovecenter/fl-pastoral-care/commit/dace8d1b526484060539c230a0c5287b67052db9))
*  add ability to handle abandoned state ([0f9a3db7](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f9a3db7947613bee1abd8e0aecd262d5a256786))
*  fix check already filled cypher for services to also check for year ([fff1eebe](https://github.com/firstlovecenter/fl-pastoral-care/commit/fff1eebe91c893389ebc4ad00cd7ab2bda52796c))

#### 5.2.7 (2022-10-25)

##### Bug Fixes

*  fix bug breaking the build ([61747833](https://github.com/firstlovecenter/fl-pastoral-care/commit/61747833194b05c4992ccf8d00e078972ce7f5fb))
*  adjust paystack calculation for trailing pesewa decimals ([01d22dfb](https://github.com/firstlovecenter/fl-pastoral-care/commit/01d22dfb992135a577607e84dbb52e0fda3b4815))

#### 5.2.6 (2022-10-22)

##### Bug Fixes

*  implement check current history on filling bacenta form ([b5078da4](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5078da44b2f21ab88adc79fe4a248b2bdeef6e6))
*  update directory lock to include creation of churches ([25df27be](https://github.com/firstlovecenter/fl-pastoral-care/commit/25df27be5c03f316fcb237f494ade5a93c304c39))

#### 5.2.5 (2022-10-22)

##### Bug Fixes

*  improve handling of upload for files with spaces in ([ef6ace00](https://github.com/firstlovecenter/fl-pastoral-care/commit/ef6ace0037cee104cf63be3ebff7f08e0fc79850))
*  fix ux bugs for paystack edge cases ([98499789](https://github.com/firstlovecenter/fl-pastoral-care/commit/9849978932df99f53f2302dc76fc4e175e5c7e12))

#### 5.2.4 (2022-10-21)

##### Bug Fixes

*  fix bug with anagkazo defaulters ([e301e45c](https://github.com/firstlovecenter/fl-pastoral-care/commit/e301e45c080f6731a28e809306530aac5fb33cec))
*  update dev set up cypher ([5aa6aa7e](https://github.com/firstlovecenter/fl-pastoral-care/commit/5aa6aa7e59890fcfc1a46b25a5591080b3d61416))
*  add configs to set up dev  instance cypher ([f3880cbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/f3880cbc5f166ce6dac4530b35df864f89457e4b))
*  set transaction status as pending even before transactionReference is gotten from paystack ([6866ad2d](https://github.com/firstlovecenter/fl-pastoral-care/commit/6866ad2d60c14606cfb5c618bf913c210c83d8f2))
*  correct issue where already banked service ids were being passed to confirm banking ([c74ea528](https://github.com/firstlovecenter/fl-pastoral-care/commit/c74ea52824caddf4694476f794e4cb3ccf9e8266))
*  add a parser for foreign Currency to remove 00 and other strange values ([1d0bcc3d](https://github.com/firstlovecenter/fl-pastoral-care/commit/1d0bcc3d42c2201fd6889b339c3373a0c1c6e61f))

#### 5.2.3 (2022-10-21)

##### New Features

*  add name of person who recieved offering to counstituency by council defaulter card ([ff822241](https://github.com/firstlovecenter/fl-pastoral-care/commit/ff8222415d3f083ef0e42be763780ef8ff5a3aa1))
*  add bankedBy field to constituency ([f0c72242](https://github.com/firstlovecenter/fl-pastoral-care/commit/f0c722428509f3375bf2f099d50b471e4ae8b055))
*  add bankedBy field to service record ([eae19b96](https://github.com/firstlovecenter/fl-pastoral-care/commit/eae19b96a341e0a45fa5d06307338fbb8f45ff60))

##### Bug Fixes

*  fix bug with anagkazo banking preventing confirmation of constituency banking ([#330](https://github.com/firstlovecenter/fl-pastoral-care/pull/330)) ([28982551](https://github.com/firstlovecenter/fl-pastoral-care/commit/289825511456cc38e89dd8d88033521549388fef))
*  fixed bug in aggregate cypher which was doubling bussing figures ([39bff6a6](https://github.com/firstlovecenter/fl-pastoral-care/commit/39bff6a68f62c7d04f7f4d06c137180c81817564))
*  admin-396 change replaceAll to regex expression to support older devices ([0f08513e](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f08513e8b9c67f9a9bc246ccb07eca07e615f86))
*  set up dev instance, minor updates to ui ([e363f4f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/e363f4f6d1fc9db6f4f2a2c380ca61d9ecbab2e7))
*  let me look at the response to the scheduled data aggregation ([9966f451](https://github.com/firstlovecenter/fl-pastoral-care/commit/9966f4519bb5b52c02a4081edf46eecfff1d056d))
*  update response on setting payment status ([91ca475c](https://github.com/firstlovecenter/fl-pastoral-care/commit/91ca475c0d2e766215a54f3ca3ac1a97c1ca9f78))
*  correct destructuring of JSON object from paystack ([bd051068](https://github.com/firstlovecenter/fl-pastoral-care/commit/bd051068acfcb36231fa236c2d7559a036e47fa6))
*  fix api breaking bug ([814ecbbf](https://github.com/firstlovecenter/fl-pastoral-care/commit/814ecbbfe2f2d681fb897250513f4362f45fa134))
*  rewrote scheduled-data-aggregation scheduled function ([cb14dd78](https://github.com/firstlovecenter/fl-pastoral-care/commit/cb14dd783d07f547afef71c0c49aad2763c72d16))
*  implement charge stated i paystack docs to pass charge to users ([1afa7de9](https://github.com/firstlovecenter/fl-pastoral-care/commit/1afa7de93e3b3e504c7f18d92e1c1a825756eead))
*  round up vehicle top up amount to two decimal places ([5f7e7d6d](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f7e7d6d89d840d22795af9697b2cc62a770b724))
*  final fix for paystack webhooks ([a28aea98](https://github.com/firstlovecenter/fl-pastoral-care/commit/a28aea983c4639bdca7fb758856351809e50fb07))
*  testing web hook4 ([896f584d](https://github.com/firstlovecenter/fl-pastoral-care/commit/896f584de9bcc32fd5bfdf6511ada040876ee72a))
*  testing web hook 3 ([bcd1c881](https://github.com/firstlovecenter/fl-pastoral-care/commit/bcd1c8814cd9338979068204a5ee525b5cf3eaed))
*  testing web hook 2 ([a3c63a15](https://github.com/firstlovecenter/fl-pastoral-care/commit/a3c63a15737b24fd1873aa9958d10b2dca411063))
*  testing web hook 1 ([dfc14a89](https://github.com/firstlovecenter/fl-pastoral-care/commit/dfc14a89f5ec08aced5844647890bcae415ec4d5))
*  fix confirm payment ux flow ([8a1570aa](https://github.com/firstlovecenter/fl-pastoral-care/commit/8a1570aa2f603639cac1894cf94d7d3c7d5196c1))
*  add whitelisting ip ([e90aa5e4](https://github.com/firstlovecenter/fl-pastoral-care/commit/e90aa5e4879c21bad63effd238a77cef2a4409a2))
*  remove restrictions on  anagkazo treasurers ([ca43b20e](https://github.com/firstlovecenter/fl-pastoral-care/commit/ca43b20e1cb3917e681bf0ba59c660ea6c131300))
*  add whitelisting ip ([29a26c85](https://github.com/firstlovecenter/fl-pastoral-care/commit/29a26c856436b1390b5fd2759edcf8f6fedf3537))
*  trying payment webhook once moore ([5b69661a](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b69661a38b627b81a4114a09ce88d3641b29512))
*  add check for send OTP when using banking receipt after attempt self banking ([f685fd3b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f685fd3b53fbe16ae493d7b59af90fa63e910e5e))
*  change color coding of equipment defaulters card values to better display the meaning ([21662038](https://github.com/firstlovecenter/fl-pastoral-care/commit/216620382de235bf0da29a1cefcac97597f38b8f))

##### Refactors

*  setup dev instance file renamed ([dd8642e4](https://github.com/firstlovecenter/fl-pastoral-care/commit/dd8642e41a30997ba80629d329da6d85e8e318ee))

#### 5.2.2 (2022-10-16)

##### Documentation Changes

*  update CHANGELOG.md ([2a1dcf18](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a1dcf18ce141d40224654bd7cf1302810ea696f))

##### Bug Fixes

*  reduce amount so that the church bears the charges ([70a189ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/70a189aed2b497e2e045c3b5bd65e52204abd9e1))
*  fix height of arrivals picture row ([33ef94fe](https://github.com/firstlovecenter/fl-pastoral-care/commit/33ef94fe42cacc365443e5e8f114ee1036508dca))
*  update arrivals picture views ([99de0d61](https://github.com/firstlovecenter/fl-pastoral-care/commit/99de0d61abcea7bd248950e0fe69b60600fd59a7))
*  fix height of member picture for safari users ([280bb2c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/280bb2c7a2c4358fbefbb19df99fd3f5dea0ff91))
*  enable lazy load on certain screens ([608c51b1](https://github.com/firstlovecenter/fl-pastoral-care/commit/608c51b18a177713fda0d180e251213d9347a06a))

#### 5.2.2 (2022-10-16)

##### Bug Fixes

*  reduce amount so that the church bears the charges ([70a189ae](https://github.com/firstlovecenter/fl-pastoral-care/commit/70a189aed2b497e2e045c3b5bd65e52204abd9e1))
*  fix height of arrivals picture row ([33ef94fe](https://github.com/firstlovecenter/fl-pastoral-care/commit/33ef94fe42cacc365443e5e8f114ee1036508dca))
*  update arrivals picture views ([99de0d61](https://github.com/firstlovecenter/fl-pastoral-care/commit/99de0d61abcea7bd248950e0fe69b60600fd59a7))
*  fix height of member picture for safari users ([280bb2c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/280bb2c7a2c4358fbefbb19df99fd3f5dea0ff91))
*  enable lazy load on certain screens ([608c51b1](https://github.com/firstlovecenter/fl-pastoral-care/commit/608c51b18a177713fda0d180e251213d9347a06a))

#### 5.2.1 (2022-10-16)

##### New Features

* **paystack:**  customer details on the portal are updated when they make payment ([a9ab4bfc](https://github.com/firstlovecenter/fl-pastoral-care/commit/a9ab4bfcbcf9388f874a8b88360f18f219a619ab))

##### Bug Fixes

*  remove error messages when confirming arrival attendance ([e2ab223f](https://github.com/firstlovecenter/fl-pastoral-care/commit/e2ab223f2b860c148c992102551e57ad1e14b896))
*  replace cloudinary filenames space with hyphhn ([08c663da](https://github.com/firstlovecenter/fl-pastoral-care/commit/08c663da1e9d132d82a8a33858d0c1a9ae7854f2))
*  increase charges on payswitch so that the correct amount is settled to us ([79eb2359](https://github.com/firstlovecenter/fl-pastoral-care/commit/79eb235988d1a8cafb7f35233a2b3bdef26af613))
*  fix logic for checking directory lock for arrivals counters ([614ab0a5](https://github.com/firstlovecenter/fl-pastoral-care/commit/614ab0a581fadf7373030dd48ec25c00391a17a6))
*  implement stronger default password for creating users ([32e45ef0](https://github.com/firstlovecenter/fl-pastoral-care/commit/32e45ef0aeb2a7d75b5fae0d748b9dee0b5d8ed7))
*  remove day checker on anagkazo banking ([e8b62330](https://github.com/firstlovecenter/fl-pastoral-care/commit/e8b623309ac5f683c9969f86a098cfe6a4cbe016))
*  handles error for when otp succeeds but state is not changed in db ([7ca295ec](https://github.com/firstlovecenter/fl-pastoral-care/commit/7ca295eccf3c5cbeaefcfe5dad1e585629c23555))
*  logs error to the console when payment.js ([1c50f005](https://github.com/firstlovecenter/fl-pastoral-care/commit/1c50f0058288161278cc9d0938e752f336a30914))
*  return 500 if there is an error ([1b794b91](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b794b91ce06c5490df6cecac15be766aee9fe03))
*  give up on webhook for now ([ab527dab](https://github.com/firstlovecenter/fl-pastoral-care/commit/ab527dab896c7b96da3e02c61f5062ce79806711))
*  change whitelistedIPs to return boolean ([7450dce3](https://github.com/firstlovecenter/fl-pastoral-care/commit/7450dce3e09cc4e0240e614eb596cc08cabe89d6))
*  correct wrong variable name from neoDriver to driver in handlePaystackReq ([883e1855](https://github.com/firstlovecenter/fl-pastoral-care/commit/883e1855d46a0f301fa886c55b2804e701bb38ae))
*  include ip for testing ([17875054](https://github.com/firstlovecenter/fl-pastoral-care/commit/17875054ede3db52fc32a5153e5f450f00af701e))
*  rewrite payment.js netlify function from scratch ([19208bbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/19208bbcd68a56b3632065689dc858853a89f260))
*  switch from using session.transactionWrite to session.run ([bd45523f](https://github.com/firstlovecenter/fl-pastoral-care/commit/bd45523f8ff5834bd2f29b32fc45bdc76f8f07e3))
*  update neo4j-driver ([845892a7](https://github.com/firstlovecenter/fl-pastoral-care/commit/845892a7568c1834117d40cda80e8b1c9a989f82))
*  refactor payment.js function so that transaction starts during if-logic ([36d8f023](https://github.com/firstlovecenter/fl-pastoral-care/commit/36d8f023c96986f7fe8ef4a78d14235317002a28))
*  remove async-await syntax ([893aec3b](https://github.com/firstlovecenter/fl-pastoral-care/commit/893aec3b75d219fbabf957b8d03e5fb6fb933b45))
*  remove async-await syntax ([c9e91281](https://github.com/firstlovecenter/fl-pastoral-care/commit/c9e912819094cdb5a79fe610700a8e17fca3e2ee))
*  run independent query to set one servicerecord ([71851a00](https://github.com/firstlovecenter/fl-pastoral-care/commit/71851a00788c883402583f6d38323eacbf84eaba))
*  log out errors to the console so I can see what is happening ([2617eea5](https://github.com/firstlovecenter/fl-pastoral-care/commit/2617eea5cbfe01cfca51c75087f9522ab72def09))
*  move db transaction out of try catch block ([62a124ac](https://github.com/firstlovecenter/fl-pastoral-care/commit/62a124ac6223b59931cd5a05743a5f275a866518))
*  try converting writeTransaction to an async function ([43641aeb](https://github.com/firstlovecenter/fl-pastoral-care/commit/43641aeb2e35b2f5019703726deb6c3f9e6ec219))
*  log result of transaction ([0347f067](https://github.com/firstlovecenter/fl-pastoral-care/commit/0347f0671bbd41331aa68fae0f22d891b1066ec2))
*  log result of transaction ([2557ccc9](https://github.com/firstlovecenter/fl-pastoral-care/commit/2557ccc95e537a0eb77fae6a1fcdd7e5ed6e2614))
*  change lowercase 'idl' label to 'IDL' ([0de56ba8](https://github.com/firstlovecenter/fl-pastoral-care/commit/0de56ba864e95714377dd318c7eec8465a34b5df))
*  log the successful status of payment webhook ([eef5c04c](https://github.com/firstlovecenter/fl-pastoral-care/commit/eef5c04cbd31da7e91bde9bff37b84439ae7ca71))
*  add ts-ignore to sentry init which was breaking the build ([4fd642b1](https://github.com/firstlovecenter/fl-pastoral-care/commit/4fd642b1d26f8f563e899f42d5e552d37ec7bd8e))
*  remove lazy loading from member details page ([3e5bc4a8](https://github.com/firstlovecenter/fl-pastoral-care/commit/3e5bc4a80c76cdb16435233ef2ee70cb8d08993c))
* **arrivals:**  remove directory lock for arrivals counters ([5539c93d](https://github.com/firstlovecenter/fl-pastoral-care/commit/5539c93d8ff87b79246269b12a6b940c742a66a7))
* **anagkazo-banking:**  treasurers cannot bank after Saturday ([8d714f5f](https://github.com/firstlovecenter/fl-pastoral-care/commit/8d714f5ffc9c0c261a284f1fbe71b29ed2f923e5))
* **paystack:**
  *  tidy up api responses to sending otp resolver ([b1eefbc1](https://github.com/firstlovecenter/fl-pastoral-care/commit/b1eefbc1845654024133623ff7d7f3850bcf8fca))
  *  better design adjustments to the otp sending button ([5d90891a](https://github.com/firstlovecenter/fl-pastoral-care/commit/5d90891af91905afb8294456dd9295bc56edd6cb))
  *  implement verifying OTP even if user refreshes page or leaves and comes back ([151f6381](https://github.com/firstlovecenter/fl-pastoral-care/commit/151f6381afd181eb6a551180b39669caafceb80a))
  *  use user phone number instead of payment phone number ([bb9b59c0](https://github.com/firstlovecenter/fl-pastoral-care/commit/bb9b59c0e24e49f904f66a6479d6b16a7f07fc77))
  *   add mobile number on customer ([04678862](https://github.com/firstlovecenter/fl-pastoral-care/commit/04678862ab947f1ecc0cf1eab22fd236b22ee269))
  *  remove charge on offerings ([17f5e909](https://github.com/firstlovecenter/fl-pastoral-care/commit/17f5e909963e85720c0bb1a71af9699cc3acfde4))
  *  json parse for the payment function ([f004579b](https://github.com/firstlovecenter/fl-pastoral-care/commit/f004579ba3699dfcc677bf475515e6e45f250a5e))
  *  json parse for the payment function ([a9d46f15](https://github.com/firstlovecenter/fl-pastoral-care/commit/a9d46f15d712a1e1767e45e5a226c8f63be42348))
  *  switch from verifying hash to whitelisting ips try 2 ([846a50ac](https://github.com/firstlovecenter/fl-pastoral-care/commit/846a50ace57cd9118ab14b173c8faace96581b2f))
  *  switch from verifying hash to whitelisting ips ([e5363d31](https://github.com/firstlovecenter/fl-pastoral-care/commit/e5363d317318bc75c591ad333bd65c7356732d42))
  *  log hash and paystack header ([8eb80871](https://github.com/firstlovecenter/fl-pastoral-care/commit/8eb808712583d09da55605b13470bab52416da53))
  *  log hash and paystack header ([44500ad8](https://github.com/firstlovecenter/fl-pastoral-care/commit/44500ad88daa7690970d30ad56d7568eb574055b))
  *  log evvent body ([912aa3ff](https://github.com/firstlovecenter/fl-pastoral-care/commit/912aa3ff6dbb1aebb43e32ee2a9b2f0bc51d6373))
  *  log hash verified ([180224ef](https://github.com/firstlovecenter/fl-pastoral-care/commit/180224effc6b4f4b757b47795b448d39bca37242))
  *  extract event.body.data ([7afd712b](https://github.com/firstlovecenter/fl-pastoral-care/commit/7afd712b8eaf9afffbdc15dfada61a7d68aacb16))
  *  implement better logging for payment function ([5f94b0da](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f94b0da069262266ba5c132feac74fd7e8cc5b2))
  *  implement better logging for payment function ([33e83d02](https://github.com/firstlovecenter/fl-pastoral-care/commit/33e83d0290a058747d081303332c83074b1fc766))
  *  log event body on payment cloud function ([c3e0e1eb](https://github.com/firstlovecenter/fl-pastoral-care/commit/c3e0e1ebd1ad5852d50378f4caceb01d1ee5e4dd))

##### Performance Improvements

*  make it easier to see error rom apollowrapper ([dc83730c](https://github.com/firstlovecenter/fl-pastoral-care/commit/dc83730c4a8f155b7dfc5055225264d048b98ede))

### 5.2.0 (2022-10-11)

##### New Features

*  set up function for paystack transaction webhook ([#321](https://github.com/firstlovecenter/fl-pastoral-care/pull/321)) ([493fa908](https://github.com/firstlovecenter/fl-pastoral-care/commit/493fa9080862629302c042def2865867727350cd))
*  implement user flow to delete a member on the app ([02a5fcc4](https://github.com/firstlovecenter/fl-pastoral-care/commit/02a5fcc46f3e0fea50f3daf306c8b4388f242012))
*  add feature that allows an inactive member to be reactivated when reregistered ([038df677](https://github.com/firstlovecenter/fl-pastoral-care/commit/038df677d91102d09d2576fb602a76a8688bf69c))
*  admin-287 change members lists to return active members lists ([d5062773](https://github.com/firstlovecenter/fl-pastoral-care/commit/d5062773fa1f3fde25f6c8d546f5f39f02943f8e))
*  admin-286 add cypher to make all members active ([784169b6](https://github.com/firstlovecenter/fl-pastoral-care/commit/784169b65acad7f5cea12afa61a4af005c02b9a9))
*  implement directory lock till tuesdays in api ([a226a825](https://github.com/firstlovecenter/fl-pastoral-care/commit/a226a8254db58c1109f8ae12dbcc27b1fc8bbb59))

##### Bug Fixes

* **paystack:**  remove math.round around banking amount ([d1efef62](https://github.com/firstlovecenter/fl-pastoral-care/commit/d1efef62dcd86024ef0ac648f40ed86d796acb1b))
*  modify detailsConstituency to show fellowship Count ([f1c992c9](https://github.com/firstlovecenter/fl-pastoral-care/commit/f1c992c900cc7b4eefa2a7a17fbdf32bacfa4042))
*  fix bug causing a banking loop when user has multiple unbanked services ([aa94d7d9](https://github.com/firstlovecenter/fl-pastoral-care/commit/aa94d7d951b361d1fb4e4c544a48ff0520e274df))
*  add relationship to timegraph node from deleting history log ([c0bd8fc8](https://github.com/firstlovecenter/fl-pastoral-care/commit/c0bd8fc8faccfd25edd6f9977acd8cc33ce37418))
*  implement fellowship leaders being able to update their fellowship coordinates ([1a407e7d](https://github.com/firstlovecenter/fl-pastoral-care/commit/1a407e7dc4e9a349ab2b7d09037fa501f298ca68))
*  correct typos in cypher ([4b8467c9](https://github.com/firstlovecenter/fl-pastoral-care/commit/4b8467c94d447c15beb2b33e5f700daf427dbe45))
*  remove lazy load from bus form vehicle details ([5f906964](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f9069645fcfe03c2b046ff9982bf55e6938da73))
*  implement directory lock except for tuesdays ([35c1cff4](https://github.com/firstlovecenter/fl-pastoral-care/commit/35c1cff44feeb41a953074c91d4570710b1801ca))
*  update return values from checkTransaction Cypher ([02a8414f](https://github.com/firstlovecenter/fl-pastoral-care/commit/02a8414fa8846069e1c10ae5072a787baf2e0105))

##### Other Changes

* Active at different points in the app ([58a7d5a9](https://github.com/firstlovecenter/fl-pastoral-care/commit/58a7d5a9c415c6f0e76ff376adc0e654da4350ba))
* inactive label to member ([1062f7af](https://github.com/firstlovecenter/fl-pastoral-care/commit/1062f7afdbca12fb6b08dbbf250793e0bffd7f55))

##### Refactors

*  add mutation to make member inactive ([6ec27bcf](https://github.com/firstlovecenter/fl-pastoral-care/commit/6ec27bcf3758413ff69fc1c1055793f502838e91))

#### 5.1.29 (2022-10-01)

##### Chores

*  version bump ([74660128](https://github.com/firstlovecenter/fl-pastoral-care/commit/7466012819a70f3233939b26c23ff35a1fbfce79))

##### Documentation Changes

*  update CHANGELOG.md ([4ac4f5d8](https://github.com/firstlovecenter/fl-pastoral-care/commit/4ac4f5d8fc4ae230dc9c74989d352f660b6db6b0))
*  update CHANGELOG.md ([0f47b164](https://github.com/firstlovecenter/fl-pastoral-care/commit/0f47b164db79354aa10d3c218752a9f402219f7e))

##### Bug Fixes

*  fix bug preventing multiple time defaulters from confirming self banking ([#317](https://github.com/firstlovecenter/fl-pastoral-care/pull/317)) ([3714664d](https://github.com/firstlovecenter/fl-pastoral-care/commit/3714664dc5e74000de482970bb2da4a50c3f1fe5))
*  remove spaces in whatsapp defaulters message ([50a1facd](https://github.com/firstlovecenter/fl-pastoral-care/commit/50a1facdfe54e29bf9ea9474ced6562fdafaeef6))
*  update data aggregation to use CURRENT_HISTORY instead of HAS_HISTORY ([f3e2fb03](https://github.com/firstlovecenter/fl-pastoral-care/commit/f3e2fb03d510593e8db5b9b1485561845349b7a8))
*  add tellerConfirmationTime as banking proof ([f68d29ec](https://github.com/firstlovecenter/fl-pastoral-care/commit/f68d29ecd4092ca1101072362def0e6358db8229))
*  clicking on stream teller card no longer gives a blank page and a system crash ([e1a6e8ca](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1a6e8ca05eaf4c800a799b7d490b10a8d9f1fd7))

#### 5.1.22 (2022-10-01)

#### 5.1.21 (2022-10-01)

##### Bug Fixes

*  remove spaces in whatsapp defaulters message ([50a1facd](https://github.com/firstlovecenter/fl-pastoral-care/commit/50a1facdfe54e29bf9ea9474ced6562fdafaeef6))
*  update data aggregation to use CURRENT_HISTORY instead of HAS_HISTORY ([f3e2fb03](https://github.com/firstlovecenter/fl-pastoral-care/commit/f3e2fb03d510593e8db5b9b1485561845349b7a8))
*  add tellerConfirmationTime as banking proof ([f68d29ec](https://github.com/firstlovecenter/fl-pastoral-care/commit/f68d29ecd4092ca1101072362def0e6358db8229))
*  clicking on stream teller card no longer gives a blank page and a system crash ([e1a6e8ca](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1a6e8ca05eaf4c800a799b7d490b10a8d9f1fd7))

#### 5.1.20 (2022-09-29)

##### Continuous Integration

*  switch to using env variable for mailgun_domain ([2717716c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2717716cc97614104b746762be317c0ece5a4e5d))

##### Documentation Changes

*  update CHANGELOG.md ([241accf5](https://github.com/firstlovecenter/fl-pastoral-care/commit/241accf50a6461f201dc5d6e560349839d906a6c))
*  update CHANGELOG.md ([fef0c585](https://github.com/firstlovecenter/fl-pastoral-care/commit/fef0c58538482c1cad886254fa20fd2af91d6d6a))
*  update CHANGELOG.md ([b8b733c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8b733c609ef51320f0c78c194a833d0ab54413f))

##### New Features

*  admin-344 change equipment trend denominator to show fellowship ewuipment filled count ([4451a463](https://github.com/firstlovecenter/fl-pastoral-care/commit/4451a4638b6f4acf062a16f8998994d1ed7a1c78))
*  admin-348 prevent data load until all data have finished loading in equipment campaign ([2298bed7](https://github.com/firstlovecenter/fl-pastoral-care/commit/2298bed780e8f831f304ec9d67ada1fab789fdbb))
*  add optional foreign currency field to aggregate service record type ([8b954974](https://github.com/firstlovecenter/fl-pastoral-care/commit/8b9549744f94122cb858b20a7503505c57e22ab0))
*  make havenotfilled buttons clickable to display churches that havent filled the equipment form ([1e547374](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e54737475075694f888e2b9ba654e9a73c91bfa))
*  implement template message when sending whatsapp to defaulting admins ([ba9aafa7](https://github.com/firstlovecenter/fl-pastoral-care/commit/ba9aafa7e1b9fbb39d72a6d9aebae00411aacc16))
*  update top up amounts to better reflect the  heart behind the top up amounts ([7e1d8b03](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e1d8b03e8788369423cfe5c6fc7f8b9146554c0))
*  implement custom whatsapp message template for service defaulters ([b637043d](https://github.com/firstlovecenter/fl-pastoral-care/commit/b637043da12282e72fe2f19a7ca9738ed4329d0b))

##### Bug Fixes

*  update stream name to show options for anagkazo in servies menu ([efd20830](https://github.com/firstlovecenter/fl-pastoral-care/commit/efd20830a6d5002d90631c88293d439f05dfed20))
*  update stream names in the backend ([39431672](https://github.com/firstlovecenter/fl-pastoral-care/commit/394316727ae5aaad1bd877160d47be5e4993c80b))
*  change stream names to reflect new stream names ([59eb483d](https://github.com/firstlovecenter/fl-pastoral-care/commit/59eb483d78ca640f576a87671867f064b83d437b))
*  improve button loading ux when closing down a church ([79216fa6](https://github.com/firstlovecenter/fl-pastoral-care/commit/79216fa638b30843f6d27a1762f0f873e9f85e4f))
*  data aggregation will happen only on wednesday to sunday ([28f459f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/28f459f68b1611caf59deba858c2b7fd8aa6cc74))
*  fix issue where constituency name is the same in confirm banking popup ([7360d71a](https://github.com/firstlovecenter/fl-pastoral-care/commit/7360d71af6433871bba9243502cd491c5a4b94c4))
*  data aggregation will happen only on wednesday to sunday ([abd102da](https://github.com/firstlovecenter/fl-pastoral-care/commit/abd102daa837e7d681a4cb5800993e5562ec53a9))
*  admin-311 tweak UX so enable popup to work after installing sentry.io ([0dd10a39](https://github.com/firstlovecenter/fl-pastoral-care/commit/0dd10a39f12223f2f6aeea8638594a81b4b95ebe))
*  admin-311 merge anagkazo banking by constituencies into deploy ([5364ffc6](https://github.com/firstlovecenter/fl-pastoral-care/commit/5364ffc64d60c41f5a4f59f980822ff686890507))
*  restore throwErrorMsg function ([b3fcecbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3fcecbc3fc89c310010eefd2c70e9b742906957))
*  change throwErrorMsg function to throwToSentry in frontend anagkazo confirmation ([7d8bd1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d8bd1f8849fa861cd6455e94d81dd4b24d80492))
*  fix error where users is unable to edit a fellowship when there is no leader ([61fb88d6](https://github.com/firstlovecenter/fl-pastoral-care/commit/61fb88d6ce53f2b20cfbc20ce9af32e956b70bd8))
*  remove service day check on defaulters cypher in confirm anagkazo banking ([f671b87f](https://github.com/firstlovecenter/fl-pastoral-care/commit/f671b87f425396a6976a9019e3fecb37a898e763))
*  update aggregation scheduled function to run daily ([52ab3d66](https://github.com/firstlovecenter/fl-pastoral-care/commit/52ab3d664d93dc1f56eb59dd799489f3c4318f42))
*  admin 339 fix cypher that checks if a felowship has members to always return data ([735f52b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/735f52b4c8544d432867a6d637cc56354f495951))
*  improve error handling when money cannot be sent ([b0607b67](https://github.com/firstlovecenter/fl-pastoral-care/commit/b0607b678615ccee97c7d72ab5da29e29153656a))
*  combine arrival time and counting into one mutation ([3582a547](https://github.com/firstlovecenter/fl-pastoral-care/commit/3582a547a8459d103ca312e59521714239d7677a))
*  refactor mutation to close down fellowship to align with sentry.io workflow ([6c3c4647](https://github.com/firstlovecenter/fl-pastoral-care/commit/6c3c46470f8f0e9835722fe64b3516da32904246))
*  update arrival top up amounts to reflect to in and out percentages ([4980fd99](https://github.com/firstlovecenter/fl-pastoral-care/commit/4980fd994d956e0b0af3fc5aedd5c0b7f5971554))
*  admin 339 fix cypher that checks if an equipment form has been filled to always return data ([4c39c899](https://github.com/firstlovecenter/fl-pastoral-care/commit/4c39c89935d2293bc4e0974543a535e4fb04bf21))
*  fix bug preventing login page from showing ([59f2e7b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/59f2e7b438b92350fbf02d366cbd441651cd5b9c))
*  implement further checks to prevent running query when token has not loaded ([ec46419f](https://github.com/firstlovecenter/fl-pastoral-care/commit/ec46419f4ac48f7829d73193973553f62eb31dd4))
*  admin-329 implement not running ANY queries until the user is authenticated ([980df7c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/980df7c790e92b78256400b951e94900b7bf9a6f))
*  fix arrivals typo breaking the build ([085e7935](https://github.com/firstlovecenter/fl-pastoral-care/commit/085e79352d95eadbb702be45ea36f82c9a0831d3))
*  change import of large-number css to where it is used ([d6fee247](https://github.com/firstlovecenter/fl-pastoral-care/commit/d6fee24703e0f337f3711235ebf2f381ef2a32db))
*  add with which was breaking the mutation to record arrival time ([7f354023](https://github.com/firstlovecenter/fl-pastoral-care/commit/7f3540238713c20b98d7d7e381f11c84106a44ad))
*  fix bug preventing bussing data from aggregating on higher churches ([65264448](https://github.com/firstlovecenter/fl-pastoral-care/commit/6526444859e8f7e22d734635fd20a63f0bc08ebf))
*  implement error message to sentry when any cypher query returns null ([4dede820](https://github.com/firstlovecenter/fl-pastoral-care/commit/4dede820a805801050ef61cf7ba0d6ab16619fbe))
*  change throwErrorMsg to throwToSentry ([185a6f8d](https://github.com/firstlovecenter/fl-pastoral-care/commit/185a6f8db2911c940467f6338edd2b57e1220f78))
*  implement tellerConfirmationTime as a field on ServiceRecord in graphql schema ([af56079e](https://github.com/firstlovecenter/fl-pastoral-care/commit/af56079e5cf0e1b87dc62b92178e318c38ec4776))

##### Other Changes

* 55 ([520e14bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/520e14bf204a9215f460930e4f1ec937d760eb2b))
* 50 pm ([2cd907a3](https://github.com/firstlovecenter/fl-pastoral-care/commit/2cd907a379a215b049ae17dd89b5aad1e0a1fc3b))

##### Refactors

*  change from throwErrorMsg to throwToSentry and throw new Error ([0c894226](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c8942263364df43478e41cc6377feb85905c5ae))
*  wrap apollo wrapper component over fellowship and constituency equipment campaign page ([029da646](https://github.com/firstlovecenter/fl-pastoral-care/commit/029da646ad15075fb81bd58de69ed3daf05f5431))
*  redesign confirm banking interface to receive midweek offerings in constituencies ([23ba5416](https://github.com/firstlovecenter/fl-pastoral-care/commit/23ba5416b39a120c5c44e467384134ab9812d086))
*  refactor error messages to better align with sentry.io workflow ([14c73356](https://github.com/firstlovecenter/fl-pastoral-care/commit/14c7335647f928db012c5a579af39beeeb0d2657))
*  admin 311 change confirm banking mutation to confirm constituency bakning ([e1fe782e](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1fe782e58eb6a2348200d4fb2303ac0ddbeccb0))

#### 5.1.20 (2022-09-29)

##### Continuous Integration

*  switch to using env variable for mailgun_domain ([2717716c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2717716cc97614104b746762be317c0ece5a4e5d))

##### Documentation Changes

*  update CHANGELOG.md ([fef0c585](https://github.com/firstlovecenter/fl-pastoral-care/commit/fef0c58538482c1cad886254fa20fd2af91d6d6a))
*  update CHANGELOG.md ([b8b733c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8b733c609ef51320f0c78c194a833d0ab54413f))

##### New Features

*  admin-344 change equipment trend denominator to show fellowship ewuipment filled count ([4451a463](https://github.com/firstlovecenter/fl-pastoral-care/commit/4451a4638b6f4acf062a16f8998994d1ed7a1c78))
*  admin-348 prevent data load until all data have finished loading in equipment campaign ([2298bed7](https://github.com/firstlovecenter/fl-pastoral-care/commit/2298bed780e8f831f304ec9d67ada1fab789fdbb))
*  add optional foreign currency field to aggregate service record type ([8b954974](https://github.com/firstlovecenter/fl-pastoral-care/commit/8b9549744f94122cb858b20a7503505c57e22ab0))
*  make havenotfilled buttons clickable to display churches that havent filled the equipment form ([1e547374](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e54737475075694f888e2b9ba654e9a73c91bfa))
*  implement template message when sending whatsapp to defaulting admins ([ba9aafa7](https://github.com/firstlovecenter/fl-pastoral-care/commit/ba9aafa7e1b9fbb39d72a6d9aebae00411aacc16))
*  update top up amounts to better reflect the  heart behind the top up amounts ([7e1d8b03](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e1d8b03e8788369423cfe5c6fc7f8b9146554c0))
*  implement custom whatsapp message template for service defaulters ([b637043d](https://github.com/firstlovecenter/fl-pastoral-care/commit/b637043da12282e72fe2f19a7ca9738ed4329d0b))

##### Bug Fixes

*  change stream names to reflect new stream names ([59eb483d](https://github.com/firstlovecenter/fl-pastoral-care/commit/59eb483d78ca640f576a87671867f064b83d437b))
*  improve button loading ux when closing down a church ([79216fa6](https://github.com/firstlovecenter/fl-pastoral-care/commit/79216fa638b30843f6d27a1762f0f873e9f85e4f))
*  data aggregation will happen only on wednesday to sunday ([28f459f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/28f459f68b1611caf59deba858c2b7fd8aa6cc74))
*  fix issue where constituency name is the same in confirm banking popup ([7360d71a](https://github.com/firstlovecenter/fl-pastoral-care/commit/7360d71af6433871bba9243502cd491c5a4b94c4))
*  data aggregation will happen only on wednesday to sunday ([abd102da](https://github.com/firstlovecenter/fl-pastoral-care/commit/abd102daa837e7d681a4cb5800993e5562ec53a9))
*  admin-311 tweak UX so enable popup to work after installing sentry.io ([0dd10a39](https://github.com/firstlovecenter/fl-pastoral-care/commit/0dd10a39f12223f2f6aeea8638594a81b4b95ebe))
*  admin-311 merge anagkazo banking by constituencies into deploy ([5364ffc6](https://github.com/firstlovecenter/fl-pastoral-care/commit/5364ffc64d60c41f5a4f59f980822ff686890507))
*  restore throwErrorMsg function ([b3fcecbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3fcecbc3fc89c310010eefd2c70e9b742906957))
*  change throwErrorMsg function to throwToSentry in frontend anagkazo confirmation ([7d8bd1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d8bd1f8849fa861cd6455e94d81dd4b24d80492))
*  fix error where users is unable to edit a fellowship when there is no leader ([61fb88d6](https://github.com/firstlovecenter/fl-pastoral-care/commit/61fb88d6ce53f2b20cfbc20ce9af32e956b70bd8))
*  remove service day check on defaulters cypher in confirm anagkazo banking ([f671b87f](https://github.com/firstlovecenter/fl-pastoral-care/commit/f671b87f425396a6976a9019e3fecb37a898e763))
*  update aggregation scheduled function to run daily ([52ab3d66](https://github.com/firstlovecenter/fl-pastoral-care/commit/52ab3d664d93dc1f56eb59dd799489f3c4318f42))
*  admin 339 fix cypher that checks if a felowship has members to always return data ([735f52b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/735f52b4c8544d432867a6d637cc56354f495951))
*  improve error handling when money cannot be sent ([b0607b67](https://github.com/firstlovecenter/fl-pastoral-care/commit/b0607b678615ccee97c7d72ab5da29e29153656a))
*  combine arrival time and counting into one mutation ([3582a547](https://github.com/firstlovecenter/fl-pastoral-care/commit/3582a547a8459d103ca312e59521714239d7677a))
*  refactor mutation to close down fellowship to align with sentry.io workflow ([6c3c4647](https://github.com/firstlovecenter/fl-pastoral-care/commit/6c3c46470f8f0e9835722fe64b3516da32904246))
*  update arrival top up amounts to reflect to in and out percentages ([4980fd99](https://github.com/firstlovecenter/fl-pastoral-care/commit/4980fd994d956e0b0af3fc5aedd5c0b7f5971554))
*  admin 339 fix cypher that checks if an equipment form has been filled to always return data ([4c39c899](https://github.com/firstlovecenter/fl-pastoral-care/commit/4c39c89935d2293bc4e0974543a535e4fb04bf21))
*  fix bug preventing login page from showing ([59f2e7b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/59f2e7b438b92350fbf02d366cbd441651cd5b9c))
*  implement further checks to prevent running query when token has not loaded ([ec46419f](https://github.com/firstlovecenter/fl-pastoral-care/commit/ec46419f4ac48f7829d73193973553f62eb31dd4))
*  admin-329 implement not running ANY queries until the user is authenticated ([980df7c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/980df7c790e92b78256400b951e94900b7bf9a6f))
*  fix arrivals typo breaking the build ([085e7935](https://github.com/firstlovecenter/fl-pastoral-care/commit/085e79352d95eadbb702be45ea36f82c9a0831d3))
*  change import of large-number css to where it is used ([d6fee247](https://github.com/firstlovecenter/fl-pastoral-care/commit/d6fee24703e0f337f3711235ebf2f381ef2a32db))
*  add with which was breaking the mutation to record arrival time ([7f354023](https://github.com/firstlovecenter/fl-pastoral-care/commit/7f3540238713c20b98d7d7e381f11c84106a44ad))
*  fix bug preventing bussing data from aggregating on higher churches ([65264448](https://github.com/firstlovecenter/fl-pastoral-care/commit/6526444859e8f7e22d734635fd20a63f0bc08ebf))
*  implement error message to sentry when any cypher query returns null ([4dede820](https://github.com/firstlovecenter/fl-pastoral-care/commit/4dede820a805801050ef61cf7ba0d6ab16619fbe))
*  change throwErrorMsg to throwToSentry ([185a6f8d](https://github.com/firstlovecenter/fl-pastoral-care/commit/185a6f8db2911c940467f6338edd2b57e1220f78))
*  implement tellerConfirmationTime as a field on ServiceRecord in graphql schema ([af56079e](https://github.com/firstlovecenter/fl-pastoral-care/commit/af56079e5cf0e1b87dc62b92178e318c38ec4776))

##### Other Changes

* 55 ([520e14bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/520e14bf204a9215f460930e4f1ec937d760eb2b))
* 50 pm ([2cd907a3](https://github.com/firstlovecenter/fl-pastoral-care/commit/2cd907a379a215b049ae17dd89b5aad1e0a1fc3b))

##### Refactors

*  change from throwErrorMsg to throwToSentry and throw new Error ([0c894226](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c8942263364df43478e41cc6377feb85905c5ae))
*  wrap apollo wrapper component over fellowship and constituency equipment campaign page ([029da646](https://github.com/firstlovecenter/fl-pastoral-care/commit/029da646ad15075fb81bd58de69ed3daf05f5431))
*  redesign confirm banking interface to receive midweek offerings in constituencies ([23ba5416](https://github.com/firstlovecenter/fl-pastoral-care/commit/23ba5416b39a120c5c44e467384134ab9812d086))
*  refactor error messages to better align with sentry.io workflow ([14c73356](https://github.com/firstlovecenter/fl-pastoral-care/commit/14c7335647f928db012c5a579af39beeeb0d2657))
*  admin 311 change confirm banking mutation to confirm constituency bakning ([e1fe782e](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1fe782e58eb6a2348200d4fb2303ac0ddbeccb0))

#### 5.1.20 (2022-09-29)

##### Continuous Integration

*  switch to using env variable for mailgun_domain ([2717716c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2717716cc97614104b746762be317c0ece5a4e5d))

##### Documentation Changes

*  update CHANGELOG.md ([b8b733c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8b733c609ef51320f0c78c194a833d0ab54413f))

##### New Features

*  admin-344 change equipment trend denominator to show fellowship ewuipment filled count ([4451a463](https://github.com/firstlovecenter/fl-pastoral-care/commit/4451a4638b6f4acf062a16f8998994d1ed7a1c78))
*  admin-348 prevent data load until all data have finished loading in equipment campaign ([2298bed7](https://github.com/firstlovecenter/fl-pastoral-care/commit/2298bed780e8f831f304ec9d67ada1fab789fdbb))
*  add optional foreign currency field to aggregate service record type ([8b954974](https://github.com/firstlovecenter/fl-pastoral-care/commit/8b9549744f94122cb858b20a7503505c57e22ab0))
*  make havenotfilled buttons clickable to display churches that havent filled the equipment form ([1e547374](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e54737475075694f888e2b9ba654e9a73c91bfa))
*  implement template message when sending whatsapp to defaulting admins ([ba9aafa7](https://github.com/firstlovecenter/fl-pastoral-care/commit/ba9aafa7e1b9fbb39d72a6d9aebae00411aacc16))
*  update top up amounts to better reflect the  heart behind the top up amounts ([7e1d8b03](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e1d8b03e8788369423cfe5c6fc7f8b9146554c0))
*  implement custom whatsapp message template for service defaulters ([b637043d](https://github.com/firstlovecenter/fl-pastoral-care/commit/b637043da12282e72fe2f19a7ca9738ed4329d0b))

##### Bug Fixes

*  change stream names to reflect new stream names ([59eb483d](https://github.com/firstlovecenter/fl-pastoral-care/commit/59eb483d78ca640f576a87671867f064b83d437b))
*  improve button loading ux when closing down a church ([79216fa6](https://github.com/firstlovecenter/fl-pastoral-care/commit/79216fa638b30843f6d27a1762f0f873e9f85e4f))
*  data aggregation will happen only on wednesday to sunday ([28f459f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/28f459f68b1611caf59deba858c2b7fd8aa6cc74))
*  fix issue where constituency name is the same in confirm banking popup ([7360d71a](https://github.com/firstlovecenter/fl-pastoral-care/commit/7360d71af6433871bba9243502cd491c5a4b94c4))
*  data aggregation will happen only on wednesday to sunday ([abd102da](https://github.com/firstlovecenter/fl-pastoral-care/commit/abd102daa837e7d681a4cb5800993e5562ec53a9))
*  admin-311 tweak UX so enable popup to work after installing sentry.io ([0dd10a39](https://github.com/firstlovecenter/fl-pastoral-care/commit/0dd10a39f12223f2f6aeea8638594a81b4b95ebe))
*  admin-311 merge anagkazo banking by constituencies into deploy ([5364ffc6](https://github.com/firstlovecenter/fl-pastoral-care/commit/5364ffc64d60c41f5a4f59f980822ff686890507))
*  restore throwErrorMsg function ([b3fcecbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3fcecbc3fc89c310010eefd2c70e9b742906957))
*  change throwErrorMsg function to throwToSentry in frontend anagkazo confirmation ([7d8bd1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d8bd1f8849fa861cd6455e94d81dd4b24d80492))
*  fix error where users is unable to edit a fellowship when there is no leader ([61fb88d6](https://github.com/firstlovecenter/fl-pastoral-care/commit/61fb88d6ce53f2b20cfbc20ce9af32e956b70bd8))
*  remove service day check on defaulters cypher in confirm anagkazo banking ([f671b87f](https://github.com/firstlovecenter/fl-pastoral-care/commit/f671b87f425396a6976a9019e3fecb37a898e763))
*  update aggregation scheduled function to run daily ([52ab3d66](https://github.com/firstlovecenter/fl-pastoral-care/commit/52ab3d664d93dc1f56eb59dd799489f3c4318f42))
*  admin 339 fix cypher that checks if a felowship has members to always return data ([735f52b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/735f52b4c8544d432867a6d637cc56354f495951))
*  improve error handling when money cannot be sent ([b0607b67](https://github.com/firstlovecenter/fl-pastoral-care/commit/b0607b678615ccee97c7d72ab5da29e29153656a))
*  combine arrival time and counting into one mutation ([3582a547](https://github.com/firstlovecenter/fl-pastoral-care/commit/3582a547a8459d103ca312e59521714239d7677a))
*  refactor mutation to close down fellowship to align with sentry.io workflow ([6c3c4647](https://github.com/firstlovecenter/fl-pastoral-care/commit/6c3c46470f8f0e9835722fe64b3516da32904246))
*  update arrival top up amounts to reflect to in and out percentages ([4980fd99](https://github.com/firstlovecenter/fl-pastoral-care/commit/4980fd994d956e0b0af3fc5aedd5c0b7f5971554))
*  admin 339 fix cypher that checks if an equipment form has been filled to always return data ([4c39c899](https://github.com/firstlovecenter/fl-pastoral-care/commit/4c39c89935d2293bc4e0974543a535e4fb04bf21))
*  fix bug preventing login page from showing ([59f2e7b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/59f2e7b438b92350fbf02d366cbd441651cd5b9c))
*  implement further checks to prevent running query when token has not loaded ([ec46419f](https://github.com/firstlovecenter/fl-pastoral-care/commit/ec46419f4ac48f7829d73193973553f62eb31dd4))
*  admin-329 implement not running ANY queries until the user is authenticated ([980df7c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/980df7c790e92b78256400b951e94900b7bf9a6f))
*  fix arrivals typo breaking the build ([085e7935](https://github.com/firstlovecenter/fl-pastoral-care/commit/085e79352d95eadbb702be45ea36f82c9a0831d3))
*  change import of large-number css to where it is used ([d6fee247](https://github.com/firstlovecenter/fl-pastoral-care/commit/d6fee24703e0f337f3711235ebf2f381ef2a32db))
*  add with which was breaking the mutation to record arrival time ([7f354023](https://github.com/firstlovecenter/fl-pastoral-care/commit/7f3540238713c20b98d7d7e381f11c84106a44ad))
*  fix bug preventing bussing data from aggregating on higher churches ([65264448](https://github.com/firstlovecenter/fl-pastoral-care/commit/6526444859e8f7e22d734635fd20a63f0bc08ebf))
*  implement error message to sentry when any cypher query returns null ([4dede820](https://github.com/firstlovecenter/fl-pastoral-care/commit/4dede820a805801050ef61cf7ba0d6ab16619fbe))
*  change throwErrorMsg to throwToSentry ([185a6f8d](https://github.com/firstlovecenter/fl-pastoral-care/commit/185a6f8db2911c940467f6338edd2b57e1220f78))
*  implement tellerConfirmationTime as a field on ServiceRecord in graphql schema ([af56079e](https://github.com/firstlovecenter/fl-pastoral-care/commit/af56079e5cf0e1b87dc62b92178e318c38ec4776))

##### Other Changes

* 55 ([520e14bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/520e14bf204a9215f460930e4f1ec937d760eb2b))
* 50 pm ([2cd907a3](https://github.com/firstlovecenter/fl-pastoral-care/commit/2cd907a379a215b049ae17dd89b5aad1e0a1fc3b))

##### Refactors

*  change from throwErrorMsg to throwToSentry and throw new Error ([0c894226](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c8942263364df43478e41cc6377feb85905c5ae))
*  wrap apollo wrapper component over fellowship and constituency equipment campaign page ([029da646](https://github.com/firstlovecenter/fl-pastoral-care/commit/029da646ad15075fb81bd58de69ed3daf05f5431))
*  redesign confirm banking interface to receive midweek offerings in constituencies ([23ba5416](https://github.com/firstlovecenter/fl-pastoral-care/commit/23ba5416b39a120c5c44e467384134ab9812d086))
*  refactor error messages to better align with sentry.io workflow ([14c73356](https://github.com/firstlovecenter/fl-pastoral-care/commit/14c7335647f928db012c5a579af39beeeb0d2657))
*  admin 311 change confirm banking mutation to confirm constituency bakning ([e1fe782e](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1fe782e58eb6a2348200d4fb2303ac0ddbeccb0))

#### 5.1.20 (2022-09-29)

##### Continuous Integration

*  switch to using env variable for mailgun_domain ([2717716c](https://github.com/firstlovecenter/fl-pastoral-care/commit/2717716cc97614104b746762be317c0ece5a4e5d))

##### New Features

*  admin-344 change equipment trend denominator to show fellowship ewuipment filled count ([4451a463](https://github.com/firstlovecenter/fl-pastoral-care/commit/4451a4638b6f4acf062a16f8998994d1ed7a1c78))
*  admin-348 prevent data load until all data have finished loading in equipment campaign ([2298bed7](https://github.com/firstlovecenter/fl-pastoral-care/commit/2298bed780e8f831f304ec9d67ada1fab789fdbb))
*  add optional foreign currency field to aggregate service record type ([8b954974](https://github.com/firstlovecenter/fl-pastoral-care/commit/8b9549744f94122cb858b20a7503505c57e22ab0))
*  make havenotfilled buttons clickable to display churches that havent filled the equipment form ([1e547374](https://github.com/firstlovecenter/fl-pastoral-care/commit/1e54737475075694f888e2b9ba654e9a73c91bfa))
*  implement template message when sending whatsapp to defaulting admins ([ba9aafa7](https://github.com/firstlovecenter/fl-pastoral-care/commit/ba9aafa7e1b9fbb39d72a6d9aebae00411aacc16))
*  update top up amounts to better reflect the  heart behind the top up amounts ([7e1d8b03](https://github.com/firstlovecenter/fl-pastoral-care/commit/7e1d8b03e8788369423cfe5c6fc7f8b9146554c0))
*  implement custom whatsapp message template for service defaulters ([b637043d](https://github.com/firstlovecenter/fl-pastoral-care/commit/b637043da12282e72fe2f19a7ca9738ed4329d0b))

##### Bug Fixes

*  change stream names to reflect new stream names ([59eb483d](https://github.com/firstlovecenter/fl-pastoral-care/commit/59eb483d78ca640f576a87671867f064b83d437b))
*  improve button loading ux when closing down a church ([79216fa6](https://github.com/firstlovecenter/fl-pastoral-care/commit/79216fa638b30843f6d27a1762f0f873e9f85e4f))
*  data aggregation will happen only on wednesday to sunday ([28f459f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/28f459f68b1611caf59deba858c2b7fd8aa6cc74))
*  fix issue where constituency name is the same in confirm banking popup ([7360d71a](https://github.com/firstlovecenter/fl-pastoral-care/commit/7360d71af6433871bba9243502cd491c5a4b94c4))
*  data aggregation will happen only on wednesday to sunday ([abd102da](https://github.com/firstlovecenter/fl-pastoral-care/commit/abd102daa837e7d681a4cb5800993e5562ec53a9))
*  admin-311 tweak UX so enable popup to work after installing sentry.io ([0dd10a39](https://github.com/firstlovecenter/fl-pastoral-care/commit/0dd10a39f12223f2f6aeea8638594a81b4b95ebe))
*  admin-311 merge anagkazo banking by constituencies into deploy ([5364ffc6](https://github.com/firstlovecenter/fl-pastoral-care/commit/5364ffc64d60c41f5a4f59f980822ff686890507))
*  restore throwErrorMsg function ([b3fcecbc](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3fcecbc3fc89c310010eefd2c70e9b742906957))
*  change throwErrorMsg function to throwToSentry in frontend anagkazo confirmation ([7d8bd1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d8bd1f8849fa861cd6455e94d81dd4b24d80492))
*  fix error where users is unable to edit a fellowship when there is no leader ([61fb88d6](https://github.com/firstlovecenter/fl-pastoral-care/commit/61fb88d6ce53f2b20cfbc20ce9af32e956b70bd8))
*  remove service day check on defaulters cypher in confirm anagkazo banking ([f671b87f](https://github.com/firstlovecenter/fl-pastoral-care/commit/f671b87f425396a6976a9019e3fecb37a898e763))
*  update aggregation scheduled function to run daily ([52ab3d66](https://github.com/firstlovecenter/fl-pastoral-care/commit/52ab3d664d93dc1f56eb59dd799489f3c4318f42))
*  admin 339 fix cypher that checks if a felowship has members to always return data ([735f52b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/735f52b4c8544d432867a6d637cc56354f495951))
*  improve error handling when money cannot be sent ([b0607b67](https://github.com/firstlovecenter/fl-pastoral-care/commit/b0607b678615ccee97c7d72ab5da29e29153656a))
*  combine arrival time and counting into one mutation ([3582a547](https://github.com/firstlovecenter/fl-pastoral-care/commit/3582a547a8459d103ca312e59521714239d7677a))
*  refactor mutation to close down fellowship to align with sentry.io workflow ([6c3c4647](https://github.com/firstlovecenter/fl-pastoral-care/commit/6c3c46470f8f0e9835722fe64b3516da32904246))
*  update arrival top up amounts to reflect to in and out percentages ([4980fd99](https://github.com/firstlovecenter/fl-pastoral-care/commit/4980fd994d956e0b0af3fc5aedd5c0b7f5971554))
*  admin 339 fix cypher that checks if an equipment form has been filled to always return data ([4c39c899](https://github.com/firstlovecenter/fl-pastoral-care/commit/4c39c89935d2293bc4e0974543a535e4fb04bf21))
*  fix bug preventing login page from showing ([59f2e7b4](https://github.com/firstlovecenter/fl-pastoral-care/commit/59f2e7b438b92350fbf02d366cbd441651cd5b9c))
*  implement further checks to prevent running query when token has not loaded ([ec46419f](https://github.com/firstlovecenter/fl-pastoral-care/commit/ec46419f4ac48f7829d73193973553f62eb31dd4))
*  admin-329 implement not running ANY queries until the user is authenticated ([980df7c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/980df7c790e92b78256400b951e94900b7bf9a6f))
*  fix arrivals typo breaking the build ([085e7935](https://github.com/firstlovecenter/fl-pastoral-care/commit/085e79352d95eadbb702be45ea36f82c9a0831d3))
*  change import of large-number css to where it is used ([d6fee247](https://github.com/firstlovecenter/fl-pastoral-care/commit/d6fee24703e0f337f3711235ebf2f381ef2a32db))
*  add with which was breaking the mutation to record arrival time ([7f354023](https://github.com/firstlovecenter/fl-pastoral-care/commit/7f3540238713c20b98d7d7e381f11c84106a44ad))
*  fix bug preventing bussing data from aggregating on higher churches ([65264448](https://github.com/firstlovecenter/fl-pastoral-care/commit/6526444859e8f7e22d734635fd20a63f0bc08ebf))
*  implement error message to sentry when any cypher query returns null ([4dede820](https://github.com/firstlovecenter/fl-pastoral-care/commit/4dede820a805801050ef61cf7ba0d6ab16619fbe))
*  change throwErrorMsg to throwToSentry ([185a6f8d](https://github.com/firstlovecenter/fl-pastoral-care/commit/185a6f8db2911c940467f6338edd2b57e1220f78))
*  implement tellerConfirmationTime as a field on ServiceRecord in graphql schema ([af56079e](https://github.com/firstlovecenter/fl-pastoral-care/commit/af56079e5cf0e1b87dc62b92178e318c38ec4776))

##### Other Changes

* 55 ([520e14bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/520e14bf204a9215f460930e4f1ec937d760eb2b))
* 50 pm ([2cd907a3](https://github.com/firstlovecenter/fl-pastoral-care/commit/2cd907a379a215b049ae17dd89b5aad1e0a1fc3b))

##### Refactors

*  change from throwErrorMsg to throwToSentry and throw new Error ([0c894226](https://github.com/firstlovecenter/fl-pastoral-care/commit/0c8942263364df43478e41cc6377feb85905c5ae))
*  wrap apollo wrapper component over fellowship and constituency equipment campaign page ([029da646](https://github.com/firstlovecenter/fl-pastoral-care/commit/029da646ad15075fb81bd58de69ed3daf05f5431))
*  redesign confirm banking interface to receive midweek offerings in constituencies ([23ba5416](https://github.com/firstlovecenter/fl-pastoral-care/commit/23ba5416b39a120c5c44e467384134ab9812d086))
*  refactor error messages to better align with sentry.io workflow ([14c73356](https://github.com/firstlovecenter/fl-pastoral-care/commit/14c7335647f928db012c5a579af39beeeb0d2657))
*  admin 311 change confirm banking mutation to confirm constituency bakning ([e1fe782e](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1fe782e58eb6a2348200d4fb2303ac0ddbeccb0))

#### 5.1.19 (2022-09-24)

##### New Features

*  admin-318 implement a button behind the refresh and back buttons ([cc239105](https://github.com/firstlovecenter/fl-pastoral-care/commit/cc2391059e797266d99ce7bec8058af5a57998bf))
*  implement pull to refresh functionality for church by subchurch for defaulters ([a8c6a734](https://github.com/firstlovecenter/fl-pastoral-care/commit/a8c6a7341c3bdae2fc8c5dcbed3c5da43589b915))

##### Bug Fixes

*  implement ux to force user to confirm payment if they have outstanding banking to do ([7d8d744f](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d8d744f97098b167aa9338a72d73bb5d02849c5))
*  improve error handling to know why some vehicles do not get confirmed as arrived ([bf59a206](https://github.com/firstlovecenter/fl-pastoral-care/commit/bf59a206d2d05a3cc1d3fe990d00b318084c852b))
*  add optional chain in form mobilisation submission ([43b681ab](https://github.com/firstlovecenter/fl-pastoral-care/commit/43b681abc2866ea6acda1dac76f903febf6435ef))
*  add optional chain to prevent cannot read properties of undefined errors from sentry ([a06578f0](https://github.com/firstlovecenter/fl-pastoral-care/commit/a06578f08e696809b4108ef21ba05489ff7f3cee))

#### 5.1.18 (2022-09-23)

##### Chores

*  update non breaking changes ([00faf2fd](https://github.com/firstlovecenter/fl-pastoral-care/commit/00faf2fd4d0554543f774642af44ea62d2973193))

##### Continuous Integration

*  optimised Error Screen component to  send data to Sentry ([c6e91cee](https://github.com/firstlovecenter/fl-pastoral-care/commit/c6e91ceed20f863dbf10d1312cbca7789cfe07fb))
*  implement sentry error tracking in the backend ([fb50248a](https://github.com/firstlovecenter/fl-pastoral-care/commit/fb50248a1755f7d2b95223fc61afb197d545eb17))
*  implement sentry.io automated error reporting in frontend ([7f2e40fa](https://github.com/firstlovecenter/fl-pastoral-care/commit/7f2e40fab1ad91cf0583abce7b5813955143c09c))

##### New Features

*  implement user feedback for that displays when the app crashes ([357d1d46](https://github.com/firstlovecenter/fl-pastoral-care/commit/357d1d4684ee1decd57f3bce6877da1cbc9aa19d))

##### Bug Fixes

*  improve error handling for failed self banking ([449b9f71](https://github.com/firstlovecenter/fl-pastoral-care/commit/449b9f715864443e50d9568366f593cf3e065ec7))
*  fix bug where service cancellation could be done multiple times in a week ([f717e000](https://github.com/firstlovecenter/fl-pastoral-care/commit/f717e000ef98fad78b80195a932d3305d28d7b63))
*  admin-315 fix bug preventing service details from showing when a person cancels service ([9b93a610](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b93a6108926359cd9eb96e0e8dcf7b5372b54de))

##### Refactors

*  remove unnecessary console log ([3e29958f](https://github.com/firstlovecenter/fl-pastoral-care/commit/3e29958fa384ff452a88ad45d7f0126cba88ce00))

#### 5.1.17 (2022-09-22)

##### New Features

*  set back and refresh button to only show when app is in standalone mode ([c7bbb9dc](https://github.com/firstlovecenter/fl-pastoral-care/commit/c7bbb9dc458c25ca2bc9f3348edf2d410f094529))
*  add a refresh and back button to the navbar ([6002241b](https://github.com/firstlovecenter/fl-pastoral-care/commit/6002241b0a3ea4a9cc77d1cd18c2acbe11b41d25))

##### Bug Fixes

*  fix gaping holes in stream teller functionality with permissions ([c8a4194e](https://github.com/firstlovecenter/fl-pastoral-care/commit/c8a4194ea33288090b15d435cdd00de28850e484))
*  modify attendance confirmation so that arrivals can input 0 for attendance ([b9246b6c](https://github.com/firstlovecenter/fl-pastoral-care/commit/b9246b6cae9442aa8b49d21df61e0860c02c21ae))
*  fix version numbers in packagelock.json ([c088fb41](https://github.com/firstlovecenter/fl-pastoral-care/commit/c088fb41badadcbb4d6c764b4a2ebc6de02363b7))

#### 5.1.16 (2022-09-21)

##### New Features

*  implement self organising folder structure in cloudinary ([7de27995](https://github.com/firstlovecenter/fl-pastoral-care/commit/7de279951aec9d2ef8d084ca52c418ad85e6fdd0))
*  implement scheduled aggregation for bacenta data ([5d80e055](https://github.com/firstlovecenter/fl-pastoral-care/commit/5d80e055575d31832a10f9e4b72aff4f5167b968))
*  implement function to aggregate service data that will run on schedule  -final ([9a09cbdb](https://github.com/firstlovecenter/fl-pastoral-care/commit/9a09cbdb56a6a4fe1592c570c8ccb6d9958e70b1))
*  implement function to aggregate service data that will run on schedule ([7cd9bcd9](https://github.com/firstlovecenter/fl-pastoral-care/commit/7cd9bcd9d7f3a1aa07ef43e1541154756e01cfc7))
*  implement function to aggregate service data that will run on schedule ([46008934](https://github.com/firstlovecenter/fl-pastoral-care/commit/46008934a4e79ce1494c5cbf1210cb94721cf622))

##### Bug Fixes

*  downgrade neo4j packages in graphql function ([0bd3702b](https://github.com/firstlovecenter/fl-pastoral-care/commit/0bd3702b57045b2eefb77b0752f4bbd31fce3fce))
*  downgraded neo4j-driver to 4.3.1 to avoid bug in 5.0.1 ([15af93a8](https://github.com/firstlovecenter/fl-pastoral-care/commit/15af93a808fe2d98f9853aa3d3aa6a1cff55455b))
*  make aggregate function run on monday for the week just ended ([2aa96c50](https://github.com/firstlovecenter/fl-pastoral-care/commit/2aa96c505082f0b5e86e0aaec83878007f765e2d))
*  schedule function to run on Sunday ? ([b5b03911](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5b039111494da6d033321967a0a4e43f03c2da3))
*  change scheduled function to runnin on day 1 ([7ad87eaf](https://github.com/firstlovecenter/fl-pastoral-care/commit/7ad87eafd7989ad523dc3b60bdb7c21cb5effe5f))
*  try using 0 to represent Sunday instead of 7 ([f2a68254](https://github.com/firstlovecenter/fl-pastoral-care/commit/f2a682540977d2bb2966fcd16d143abbe83fb56c))
*  correct export of handler ([b77f3a49](https://github.com/firstlovecenter/fl-pastoral-care/commit/b77f3a49e70441a7667e77a08ac6bb8384d70976))
*  correct export of handler ([d9336994](https://github.com/firstlovecenter/fl-pastoral-care/commit/d93369944a328b79753a8183382d165d97cd936d))
*  move cypher statement inside function ([853a5dbe](https://github.com/firstlovecenter/fl-pastoral-care/commit/853a5dbecbec9d517cc8ae2c0a4c90db394fed48))
*  fix breaking typo ([d7447760](https://github.com/firstlovecenter/fl-pastoral-care/commit/d744776018f49f183891f2d64a452dc963f28b3a))
*  remove the word 'export' ([07b93902](https://github.com/firstlovecenter/fl-pastoral-care/commit/07b93902826e31f3767642f7761b92cff39d6a7d))
*  change schedule of function to run on Sundays only ([c9525076](https://github.com/firstlovecenter/fl-pastoral-care/commit/c95250765810bb7c6da9f1c290eefbc3f5024cb6))
*  fix cypher that violates creation of aggregatebussing ([63344ff5](https://github.com/firstlovecenter/fl-pastoral-care/commit/63344ff58fd28d91ffa0090cc7f1bba28a3371a3))
*  change scheduled  function to run once a day ([9714ea08](https://github.com/firstlovecenter/fl-pastoral-care/commit/9714ea08b26055fc2906e98094aba47e6406e590))
*  fix cypher statement that was violating constraints on creating AggregateServiceRecords ([3c5daed1](https://github.com/firstlovecenter/fl-pastoral-care/commit/3c5daed1cc0274fd872d3a6c9f62552365c28f5c))
*  implement adjustment for service aggregate calc to  factor for joint services ([c3296cea](https://github.com/firstlovecenter/fl-pastoral-care/commit/c3296cea16dfbb9b265d9913829b7f03bb79997d))
*  fix equipment deadline to allow users to fill on day of deadline ([c6c5d8aa](https://github.com/firstlovecenter/fl-pastoral-care/commit/c6c5d8aa1732ce4d2987071751b0061ce0df49cc))

##### Other Changes

* 30 pm  each day ([f6dffff1](https://github.com/firstlovecenter/fl-pastoral-care/commit/f6dffff13a80ce8533ceedab815a87b8dd46a679))

##### Refactors

*  move aggregation to the  data aggregation file ([4004d4c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/4004d4c66b8eb5b8890d68f230b1fa2efe1b5280))

#### 5.1.15 (2022-09-16)

##### Bug Fixes

*  implement fix for graphs not showing on certain screens ([89bcce35](https://github.com/firstlovecenter/fl-pastoral-care/commit/89bcce355c17a7a5b43f838ed9a616fddf72a832))

#### 5.1.14 (2022-09-16)

##### Bug Fixes

*  adjust home screen graph to return exactly 4 weeks ([014307dc](https://github.com/firstlovecenter/fl-pastoral-care/commit/014307dc5bca2ecdad6853b05c72b3cde53d9f7c))

##### Refactors

*  aggregate bussing records on the fly the proper way ([fc523bc7](https://github.com/firstlovecenter/fl-pastoral-care/commit/fc523bc7bd4cf901d049b29caa9698480d81bc3f))
*  aggregate service records on the fly ([a7ceaa29](https://github.com/firstlovecenter/fl-pastoral-care/commit/a7ceaa296302c056675551854a65f4b8ba4dae18))

#### 5.1.13 (2022-09-15)

##### Bug Fixes

*  fix bug giving error when people submit service data ([74e09dd6](https://github.com/firstlovecenter/fl-pastoral-care/commit/74e09dd67ee0c9fe1ce64dffb0d27144d7fc185a))
*  change c 'created_at' to createdAt ([01a67341](https://github.com/firstlovecenter/fl-pastoral-care/commit/01a67341655c7d3fdad3b124590ade5b05853f75))
*  remove the use of the distinct keyword on sum of bacenta target ([d8499164](https://github.com/firstlovecenter/fl-pastoral-care/commit/d8499164fab252b39b5aaffd0a992321dd2049d7))
*  replace static target and member count with dynamic counts ([5efb9936](https://github.com/firstlovecenter/fl-pastoral-care/commit/5efb99367714eda14aea9f5f676fe2ab4d63e45d))
*  show modal pop up to confirm code of the day has been set in arrivals ([#287](https://github.com/firstlovecenter/fl-pastoral-care/pull/287)) ([674aebbe](https://github.com/firstlovecenter/fl-pastoral-care/commit/674aebbedbed7c542a9c4eff9a9b298d252515ef))
*  modify income bar on aggregate graphs to no longer be clickable ([1db6a9e7](https://github.com/firstlovecenter/fl-pastoral-care/commit/1db6a9e7123d4aee890572226d48d8691ed66a61))

##### Performance Improvements

*  implement some non null constraints in the directory api ([5b8d47a5](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b8d47a5a9f2d296cdd3f7cc8487025b9c10f3a7))

#### 5.1.12 (2022-09-14)

##### Chores

*  update dependencies ([e7fc206e](https://github.com/firstlovecenter/fl-pastoral-care/commit/e7fc206eba4c33d31382b3984ae5ee10d9dba824))

##### New Features

*  implement new splash screens for ios with red backgrounds ([#285](https://github.com/firstlovecenter/fl-pastoral-care/pull/285)) ([11e2f8a5](https://github.com/firstlovecenter/fl-pastoral-care/commit/11e2f8a5de58d8e67192382e83299d37eef9a1dc))
*  implement equipment defaulters flow for gathering and stream level admins ([#283](https://github.com/firstlovecenter/fl-pastoral-care/pull/283)) ([a533659e](https://github.com/firstlovecenter/fl-pastoral-care/commit/a533659e34d1c3ae716e20da1bc076d7b0756d21))

##### Bug Fixes

*  set memberCount on creating church ([8fcd1830](https://github.com/firstlovecenter/fl-pastoral-care/commit/8fcd18301d62f5ea7f00d1d62c6bd647207b4753))
*  fix admin names appearing as undefined when no admin is present in equipment defaulters flow ([#286](https://github.com/firstlovecenter/fl-pastoral-care/pull/286)) ([3ae69fe2](https://github.com/firstlovecenter/fl-pastoral-care/commit/3ae69fe2a4460a83aaa531aea1c76b69e799e380))
*  fix confirmed higher aggregate for bussing records ([9e00f9ff](https://github.com/firstlovecenter/fl-pastoral-care/commit/9e00f9ff9a693277e1becfaf97a4346b3d51f85a))

##### Performance Improvements

*  relocate css for menu buttons to keep ui consistent ([ecf2b143](https://github.com/firstlovecenter/fl-pastoral-care/commit/ecf2b1431b471e066f1529238ea60489e750a2f3))

#### 5.1.11 (2022-09-11)

##### Chores

*  api version bump ([f36b77e6](https://github.com/firstlovecenter/fl-pastoral-care/commit/f36b77e65cb85642dbaf8e50142c969d4a19848d))

##### Bug Fixes

*  add permissions for gathering arrivals admin ([6eeebc0f](https://github.com/firstlovecenter/fl-pastoral-care/commit/6eeebc0fd1504759b40a40b567eff18c795b74b4))
*  fix bug causing  multiple aggregateBussingRecord nodes for the same week and year ([24582195](https://github.com/firstlovecenter/fl-pastoral-care/commit/2458219542cd710040e9eb2ceebb92c0b3219dfa))

#### 5.1.10 (2022-09-11)

##### Continuous Integration

*  update npm release commands fix ([4d1b218d](https://github.com/firstlovecenter/fl-pastoral-care/commit/4d1b218dea8ca56be96a3eb9fb9a446d6f217bbd))
*  update npm release commands ([f324bdb3](https://github.com/firstlovecenter/fl-pastoral-care/commit/f324bdb33b5667ba2a067ef16c4bab10f03ffa94))

##### Bug Fixes

*  bacenta aggregate records are now initialised with an attendance of 0 ([31b179cd](https://github.com/firstlovecenter/fl-pastoral-care/commit/31b179cd577c1b59b4d5297629c8671fad0a2239))
*  fix cypher bug that was not adding attendance to aggregate bussing records ([15d4af35](https://github.com/firstlovecenter/fl-pastoral-care/commit/15d4af35759e9dad382757e20450c4510d4866c1))
*  fix bug creating multiple histories with invalid date when bussing details are updated ([0862e0e6](https://github.com/firstlovecenter/fl-pastoral-care/commit/0862e0e6d55e40b013b7ecf6fc5f28a7b814bae8))

#### 5.1.8 (2022-09-10)

##### Documentation Changes

*  update CHANGELOG.md ([60a4a421](https://github.com/firstlovecenter/fl-pastoral-care/commit/60a4a4219ab59002afed1b099a505b156e372341))
*  update CHANGELOG.md ([83319905](https://github.com/firstlovecenter/fl-pastoral-care/commit/83319905f6be5dfce0cfad0c25bd229d804f1d5f))

##### New Features

*  implement pull to refresh feature on equipment defaulters pages ([#278](https://github.com/firstlovecenter/fl-pastoral-care/pull/278)) ([29179bbe](https://github.com/firstlovecenter/fl-pastoral-care/commit/29179bbef9d08705a39e735b60a5f829d0ac9393))

##### Bug Fixes

*  show bacenta momo number when either sprinterCost or urvanCost is present ([429c3aae](https://github.com/firstlovecenter/fl-pastoral-care/commit/429c3aae7be24a17600c37bfaf7b2ce289b1a920))
*  change top up in bacenta details to 'one way top up' in form ([b99cd956](https://github.com/firstlovecenter/fl-pastoral-care/commit/b99cd9561d9815ce707a747272bb1c994bc9e04e))
*  change top up in bacenta details to 'one way top up' ([a4ec0fc8](https://github.com/firstlovecenter/fl-pastoral-care/commit/a4ec0fc8aeab9f7f1d5108414c9eb5b03e73e820))

##### Performance Improvements

*  improve loading ux for equipment campaign deadline ([#280](https://github.com/firstlovecenter/fl-pastoral-care/pull/280)) ([f143376d](https://github.com/firstlovecenter/fl-pastoral-care/commit/f143376d591bfdf05e183f3af3069ff71a314c6f))

#### 5.1.7 (2022-09-10)

#### 5.1.6 (2022-09-10)

##### New Features

*  implement pull to refresh feature on equipment defaulters pages ([#278](https://github.com/firstlovecenter/fl-pastoral-care/pull/278)) ([29179bbe](https://github.com/firstlovecenter/fl-pastoral-care/commit/29179bbef9d08705a39e735b60a5f829d0ac9393))

##### Bug Fixes

*  show bacenta momo number when either sprinterCost or urvanCost is present ([429c3aae](https://github.com/firstlovecenter/fl-pastoral-care/commit/429c3aae7be24a17600c37bfaf7b2ce289b1a920))
*  change top up in bacenta details to 'one way top up' in form ([b99cd956](https://github.com/firstlovecenter/fl-pastoral-care/commit/b99cd9561d9815ce707a747272bb1c994bc9e04e))
*  change top up in bacenta details to 'one way top up' ([a4ec0fc8](https://github.com/firstlovecenter/fl-pastoral-care/commit/a4ec0fc8aeab9f7f1d5108414c9eb5b03e73e820))

##### Performance Improvements

*  improve loading ux for equipment campaign deadline ([#280](https://github.com/firstlovecenter/fl-pastoral-care/pull/280)) ([f143376d](https://github.com/firstlovecenter/fl-pastoral-care/commit/f143376d591bfdf05e183f3af3069ff71a314c6f))

#### 5.1.5 (2022-09-09)

##### Documentation Changes

*  update PR template ([ceecad35](https://github.com/firstlovecenter/fl-pastoral-care/commit/ceecad350240317871e40f747f6db298946ba463))

##### New Features

*  implement equipment deadline on the equipment main page ([#277](https://github.com/firstlovecenter/fl-pastoral-care/pull/277)) ([b9f9cd77](https://github.com/firstlovecenter/fl-pastoral-care/commit/b9f9cd774824ed8a8b329b10dd558b1b8bf6d845))

##### Bug Fixes

*  change start url in manifest.json ([#279](https://github.com/firstlovecenter/fl-pastoral-care/pull/279)) ([0634f918](https://github.com/firstlovecenter/fl-pastoral-care/commit/0634f918c6f14b935fff907baaa5f5baed48feee))
*  change background color dark grey ([e24fdc48](https://github.com/firstlovecenter/fl-pastoral-care/commit/e24fdc483dc558eda4db223b280f1623ebe5424d))

#### 5.1.4 (2022-09-04)

##### New Features

*  adds prepared cypher statements to BeforeNextUpdate.cypher file ([4d494e25](https://github.com/firstlovecenter/fl-pastoral-care/commit/4d494e25436cd28318ccc13e4d22e153cb1a20cb))
*  admin-273 implement aggregation member count ([6e8de16a](https://github.com/firstlovecenter/fl-pastoral-care/commit/6e8de16ac46e3de1ca45ccc54f917464372ab64a))

##### Bug Fixes

*  update start_url in manifest.json ([e55f235b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e55f235be4ee0cd3c2e4046fcde1ea9c16d2cf82))
*  update vehicle cost, to say 'one way' ([5f951cdc](https://github.com/firstlovecenter/fl-pastoral-care/commit/5f951cdcb3cde08988f84fb712a0e9525a4821cd))
*  update arrivals cypher which calculates aggregate attendance upwards ([f7f36ae6](https://github.com/firstlovecenter/fl-pastoral-care/commit/f7f36ae6ef9abdda04b7c9086ade1ecec2044fb6))
*  update addMemberToUpperChurch to also add to fellowship member counter ([d5309e2c](https://github.com/firstlovecenter/fl-pastoral-care/commit/d5309e2cdcecba184630f24b32e88f2fabedee78))
*  swap primaryheading to be the church name, and secondary heading to be the campaign name ([#272](https://github.com/firstlovecenter/fl-pastoral-care/pull/272)) ([733bdc26](https://github.com/firstlovecenter/fl-pastoral-care/commit/733bdc260a127faf67d914a1fcdfda02ffbda5b0))
*  fix constituency record null id error ([#273](https://github.com/firstlovecenter/fl-pastoral-care/pull/273)) ([89702770](https://github.com/firstlovecenter/fl-pastoral-care/commit/897027703af9275f74d8d102a3c851cbdc894792))
*  correct function calculating vehicle top up ([1188a697](https://github.com/firstlovecenter/fl-pastoral-care/commit/1188a697d714221935c83e84c3995a405022acc9))

#### 5.1.3 (2022-09-03)

##### Chores

*  sync version numbers ([725aaea4](https://github.com/firstlovecenter/fl-pastoral-care/commit/725aaea442073594be7c2eeaafb69c39cbf4c638))
*  version bump ([e92788f2](https://github.com/firstlovecenter/fl-pastoral-care/commit/e92788f2114483746c3ad1271f2d934a4fa5f1d8))

##### Documentation Changes

*  update CHANGELOG.md ([4dd0a587](https://github.com/firstlovecenter/fl-pastoral-care/commit/4dd0a5879196d1f0926dcbd6c6cc91bb705b9062))
*  update CHANGELOG.md ([331524bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/331524bf70a85379de5085c8d75227d305827c4c))

##### Bug Fixes

*  change start url to prevent showing 404 page ([b8492815](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8492815ceef968e11af88274d34c22e8af500dd))

##### Other Changes

* //github.com/firstlovecenter/fl-admin-portal into deploy ([79902dc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/79902dc570db1deb206de8aec48d2b07f67930d0))

#### 5.1.2 (2022-09-03)

##### Chores

*  sync version numbers ([725aaea4](https://github.com/firstlovecenter/fl-pastoral-care/commit/725aaea442073594be7c2eeaafb69c39cbf4c638))
*  version bump ([e92788f2](https://github.com/firstlovecenter/fl-pastoral-care/commit/e92788f2114483746c3ad1271f2d934a4fa5f1d8))

##### Documentation Changes

*  update CHANGELOG.md ([331524bf](https://github.com/firstlovecenter/fl-pastoral-care/commit/331524bf70a85379de5085c8d75227d305827c4c))

##### Bug Fixes

*  change start url to prevent showing 404 page ([b8492815](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8492815ceef968e11af88274d34c22e8af500dd))

##### Other Changes

* //github.com/firstlovecenter/fl-admin-portal into deploy ([79902dc5](https://github.com/firstlovecenter/fl-pastoral-care/commit/79902dc570db1deb206de8aec48d2b07f67930d0))

#### 5.1.3 (2022-09-03)

#### 5.1.2 (2022-09-03)

#### 5.1.1 (2022-09-03)

##### New Features

*  add shortcuts feature to pwa for convenient user experience ([#269](https://github.com/firstlovecenter/fl-pastoral-care/pull/269)) ([70f5a9b0](https://github.com/firstlovecenter/fl-pastoral-care/commit/70f5a9b0397843aee978a44d8e418e83cb640dcd))

##### Bug Fixes

*  fix error in calculating top up amount ([dedafe8e](https://github.com/firstlovecenter/fl-pastoral-care/commit/dedafe8e20ac24767a35917a3016688e9d1f8d76))
*  fix bug passing NaN to vehicle top up ([fcb29543](https://github.com/firstlovecenter/fl-pastoral-care/commit/fcb29543142ac1eefc4f34c31fa313f2c4df3091))
*  fix bug preventing arrivals data from being submitted ([ef460d98](https://github.com/firstlovecenter/fl-pastoral-care/commit/ef460d9808d62a119308492b7b652c652f85cbb4))
*  change font colour on user profile screen that is not visible for PWA ([#268](https://github.com/firstlovecenter/fl-pastoral-care/pull/268)) ([fd4ac90a](https://github.com/firstlovecenter/fl-pastoral-care/commit/fd4ac90a4da8ec98d9faadf5719c573b1075f894))
*  fix arrivals timeNode error ([cdeae8ba](https://github.com/firstlovecenter/fl-pastoral-care/commit/cdeae8bade96b19c23645927ea26f4d3cc3c2ad4))
*  hotfix bug preventing bacentas with no top up from filling ([b523e8c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/b523e8c6381ead2eb33c188186ba837cd8889313))

### 5.1.0 (2022-09-03)

##### Continuous Integration

*  update eslint rules to disable console logs in front end ([7bf48aec](https://github.com/firstlovecenter/fl-pastoral-care/commit/7bf48aec6a72137936d539643aed451f4e6e5876))
*  update eslint rules to disable console logs in front end ([f81f0926](https://github.com/firstlovecenter/fl-pastoral-care/commit/f81f09265de03c6f7b71451cfdb7ea4cc3e715aa))

##### Documentation Changes

*  update CHANGELOG.md ([221260c7](https://github.com/firstlovecenter/fl-pastoral-care/commit/221260c785d3db91017448279f4670c5e83e1290))

##### New Features

*  implement pwa functionality in the web app ([#244](https://github.com/firstlovecenter/fl-pastoral-care/pull/244)) ([783bea3c](https://github.com/firstlovecenter/fl-pastoral-care/commit/783bea3cba3966bdbb6775fbdb9150fcfcbedf90))
*  adjust service data writes to reflect the new aggregate structure ([bff125c4](https://github.com/firstlovecenter/fl-pastoral-care/commit/bff125c4a2d3b0b942f4eed5c4cd7c567c5d7707))
*  adjust bacenta bussing data writes to reflect new aggregate structure ([fb18890a](https://github.com/firstlovecenter/fl-pastoral-care/commit/fb18890a6b2fca683d4d5c4547a7e85cf609b1d8))

##### Bug Fixes

*  merge branch 'bugfix/graphs-admin-260' into deploy ([9122f455](https://github.com/firstlovecenter/fl-pastoral-care/commit/9122f455fe664a679010a50f356093a48803a0c7))
*  adds constituency id to constituency equipment records that have a null id ([#266](https://github.com/firstlovecenter/fl-pastoral-care/pull/266)) ([0754b881](https://github.com/firstlovecenter/fl-pastoral-care/commit/0754b881da3ba7316e38a2cf47eac673623922c7))
*  change active fellowship count to fellowship to campaign trends ([2a2c1b82](https://github.com/firstlovecenter/fl-pastoral-care/commit/2a2c1b828e41b297bd1ab55ca13b6c144271cc33))
*  fix submit button loading ux for constituency and fellowship equipment form ([#264](https://github.com/firstlovecenter/fl-pastoral-care/pull/264)) ([d0dc5a38](https://github.com/firstlovecenter/fl-pastoral-care/commit/d0dc5a381fcc916cce215331b762f8ff974a7580))
*  fix broken cypher in identifying campaign start and end dates ([c718c869](https://github.com/firstlovecenter/fl-pastoral-care/commit/c718c869a02ef3510ff12c7dfed1d83212431498))
*  changes structure of check equipment deadline statement ([eca308c8](https://github.com/firstlovecenter/fl-pastoral-care/commit/eca308c8ed9d1c8ee875f13a1e1c2e6901be4196))
*  changes date used in check for the deadline ([955aceeb](https://github.com/firstlovecenter/fl-pastoral-care/commit/955aceeb4eda5dd609cc3fe1c9a44e4dad53cbcc))
*  add permission so that fellowship leaders can view campaigns button in nav ([45f4351f](https://github.com/firstlovecenter/fl-pastoral-care/commit/45f4351fc924aaba00de109e3dd24731138b96f6))
*  fix submit button loading ux and vacation churches not appearing ([b09f5040](https://github.com/firstlovecenter/fl-pastoral-care/commit/b09f50403d784bc00f81e5f16f2e54edacf90c0c))
*  update cypher ([b430636d](https://github.com/firstlovecenter/fl-pastoral-care/commit/b430636d2db050285b6fdccf2703dce405e50eb0))
*  adds constituency id to constituency equipment records that have a null id ([#266](https://github.com/firstlovecenter/fl-pastoral-care/pull/266)) ([05d87a4a](https://github.com/firstlovecenter/fl-pastoral-care/commit/05d87a4a4bde7fbbbee2b3da91cc5c78ef6f41d9))
*  cypher for correcting service aggregates ([13aef0c9](https://github.com/firstlovecenter/fl-pastoral-care/commit/13aef0c9cc2fc4e680161dcd4ab0e8e93f14d768))
*  fix bacenta component service structure and queries ([a06ef0f4](https://github.com/firstlovecenter/fl-pastoral-care/commit/a06ef0f4599fce9449e9a33522e3539cb4cde6ad))

##### Refactors

*  implement servant and user dashboards using the new aggregate system ([b60a221f](https://github.com/firstlovecenter/fl-pastoral-care/commit/b60a221f32def7d4643818b899fbcb7fd1e874b0))
*  implement graphs using the new system of explicit aggregates ([d0239317](https://github.com/firstlovecenter/fl-pastoral-care/commit/d0239317e3d59ae9240fc9b9f7116db25cfc91e5))

## 5.0.0 (2022-09-01)

##### Chores

*  clean up all code that refers to the history substructure ([76397dee](https://github.com/firstlovecenter/fl-pastoral-care/commit/76397dee0fc094c814079f565b5d0de28040f14d))
*  update package-lock.json file ([e4f6efe0](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4f6efe060d88a5116a8ef2919ab3f4131ae25bc))

##### Continuous Integration

*  create templates for pr and issues ([c582c626](https://github.com/firstlovecenter/fl-pastoral-care/commit/c582c6264f6c266b8ca6c373f9d0788a3f52b09f))
*  write cypher to aggregate all bacenta records as explicit values ([55ad20c3](https://github.com/firstlovecenter/fl-pastoral-care/commit/55ad20c3ccb1fb709355d5c0aa1d4b07db562cf8))
*  update snapshots for PlusMinus components ([5cf777ef](https://github.com/firstlovecenter/fl-pastoral-care/commit/5cf777efb0131c7fdcc2cdb625476b929e156701))

##### Documentation Changes

*  adjust PR template ([2326806b](https://github.com/firstlovecenter/fl-pastoral-care/commit/2326806bd9c6944f463c0a89b7fd97ef6a67123a))
* **pwa:**  update name and description in manifest.json ([17077656](https://github.com/firstlovecenter/fl-pastoral-care/commit/170776568d71622d6cb1cfee5aa12453c2717c1d))

##### New Features

*  implement pwa functionality in the web app ([#244](https://github.com/firstlovecenter/fl-pastoral-care/pull/244)) ([c0e57246](https://github.com/firstlovecenter/fl-pastoral-care/commit/c0e5724645ad780fa60ffe08d3b73c490e8bdaba))
*  bacenta top ups can now be individually adjusted ([0469f0e9](https://github.com/firstlovecenter/fl-pastoral-care/commit/0469f0e90452d833f9d6c2c9f3a3ac2858c91cb6))
*  adjusted bacenta top ups based on new constituency top ups ([4f91c857](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f91c857124e7c395bd7bd6746a54fef98be3722))
*  implement pull to refresh for arrivals and defaulters ([de17a362](https://github.com/firstlovecenter/fl-pastoral-care/commit/de17a362158a3f18af043f4eb6ef0ddf38ae2f4e))
*  partway done with the pull to refresh feature ([0bb7dacf](https://github.com/firstlovecenter/fl-pastoral-care/commit/0bb7dacf217a8ae7e11b46d7ddb6335354b78f66))
*  implements defaulters flow for equipment campaign ([#240](https://github.com/firstlovecenter/fl-pastoral-care/pull/240)) ([e8044d7b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e8044d7b367b806f4ada6dbb0f4001b5a91ba852))
*  implement adding gathering service admin ([ad3ed15d](https://github.com/firstlovecenter/fl-pastoral-care/commit/ad3ed15d4c9713808a9ee43d54a2fd58ed67f79b))
*  admin-245 modify arrivals cypher and gql to follow new standard ([a4a7e964](https://github.com/firstlovecenter/fl-pastoral-care/commit/a4a7e9648901a8f4d3e07fc9ff442ab80e27ef8b))
*  admin-245 modify queries in the front end and graphs to reflect new aggregate data ([349981d2](https://github.com/firstlovecenter/fl-pastoral-care/commit/349981d2e5dbfd6e3dac459b465e6e2f74e75033))
*  admin-245 implement in resolver to write aggregate data to higher churches explicitly ([05c1e6e3](https://github.com/firstlovecenter/fl-pastoral-care/commit/05c1e6e335f392c0a9514553127fbb1ed526d35d))
*  admin-247 implements sms and email notifications when an equipm… ([#230](https://github.com/firstlovecenter/fl-pastoral-care/pull/230)) ([0627877f](https://github.com/firstlovecenter/fl-pastoral-care/commit/0627877fd43f7371939868e638a07c221086426b))
*  writes test for quick facts card ([#229](https://github.com/firstlovecenter/fl-pastoral-care/pull/229)) ([6d5d1aec](https://github.com/firstlovecenter/fl-pastoral-care/commit/6d5d1aecff4baa528ace71bb20a8e9231b8c2245))
*  add a ten minute buffer for arrival counting ([63979677](https://github.com/firstlovecenter/fl-pastoral-care/commit/6397967795fb5563a608e3195297ace2560b41d7))
*  recording arrival time aggregates data to put on the bussing record ([af88a379](https://github.com/firstlovecenter/fl-pastoral-care/commit/af88a3795f79135385ef7959d4c626fe9c573d0c))
*  implement feature for filtering bus type on counting screen ([000cf351](https://github.com/firstlovecenter/fl-pastoral-care/commit/000cf3519f0b7c07be3fbbfdaaea1d7fa2e521cd))
*  implement add and edit gathering service with mutations ([#223](https://github.com/firstlovecenter/fl-pastoral-care/pull/223)) ([6393fb26](https://github.com/firstlovecenter/fl-pastoral-care/commit/6393fb268392e87649f533788cb58daac50df1cd))
*  lock ministry to gatheringService ([45feb2dc](https://github.com/firstlovecenter/fl-pastoral-care/commit/45feb2dc12532b9a6e45ddfa4864b28200a3ab8e))

##### Bug Fixes

*  change active fellowship count to fellowship to campaign trends ([8117f79a](https://github.com/firstlovecenter/fl-pastoral-care/commit/8117f79ac7b626471930d25e442e98982b3a8325))
*  fix submit button loading ux for constituency and fellowship equipment form ([#264](https://github.com/firstlovecenter/fl-pastoral-care/pull/264)) ([59610de4](https://github.com/firstlovecenter/fl-pastoral-care/commit/59610de4bcf67cf92c8af8daf4992771c0eec979))
*  fix broken cypher in identifying campaign start and end dates ([b5abdf47](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5abdf4746b77cd288d7b5ce5b509e202e96e25a))
*  changes structure of check equipment deadline statement ([c35581f3](https://github.com/firstlovecenter/fl-pastoral-care/commit/c35581f374e4751ac9de8f5ccbacc500fc0e80cc))
*  changes date used in check for the deadline ([7ed2addf](https://github.com/firstlovecenter/fl-pastoral-care/commit/7ed2addf211495e05a7f16b26692fbe42b6761af))
*  add permission so that fellowship leaders can view campaigns button in nav ([ad57472c](https://github.com/firstlovecenter/fl-pastoral-care/commit/ad57472cfba877baed3efe5d4868d0d05e1a5389))
*  fix submit button loading ux and vacation churches not appearing ([b727ac10](https://github.com/firstlovecenter/fl-pastoral-care/commit/b727ac109dc9e466350dba9993d0121ab7abf79b))
*  change sprinter top up on constituency page to sprinter cost ([883d45b9](https://github.com/firstlovecenter/fl-pastoral-care/commit/883d45b944dbff1774bec2eeefcd7f6dedb54ac3))
*  correct sabbath timer and adjust so that sabbath starts at 4 am on Monday ([#251](https://github.com/firstlovecenter/fl-pastoral-care/pull/251)) ([4171cccf](https://github.com/firstlovecenter/fl-pastoral-care/commit/4171cccf4e1e8f7c9d095b10a9ddb907328b3f95))
*  install workbox dependencies and web-vitals ([3b58e7e7](https://github.com/firstlovecenter/fl-pastoral-care/commit/3b58e7e73584d2db91a6955c40c3122fedbee633))
*  register service worker ([31d402c0](https://github.com/firstlovecenter/fl-pastoral-care/commit/31d402c0d43865b4fb83cfeedbed5bca5add52c6))
*  installed service worker files from the CRA pwa template ([f0442692](https://github.com/firstlovecenter/fl-pastoral-care/commit/f044269293a8be200c596885aeaa5e798c053f87))
*  fix typo breaking mutation to create constituency ([6a405f6d](https://github.com/firstlovecenter/fl-pastoral-care/commit/6a405f6dc429ccb1e4b7265ee660e0cb54dc9483))
*  minor equipment defaulters bugs ([#242](https://github.com/firstlovecenter/fl-pastoral-care/pull/242)) ([18a8d2ab](https://github.com/firstlovecenter/fl-pastoral-care/commit/18a8d2ab6803172e075a2bbb8f39981142d13551))
*  fixes errors in equipment campaign defaulters queries ([fa004fd8](https://github.com/firstlovecenter/fl-pastoral-care/commit/fa004fd8e1aaf1c230c252630f671b53d2f7d266))
*  change 'alert' to 'alertMsg' for churchdetails page ([d82bda76](https://github.com/firstlovecenter/fl-pastoral-care/commit/d82bda76313dd73aae04ee101db4cc050e6f24d7))
*  add optional match to equipment defaulters queries ([de028485](https://github.com/firstlovecenter/fl-pastoral-care/commit/de02848585adceb30faaebe8c2583b1f79908e1d))
*  fix bug preventing admins from updating bacenta info ([1519b508](https://github.com/firstlovecenter/fl-pastoral-care/commit/1519b508a31eedc951cbf44569a81bda847736d9))
*  change 'number of busses' to 'number of urvans' ([cc422f7d](https://github.com/firstlovecenter/fl-pastoral-care/commit/cc422f7d42aa5cd7777b49c771d1602640fb6383))
*  fix error in calculating bussing details on recording vehicle arrival time ([c22d7cc2](https://github.com/firstlovecenter/fl-pastoral-care/commit/c22d7cc2a9cc7473cee74f76ca707c2903c12ccf))
*  adjust permissions to accommodate leaders and admin of two church levels ([c924e863](https://github.com/firstlovecenter/fl-pastoral-care/commit/c924e863f2a1365f43d677b2ef3ed134db9cfb6a))
*  fix bug preventing members from uploading banking slip ([bbae105b](https://github.com/firstlovecenter/fl-pastoral-care/commit/bbae105be55923a968f6a38f95d8aac18dd1943e))
*  fix breaking change resulting from typo ([0344cc21](https://github.com/firstlovecenter/fl-pastoral-care/commit/0344cc21fb7f6ef4717a9edabda58f9612738f1a))
*  fix typo on intial loading ([d74a0c5c](https://github.com/firstlovecenter/fl-pastoral-care/commit/d74a0c5cd6c1d53da8bb799b99805c1fdc2429c9))
*  fix data leak when using context to set permissions ([29a799c2](https://github.com/firstlovecenter/fl-pastoral-care/commit/29a799c2f19f23a6eb1dfe7ec1bb235d65ee5f15))
*  fix bug breaking member list loading page ([92bc946b](https://github.com/firstlovecenter/fl-pastoral-care/commit/92bc946b57f6507beab1587f2616ddbfe325d190))
*  comment out unused code for arrrivals isToday ([e76a469a](https://github.com/firstlovecenter/fl-pastoral-care/commit/e76a469a52fa9018d9b861b46a4b29304e8a50b9))
*  update to allow filling of bussing forms on every day of the week ([cdcfe89c](https://github.com/firstlovecenter/fl-pastoral-care/commit/cdcfe89c39700d5decad8ac59dd9f9bc10bb3773))
*  solve mior bug with regards to aggrregating of data ([11f76dcb](https://github.com/firstlovecenter/fl-pastoral-care/commit/11f76dcbd38daf6e4f43aef6a8cc930fab142da0))
*  solve petty arrivals issues with countig and form filling ([4cc7e817](https://github.com/firstlovecenter/fl-pastoral-care/commit/4cc7e81773e005f3b1dd816fa2cce2fa48a95284))
*  clean up errant 'WHERE EXISTS' from arrivals cypher queries ([d161ee12](https://github.com/firstlovecenter/fl-pastoral-care/commit/d161ee12003bbb704d03f320e433324c65801f10))
*  revert bussing aggregate to use bussinng records ([7d4d83d8](https://github.com/firstlovecenter/fl-pastoral-care/commit/7d4d83d8b64b1029301f71b39a7c7632bd710368))
*  adjust arrivals summary data structure ([ae2232fd](https://github.com/firstlovecenter/fl-pastoral-care/commit/ae2232fdc481c2063de5034c557db23ffde87aeb))
*  adjust arrivals cypher to use bussing record ([77577be8](https://github.com/firstlovecenter/fl-pastoral-care/commit/77577be8bd32c9407b053a0a85b1cdc6b40512c0))
*  fix gathering service   bussing calculations ([fc772123](https://github.com/firstlovecenter/fl-pastoral-care/commit/fc7721239420d7767aca97e4d38532b3d43fc5a7))
*  prevent creation of excess vehicle record nodes ([1fba9717](https://github.com/firstlovecenter/fl-pastoral-care/commit/1fba971748ffbb2817945550d397e5b2a40b4f00))
*  use leader declaration for on the way count ([179a97fa](https://github.com/firstlovecenter/fl-pastoral-care/commit/179a97fab74cd6e715646f219a1827d023cbfd4a))
*  added confirmation of in and out to counters ([18792ef7](https://github.com/firstlovecenter/fl-pastoral-care/commit/18792ef7989c5a0e675216e6eaf8220016d0b9b9))
*  update permissions for vehicle form details ([b3af284b](https://github.com/firstlovecenter/fl-pastoral-care/commit/b3af284b8014966a29bba0263ea7319bb563cc96))
*  update query to find the bacentas that have arrived 2 ([022aec97](https://github.com/firstlovecenter/fl-pastoral-care/commit/022aec971887fa6b20494a7bba0cd4d2d179369d))
*  update query to find bacentasHaveArrived on all church levels ([a12dfa20](https://github.com/firstlovecenter/fl-pastoral-care/commit/a12dfa205d9c86d4378002e2be8ee1a20dc7134d))
*  update query to find bacentasHaveArrived ([a877095d](https://github.com/firstlovecenter/fl-pastoral-care/commit/a877095dc62d37f4c902ff6d76d767729279b715))
*  update import statement in SearchStream ([02af09c6](https://github.com/firstlovecenter/fl-pastoral-care/commit/02af09c6a3c7e0bf14e333f772b3be915f951263))
*  update  memberByEmail query ([de6a6280](https://github.com/firstlovecenter/fl-pastoral-care/commit/de6a6280d8e366d27f00630b1f766780307667ed))
*  update cross oversight search functionality ([3dbb633b](https://github.com/firstlovecenter/fl-pastoral-care/commit/3dbb633bdb4ac8c3b61a154d2bc096863aad075a))
*  implement error text to show when pre mobilisation is closed ([f004d2d5](https://github.com/firstlovecenter/fl-pastoral-care/commit/f004d2d510999a4ce3c88388520684831ea71849))
*  fix bug preventing zone 0 bacentas from filling ([24b60a7c](https://github.com/firstlovecenter/fl-pastoral-care/commit/24b60a7c11afaa2d4de75a3b9653003fb4352da2))
*  allow bacentas in zone 0 to fill out their form ([44c3e21e](https://github.com/firstlovecenter/fl-pastoral-care/commit/44c3e21ee5bd67c8d8f014c9a22e9a1a98749439))

##### Performance Improvements

*  aggregate church target on write and not read ([d683e39d](https://github.com/firstlovecenter/fl-pastoral-care/commit/d683e39da140f526b29640b8fd816cf59180022c))

##### Refactors

*  convert Cachebuster component to typescript ([3f6e04f3](https://github.com/firstlovecenter/fl-pastoral-care/commit/3f6e04f313426963af490c810d9247f57e959076))
*  convert App.js to tsx file ([1b9ae9ed](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b9ae9ed0059ea24ece36ea8e2a7aa8040b993ca))

### 4.9.0 (2022-08-12)

##### Chores

*  merge deploy into feature/arrivals 3.0 ([dff1b338](https://github.com/firstlovecenter/fl-pastoral-care/commit/dff1b338dc3828ef9db249c8fb232af783035636))
*  update formik components across arrivals feature ([98388886](https://github.com/firstlovecenter/fl-pastoral-care/commit/983888866da98ad41e48d9321f99b78228751e72))
*  update import statements ([e1f4688b](https://github.com/firstlovecenter/fl-pastoral-care/commit/e1f4688b50f46c90d066a4e8445ab87915e7b09e))
*  merge deploy into feature/arrivals ([8cc448ab](https://github.com/firstlovecenter/fl-pastoral-care/commit/8cc448ab73fbdc5178813d1cd4991669a7ffa2fa))
*  installed typescript-eslint ([afc42c57](https://github.com/firstlovecenter/fl-pastoral-care/commit/afc42c57f971c560987866fdc244bef231b084c4))
*  merge deploy into feature/arrivals and updated packages ([4f71faeb](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f71faeb1cc016a54abd6e461f726643fe394942))
*  updated the short name in the manifest file ([52e8baa9](https://github.com/firstlovecenter/fl-pastoral-care/commit/52e8baa9302f6c55d7971d3af3dad620c37ee3c1))

##### New Features

*  implement bacenta and vehicle count view on all church levels ([35b87824](https://github.com/firstlovecenter/fl-pastoral-care/commit/35b87824c8025eaa2d64c15ae86e0855c2f1d96c))
*  fix calculations in api cypher to accommodate vehicles filling forms ([222650f6](https://github.com/firstlovecenter/fl-pastoral-care/commit/222650f6cc8c989c6a83ee832b7b10ecb464ff9b))
*  implement api feature for handlig in and out bussing ([7c0872d3](https://github.com/firstlovecenter/fl-pastoral-care/commit/7c0872d30fb720e132cdaca635b01a61aa340408))
*  implement feature so that counters can count in vehicles ([f620b356](https://github.com/firstlovecenter/fl-pastoral-care/commit/f620b356d9239ef08dd4477d182ebb4911135c52))
*  enable bacenta leaders to fill bussing data on a per vehicle basis ([20edbfa2](https://github.com/firstlovecenter/fl-pastoral-care/commit/20edbfa21c051163b74df24866741042130d58f5))
*  implement filling of form by entering details of one vehicle ([ee4849e0](https://github.com/firstlovecenter/fl-pastoral-care/commit/ee4849e0f091fe666077689a5358e4d37d63ca74))
*  implement changing of constituency zone ([27d29bcb](https://github.com/firstlovecenter/fl-pastoral-care/commit/27d29bcb35dc3f313208db2ffefcd524221e8f85))
*  implement fix for oversight permissions ([#220](https://github.com/firstlovecenter/fl-pastoral-care/pull/220)) ([13c4de6e](https://github.com/firstlovecenter/fl-pastoral-care/commit/13c4de6e7144fa789119e90f57a0a808fe925f2a))
*  implement Equipment Campaign data collection ([#218](https://github.com/firstlovecenter/fl-pastoral-care/pull/218)) ([1dc71126](https://github.com/firstlovecenter/fl-pastoral-care/commit/1dc7112659f0006c41053c3045e6fe0321434c6e))
*  implement a list of counters instead of a single one ([4ca4c30f](https://github.com/firstlovecenter/fl-pastoral-care/commit/4ca4c30ff10fadbeef12c9bde7ed1dedc57ecdf6))
*  implement feature additional busses and ubers can be counted and added ([f5afd970](https://github.com/firstlovecenter/fl-pastoral-care/commit/f5afd9702f13e0f6933b8dc11de13fe6dd31338a))
*  merge counting and confirming procedures into one ([bde85660](https://github.com/firstlovecenter/fl-pastoral-care/commit/bde8566077bf18cf1630a16a4d3df8b1829e9b46))
*  remove picture submission for on the way form ([1a845d3e](https://github.com/firstlovecenter/fl-pastoral-care/commit/1a845d3eececc81629e7cdeae22876e293be9642))

##### Bug Fixes

*  fix bug when setting a new arrivals admin ([5ef74b41](https://github.com/firstlovecenter/fl-pastoral-care/commit/5ef74b41aeccedcdeaadf0dfd0f1b0dc300315f8))
*  fix broken styling on autosuggest components ([004d737a](https://github.com/firstlovecenter/fl-pastoral-care/commit/004d737af4a52ac79f77552e477ce3f4da25a2c4))
*  clean up bacentas to be counted so that couted bacentas don't show ([611e4399](https://github.com/firstlovecenter/fl-pastoral-care/commit/611e4399b7b90788602bd9ca3ef86bb87dcfda5e))
*  remove unused imports ([23814473](https://github.com/firstlovecenter/fl-pastoral-care/commit/2381447359f815cfe895a4f5b163bac9ff1def56))
*  fix breaking change on displaychurchsdetails ([c66734b3](https://github.com/firstlovecenter/fl-pastoral-care/commit/c66734b3770fa6b9620672a0d2c4a0e9b328aa1f))
*  changes permission passed as prop to display bacenta details page ([#222](https://github.com/firstlovecenter/fl-pastoral-care/pull/222)) ([a0ebe507](https://github.com/firstlovecenter/fl-pastoral-care/commit/a0ebe5078f48e31ec839938a26a40c9667e109d0))
*  update clean up cypher in beforeNextUpdate.cql ([dbe2d9a0](https://github.com/firstlovecenter/fl-pastoral-care/commit/dbe2d9a057153b9cf9825af62bad72ced73d4b91))
*  clean lingering references to arrivals confirmer ([ffbd73ac](https://github.com/firstlovecenter/fl-pastoral-care/commit/ffbd73ac80d1f775a7d21e4a16341ed18175a79c))

##### Refactors

*  change 'cost' to 'top up' ([a868f6cd](https://github.com/firstlovecenter/fl-pastoral-care/commit/a868f6cd85a1b7eabeeb35a70ab3810a95f1594e))
*  convert useComponentQuery to tsx ([b8d29a43](https://github.com/firstlovecenter/fl-pastoral-care/commit/b8d29a4366b1afbc9fe16e39732d6be5c84fafed))
*  convert /user-profile to ts ([af5b88cc](https://github.com/firstlovecenter/fl-pastoral-care/commit/af5b88cc90600d0bba96eb846505aa3f2e1f7083))
*  convert /update files to ts ([6393837b](https://github.com/firstlovecenter/fl-pastoral-care/commit/6393837bd7797ee733c85a7aa79436dcb43c8ecc))
*  convert /create and /reusable-forms to ts ([dc83bf68](https://github.com/firstlovecenter/fl-pastoral-care/commit/dc83bf6802fe9df7c0cb62f7e0d0ef4967648cc2))
*  convert fellowship and bacenta form to typescript ([c3cdbdab](https://github.com/firstlovecenter/fl-pastoral-care/commit/c3cdbdab43cc6a0d368fa83f20edd4cf0fdc3591))
*  convert /defaulters files to typescript ([8382bc7a](https://github.com/firstlovecenter/fl-pastoral-care/commit/8382bc7aebd5ced64e17bed3f8f3db033cbc28a3))
*  delete formikControl component ([9217ee35](https://github.com/firstlovecenter/fl-pastoral-care/commit/9217ee35760b9a7365e8b9ef3d42ad0b3555fff1))
*  remove unused import of FormikControl ([350a8282](https://github.com/firstlovecenter/fl-pastoral-care/commit/350a8282ced8c5c2cfdb6610698cf8822886dd78))
*  convert a few files in the defaulters folder to ts ([8a41c780](https://github.com/firstlovecenter/fl-pastoral-care/commit/8a41c780dbf1ebdbe5e8c39c80e9dab82ede6345))
*  convert Navigation.jsx to tsx ([e0f583ca](https://github.com/firstlovecenter/fl-pastoral-care/commit/e0f583ca9767524f18035351be420e1019e9af59))
*  convert services/graphs files to typescript ([9a8cca76](https://github.com/firstlovecenter/fl-pastoral-care/commit/9a8cca762b4955e8b7fdbd6183e688b08812bb14))
*  convert misc components to typescript ([eb5b939b](https://github.com/firstlovecenter/fl-pastoral-care/commit/eb5b939bdf5908d5bab940e0c6d8369397036e13))
*  convert login page to typescript ([1cd3322b](https://github.com/firstlovecenter/fl-pastoral-care/commit/1cd3322bd092af8e43cf695cb42e24795c105b91))
*  convert formik components to typescript eliminated FormikControl component ([bf2861ad](https://github.com/firstlovecenter/fl-pastoral-care/commit/bf2861adc4cafb784a5d8e1772d0e555373e59d8))

#### 4.8.1 (2022-07-29)

##### Chores

*  version bump ([9b73e85b](https://github.com/firstlovecenter/fl-pastoral-care/commit/9b73e85b7c541e0918cc805228abba9aaef9a61a))
*  fix merge conflicts merging deploy into arrivals ([5b297b79](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b297b7984fd3f650f8e81804bd20307ca3ce6b5))

##### New Features

*  change map style to satellite images ([1b93e7d5](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b93e7d517b255f458e996501b0eec9263875a4b))
*  register members as IDL members ([e2641b3d](https://github.com/firstlovecenter/fl-pastoral-care/commit/e2641b3d61f34d35cb0705b0cc78e60db2905dd4))
* **arrivals:**
  *  admin-205 implements a notice to show when arrivals is over for all levels ([a164761e](https://github.com/firstlovecenter/fl-pastoral-care/commit/a164761e8fa20b6935331fb604d65ed05876089a))
  *  admin-205 implemments a message for leaders who have filled on the way form ([e9121a70](https://github.com/firstlovecenter/fl-pastoral-care/commit/e9121a706b4dea02641a7ed76813e55a896842c1))
  *  admin-205 adjusts bussing top up to account for leaders contribution ([40baaad3](https://github.com/firstlovecenter/fl-pastoral-care/commit/40baaad39a30f062f75daccf3d5beb65a8875cea))
  *  admin-205 implements a curse on submitting bussing data deceitfully ([fc0ebdba](https://github.com/firstlovecenter/fl-pastoral-care/commit/fc0ebdba2296faed44720c9d7201ca95898bfa72))
  *  admin-205 added form option to submit personal contribution ([696ded44](https://github.com/firstlovecenter/fl-pastoral-care/commit/696ded44dcb7ecb02a7ef150d9efadd2ed0a4b95))
  *  admin-205 implements edits to the SMS that is sent on bussing ([e057f5a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/e057f5a4b8dc22c4dd4d2405616e378d7996cfc6))
  *  admin-210 implements zones in the database ([bc282fd7](https://github.com/firstlovecenter/fl-pastoral-care/commit/bc282fd7dd640722f3c95f1b3fa32ff98719325f))
  *  introduces the concept of zones to the bacentas ([cfe6cce1](https://github.com/firstlovecenter/fl-pastoral-care/commit/cfe6cce1384bfc0abad0af3a66e634b04065f786))
  *  admin-209 edits bussing form to accept number of sprinters and urvans ([f7d174be](https://github.com/firstlovecenter/fl-pastoral-care/commit/f7d174bec674027a12baab1ce107c25c308d4dae))

##### Bug Fixes

*  format of email messages on servant status change ([c391bc66](https://github.com/firstlovecenter/fl-pastoral-care/commit/c391bc66a8db960d2b26c026df1c1d48ff38eba4))
*  update the description in the index.html tag ([a9543b53](https://github.com/firstlovecenter/fl-pastoral-care/commit/a9543b539d5b9b1284f3479f06ea3428ba03d855))
*  change the phrase 'service picture' to 'family picture' ([66c9b0bd](https://github.com/firstlovecenter/fl-pastoral-care/commit/66c9b0bd5f6f99327b488e9ae965183061475ae6))
*  delete hidden netlify directory ([83ac2ecc](https://github.com/firstlovecenter/fl-pastoral-care/commit/83ac2ecc6f23f563d5aa5c0566b36aabb526c864))
*  change IDL  node lable to idl ([65b22df8](https://github.com/firstlovecenter/fl-pastoral-care/commit/65b22df8234c14d82741adcf738c404f2ae7e61a))
*  fixes error resolving file path in  arrivals  time ([1ed403b0](https://github.com/firstlovecenter/fl-pastoral-care/commit/1ed403b06e9d41bdad00711bfca1265ee45ad881))
* **anagkazo-banking:**  show loading icon when adding treasurer ([95ba4445](https://github.com/firstlovecenter/fl-pastoral-care/commit/95ba444579dae949e9b03a5f63979a6e017bf917))

##### Refactors

*  remove hardcoded oversightId value ([94023eea](https://github.com/firstlovecenter/fl-pastoral-care/commit/94023eea11645ec2307497566d3438755b25ad7b))
*  converted service details to tsx ([5b9ffb8f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b9ffb8f2df69cac9b7316366993a4d71ab4cbf1))
*  converted service form component to tsx ([00d98ecd](https://github.com/firstlovecenter/fl-pastoral-care/commit/00d98ecd9212d655ef5a79232f587ffba43aff77))
*  converts quickfacts components to typescript ([#217](https://github.com/firstlovecenter/fl-pastoral-care/pull/217)) ([cd9eb1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/cd9eb1f8ea4c5d4a44c6f0656e5655725aa0a690))
*  converted maps components to typescript ([cb4f6b29](https://github.com/firstlovecenter/fl-pastoral-care/commit/cb4f6b293b71d93baec977f1a7a0db516a0143d1))
*  reorganises code in the arrivals folder ([260cc89a](https://github.com/firstlovecenter/fl-pastoral-care/commit/260cc89acb4bac91ba06e1beadfcbffe8572833d))

### 4.8.0 (2022-07-29)

##### Chores

*  fix merge conflicts merging deploy into arrivals ([5b297b79](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b297b7984fd3f650f8e81804bd20307ca3ce6b5))

##### New Features

*  change map style to satellite images ([1b93e7d5](https://github.com/firstlovecenter/fl-pastoral-care/commit/1b93e7d517b255f458e996501b0eec9263875a4b))
*  register members as IDL members ([e2641b3d](https://github.com/firstlovecenter/fl-pastoral-care/commit/e2641b3d61f34d35cb0705b0cc78e60db2905dd4))
* **arrivals:**
  *  admin-205 implements a notice to show when arrivals is over for all levels ([a164761e](https://github.com/firstlovecenter/fl-pastoral-care/commit/a164761e8fa20b6935331fb604d65ed05876089a))
  *  admin-205 implemments a message for leaders who have filled on the way form ([e9121a70](https://github.com/firstlovecenter/fl-pastoral-care/commit/e9121a706b4dea02641a7ed76813e55a896842c1))
  *  admin-205 adjusts bussing top up to account for leaders contribution ([40baaad3](https://github.com/firstlovecenter/fl-pastoral-care/commit/40baaad39a30f062f75daccf3d5beb65a8875cea))
  *  admin-205 implements a curse on submitting bussing data deceitfully ([fc0ebdba](https://github.com/firstlovecenter/fl-pastoral-care/commit/fc0ebdba2296faed44720c9d7201ca95898bfa72))
  *  admin-205 added form option to submit personal contribution ([696ded44](https://github.com/firstlovecenter/fl-pastoral-care/commit/696ded44dcb7ecb02a7ef150d9efadd2ed0a4b95))
  *  admin-205 implements edits to the SMS that is sent on bussing ([e057f5a4](https://github.com/firstlovecenter/fl-pastoral-care/commit/e057f5a4b8dc22c4dd4d2405616e378d7996cfc6))
  *  admin-210 implements zones in the database ([bc282fd7](https://github.com/firstlovecenter/fl-pastoral-care/commit/bc282fd7dd640722f3c95f1b3fa32ff98719325f))
  *  introduces the concept of zones to the bacentas ([cfe6cce1](https://github.com/firstlovecenter/fl-pastoral-care/commit/cfe6cce1384bfc0abad0af3a66e634b04065f786))
  *  admin-209 edits bussing form to accept number of sprinters and urvans ([f7d174be](https://github.com/firstlovecenter/fl-pastoral-care/commit/f7d174bec674027a12baab1ce107c25c308d4dae))

##### Bug Fixes

*  format of email messages on servant status change ([c391bc66](https://github.com/firstlovecenter/fl-pastoral-care/commit/c391bc66a8db960d2b26c026df1c1d48ff38eba4))
*  update the description in the index.html tag ([a9543b53](https://github.com/firstlovecenter/fl-pastoral-care/commit/a9543b539d5b9b1284f3479f06ea3428ba03d855))
*  change the phrase 'service picture' to 'family picture' ([66c9b0bd](https://github.com/firstlovecenter/fl-pastoral-care/commit/66c9b0bd5f6f99327b488e9ae965183061475ae6))
*  delete hidden netlify directory ([83ac2ecc](https://github.com/firstlovecenter/fl-pastoral-care/commit/83ac2ecc6f23f563d5aa5c0566b36aabb526c864))
*  change IDL  node lable to idl ([65b22df8](https://github.com/firstlovecenter/fl-pastoral-care/commit/65b22df8234c14d82741adcf738c404f2ae7e61a))
*  fixes error resolving file path in  arrivals  time ([1ed403b0](https://github.com/firstlovecenter/fl-pastoral-care/commit/1ed403b06e9d41bdad00711bfca1265ee45ad881))
* **anagkazo-banking:**  show loading icon when adding treasurer ([95ba4445](https://github.com/firstlovecenter/fl-pastoral-care/commit/95ba444579dae949e9b03a5f63979a6e017bf917))

##### Refactors

*  remove hardcoded oversightId value ([94023eea](https://github.com/firstlovecenter/fl-pastoral-care/commit/94023eea11645ec2307497566d3438755b25ad7b))
*  converted service details to tsx ([5b9ffb8f](https://github.com/firstlovecenter/fl-pastoral-care/commit/5b9ffb8f2df69cac9b7316366993a4d71ab4cbf1))
*  converted service form component to tsx ([00d98ecd](https://github.com/firstlovecenter/fl-pastoral-care/commit/00d98ecd9212d655ef5a79232f587ffba43aff77))
*  converts quickfacts components to typescript ([#217](https://github.com/firstlovecenter/fl-pastoral-care/pull/217)) ([cd9eb1f8](https://github.com/firstlovecenter/fl-pastoral-care/commit/cd9eb1f8ea4c5d4a44c6f0656e5655725aa0a690))
*  converted maps components to typescript ([cb4f6b29](https://github.com/firstlovecenter/fl-pastoral-care/commit/cb4f6b293b71d93baec977f1a7a0db516a0143d1))
*  reorganises code in the arrivals folder ([260cc89a](https://github.com/firstlovecenter/fl-pastoral-care/commit/260cc89acb4bac91ba06e1beadfcbffe8572833d))

### 4.7.0 (2022-07-22)

##### New Features

*  adds location as a field when creating a member admin-228 ([93aedb5d](https://github.com/firstlovecenter/fl-pastoral-care/commit/93aedb5d2bbee76e4075fb09e21ebf141c372b79))
*  implemented sending of message upon both counting and arrival ([e4cadcf9](https://github.com/firstlovecenter/fl-pastoral-care/commit/e4cadcf9dd11e712afeff7aa10b59155086422e7))
* **service-forms:**  enable council level and higher to fill multiple times in a week ([24216ae7](https://github.com/firstlovecenter/fl-pastoral-care/commit/24216ae7e479ccd3642a96860a9931ae90eeb816))

##### Bug Fixes

*  adds no data component to comfirm anagkazo banking ([d06ce743](https://github.com/firstlovecenter/fl-pastoral-care/commit/d06ce743da7604213a8143f0a867de2c97259531))
*  removes link to bacenta services ([46d27602](https://github.com/firstlovecenter/fl-pastoral-care/commit/46d27602e0726c943efc28d29cf044cc1777bf29))
*  edits the error message to show the date of the last outstanding service ([4f23de2e](https://github.com/firstlovecenter/fl-pastoral-care/commit/4f23de2eae23c2883258f939f430a0a0b57c40b1))
*  fixing error on update bacenta mutation in leader properties on title property ([570addf5](https://github.com/firstlovecenter/fl-pastoral-care/commit/570addf5dcae04554525863560ed3b13c41be2e1))
*  fixed bug preventing service forms button from appearing on the church details ([97cf4fb5](https://github.com/firstlovecenter/fl-pastoral-care/commit/97cf4fb5a161012dc854668a524fa8a253a201a9))
*  fixed bug preventing members from being updated ([96ab8cb0](https://github.com/firstlovecenter/fl-pastoral-care/commit/96ab8cb0d26a71c764ced16ac5fe7062690f40a9))
*  fixed bug breaking the ui when  viewing bacenta details ([002d1d12](https://github.com/firstlovecenter/fl-pastoral-care/commit/002d1d122ef362d2ca731f2311c79ed4d1d9b200))
*  allowed leaders to enter  0 as bussing  cost ([67f8893b](https://github.com/firstlovecenter/fl-pastoral-care/commit/67f8893b7fd0e889b4fa33e12fc0e852bbb686c5))
*  when a  leader fills the form,  they should  still see the countdown time ([5ff3aa8c](https://github.com/firstlovecenter/fl-pastoral-care/commit/5ff3aa8c25d608e5e90223991022bf7d720219f5))
*   fixed bug preventing the right  top up from being set ([0d6c0b09](https://github.com/firstlovecenter/fl-pastoral-care/commit/0d6c0b099c586e85dfcb5c910762719a59dc4048))
*  named more graphql queries throught the repo ([b5594956](https://github.com/firstlovecenter/fl-pastoral-care/commit/b5594956aa87bac24a7c68197b5aca6df9e399ed))
*  pushed fix for making counters and confirmers ([d23aad61](https://github.com/firstlovecenter/fl-pastoral-care/commit/d23aad61b3817fbd38e80601ddb0f71dfdefb80d))
*  fixed bug preventing arrivalscounters from counting ([bf489d11](https://github.com/firstlovecenter/fl-pastoral-care/commit/bf489d1156a1fefb01bc388612b8117b4e2976cc))
*  brought back resolver to update member emails ([3aabffbd](https://github.com/firstlovecenter/fl-pastoral-care/commit/3aabffbd0c9cc342d87715c9cedf26b164910b02))
*  improved getLastServiceRecord to handle for when a record is doubled ([832d0ac6](https://github.com/firstlovecenter/fl-pastoral-care/commit/832d0ac6f8335ea5603080b0637f051c4b94bddf))
* **arrivals:**  fixed bug where arrivals amount was not set ([59aa9585](https://github.com/firstlovecenter/fl-pastoral-care/commit/59aa9585e829c3613aa43cc69e3d6dbdb6f1ff1e))
* **defaulters:**  fixed bug preventing constituency admins from viewin defaulters ([36e19f12](https://github.com/firstlovecenter/fl-pastoral-care/commit/36e19f1251bbbc598d0ac60b0e3eb3116cfb2c16))

##### Performance Improvements

*  finally figured out how to get DEBUG logs working again ([d1183328](https://github.com/firstlovecenter/fl-pastoral-care/commit/d1183328aacf207b49bf727fc5e793806c7af699))

##### Refactors

*  remove midweek banking home and change midweek banking button to add treasurers ([1f3850f4](https://github.com/firstlovecenter/fl-pastoral-care/commit/1f3850f47bb4c4b37d890ccb360fbaa77e0ffbb5))
*  began converting formik components to typescript ([11ddb84c](https://github.com/firstlovecenter/fl-pastoral-care/commit/11ddb84c5649981c4b64f0a45f1c20418e2fb3b5))
*  refactored display church details into ts ([c4340947](https://github.com/firstlovecenter/fl-pastoral-care/commit/c4340947538f86b11f5410b4ea8fd8e634857f8a))

#### 4.6.4 (2022-07-15)

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

