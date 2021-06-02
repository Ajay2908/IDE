let editor;


window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp')
}

function changeLanguage() {
    let language = $("#languages").val();

    if (language === 'c' || language === 'cpp') {
        editor.session.setMode('ace/mode/c_cpp')
    }
    else if (language === 'py') {
        editor.session.setMode('ace/mode/python')
    }
    else if (language === 'java') {
        editor.session.setMode('ace/mode/java')

    } else if (language === 'PHP') {
        editor.session.setMode('ace/mode/php')


    }

}