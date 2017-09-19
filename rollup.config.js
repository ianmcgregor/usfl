import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import strip from 'rollup-plugin-strip';
import uglify from 'rollup-plugin-uglify';

const prod = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.js',
    name: 'usfl',
    output: {
        file: (prod ? 'dist/usfl.min.js' : 'dist/usfl.js'),
        format: 'umd'
    },
    sourcemap: !prod,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: false
        }),
        commonjs({
            include: [
                'node_modules/core-js/**',
                'node_modules/mini-signals/**',
                'node_modules/events/**'
            ]
        }),
        babel({
            babelrc: false,
            // exclude: 'node_modules/**',
            presets: [
                ['es2015', {loose: true, modules: false}]
            ],
            plugins: [
                'external-helpers'
            ]
        }),
        (prod && strip({sourceMap: false})),
        (prod && uglify())
    ]
};
