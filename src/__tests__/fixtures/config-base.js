import path from 'path';

export default {
    entry: path.resolve(__dirname, '../fixtures/entry.js'),
    output: {
        filename: 'bundle.js'
    },
    plugins: [],
    resolve: {
        modules: ['web_modules', 'node_modules']
    }
};
