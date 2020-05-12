# @dekproject/logger

Logger interface plugin for DEK

What does this plugin do?

* Control configuration for connection to Logger in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/logger --save
$ nano .env
```

In the .env file add the following settings

```
LOGGER_BUGSNAG_API_KEY=apiKey

```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

Using in the standard DEK skeleton

```js
import { $, app, logger, bugsnagexpress } from "@dekproject/scope";

app.use(bugsnagexpress.errorHandler);

logger.error(throw new Error('Test error'));

```
