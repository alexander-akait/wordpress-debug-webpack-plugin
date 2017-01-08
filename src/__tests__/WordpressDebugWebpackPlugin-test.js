import WordpressDebugWebpackPlugin from '../WordpressDebugWebpackPlugin';
import fs from 'fs';
import path from 'path';
import pify from 'pify'; // eslint-disable-line node/no-unpublished-import
import test from 'ava'; // eslint-disable-line node/no-unpublished-import
import tmp from 'tmp'; // eslint-disable-line node/no-unpublished-import
import webpack from 'webpack'; // eslint-disable-line node/no-unpublished-import
import webpackConfigBase from './fixtures/config-base';

const fixturesDir = path.resolve(__dirname, 'fixtures');

test(
    'should throw error if not passed path to `wp-config.php`',
    (t) => {
        t.throws(() => new WordpressDebugWebpackPlugin());
    }
);

test.serial(
    'should enable debug',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const wpConfigPath = path.join(fixturesDir, 'wp-config.php');

            webpackConfigBase.output.path = tmpPath;

            webpackConfigBase.plugins = [
                new WordpressDebugWebpackPlugin(wpConfigPath, true)
            ];

            return pify(webpack)(webpackConfigBase)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs).readFile(wpConfigPath, 'utf8')
                        .then((data) => {
                            t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                            return cleanupCallback();
                        });
                });
        })
);

test.serial(
    'should enable debug without `debug` option',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const wpConfigPath = path.join(fixturesDir, 'wp-config.php');

            webpackConfigBase.output.path = tmpPath;

            webpackConfigBase.plugins = [
                new WordpressDebugWebpackPlugin(wpConfigPath)
            ];

            return pify(webpack)(webpackConfigBase)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs).readFile(wpConfigPath, 'utf8')
                        .then((data) => {
                            t.true(/define\('WP_DEBUG',\strue\)/.test(data));

                            return cleanupCallback();
                        });
                });
        })
);

test.serial(
    'should disable debug',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const wpConfigPath = path.join(fixturesDir, 'wp-config.php');

            webpackConfigBase.output.path = tmpPath;

            webpackConfigBase.plugins = [
                new WordpressDebugWebpackPlugin(wpConfigPath, false)
            ];

            return pify(webpack)(webpackConfigBase)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs).readFile(wpConfigPath, 'utf8')
                        .then((data) => {
                            t.true(/define\('WP_DEBUG',\sfalse\)/.test(data));

                            return cleanupCallback();
                        });
                });
        })
);
