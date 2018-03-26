module.exports = {
  "plugins": [
    "prettier"
  ],
  "extends": ["airbnb", 'prettier'],
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "rules": {
    "prettier/prettier": "error",
    // "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false}],
    // We need this for proper react-codemod usage of sort comp
    'react/sort-comp': [2, {
      'order': [
        'static-methods',
        'constructor',
        'componentDidMount',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render'
      ]
    }],

    // Навсегда отключил правила
    "valid-jsdoc": 'off',
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    // "arrow-body-style": "as-needed",

    // Временно отключил правила
    // Because backend api use underscore in own json.
    "camelcase": "off",
    "react/forbid-prop-types": "off",
    "jsx-a11y/label-has-for": "off",
    "prefer-destructuring": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
  }
}
