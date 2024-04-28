const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // This replaces CleanWebpackPlugin in Webpack 5
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "microfrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./Microfrontend": "./src/indexForRemote",
      },
      shared: {
        react: {
          import: "react", // The "import" property is used to specify the module that should be loaded as a fallback
          shareKey: "react", // The name of the shared module
          shareScope: "default", // The shared scope
          singleton: true, // Only a single version of the shared module should be loaded
        },
        "react-dom": {
          import: "react-dom",
          shareKey: "react-dom",
          shareScope: "default",
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      // This replaces contentBase in Webpack 5
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9001,
  },
  target: "web", // This is needed for hot reloading in Webpack 5
};
