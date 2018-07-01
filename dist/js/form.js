var BODY = this.document.querySelector('body')
const btn_menu = this.document.querySelector('[data-menu-btn]')
const form_mod = this.document.querySelector('.form')
const form_el = form_mod.querySelector('form')
const form_req = form_mod.querySelectorAll('[required]')

form_mod.onsubmit = function(event){
    event.preventDefault();

    form_el.classList.add('is-submitted');
    var isError = false;

    for (var i=0; i < form_req.length; i++){
        if ( form_req[i].checkValidity() != true ){
            isError = true;
        }
    }

    if (!isError){
        // base js send post
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert('form send');
                
                form_el.classList.remove('is-submitted');
                form_el.reset();
            }
        };
        xhttp.open("POST", "https://httpstat.us/200", true);
        xhttp.send(new FormData(form_el));
    }else{
        console.log('there are some not properly validated fields')
    }
}