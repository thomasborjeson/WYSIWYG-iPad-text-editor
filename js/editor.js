// Help functions -----------------------------------------------------------------------------------------------------
function $Id(id) {
    return document.getElementById(id);
}
function $Class(className) {
    return document.getElementsByClassName(className);
}
function $ClassOf(element, className) {
    return element.getElementsByClassName(className);
}

function is_touch_device() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
// Functions that convert to/from an html a-tag and the editor input fields --------------------------------------------

var linkText = "<input type='text' class='hyper' placeholder='Visible linktext' size='50'><br>";
var linkUrl = "<input type='text' class='url' placeholder='URL: http://www...' size='50'>";

function openLink() {

    var Span = $Class("link");

    for (var i= 0; i < Span.length; i++) {
        var span = Span[i];
        var Arr = span.getElementsByTagName("a");
        var url = Arr[0].getAttribute("href");
        var txt = Arr[0].innerText;
        span.innerHTML = linkText + linkUrl;
        var Hyper = $ClassOf(span, "hyper");
        Hyper[0].value = txt;
        var URL = $ClassOf(span, "url");
        URL[0].value = url;
    }
}
function closeLink () {

    var Span = $Class("link");
    for (var i= 0; i < Span.length; i++) {

        var span = Span[i];
        var Hyper = $ClassOf(span, "hyper");
        var URL = $ClassOf(span, "url");
        var url = URL[0].value;
        span.innerHTML = "<a href='" + url + "'>" + Hyper[0].value + "</a>";
    }
}
// Init page -----------------------------------------------------------------------------------------------------------
window.addEventListener("load", function(e) {

    // Draggable toolbar
    var bar = $Id('bar');
    var boxtop;
    var boxleft;

    if (is_touch_device() ) {

        document.addEventListener("touchmove", function(e) { //prevent double scrollbars
            e.preventDefault();
        }, false);

        $Id("container").addEventListener("touchmove", function(e) {
            e.stopPropagation();
        }, false);

        var starty;
        var startx;
        var disty = 0;
        var distx = 0;
        var touchobj = null;

        bar.addEventListener('touchstart', function(e){
            if (e.target.tagName.toLowerCase() == "div" ) {
                touchobj = e.changedTouches[0];
                boxtop = parseInt(bar.style.top);
                starty = parseInt(touchobj.clientY);
                boxleft = parseInt(bar.style.left);
                startx = parseInt(touchobj.clientX);
                e.preventDefault();
            }
        }, false);

        bar.addEventListener('touchmove', function(e){

            if (e.target.tagName.toLowerCase() == "div" ) {
                touchobj = e.changedTouches[0];
                disty = parseInt(touchobj.clientY) - starty;
                bar.style.top = boxtop + disty  + 'px';
                distx = parseInt(touchobj.clientX) - startx;
                bar.style.left = boxleft + distx + 'px';
                e.preventDefault();
            }
        }, false);

    } else {
        var selected = null;       // Object of the element to be moved
        var x_pos = 0;
        var y_pos = 0;            // Stores x & y coordinates of the mouse pointer

        bar.onmousedown = function () {
            selected = this;
            boxleft = x_pos - selected.offsetLeft;
            boxtop = y_pos - selected.offsetTop;

            return false;
        };

        document.addEventListener("mousemove", function(el) {

            x_pos = document.all ? window.event.clientX : el.pageX;
            y_pos = document.all ? window.event.clientY : el.pageY;
            if (selected !== null) {
                selected.style.left = (x_pos - boxleft) + 'px';
                selected.style.top = (y_pos - boxtop) + 'px';
            }
        }, false);

        document.addEventListener("mouseup", function(el) {

            selected = null;
        }, false);
      }
}, false);

// Text editor ---------------------------------------------------------------------------------------------------------

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {

        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
}

function execCmd(cmd) {
    document.execCommand(cmd, false, null);
}

function insertElement(el) {
    var html;

    if (el == "Title") {

        html = "<h3 placeholder='Title'></h3>";
    } else if (el == "UL") {

        html = "<ul><li placeholder='Item 1'></li>";
        html += "<li  placeholder='Item 2' ></li></ul>";
    } else if (el == "BQ") {

        html = "<blockquote  placeholder='Enter text ...'></blockquote>";
    } else if (el == "Link") {
        html = "<span class='link'>" + linkText + linkUrl + "</span>";
    }

    $Id("editable").focus();
    pasteHtmlAtCaret(html + "<BR>");
}

function insertImage() {
    $Id("fileToLoad").style.display = "inline-block";
}
function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("fileToLoad").files;
    if (filesSelected.length > 0) {             // Read image
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {   // Save image
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;
            newImage.style = "display: block; margin-left: auto; margin-right: auto";
            var html = "<div>" +  newImage.outerHTML + "</div>";
            $Id("editable").focus();
            pasteHtmlAtCaret(html + "<BR>");
        };
        fileReader.readAsDataURL(fileToLoad);
        $Id("fileToLoad").style.display = "none";
    }
}
// Save Page -----------------------------------------------------------------------------------------------------------

function saveDocument() {

    var div = $Id("editable");
    var html = div.outerHTML;
    alert("your code here");
}

