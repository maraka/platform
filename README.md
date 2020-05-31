
# Welcome to the revolution of learning
This open source project is the technology core for enable an open and free access to learning.

See our [Manifesto](https://github.com/GWP01/about_us/blob/master/MANIFESTO.md)

If you want to contribute this is how you can start
[How to contribute?](CONTRIBUTING.md)

#
## Setting up my local environment

This is a react+firebase implementation, is architected in that manner as for MVP purposes. We are looking for have a different architecture that scales in a world manner without to much costs. That's the future work in case you want to contribute with ideas.

### Install Firebase CLI
To host this site with Firebase Hosting, you need the Firebase CLI (a command line tool).

Run the following npm command to install the CLI or update to the latest CLI version.

``` bash
npm install -g firebase-tools
```

Doesn't work? Take a look at the Firebase CLI reference or change your npm permissions

#### Initialize your project
Open a terminal window and navigate to or create a root directory for your web app

* Sign in to Google
``` bash
firebase login
```

* Initiate your project: Run this command from your app’s root directory:

``` bash
firebase init
#take in account the public folder in react is called `build` when asked for
```

* Create alias (we user `dev` and `pdn` in the deployment scripts package.json)

``` bash
firebase use --add
```

### Get all the dependencies from npm

This project was created with create-react-app and already have the package.json with all the needed modules

Make sure yo have NPM updated if not run

``` bash
npm install -g npm@latest
```

Finally install the modules
``` bash
npm install
```

### Basic usage

``` bash
$ npm start
# this should start a dev server  with hot reload at http://localhost:3000
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build

# build for dev with minification + and deploy to dev firebase
npm run build:dev

# build for production with minification + and deploy to pdn firebase
npm run build:pdn 
```

#
This project uses the coreUI library
