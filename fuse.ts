import { FuseBox, Sparky, WebIndexPlugin } from 'fuse-box';
import { resolve } from 'path';

const DEV_PORT = 4455;
const OUTPUT_DIR = '.build';

// are we running in production mode?
const isProduction = process.env.NODE_ENV === 'production';

// the default task
Sparky.task('default', () => {
  // setup the producer with common settings
  const fuse = FuseBox.init({
    homeDir: 'src',
    output: `${OUTPUT_DIR}/$name.js`,
    // overrideExtensions: ['.web.ts', '.web.tsx'],
    extensionOverrides: ['.web.ts', '.web.tsx'],
    // log: isProduction,
    // cache: !isProduction,
    sourceMaps: !isProduction,
    plugins: [WebIndexPlugin({ template: 'src/index.html' })]
    // useTypescriptCompiler: true
    // useJsNext: true
  });

  // start the hot reload server
  if (!isProduction) {
    fuse.dev({ port: DEV_PORT });
  }

  // bundle the electron renderer code
  const rendererBundle = fuse
    .bundle('web')
    .target('browser')
    .alias('react-native', 'react-native-web')
    .instructions('>index.tsx')
    .plugin(
      WebIndexPlugin({
        template: 'src/index.html'
      })
    );

  // and watch & hot reload unless we're bundling for production
  if (!isProduction) {
    rendererBundle.watch(p => p.indexOf(resolve(__dirname, 'src')) === 0);
    rendererBundle.hmr();
  }

  // when we are finished bundling...
  return fuse.run();
});
