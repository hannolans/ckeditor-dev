/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

// Tool scripts for the sample pages.
// This file can be ignored and is not required to make use of CKEditor.

(function() {

	var acfWarn;

	CKEDITOR.on( 'instanceCreated', function( event ) {
		// Insert a warning message when dataFiltered to let users know
		// why rich content is different.
		event.editor.once( 'dataFiltered', function() {
			if ( acfWarn )
				return;

			var divs = CKEDITOR.document.getElementsByTag( 'div' ),
				i = 0,
				description;

			while ( !( description = divs.getItem( i++ ) ).hasClass( 'description' ) );

			( acfWarn = CKEDITOR.dom.element.createFromHtml(
				'<p class="info">' +
					'Editor contents in this sample may be limited due to <a href="http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter">Advanced Content Filter (ACF)</a> configuration.<br> ' +
					'To learn more about content filtering, please refer to the <a href="http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter">ACF guide</a>.' +
				'</p>'
			) ).insertAfter( description );
		});
	});

	// Check for sample compliance.
	CKEDITOR.on( 'instanceReady', function( ev ) {
		var editor = ev.editor,
			meta = CKEDITOR.document.$.getElementsByName( 'ckeditor-sample-required-plugins' ),
			requires = meta.length ? CKEDITOR.dom.element.get( meta[ 0 ] ).getAttribute( 'content' ).split( ',' ) : [],
			missing = [];

		if ( requires.length ) {
			for ( var i = 0; i < requires.length; i++ ) {
				if ( !editor.plugins[ requires[ i ] ] )
					missing.push( '<code>' + requires[ i ] + '</code>' );
			}

			if ( missing.length ) {
				var warn = CKEDITOR.dom.element.createFromHtml(
					'<p class="info">' +
						'To fully experience this demo, the ' + missing.join( ', ' ) + ' plugin' + ( missing.length > 1 ? 's are' : ' is' ) + ' required.' +
					'</p>'
				);
				warn.insertBefore( editor.container );
			}
		}
	});
})();
// %LEAVE_UNMINIFIED% %REMOVE_LINE%