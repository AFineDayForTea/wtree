const tree = document.querySelector('#tree');
let jsonDocument;
let jsonConfig;
let jsonTree;
// Load the JSON file and load the tree
fetch("wtree.json")
    .then(response => response.json()
        .then(json => {
            jsonDocument = json;
            jsonConfig = jsonDocument.config;
            jsonTree = jsonDocument.tree;
            loadTree();
        }))
    .catch(reason => tree.innerHTML += `Failed to fetch configuration, please try reloading the page<br />${reason}`);

let prefix = '';

function loadTree() {
    tree.innerHTML += `${jsonDocument.prompt}<br />`;
    jsonTree.forEach((item, index) => {
        // Add spacing between the main sections
        tree.innerHTML += `${jsonConfig.prefix}<br />${jsonConfig.connector}${item.item}<br />`;

        if (typeof item.content === 'string') { // If it's a string, add it
            tree.innerHTML += `${jsonConfig.prefix}${jsonConfig.endConnector}${item.content}<br />`;
        } else { // If it's a branch, go through it
            prefix += jsonConfig.prefix;
            parseBranch(item.content);
            prefix = prefix.substring(0, prefix.length - jsonConfig.prefix.length);
        }

        // If it's the last item, add the closing character
        if (index === jsonTree.length -1 ) {
            tree.innerHTML += jsonConfig.end;
        }
    });
}

/** @param {any} branch */
function parseBranch(branch) {
    branch.forEach((item, index) => {
        if (index !== branch.length - 1) { // Regular connection
            tree.innerHTML += `${prefix}${jsonConfig.connector}${item.item}<br />`;

            if (typeof item.content === 'string') { // If it's a string, add it
                tree.innerHTML += `${prefix}${jsonConfig.prefix}${jsonConfig.endConnector}${item.content}<br />`;
            } else { // If it's a branch, go through it
                prefix += jsonConfig.prefix;
                parseBranch(item.content);
                prefix = prefix.substring(0, prefix.length - jsonConfig.prefix.length);
            }
        } else { // Special case if it's the end
            tree.innerHTML += `${prefix}${jsonConfig.endConnector}${item.item}<br />`;

            if (typeof item.content === 'string') { // If it's a string, add it
                tree.innerHTML += `${prefix}${jsonConfig.prefixSpace}${jsonConfig.endConnector}${item.content}<br />`;
            } else { // If it's a branch, go through it
                prefix += jsonConfig.prefixSpace;
                parseBranch(item.content);
                prefix = prefix.substring(0, prefix.length - jsonConfig.prefixSpace.length);
            }
        }
    });
}