# The realTimeIoT-NodeJS data base Module
## Usage

```js
const setupDataBase = require("realTimeIoTNodeJS-db")

setupDatabase(config).then( db => {
    const { Agent, Metric } = db
}).catch(err -> console.error(err))

```

Install standard module "standard": "^11.0.1"

```bash
 npm i --save-dev standard   
 ```

 Execute ``` npm run lint ```  in order to validate code
 Execute ``` npm run lint -- --fix ```  in order to validate code



 Install sequelize in order to abstract the realtion data base in postgres

``` bash
 npm i sequelize pg pg-hstore --save
 ``` 

 Install debug

``` bash
 npm i debug --save
 ``` 

 Execute sript

``` bash
 npm run setup
 ``` 

 inquirer, let us ask questions

 chalk look and fell

``` bash
 npm i inquirer chalk --save
```

 Test with fake passoword 
``` bash
 $ DB_PASS='nose' npm run setup
```

Unit test
``` bash
npm install --save-dev ava
 ```

Create values by default with this module

Unit defaults
``` bash
npm install --save defaults
```

Install sqlite3 by defults unit test
``` bash
npm install sqlite3 --save-dev
```

Create fake objects or Modules with sinon

``` bash
npm install --save-dev sinon

```

 Mock  requires

``` bash
npm i proxyquire --save-dev

```

Execute test 

``` bash
npm test

```

Execute fxitures 

``` bash

/realTimeNodeJS-db$ node
> var agentFixtures = require('./tests/fixtures/agent')
> agentFixtures.byId(1)
{ id: 1,
  uuid: 'yyyy-yyyy-yyyy',
  name: 'fixture',
  username: 'userTest',
  hostname: 'test-host',
  pid: 1212,
  connected: true,
  createAt: 2018-04-01T01:38:29.691Z,
  updateAt: 2018-04-01T01:38:29.691Z }
> 
``` 

Test with Sinon
``` bash
$ node
> var sinon = require('sinon')
undefined
> var findById = sinon.stub()
undefined
> findById()
undefined
> findById(1)
undefined
> findById(2)
undefined
> findById.withArgs(1).returns('TestIoT')
....
...
> findById(1)
'TestIoT'
> 

```