let editor;

$(document).ready(function () {
    // langSelector("cpp");
    // themeSelector("monokai");
    // $('#langDropDown').text("cpp");
    // $('#themeDropDown').text("monokai");


});

$('.editor').each(function (index) {
    editor = ace.edit(this);
    editor.setTheme('ace/theme/monokai');
    editor.setHighlightActiveLine(false);

    editor.setShowPrintMargin(false);
    editor.getSession().setMode('ace/mode/c_cpp');



    if (this.classList.contains('edit1')) {
        // alert('editor 1')

        let result;
        $.ajax({
            type: "get",
            url: '/getcode',
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                result = response['data'];
                console.log(result)
            },
            error: function (result) {
                console.log(result)
            }
        })
        editor.setOption("enableBasicAutocompletion", true);
        editor.setOption("enableSnippets", true);
        editor.setOption("enableLiveAutocompletion", true);
        // console.log(result);
        editor.setValue(result);
        editor.clearSelection();
    }
    else if (this.classList.contains('edit2')) {
        // alert('editor 2')

        editor.renderer.setShowGutter(false);
        let result;

        $.ajax({
            type: "get",
            url: '/getinput',
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                result = response['data'];
                console.log(result)
            },
            error: function (result) {
                console.log(result)
            }
        })
        // console.log(result)
        editor.setValue(result);
        editor.clearSelection();

    }
    else {


        editor.renderer.setShowGutter(false);
        editor.setValue("");
        editor.clearSelection();


    }


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
    }


});

function langSelector(lang) {
    // var lang = this.text
    $('.editor').each(function (index) {
        editor = ace.edit(this);
        editor.getSession().setMode(`ace/mode/${lang}`);
    });

    $('#spanLang').text(lang);



}
function themeSelector(theme) {
    $('.editor').each(function (index) {
        editor = ace.edit(this);
        editor.setTheme(`ace/theme/${theme}`);
    });
    $('#spanTheme').text(theme);



}

function saveCode() {

    $('.editor').each(function (index) {
        editor = ace.edit(this);
        const code = editor.getSession().getValue();
    
        if (this.classList.contains('edit1')) {
            const tosend = {
                data: code,
            }
            $.ajax({
                type: "post",
                url: '/savecode',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(tosend),
                success: function (response) {
                    console.log(response, status)
                },
                error: function (result, status) {
                    console.log(result, status)
                }
            })
        }
        else if (this.classList.contains('edit2')) {
            const tosend = {
                data: code
            }
            $.ajax({
                type: "post",
                url: '/saveinput',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(tosend),
                success: function (response) {
                    console.log(response, status)
                },
                error: function (result, status) {
                    console.log(result, status)
                }
            })

        }
    });


}
function runCode() {

    var element = document.getElementById("Running");
    element.textContent = "Compiling.."
    saveCode();
    let result;
    $.ajax({
        type: "get",
        url: '/run',
        async: false,
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            result = response['success'];
            console.log(result)
        },
        error: function (result) {
            console.log(result)
            result = "Something went wrong"
        }
    })

    setTimeout(function () {
        $('.editor').each(function (index) {
            editor = ace.edit(this);
            if (this.classList.contains('edit3')) {
                editor.setValue(result);
                editor.clearSelection();

            }
        });

        element.textContent = "Run";
        showmsg();
    }, 1000)




}
function showmsg() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

var handler = document.querySelector('.handler');
var wrapper = handler.closest('.wrapper');
var boxA = wrapper.querySelector('.box');
var isHandlerDragging = false;

document.addEventListener('mousedown', function (e) {
    // If mousedown event is fired from .handler, toggle flag to true
    if (e.target === handler) {
        isHandlerDragging = true;
    }
});

document.addEventListener('mousemove', function (e) {
    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
        return false;
    }

    // Get offset
    var containerOffsetLeft = wrapper.offsetLeft;

    // Get x-coordinate of pointer relative to container
    var pointerRelativeXpos = e.clientX - containerOffsetLeft;

    // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
    var boxAminWidth = 60;

    // Resize box A
    // * 8px is the left/right spacing between .handler and its inner pseudo-element
    // * Set flex-grow to 0 to prevent it from growing
    boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
    boxA.style.flexGrow = 0;
});

document.addEventListener('mouseup', function (e) {
    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
});

function myFunction() {
    document.getElementById("mainFrameOne").style.display = "none";
    document.getElementById("mainFrameTwo").style.display = "block";
}






