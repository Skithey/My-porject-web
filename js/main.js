'use strict'
console.log('Starting up');

var gProject;

function createProject() {
    return {
        id: "sokoban",
        name: "Sokoban",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    }
}