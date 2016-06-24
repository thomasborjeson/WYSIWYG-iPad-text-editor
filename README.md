# WYSIWYG-iPad-text-editor
A javascript text editor that really works on iPad

There are two well-known problems when using text editors on the iOS iPad platform:

* When the virtual keyboard pops up, this moves away any toolbar defined as a fixed html element.
* When you select text, the iOS popup may hide parts of the addon toolbar.

The first problem is solved by using a small draggable toolbar. The second problem is solve by using 'insert at caret' instead of 'style selected text'.

The same toolbar works on both tablet and PC platforms.
It is easy to add more functions to the toolbar.
The javascript code is just 200 lines with no dependencies.

The toolbar is used for user input in this <a href="http://www.ex-pages.com">e-learning platform</a>

Thomas Borjeson


