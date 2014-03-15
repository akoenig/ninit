# ninit [![Build Status](https://travis-ci.org/akoenig/ninit.png?branch=master)](https://travis-ci.org/akoenig/ninit)

A community-driven Node.js module bootstrapper with a focus on sharing personal best practices in organizing codebases.

## Why?

When I'm talking to developers who are working with Node.js for the first time they are complaining that creating a maintainable structure for their application / module represents one of the hardest aspects. Yes, there are many ways to structure a Node.js module. Every developer has its own style / flavor. That is great! This flexibility makes this community so unbelievable unique. _ninit's_ aim is to provide a platform on which every developer can publish her personal application / module template in order to share best practices and therefore help to support starters but also the evolution of the Node.js ecosystem in general. So this project could be all about sharing experiences regarding this topic.

But even if you don't have any templates to share, no worries, _ninit_ brings the possibility to generate a fresh structure out of the available templates to bootstrap your next project. Enough words. Let's dive into this thingy.

## Contributing

The goal of this project is to have a discussion about different views on organizing codebases in Node.js and to provide a platform where all of those organizational patterns can be discussed, archived and used for bootstrapping. So open up your editor and publish your favorite module structure :)

### 1. Fork ninit

Well, you know, this tiny, but famous, button.

### 2. Create a template directory

Create a new template directory [here](https://github.com/akoenig/ninit/tree/master/templates), name it like `<your-github-username>.<your-template-name>` and put all your template files into it.

### 3. Create a package.json and define some placeholders

The `package.json` within your template is the central place for the definition of _ninit_ placeholders. These placeholders represent the information which the user has to insert in the case where she wants to generate a new module from your template. They can be used in all of your template files and will be replaced with the actual information while generating the module.

The names of the placeholders are enclosed in '@' characters (e.g. _@module description@_) and the actual naming is completely up to you. The only required placeholder which has to be defined is '@name@'. See this [file](https://github.com/akoenig/ninit/blob/master/templates/akoenig.library/package.json) for an example.

That's all!

Okay, one last step: Send me a pull request and I will integrate your template into _ninit_ and push a new version to the npm registry :)

## Bootstrapping

So this was the part of the contribution. As I said before there is also a generator which can bootstrap a new project out of a template.

### Installation

    npm install -g ninit

### Usage example

    ninit akoenig.express-rest

_ninit_ will generate a new application that has the structure of the `akoenig.express-rest` template.


If you need an overview about the current available templates you could check the respective [directory](https://github.com/akoenig/ninit/tree/master/templates) or just type `ninit ls`

## Changelog

### Version 0.1.10 (20140315)

- Fixed placeholder in `akoenig.library`

### Version 0.1.9 (20140310)

- New template `akoenig.gulp-plugin`

### Version 0.1.8 (20140308)

- Fixed placeholder in `akoenig.minimal`

### Version 0.1.7 (20140308)

- New template `akoenig.minimal`

### Version 0.1.6 (20140308)

- Fixed spec in `akoenig.library`

### Version 0.1.0 - 0.1.5 (20140308)

- Removed the `.npmignore` files from the templates.
- Implemented `version` command
- Created [gh-pages](http://akoenig.github.io/ninit)
- The initial version with the generator part and two templates, yay :)!

# Author

2014, André König (andre.koenig@posteo.de)
