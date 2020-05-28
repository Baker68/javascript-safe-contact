/*
This javascript makes your contact info invisible to web scrapers.
A typical web scraper does not have a js engine, it does not render javascript,
as a result, we only display the real contact information as soon as the page has loaded.
They usually look for mailto: and tel: URI scheme or just use some email regex, but we
don't use them in our HTML page, we hide our information under <a> link tag.

Email example & explanation for hiding moox@github.com
    In HTML we put <a class="UzLArJmIUJcnXNRjZvUw" data-part-user="moox" data-part-domain="g i t h u b" data-part-tld="com" data-show-build="1">https://en.wiktionary.org/wiki/trap<a/>
    data-part-user contains the username, in this case : "moox"
    data-part-domain contains our domain name , in this case : "github" witch you can also write it using spaces between characters.
    data-part-tld contains our ccTLD, in this case : "com" (the . is added by the script).
    data-show-build is "1", so it will replace https://en.wiktionary.org/wiki/trap with the actual email.
    NOTE : you can use spaces in all data-parts, they will be removed by the script.

Phone example & explanation for hiding 004 0733 238 158
    In HTML we put In HTML we put <a class="XuLKerpKzuuGIJXOrFxm" data-part-country="004" data-part-area="(0733) " data-part-number="238 158" data-show-country="0" data-show-build="1">https://en.wiktionary.org/wiki/trap<a/>
    data-part-country contains the country code, in our case : 004
    data-part-area contains the area code, in our case : 0733
    data-part-number contains the phone number, in our case : 238 158
    data-show-country is "0", so it will not display the country code in in the text.
    data-show-build is "1", so it will replace https://en.wiktionary.org/wiki/trap with the actual phone number from the build.
    NOTE : you can put your number in any fashion you like, the script will strip all non-numeric characters.

If you use this script, it is very important to customize it, replace the class names and tags,
don't make it easy for the bad guys. If it's a pattern, they will get the hang of it.
Please note that this method is not 100% safe, but is better than nothing.
Credits https://gist.github.com/MoOx/9167991
 */

let SafeContact = function () {
    const _emailClass = 'UzLArJmIUJcnXNRjZvUw';
    const _telClass = 'XuLKerpKzuuGIJXOrFxm';

    let _init = function () {
        _revMail();
        _revTel();
    };

    let _revMail = function () {
        ;[].forEach.call(document.getElementsByClassName(_emailClass), function (el) {
            let _build = el.getAttribute("data-part-user").replace(/\s+/g, '') + '@' + el.getAttribute("data-part-domain").replace(/\s+/g, '') + '.' + el.getAttribute("data-part-tld").replace(/\s+/g, '');
            el.setAttribute("href", 'mailto:' + _build);
            if (el.getAttribute("data-show-build") === '1') el.textContent = _build;
        });
    };

    let _revTel = function () {
        ;[].forEach.call(document.getElementsByClassName(_telClass), function (el) {
            let _country = el.getAttribute("data-part-country");
            let _build = el.getAttribute("data-part-area") + el.getAttribute("data-part-number");
            let _tel = _country.replace(/\D/g, '') + _build.replace(/\D/g, '');
            el.setAttribute("href", 'tel:' + _tel);
            if (el.getAttribute("data-show-build") === '1') {
                el.textContent = (el.getAttribute('data-show-country') === '1' ? _country + _build : _build);
            }

        });
    };

    return {
        init: function () {
            _init();
        },
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    SafeContact.init();
});
