# ![wtree](wtree.png)
Short for "web tree," wtree lists items in a tree format.
Its aim is to provide the ability to easily add items and branches to
`wtree.json`, as well as configure how the trees appear.

## Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
   1. [Definitions](#definitions)
   2. [Creating a tree](#creating-a-tree)
   3. [Tips for configuration](#tips-for-configuration)
3. [Licensing](#licensing)

## Installation
Installing wtree onto a website is easy. Simply drop the files onto
your web server and rename an included template to or create a new
`wtree.json` file, configure it to your liking, and you're all set!

## Configuration
### Definitions
When you create a new `wtree.json` file, the format of the file should 
appear like the following.
```json
{
  "prompt": "",
  "config": {
    "prefix": "",
    "prefixSpace": "",
    "connector": "",
    "endConnector": "",
    "end": ""
  },
  "tree": [
  ]
}
```
- `"prompt"` will set what the first line says.
- `"config"` is an object that keeps code tidy; 
all string configuration is inside of it.
  - `"prefix"` is a string that will connect the branches together.
  - `"prefixSpace"` is a control space that should be the same length
  as `"prefix"`.
  - `"connector"` is a string that will be the start of a new branch,
  before the item name.
  - `"endConnector"` is a string that will be the last connector of a branch,
  and will also appear when an item is connected to only a string.
  - `"end"` is the string that signifies the closure of the tree.
- `"tree"` is where all tree configuration goes.

### Creating a tree
All the objects in the `"tree"` list follow the same structure. For example,
all objects have both the `"item"` and `"content"` properties. `"item"`
describes the name of the branch, and will appear beside the relevant
connector in the generated tree. `"content"` is a property that can contain
either a string or list of other objects. An example object where `"content"`
is a string would appear as follows.
```json
{
  "item": "github",
  "content": "$GITHUB_USERNAME"
}
```
And now an example where `"content"` is a list containing other objects.

```json
{
  "item": "social media",
  "content": [
    {
      "item": "mastodon",
      "content": "$MASTODON_USERNAME"
    },
    {
      "item": "lemmy",
      "content": "$LEMMY_USERNAME"
    }
  ]
}
```
If you want only `"item"` to appear on the tree, you can set `"content"` to an
empty list.
```json
{
  "item": "websites",
  "content": [
    {
      "item": "<a href=\"https://example.com\">example.com</a>",
      "content": []
    },
    {
      "item": "<a href=\"https://example.org\">example.org</a>",
      "content": []
    }
  ]
}
```

### Tips for configuration
- Any HTML syntax is valid.
- Consider making all the strings in `"config"` the same length for
consistency.

## Licensing
All code is licensed under the GNU General Public License 2.0 (included),
and all pictures and documentation are licensed under the
Creative Commons Attribution 4.0 license (available 
[here](https://creativecommons.org/licenses/by/4.0/legalcode)).