/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

CKEDITOR.dialog.add( 'widgetmathjax', function( editor ) {
	return {
		title: 'Edit TeX/MathML',
		minWidth: 250,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				elements: [
					{
						id: 'dateTime',
						type: 'text',
						label: 'Date and time',
						setup: function( widget ) {
							this.setValue( widget.data.dateTime );
						},
						commit: function( widget ) {
							widget.setData( 'dateTime', this.getValue() );
						}
					}
				]
			}
		]
	};
} );