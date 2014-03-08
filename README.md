# ninit

A community-driven Node.js module bootstrapper.

## What?

There are so many ways to structure a Node.js application / module. Every developer has it own style / flavor. That is great! This flexibility makes this community so unbelievable unique.

`ninit`'s aim is to provide a platform on which every developer can publish her personal application / module template in order to share best practices and therefore help to evolve the quality of the Node.js ecosystem. Let's get started!

## Installation

    npm install -g ninit

## Usage example

    ninit akoenig.expressapp

_ninit_ will generate a new application that has the structure of the `akoenig.expressapp` template.


If you need an overview about the current available templates you could check the respective [directory](https://github.com/akoenig/ninit/tree/master/templates) or just type

## Contributing

So this was the generator part, but what if your personal flavor is not covered yet? No problem. Feel free to add new templates as you go. You only have to perform three easy steps.

### 1. Fork the ninit

Well, you know, this tiny, but famous, button.

### 2. Create a template directory

Create a new template directory [here](https://github.com/akoenig/ninit/tree/master/templates) and name it like `<your-github-username>.<your-template-name>`.

### 3. Create a package.json and define some placeholders

_ninit_ needs the definition of some placeholders in order to know which information should be asked in the case a module should generated from your template. These placeholders are defined in your `package.json` and are enclosed in '@' characters, like: `@module description@`. You have the complete freedom to name them as you like. The only required placeholder is `@name@`. See this [file](https://github.com/akoenig/ninit/blob/master/templates/akoenig.library/package.json) for an example.

After you set up your personal placeholders, you can use them in all of your files within the template.

The last step: Send me a pull request and I will integrate your template into _ninit_ and push a new version into to the npm registry :)

# Author

2014, André König (andre.koenig@posteo.de)