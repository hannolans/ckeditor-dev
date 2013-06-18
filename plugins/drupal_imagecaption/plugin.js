/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

CKEDITOR.plugins.add( 'drupal_imagecaption', {
	// Requires the "widget" plugin, which provides the Widgets System API.
	requires: 'widget',

	icons: 'widgetimagecaption',

	init: function( editor ) {
		// Register the widget with a unique name "imagecaption".
		editor.widgets.add( 'imagecaption', {
			// ACF rules.
			allowedContent: 'img[!src,data-align,data-caption]{float}',

			button: 'Captioned image',

			// The template used for new images insertion.
			// TODO: No "data-widget" should be required here.
			template: '<img src="' + editor.plugins.drupal_imagecaption.path + 'images/empty.png" data-widget="imagecaption" />',

			parts: {
				image: 'img'
			},

			// Initialization method called for every widget instance being
			// upcasted.
			init: function() {
				var image = this.parts.image;

				// Save the initial widget data.
				this.setData( {
					src: image.getAttribute( 'src' ),
					caption: image.getAttribute( 'data-caption' ),
					nocaption: !image.getAttribute( 'data-caption' ),
					align: image.getAttribute( 'data-align' )
				} );

				// Remove the original element attributes.
				image.removeAttributes( [ 'data-caption', 'data-align' ] );
				image.removeStyle( 'float' );
			},

			// Called after initialization and on "data" changes.
			data: function() {
				// Set the "on editing" representation of the widget, which
				// doesn't need to match the input/output data format.
				this.parts.image.setAttribute( 'src', this.data.src );

				if ( this.data.align == 'center' ) {
					// Centered images require different styling, where text
					// doesn't wrap around them.
					this.wrapper.setStyle( 'float', 'none' );
					this.wrapper.setStyle( 'text-align', 'center' );
				} else {
					this.wrapper.setStyle( 'float', this.data.align );
					this.wrapper.removeStyle( 'text-align' );
				}
			},

			// Check the elements that need to be converted to widgets.
			upcast: function( el ) {
				// Upcast all <img> elements that are alone inside a block
				// element. That happens because our <img> are being placed
				// in an invalid location and therefore CKEditor surrounds
				// them with a <p>.
				if ( el.name == 'img' ) {
					if ( CKEDITOR.dtd.$block[ el.parent.name ] && el.parent.children.length == 1 )
						return true;
				}
			},

			// Convert the element back to its desired output representation.
			downcast: function( el ) {
				if ( this.data.caption && !this.data.nocaption )
					el.attributes[ 'data-caption' ] = this.data.caption;

				if ( this.data.align )
					el.attributes[ 'data-align' ] = this.data.align;
			}
		} );

		// All remaining <img> elements will still be transformed into
		// Widgets, but those will be inline.
		editor.widgets.add( 'imagecaptioninline', {
			// This is an "inline" widget. It defaults to "block".
			inline: true,

			// ACF rules.
			allowedContent: 'img[!src]{float}',

			// Initialization method called for every widget instance being
			// upcasted.
			init: function() {
				// Save the initial widget data.
				this.setData( {
					src: this.element.getAttribute( 'src' ),
					align: this.element.getStyle( 'float' )
				} );

				// Remove the original element attributes.
				this.element.removeStyle( 'float' );
			},

			// Called after initialization and on "data" changes.
			data: function() {
				// Set the "on editing" representation of the widget, which
				// doesn't need to match the input/output data format.
				this.element.setAttribute( 'src', this.data.src );

				this.wrapper.setStyle( 'float', this.data.align );
			},

			// Check the elements that need to be converted to widgets.
			upcast: function( el ) {
				// Upcast all <img> elements that are alone inside a block
				// element. That happens because our <img> are being placed
				// in an invalid location and therefore CKEditor surrounds
				// them with a <p>.
				if ( el.name == 'img' ) {
					if ( !CKEDITOR.dtd.$block[ el.parent.name ] || el.parent.children.length > 1 )
						return true;
				}
			},

			// Convert the element back to its desired output representation.
			downcast: function( el, widget ) {
				if ( this.data.align )
					el.setStyle( 'data-align', this.data.align );
			}
		} );
	},

	afterInit: function( editor ) {
		// Customize the behavior of the alignment commands.
		setupAlignCommand( 'left' );
		setupAlignCommand( 'right' );
		setupAlignCommand( 'center' );
		setupAlignCommand( 'block' );

		function setupAlignCommand( value ) {
			var command = editor.getCommand( 'justify' + value );
			if ( command ) {
				if ( value in { right:1,left:1,center:1 } ) {
					command.on( 'exec', function( evt ) {
						var widget = getSelectedWidget( editor ),
							align;

						if ( widget && ( widget.name == 'imagecaption' || value != 'center' ) ) {
							widget.setData( { align: value } );
							evt.cancel();
						}
					});
				}

				command.on( 'refresh', function( evt ) {
					var widget = getSelectedWidget( editor ),
						allowed = { right:1,left:1 },
						align;

					if ( widget ) {
						align = widget.data.align;

						// The inline widget doesn't accept center alignment,
						// only the block one.
						if ( widget.name == 'imagecaption' )
							allowed.center = 1;

						this.setState(
							( align == value ) ? CKEDITOR.TRISTATE_ON : ( value in allowed ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );

						evt.cancel();
					}
				});
			}
		}

		function getSelectedWidget( editor ) {
			var widget = editor.widgets.focused;

			if ( widget && widget.name in { imagecaption:1,imagecaptioninline:1 } )
				return widget;

			return null;
		}
	}
} );