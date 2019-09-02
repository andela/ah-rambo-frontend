module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^actions$': '<rootDir>/src/actions',
    '^components$': '<rootDir>/src/components',
    '^reducers$': '<rootDir>/src/reducers',
    '^containers$': '<rootDir>/src/containers',
    '^store$': '<rootDir>/src/store'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jestConfig/__mocks__/fileTransformer.js'
  },
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jestConfig/setupTests.js'
  ]
};
