'use strict'
// console.log('Starting up');


function init() {
    createProjects()
    renderModal()
    renderProject()
}


function renderProject() {
    var projects = getProjects();
    var strHTMLs = projects.map(function(project) {
        // console.log(project.url);
        return `
            <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${project.id}">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="${project.url}" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${project.name}</h4>
                </div>
                </div>
                `
            // <p class="text-muted">Illustration</p>
    })
    var imgs = document.querySelector('.imgs');
    imgs.innerHTML += strHTMLs.join('');
}


function onSubmit() {
    var subject = $('.subject').val();
    var body = $('.body-text').val();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nir@gmail.com&su=${subject}&body=${body}`)
}

function renderModal() {
    var projects = getProjects();
    var strHTMLs = projects.map(function(project) {
        return `
        <div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
        <div class="lr">
        <div class="rl"></div>
        </div>
        </div>
        <div class="container">
        <div class="row">
        <div class="col-lg-8 mx-auto">
        <div class="modal-body">
        <!-- Project Details Go Here -->
        <h2>${project.name}</h2>
        <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
        <img class="img-fluid d-block mx-auto" src="${project.url}" alt="">
        <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
        maiores repudiandae, nostrum, reiciendis facere nemo!</p>
        <ul class="list-inline">
        <li>Date: ${new Date(project.publishedAt)}</li>
        <li>Client: Threads</li>
        <li>Category: Illustration</li>
        </ul>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        `
            // <p class="text-muted">Illustration</p>
    })
    var modals = document.querySelector('.modal-container');
    modals.innerHTML += strHTMLs.join('');
}