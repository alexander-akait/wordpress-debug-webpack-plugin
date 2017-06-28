import WordpressDebugWebpackPlugin from "../WordpressDebugWebpackPlugin";
import fs from "fs";
import path from "path";
import pify from "pify"; // eslint-disable-line node/no-unpublished-import
import tempy from "tempy"; // eslint-disable-line node/no-unpublished-import
import test from "ava"; // eslint-disable-line node/no-unpublished-import
import webpack from "webpack"; // eslint-disable-line node/no-unpublished-import
import webpackConfigBase from "./fixtures/config-base";

const fixturesDir = path.resolve(__dirname, "fixtures");

test("should throw error if not passed path to `wp-config.php`", t => {
    t.throws(() => new WordpressDebugWebpackPlugin());
});

test.serial(
    "should completed successfully when option `debug` is not set",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `true`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: true,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `false`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: false,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\sfalse\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `true` and `runOnce` is set to `true`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: true,
                runOnce: true,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `true` and `runOnce` is set to `false`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: true,
                runOnce: false,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `false` and `runOnce` is set to `true`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: false,
                runOnce: true,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\sfalse\)/.test(data));

                return data;
            });
        });
    }
);

test.serial(
    "should completed successfully when option `debug` is set to `false` and `runOnce` is set to `false`",
    t => {
        const tmpPath = tempy.directory();
        const wpConfigPath = path.join(fixturesDir, "wp-config.php");

        webpackConfigBase.output.path = tmpPath;

        webpackConfigBase.plugins = [
            new WordpressDebugWebpackPlugin({
                debug: false,
                runOnce: false,
                wpConfigPath
            })
        ];

        return pify(webpack)(webpackConfigBase).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs).readFile(wpConfigPath, "utf8").then(data => {
                t.true(/define\('WP_DEBUG',\sfalse\)/.test(data));

                return data;
            });
        });
    }
);
