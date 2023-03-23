module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@api': './src/api',
          '@scenes': './src/scenes',
          '@styles': './src/styles',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
