[![Build Status](https://travis-ci.org/KamBha/angular-disclosure-panel.svg?branch=master)](https://travis-ci.org/KamBha/angular-disclosure-panel)

# angular-disclosure-panel

This is a bunch of directives for writing disclosure panels.

# What the fudge is a 'disclosure panel'?
When I was working on my company's first angular application, I noticed this repeated UI pattern of the user clicking on something and some content being revealed to the user.  In some cases, the content in question would be 'revealed' by switching a class on or off, in other cases the content was switched on with an ng-if.  This general use case I generically call a disclosure panel.

# Why can't you use an accordion?
While an accordion panel would have satisfied some of these cases, it didn't feel appropriate for a couple of reasons:-
- Accordions were not meant for this purpose.  They are meant for multiple values in a list, of which only one is to be presented at a time.  The fact that you could use an accordion for this purpose, is (at best) a nice side effect, at worse an abuse of purpose.
- Accordions prescribe a structure that may not be what your web designer/developer requires.

While this library does not try to solve every case where you need to click on something and something is revealed, it does try to cover the basic ones.

# What do I need to run it?
The code was built with angular 1.4+ (though, in theory, it should work with earlier versions)

It is tested to work on IE9.

# How do I install it?
The angular disclosure panel is available on bower.  You can install it via:-

bower install angular-disclosure-panel --save

# How do I use it?
TODO
