# ninit - node module bootstrapper

A community-driven node module bootstrapper.

## What?

There are so many flavors to structure a Node.js application / module. Every developer has it own style. That is great! `ninit`'s aim is to provide a platform on which every developer can publish her personal application / module template in order to share best practices and therefore help to evolve the quality of the Node.js module system. Let's get started!

## Installation

    npm install -g ninit

## Usage example

    ninit akoenig.expressapp

_ninit_ will generate a new application that has the structure of the `akoenig.expressapp` template.


If you need an overview about the available templates you could check the respective [directory](https://github.com/akoenig/ninit/tree/master/templates) or just type

    ninit ls

## Contributing

Your personal flavor is not covered yet? No problem. Feel free to add new templates as you go. You have to perform three easy steps.

### 1. Fork the project

Well, you know, this tiny button in the right corner.

### 2. Create a template directory

Create a new template directory [here](https://github.com/akoenig/ninit/tree/master/templates) and name it like `<your-github-username>.<your-template-name>`.

### 3. Create a package.json and define some placeholders

_ninit_ needs the definition of some placeholders in order to know which information should be asked in the case a module should generated from your template. A placeholder is enclosed in '@' characters, like: `@module description@`. You have the complete freedom of the naming. The only required placeholder is `@name@`. After you set up your personal placeholders, you can use them in all of your files within the template.

The last step: Send me a pull request and I will integrate your template into _ninit_ and push it to the npm registry.

# Author

2014, André König (andre.koenig@posteo.de)