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

$('.editor').each(function (index) {
    editor = ace.edit(this);
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/c_cpp');
    if (this.classList.contains('edit2')) {

        editor.renderer.setShowGutter(false);
    }
    editor.setShowPrintMargin(false);

    if (this.classList.contains('edit1')) {

        editor.setValue(template);
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
        // window.addEventListener
    }
    // if

});

$('.dataform').submit(function (e) {

    e.preventDefault();

    // $(this).serialize(); will be the serialized form
    const data = $(this).serializeArray();
    var theme;
    var language;
    var font_size;
    var font_family;
    language = data[0].value;
    theme = data[1].value;
    font_size = data[2].value;
    font_family = data[3].value;

    // $(this).append(data[2].value + '<br />');
    $('.editor').each(function (index) {
        editor = ace.edit(this);
        editor.setTheme(`ace/theme/${theme}`);
        editor.getSession().setMode(`ace/mode/${language}`);
        editor.setOptions({
            fontFamily: `${font_family}`,
            fontSize: `${font_size}`
        });
    });


});


