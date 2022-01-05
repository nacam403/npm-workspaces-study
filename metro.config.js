/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// metro.config.jsは、ルート直下にだけ存在すればよい。
// RNプロジェクトの下にmetro.config.jsが無ければ、RNのCLIはルート直下のmetro.config.jsを見てくれる。

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const projectRoot = path.join(__dirname, "packages/AwesomeTSProject");
const watchFolders = [path.resolve(__dirname, "node_modules")];
const blockList = [
  /packages\/aaa\//,
  /node_modules\/aaa\//,
  /packages\/bbb\//,
  /node_modules\/bbb\//,
];
const publicPath = "/assets/dark/magic";
const server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url.startsWith("/assets/dark/magic")) {
        req.url = req.url.replace("/assets/dark/magic", "/assets");
      } else if (req.url.startsWith("/assets/dark")) {
        req.url = req.url.replace("/assets/dark", "/assets/..");
      } else if (req.url.startsWith("/assets")) {
        req.url = req.url.replace("/assets", "/assets/../..");
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = {
  projectRoot,
  transformer: {
    publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolverMainFields: ["react-native", "browser", "module", "main"],
    blockList,
  },
  watchFolders,
  server,
};
