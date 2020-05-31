
# Install Firebase CLI
To host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

Run the following npm command to install the CLI or update to the latest CLI version.

npm install -g firebase-tools

Doesn't work? Take a look at the Firebase CLI reference or change your npm permissions

Initialize your project
Open a terminal window and navigate to or create a root directory for your web app

Sign in to Google

firebase login

Initiate your project
Run this command from your app’s root directory:

firebase init

Create alias
firebase use --add

### Get all the dependencies
Make sure yo have NPM updated if not run
npm install -g npm@latest

npm install

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ npm start
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

--
This project uses the coreUI library
