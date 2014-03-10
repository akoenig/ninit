# @name@

> @description@


## Usage

First, install `@name@` as a development dependency:

```shell
npm install --save-dev @name@
```

Then, add it to your `gulpfile.js`:

```javascript
var yourPlugin = require('@name@');

gulp.task('@name@', function () {
    gulp.src('./dododo/**')
        .pipe(yourPlugin())
        .pipe(gulp.dest('./build/'));
});
```

## API

### yourPlugin(...)

#### argument
Type: `String`
Default: undefined

Description

## Changelog

### Version 0.1.0 (...)

- Initial Release.

## Author

Copyright 2014, [@your name@](http://) (@your email address@)
