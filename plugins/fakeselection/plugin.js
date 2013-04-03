/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function() {
	'use strict';

	CKEDITOR.plugins.add( 'fakeselection', {
		init: function() {

		}
	} );

	function fakeSelection( target, element ) {
		CKEDITOR.dom.selection.call( this, target );

		var cache = this._.cache,
			range = new CKEDITOR.dom.range( element.getDocument() );

		range.setStartBefore( element );
		range.setEndAfter( element );
		cache.ranges = new CKEDITOR.dom.rangeList( range );

		// Put this element in the cache.
		cache.selectedElement = cache.startElement = element;
		cache.type = CKEDITOR.SELECTION_ELEMENT;

		// Properties that will not be available when isFake.
		cache.selectedText = cache.nativeSel = null;

		var hiddenEl = CKEDITOR.dom.element.createFromHtml( '<div class="hiddenSelection">&nbsp;</div>' );
		this.root.append( hiddenEl );
		this._.hiddenEl = hiddenEl;

		this.update();

		// Block all keys. They need to be handled by custom code.
		this._.keydownListener = this.root.on( 'keydown', function( evt ) {
			evt.data.preventDefault();
		} );

		// Catch selection after focus has been brought back to editable.
		// Need to do that only on browsers that uses selection locking.
		if ( CKEDITOR.env.ie ) {
			this._.focusListener = this.root.on( 'focus', function() {
					this.update();
			}, this );
		}
	}

	CKEDITOR.dom.fakeSelection = fakeSelection;

	function selection() {}
	selection.prototype = CKEDITOR.dom.selection.prototype;
	fakeSelection.prototype = new selection();

	CKEDITOR.tools.extend( fakeSelection.prototype, {
		isFake: true,

		destroy: function() {
			this._.hiddenEl.remove();
			this._.keydownListener.removeListener();
			this._.focusListener && this._.focusListener.removeListener();
		},

		update: function() {
			var trueSel = new CKEDITOR.dom.selection( this.root ),
				range = new CKEDITOR.dom.range( this.root ),
				hiddenEl = this._.hiddenEl;

			range.setStartAt( hiddenEl, CKEDITOR.POSITION_AFTER_START );
			range.setEndAt( hiddenEl, CKEDITOR.POSITION_BEFORE_END );
			trueSel.selectRanges( [ range ] );
		}
	}, true );

})();