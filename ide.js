let editor;


window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme('ace/theme/solarized_light');
    editor.session.setMode('ace/mode/c_cpp')
}