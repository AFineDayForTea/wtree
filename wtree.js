const tree = document.querySelector('#tree');
let jsonTree;
let config;
// Load the JSON file and load the tree
fetch("wtree.json")
    .then(blob => blob.json()
        .then(json => {
            jsonTree = json;
            loadTree();
        }));

function loadTree() {
    config = jsonTree.config
    tree.innerHTML += jsonTree.prompt + "<br />"
}

/** @param {any} branch */
function parseBranch(branch) {

}