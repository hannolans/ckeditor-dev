/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

(function() {

	function hasClass( el, className ) {
		if ( ! el.attributes.class ) {
			return false;
		}
		var regex = new RegExp( '(?:^|\\s+)' + className + '(?=\\s|$)', '' );
		return regex.test( el.attributes.class );
	}

	CKEDITOR.plugins.add( 'widgetmathjax', {
		// Require the "widget" plugin, which provides the Widget System and its API.
		requires: 'widget,dialog',

		// Let CKEditor know about the plugin icon.
		icons: 'widgetmathjax',

		onLoad: function() {
		},

		init: function( editor ) {
			editor.widgets.add( 'mathjax', {
				// This is an "inline" widget. It defaults to "block".
				inline: true,

				// We have a dialog to edit this widget, so here we set its name.
				dialog: 'widgetmathjax',

				// Let the Widget System create the toolbar button automatically.
				button: 'MathJax',

				// The HTML template used for new widgets creation.
				template: '<span class="math-tex">{text}</script>',

				allowedContent: 'span(math-tex)',

				// The default data used to fill the above template.
				defaults: function() {
					return {
						dateTime: ( new Date() )[ Date.prototype.toISOString ? 'toISOString' : 'toUTCString' ](),
						text: ( new Date() ).toDateString()
					};
				},

				// Initialization code, called for each widget instance created.
				init: function() {
					// Take the widget data out of the DOM.
					this.setData( {
						dateTime: this.element.getAttribute( 'datetime' ),
						text: this.element.getText()
					} );
				},

				// Called whenever changes to the widget data happens.
				data: function() {
					// Transport the data changes to the DOM.
					//this.element.setAttribute( 'datetime', this.data.dateTime );
					//this.element.setText( this.data.text );
				},

				// Check the elements that need to be converted to widgets.
				upcast: function( el ) {
					if ( !( el.name == 'span' && hasClass( el, 'math-tex' ) ) )
						return false;

					var source = new CKEDITOR.htmlParser.element( 'span', { 'style': 'display:none;'} );
					source.children =  el.children;

					var iFrameLoaded = 0;

					var writeToIFrameHandler = CKEDITOR.tools.addFunction( function ( elem ) {
						if( iFrameLoaded )
							return;
						iFrameLoaded = 1;

						var iframeHtml = '' +
							'<!DOCTYPE html>' +
							'<html>' +
							'<head>' +
								'<meta charset="utf-8">' +
								'<script type="text/x-mathjax-config">' +
									'MathJax.Hub.Config( {' +
										'showMathMenu: false,' +
										'messageStyle: "none"' +
									'} );' +
								'</script>' +
							'</head>' +
							'<body>' +
							'$$' + source.getHtml() + '$$' +
							'<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">' +
							'</script>' +
							'</body>' +
							'</html>';

						var el = new CKEDITOR.dom.element( elem)
						el.getFrameDocument().write( iframeHtml );
					} );

					var iFrame = new CKEDITOR.htmlParser.element( 'iframe', { 'onload': 'window.parent.CKEDITOR.tools.callFunction( ' + writeToIFrameHandler + ', this )'} );

					el.children = [ source, iFrame ];

					return el;
				},

				downcast: function( el ) {
					el.children = el.children[0].children;

					return el;
				}
			} );

			// Register the editing dialog.
			CKEDITOR.dialog.add( 'widgetmathjax', this.path + 'dialogs/widgetmathjax.js' );
		}
	} );
})();
