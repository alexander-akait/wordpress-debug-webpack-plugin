import nodeify from 'nodeify';
import wordpressDebug from 'wordpress-debug';

export default class WordpressDebugWebpackPlugin {
    constructor(wpConfigPath, debug = true) {
        if (!wpConfigPath) {
            throw new Error('Path to `wp-config.php` not passed');
        }

        this.wpConfigPath = wpConfigPath;
        this.debug = debug;
    }

    apply(compiler) {
        compiler.plugin('run', (compilerInstance, callback) => nodeify(
            wordpressDebug(this.wpConfigPath, this.debug),
            (error) => callback(error)
        ));
    }
}
