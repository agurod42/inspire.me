module.exports = {
    "extends": "airbnb",
    "rules": {
        "class-methods-use-this": "off",
        "func-names": "off",
        "global-require": "off",
        "no-await-in-loop": "off",
        "no-console": "off",
        "no-plusplus": "off",
        "no-return-await": "off",
    },
    "settings": {
        "import/resolver": {
            "alias": {
                "map": [
                    ['@', './src/webapp/src']
                ]
            }
        }
    }
};