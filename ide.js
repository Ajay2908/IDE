let editor;


// window.onload = function () {
//     editor = ace.edit("editor");
//     editor.setTheme('ace/theme/monokai');
//     editor.session.setMode('ace/mode/c_cpp')
// }

$('.editor').each(function (index) {
    editor = ace.edit(this);
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/c_cpp');
});
$('a[href$="#Modal"]').on("click", function () {
    $('#Modal').modal('show');
});
document.addEventListener("DOMContentLoaded", function () {

    el_autohide = document.querySelector('.autohide');

    // add padding-top to bady (if necessary)
    navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';

    if (el_autohide) {
        var last_scroll_top = 0;
        window.addEventListener('scroll', function () {
            let scroll_top = window.scrollY;
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            }
            else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
        // window.addEventListener
    }
    // if

});