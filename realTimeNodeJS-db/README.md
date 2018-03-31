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
 
