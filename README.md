# wordpress-debug-webpack-plugin

[![NPM version](https://img.shields.io/npm/v/wordpress-debug-webpack-plugin.svg)](https://www.npmjs.org/package/wordpress-debug-webpack-plugin) 
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/wordpress-debug-webpack-plugin/master.svg?label=build)](https://travis-ci.org/itgalaxy/wordpress-debug-webpack-plugin) 
[![dependencies Status](https://david-dm.org/itgalaxy/wordpress-debug-webpack-plugin/status.svg)](https://david-dm.org/itgalaxy/wordpress-debug-webpack-plugin) 
[![devDependencies Status](https://david-dm.org/itgalaxy/wordpress-debug-webpack-plugin/dev-status.svg)](https://david-dm.org/itgalaxy/wordpress-debug-webpack-plugin?type=dev)

Enable or disable Wordpress debug using webpack

## Install

```shell
npm install --save-dev wordpress-debug-webpack-plugin
```

## Usage

Enable debug:

```js
import WordpressDebugWebpackPlugin from 'wordpress-debug-webpack-plugin';

export default {
  plugins: [
    new WordpressDebugWebpackPlugin({
        wpConfigPath: 'path/to/wp-config.php', 
        debug: true
    })
  ]
};
```

Disable debug:

```js
import WordpressDebugWebpackPlugin from 'wordpress-debug-webpack-plugin';

export default {
  plugins: [
    new WordpressDebugWebpackPlugin({
        wpConfigPath: 'path/to/wp-config.php', 
        debug: false
    })
  ]
};
```

## API

-   `wpConfigPath` (require) `string` - Path to `wp-config.php`.
-   `debug` (optional) (default: `true`) `boolean` - Enable or disable debug.
-   `runOnce` (optional) (default: `true`) `boolean` - Enable or disable multiple run, useful for watch `mode`.

## Related

-   [wordpress-debug](https://github.com/itgalaxy/wordpress-debug) - Api for this package.

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
