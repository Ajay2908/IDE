let editor;


let template = `#include <bits/stdc++.h>
using namespace std;
#ifdef LOCAL
#include "debug.h"
#else
#define deb(...)
#endif
#define pb push_back
#define int long long
#define ll long long
#define pii pair<int,int>
#define F first
#define S second
#define all(c) c.begin(),c.end()
#define read(v) for(auto &it:v) cin>>it;
const int inf = 1e18;
const int N   = 2e5 + 5;
const int mod = 1000000007;

void test_case() {


}

int32_t main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int  t = 1;
    // cin >> t;
    while (t--)test_case();
    return 0;
}

`
$(document).ready(function () {
    // langSelector("cpp");
    // themeSelector("monokai");
    // $('#langDropDown').text("cpp");
    // $('#themeDropDown').text("monokai");
    

});

$('.editor').each(function (index) {
    editor = ace.edit(this);
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/c_cpp');
    editor.setOption("enableBasicAutocompletion", true);
    editor.setOption("enableSnippets", true);
    editor.setOption("enableLiveAutocompletion", true);
    editor.setShowPrintMargin(false);


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
        // console.log(result);
        editor.setValue(result);
        editor.clearSelection();
    }
    else {
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
                data: code
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
        else {
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
    var element = document.getElementById("Runbuttonspin");
    element.innerHTML = `<div class="spinner-border text-warning text-left" role="status">
    <span class="sr-only"></span>
  </div>`

    setTimeout(function () {
        element.innerHTML =
            `<div class="btn-nav mx-2" id="Runbuttonspin" ><a class="btn navbar-btn text-light" onclick="runCode();" style="background-color: #2a9d8f;"
            href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-braces " viewBox="1 1 16 16">
                <path
                    d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z" />
            </svg>
            Run</a></div>
`

    }, 1000)

}






