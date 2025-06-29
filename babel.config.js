module.exports = function (api) {
    api.cache(true);
    return {
        presets : [
            [ "babel-preset-expo" , {jsxImportSource : "nativewind"}],
            "nativewind/babel",
        ],
         // ↓↓↓ このpluginsセクションをまるごと追加してください ↓↓↓
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // "@"というエイリアスをプロジェクトのルートディレクトリ("./")に設定
            "@": "./",
          },
        },
      ],
    ],
    };
};