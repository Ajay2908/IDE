let editor;


window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme('ace/theme/solarized_dark');
    editor.session.setMode('ace/mode/c_cpp')
}
$('a[href$="#Modal"]').on("click", function () {
    $('#Modal').modal('show');
});