/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// ルート直下のmetro.config.jsは必須ではないが、あると少し便利。
// ルート直下のmetro.config.jsが無いと、metroサーバーの起動は必ずRNプロジェクトのnpm startで行う必要がある。そうしないと、index.jsが見つからないというエラーが出る。
// ルート直下のmetro.config.jsがあると、別枠のターミナルが立ち上がってmetroサーバーを起動する場合にも対応できる。npm startをせずにnpm run iosを実行した時に便利。

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
