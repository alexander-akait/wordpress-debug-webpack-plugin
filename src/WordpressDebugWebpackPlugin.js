import nodeify from 'nodeify';
import wordpressDebug from 'wordpress-debug';

export default class WordpressDebugWebpackPlugin {
    constructor(options = {}) {
        if (!options.wpConfigPath) {
            throw new Error('Path to `wp-config.php` is required');
        }

        this.options = Object.assign({}, {
            debug: true,
            runOnce: true
        }, options);
        this.doneOnRun = false;
        this.doneOnWatch = false;
    }

    apply(compiler) {
        const { options } = this;
        const events = ['run', 'watch-run'];
        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

        events.forEach((event) => {
            compiler.plugin(
                event,
                (compilerInstance, callback) => {
                    const doneOptionName = `doneOn${capitalizeFirstLetter(event)}`;

                    if (this.options.runOnce && this[doneOptionName]) {
                        return callback();
                    }

                    return nodeify(
                        wordpressDebug(options.wpConfigPath, options.debug),
                        (error) => {
                            this[doneOptionName] = true;

                            return callback(error);
                        }
                    );
                }
            );
        });
    }
}
