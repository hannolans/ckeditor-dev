// This is sample code for a theoretical theme, which upcasts <img> tags
// to <figure> elements.

// To enable this, just add ?theme to the URL.

if ( document.location.search != '?notheme' ) {

	// Added this here for simplicity, but this is a sample CSS to be added
	// by the theme into the editor contents area (contents.css).
	CKEDITOR.addCss( '\
				figure.imagecaption {\
					border: solid 1px #ccc;\
					border-radius: 2px;\
					background: rgba(0,0,0,0.05);\
					padding: 10px;\
					margin: 10px 20px;\
					text-align: center;\
				}\
				figure.imagecaption img{\
					vertical-align: bottom;\
				}\
				figure.imagecaption figcaption {\
					margin: 5px 10px -5px;\
				}' );

	CKEDITOR.on( 'instanceCreated', function( ev ) {
		var editor = ev.editor;

		// Listen to widget definitions and customize them as needed. It's
		// basically rewritting parts of the definition.
		editor.on( 'widgetDefinition', function( ev ) {
			var widgetDef = ev.data;

			// Customize the "imagecaption" widget definition.
			if ( widgetDef.name == 'imagecaption' ) {

				// The template used for new images insertion.
				widgetDef.template =
					'<figure class="imagecaption">' +
						'<img src="' + editor.plugins.drupal_imagecaption.path + 'images/empty.png" data-caption="Caption" />' +
						'<figcaption>Caption</figcaption>' +
					'</figure>';

				// Define the editables created by the new upcasting.
				widgetDef.editables = {
					caption: 'figcaption'
				};

				// Define the parts created by the new upcasting.
				widgetDef.parts.caption = 'figcaption';

				// Override "data" so we can make the new widget structure
				// behave according to changes on data.
				widgetDef.data = CKEDITOR.tools.override( widgetDef.data, function( originalDataFn ) {
					return function() {
						// Call the original "data" implementation.
						originalDataFn.apply( this, arguments );

						var widget = this;

						setTimeout( function() {
							if ( widget.element.is( 'figure' ) && widget.data.nocaption ) {
								editor.widgets.destroy( widget );

								widget.parts.image.replace( widget.element );

								editor.widgets.initOn( widget.parts.image, 'imagecaption', widget.data );
								return;
							}

							if ( widget.element.is( 'img' ) && !widget.data.nocaption ) {
								editor.widgets.destroy( widget );

								var figure = CKEDITOR.dom.element.createFromHtml( widget.template.output(), editor.document );

								figure.replace( widget.element );
								widget.element.replace( figure.findOne( 'img' ) );

								editor.widgets.initOn( figure, 'imagecaption', widget.data );
								return;
							}
						} );
					};
				} );

				// Upcast <img> to <figure>.
				widgetDef.upcast = CKEDITOR.tools.override( widgetDef.upcast, function( originalUpcastFn ) {
					return function( el ) {
						// Execute the original upcast first. If "true", this is an
						// element to be upcasted.
						if ( originalUpcastFn.apply( this, arguments ) ) {
							var figure = el.wrapWith( new CKEDITOR.htmlParser.element( 'figure', { 'class': 'imagecaption' } ) ),
								captionTxt = el.attributes[ 'data-caption' ] || '',
								caption = CKEDITOR.htmlParser.fragment.fromHtml( captionTxt, 'figcaption' );

							if ( !captionTxt )
								caption.attributes.style = 'display:none';

							figure.add( caption );

							return figure;
						}
					}
				} );

				// Downcast <figure> back to <img>.
				widgetDef.downcast = CKEDITOR.tools.override( widgetDef.downcast, function( originalDowncastFn ) {
					return function( el ) {
						// Update data with the current caption.
						var caption = el.getFirst( 'figcaption' );
						caption = caption ? caption.getHtml() : '';
						this.data.caption = caption;

						// When downcasting, we'll take the <img> element in
						// consideration, only.
						el = el.getFirst( 'img' );

						// Call the original downcast to setup the <img>
						// meta data accordingly.
						return originalDowncastFn.call( this, el ) || el;
					};
				} );

				// Just a way to trigger nocaption change. It will be handled in
				// #data listener.
				widgetDef.edit = function( evt ) {
					evt.cancel();
					this.setData( 'nocaption', !this.data.nocaption );
				};
			}
		} );
	} );
}