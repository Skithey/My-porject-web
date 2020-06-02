'use strict'

var gProjects = [];
var gProjectsName = ['Touch-the-nums', 'In-pic', 'Minesweeper', 'Book-shop']

function createProject(name) {
    var project = {
        id: makeId(),
        name: name,
        title: 'dasd',
        desc: makeLorem(),
        url: getUrl(name),
        publishedAt: Date.now(),
    }
    return project
}

function createProjects() {
    var projects = [];
    gProjectsName.map(function(project) {
        projects.push(createProject(project))
    });
    gProjects = projects
    console.log(gProjects);

}

function getProjects() {
    return gProjects
}


function getUrl(name) {
    return `img/team/${name}.jpg`
}