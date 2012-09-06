/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/**
 * @fileOverview Defines the {@link CKEDITOR.dtd} object, which holds the DTD
 *		mapping for XHTML 1.0 Transitional. This file was automatically
 *		generated from the file: xhtml1-transitional.dtd.
 */

/**
 * Holds and object representation of the HTML DTD to be used by the
 * editor in its internal operations.
 *
 * Each element in the DTD is represented by a property in this object. Each
 * property contains the list of elements that can be contained by the element.
 * Text is represented by the `#` property.
 *
 * Several special grouping properties are also available. Their names start
 * with the `$` character.
 *
 *		// Check if <div> can be contained in a <p> element.
 *		alert( !!CKEDITOR.dtd[ 'p' ][ 'div' ] ); // false
 *
 *		// Check if <p> can be contained in a <div> element.
 *		alert( !!CKEDITOR.dtd[ 'div' ][ 'p' ] ); // true
 *
 *		// Check if <p> is a block element.
 *		alert( !!CKEDITOR.dtd.$block[ 'p' ] ); // true
 *
 * @class CKEDITOR.dtd
 * @singleton
 */
CKEDITOR.dtd = (function() {

	// Union of all sets.
	var X = function() {
			var args = Array.prototype.slice.call( arguments );
			args.unshift( {} );
			return CKEDITOR.tools.extend.apply( CKEDITOR.tools, args );
		},

	// Subtraction rest of sets, from the first set.
	Y = function( source, removed ) {
		var substracted = CKEDITOR.tools.clone( source );
		for ( var i = 1; i < arguments.length; i++ ) {
			removed = arguments[ i ];
			for( var name in removed )
				delete substracted[ name ];
		}
		return substracted;
	},

	// Extraction from the first set, that fails the criteria.
	Z = function ( obj, fn ) {
		obj = CKEDITOR.tools.clone( obj );
		for ( var i in obj )
		{
			if ( fn( i  ) === false )
				delete obj[ i ];
		}
		return obj;
	},

	// XHTML dtd.
	A = { isindex:1,fieldset:1 },
	B = { input:1,button:1,select:1,textarea:1,label:1 },
	C = X( { a:1 }, B ),
	D = X( { iframe:1 }, C ),
	E = { hr:1,ul:1,menu:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,mark:1,time:1,meter:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1 },
	F = { ins:1,del:1,script:1,style:1 },
	G = X( { b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1,wbr:1 }, F ),
	H = X( { sub:1,img:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1,mark:1 }, G ),
	I = X( { p:1 }, H ),
	J = X( { iframe:1 }, H, B ),
	K = { img:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,mark:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1 },

	L = X( { a:1 }, J ),
	M = { tr:1 },
	N = { '#':1 },
	O = X( { param:1 }, K ),
	P = X( { form:1 }, A, D, E, I ),
	Q = { li:1 },
	R = { style:1,script:1 },
	S = { base:1,link:1,meta:1,title:1 },
	T = X( S, R ),
	U = { head:1,body:1 },
	V = { html:1 },

	xhtml = {
		html: U,
		head: T,
		style: N,
		script: N,
		body: P,
		base: {},
		link: {},
		meta: {},
		title: N,
		col: {},
		tr: { td:1,th:1 },
		img: {},
		colgroup: { col:1 },
		noscript: P,
		td: P,
		br: {},
		wbr: {},
		th: P,
		center: P,
		kbd: L,
		button: X( I, E ),
		basefont: {},
		h5: L,
		h4: L,
		samp: L,
		h6: L,
		ol: Q,
		h1: L,
		h3: L,
		option: N,
		h2: L,
		form: X( A, D, E, I ),
		select: { optgroup:1,option:1 },
		font: L,
		ins: L,
		menu: Q,
		abbr: L,
		label: L,
		table: { thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1 },
		code: L,
		tfoot: M,
		cite: L,
		li: P,
		input: {},
		iframe: P,
		strong: L,
		textarea: N,
		noframes: P,
		big: L,
		small: L,
		span: L,
		hr: {},
		dt: L,
		sub: L,
		optgroup: { option:1 },
		param: {},
		bdo: L,
		'var': L,
		div: P,
		object: O,
		sup: L,
		dd: P,
		strike: L,
		area: {},
		dir: Q,
		map: X( { area:1,form:1,p:1 }, A, F, E ),
		applet: O,
		dl: { dt:1,dd:1 },
		del: L,
		isindex: {},
		fieldset: X( { legend:1 }, K ),
		thead: M,
		ul: Q,
		acronym: L,
		b: L,
		a: J,
		blockquote: P,
		caption: L,
		i: L,
		u: L,
		tbody: M,
		s: L,
		address: X( D, I ),
		tt: L,
		legend: L,
		q: L,
		pre: X( G, C ),
		p: L,
		em: L,
		dfn: L,
		// HTML5 -------
		section: P,
		header: P,
		footer: P,
		nav: P,
		article: P,
		aside: P,
		figure: P,
		dialog: P,
		hgroup: P,
		mark: L,
		time: L,
		meter: L,
		menu: L,
		command: L,
		keygen: L,
		output: L,
		progress: O,
		audio: O,
		video: O,
		details: O,
		datagrid: O,
		datalist: O
	},

	// HTML5 content model.
	// http://www.w3.org/TR/html-markup/common-models.html

	// phrasing elements
	PH = { em:1,strong:1,small:1,abbr:1,datalist:1,dfn:1,i:1,b:1,s:1,u:1,code:1,var:1,samp:1,kbd:1,sup:1,sub:1,q:1,cite:1,span:1,bdo:1,bdi:1,br:1,wbr:1,img:1,embed:1,iframe:1,area:1,script:1,ruby:1,input:1,textarea:1,select:1,button:1,label:1,output:1,keygen:1,progress:1,command:1,time:1,meter:1,mark:1 },
	// flow elements
	FL = { address:1,article:1,aside:1,blockquote:1,div:1,dl:1,details:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1 },
	// transparent elements.
	TP = { a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1 },
	// metadata elements
	MT = { link:1,style:1,meta:1,script:1,noscript:1,command:1 };

	// Phrasing includes transparent, text, style, script.
	PH = X( PH, TP, N, R );
	// Flow includes phrasing.
	FL = X( PH, FL );

	var html5 = {
		a: Y( FL, { a:1,button:1 } ),
		abbr: PH,
		address: Y( FL, { address:1 } ),
		area: {},
		article: FL,
		aside: FL,
		audio: X( { source:1,track:1 }, FL ),
		b: PH,
		base: {},
		bdi: PH,
		bdo: PH,
		blockquote: FL,
		body: FL,
		br: {},
		button: PH,
		canvas: FL,
		caption: FL,
		cite: PH,
		code: PH,
		col: {},
		colgroup: { col:1 },
		command: {},
		datalist: X( { option:1 }, PH ),
		dd: FL,
		del: FL,
		details: X( { summary:1 }, FL ),
		dfn: PH,
		div: FL,
		dl: { dt:1,dd:1 },
		dt: PH,
		em: PH,
		embed: {},
		fieldset: X( { legend:1 }, FL ),
		figcaption: FL,
		figure: X( { figcaption:1 }, FL ),
		footer: FL,
		form: FL,
		h1: PH,
		h2: PH,
		h3: PH,
		h4: PH,
		h5: PH,
		h6: PH,
		head: X( { title:1,base:1 }, MT ),
		header: FL,
		hgroup: { h1:1,h2:1,h3:1,h4:1,h5:1,h6:1 },
		hr: {},
		html: { head:1,body:1 },
		i: PH,
		iframe: N,
		img: {},
		input: {},
		ins: FL,
		kbd: PH,
		keygen: {},
		label: PH,
		legend: PH,
		li: FL,
		link: {},
		map: FL,
		mark: PH,
		menu: X( { li:1 }, FL ),
		meta: {},
		meter: Y( PH, { meter:1 } ),
		nav: FL,
		noscript: X( { link:1,meta:1,style:1 }, FL ),
		object: X( { param:1 }, FL ),
		ol: { li:1 },
		optgroup: { option:1 },
		option: N,
		output: PH,
		p: PH,
		param: {},
		pre: PH,
		progress: Y( PH, { progress:1 } ),
		q: PH,
		rp: PH,
		rt: PH,
		ruby: X( { rp:1,rt:1 }, PH ),
		s: PH,
		samp: PH,
		script: N,
		section: FL,
		select: { optgroup:1,option:1 },
		small: PH,
		source: {},
		span: PH,
		strong: PH,
		style: N,
		sub: PH,
		summary: PH,
		sup: PH,
		table: { caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1 },
		tbody: { tr:1 },
		td: FL,
		textarea: N,
		tfoot: { tr:1 },
		th: FL,
		thead: { tr:1 },
		time: Y( PH, { time:1 } ),
		title: N,
		tr: { th:1,td:1 },
		track: {},
		u: PH,
		ul: { li:1 },
		'var': PH,
		video: X( { source:1,track:1 }, FL ),
		wbr: {},
		'#': {}
	};

	// Meld html5 into xhtml.
	var dtd = xhtml;
	for ( var name in html5 )
		if ( html5.hasOwnProperty( name ) )
			dtd[ name ] = X( dtd[ name ], html5[ name ] );

	var inline = Y( X( L, PH ) );

	// http://dev.w3.org/html5/spec/content-models.html#interactive-content
	var interactive = { a:1,audio:1,button:1,details:1,embed:1,iframe:1,img:1,input:1,keygen:1,label:1,menu:1,object:1,select:1,textarea:1,video:1 };

	// HTML5 Sections.
	var section = { nav:1,article:1,aside:1,figure:1,section:1 };

	// Shortcut for <a> and <button>.
	var linkAndBtn = { a:1,button:1 };

	// Shortcut for <video> and <audio>.
	var videoAudio = { video:1, audio:1 };

	// The "classical" list of block elements, including all html4 blocks-level
	// elements and html5 flow ones. (from v3)
	var block = { address:1,blockquote:1,center:1,dir:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1,li:1,dt:1,dd:1 };

	// The "classical" list of block limit elements. (from v3)
	var blockLimit = { body:1,div:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,audio:1,video:1,details:1,datagrid:1,datalist:1,td:1,th:1,caption:1,form:1,table:1,ul:1,dl:1,ol:1,tr:1,dir:1,fieldset:1 };

	// Blocks that have phrasing content model.
	var textBlock = Z( X( block, blockLimit ), function( name ) { return '#' in dtd[ name ]; });

	// Blocks that are end-level block.
	var phrasingBlock = Z( textBlock, function( name ) { return !( 'p' in dtd[ name ] ); });

	// Blocks that are in composition with other blocks to form a complete semantic.
	var structural = X( { table: 1, ul: 1, ol: 1, dl: 1 }, dtd.table, dtd.ul, dtd.ol, dtd.dl );

	// Phasing elements that should contain at least one non-inter-element text,
	// also can be considered as can be removed if empty.
	var removeEmpty = { abbr:1,acronym:1,address:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1,mark:1 };

	// Dtd of the fragment element, basically it accept anything except for intermediate structure - <li>, <option>, etc.
	var fragment = X( { html:1 }, dtd.html, dtd.body, dtd.head );

	function tagName( el ) {

		if ( typeof el == 'string' )
			return el;

		if ( el.type == CKEDITOR.NODE_ELEMENT )
			return el.$ ? el.getName() :  el.name;

		if ( el.type == CKEDITOR.NODE_TEXT )
			return '#';

		return '';
	}

	function getParent( el ) {
		return el.$ ? el.getParent() : el.parent;
	}

	function hasAncestor( el, ancestor ) {
		var parent = getParent( el ), parentName;
		while ( parent ) {

			parentName = tagName( parent );

			if ( typeof ancestor == 'string' ?
					 parentName == ancestor :
					 parentName in ancestor ) {
				return true;
			}
			else
				parent = getParent( parent );
		}
		return false;
	}

	function hasAttr( el, attr, val ) {

		var attrVal = typeof el == 'object' ?
									el.$ ? el.getAttribute( attr ) :
									el.attributes[ attr ] :
									null;

		return val ? attrVal == val : !!attrVal;
	}

	return X( {

		checkChild : function( el, child ) {

			var name = tagName( el ), childName = tagName( child );

			// Fragment element.
			if ( !name )
				return childName in fragment;

			// <a> and <button> must be appear under each other.
			if ( name in linkAndBtn && childName in linkAndBtn )
				return false;

			var parent = getParent( el );

			// The content model of a transparent element is derived from the content
			// model of its parent element.
			if ( name in TP &&
					 childName in block )
			{
				// Reinforced inline on transparent that are used internally.
				if ( hasAttr( el, 'data-cke-inline' ) )
					return false;


				if ( parent )
					return CKEDITOR.dtd.checkChild( parent, child );

				// When a transparent element has no parent, then the part of its content
				// model that is "transparent" must instead be treated as accepting any flow content.
			}

			// <area> must have an ancestor <map>.
			if ( childName == 'area' )
				return hasAncestor( el, 'map' );

			// all section elements must not appear as a descendant of <address>.
			if ( childName in section )
				return !hasAncestor( el, 'address' );

			// interactive elements must not be descendant of the <a> or <button>.
			if ( childName in interactive )
			{
				// <video> and <audio> applies to this rule with only the presence of "controls" attribute.
				// <menu> applies to this rule with only the presence of "toolbar" attribute.
				// <img> applies to this rule with only the presence of "usemap" attribute.
				if ( !( childName in videoAudio && !hasAttr( child, 'controls' ) ) &&
						 !( childName == 'menu' && !hasAttr( child, 'toolbar' ) ) &&
						 !( ( childName == 'img' || childName == 'object' ) && !hasAttr( child, 'usemap' ) ) &&
						 !( childName == 'input' && !hasAttr( child, 'type', 'hidden' ) ) )
					return !hasAncestor( linkAndBtn );
			}

			// <source> must not appear as a child of <audio>
			// which already has a "src" attribute.
			if ( name in videoAudio && childName == 'source' )
				return hasAttr( el, 'src' );

			// Show tolerance to custom elements.
			return !dtd[ name ] || !dtd[ childName ] || childName in dtd[ name ];
		},

		isKnown : function( el ) {
			return tagName( el ) in dtd;
		},

		isRemoveEmpty : function( el ) {

			var name = tagName( el );

			// Empty link is to be removed when empty but not anchor. (#7894)
			if ( name == 'a' && !hasAttr( el, 'name' ) )
				return true;

			return removeEmpty[ name ];
		},

		// The "$" items have been added manually.

		/**
		 * List of elements living outside body.
		 */
		$nonBodyContent: X( V, U, S ),


		$transparent: TP,

		$structural : structural,

		/**
		 * List of block elements, like `<p>` or `<div>`.
		 */
		$block: block,

		/**
		 * List of block limit elements.
		 */
		$blockLimit: blockLimit,

		/**
		 * List of end-level blocks that has a phrasing content model, thus
		 * cannot any other block.
		 */
		$phrasingBlock : phrasingBlock,

		/**
		 * List of block-level elements that has a flow content model, thus
		 * structural block, e.g. &lt;table&gt; is excluded from it.
		 */
		$textBlock : textBlock,

		/**
		 * List of inline (`<span>` like) elements.
		 */
		$inline: inline, // Just like span.

		/**
		 * Elements that are considered objects, therefore selected as a whole in the editor.
		 */
		$object: { img:1,table:1,hr:1,iframe:1,input:1,textarea:1,select:1,applet:1,button:1,object:1,audio:1,video:1 },

		/**
		 * List of elements that can be children at `<body>`.
		 */
		$body: X( { script:1,style:1 }, block ),

		$cdata: { script:1,style:1 },

		/**
		 * List of elements that are accepted as inline editing hosts.
		 */
		$editable: { address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,nav:1,p:1,pre:1,section:1 },

		/**
		 * List of empty (self-closing) elements, like `<br>` or `<img>`.
		 */
		$empty: { area:1,base:1,br:1,col:1,hr:1,img:1,input:1,link:1,meta:1,param:1,wbr:1 },

		/**
		 * List of list item elements, like `<li>` or `<dd>`.
		 */
		$listItem: { dd:1,dt:1,li:1 },

		/**
		 * List of list root elements.
		 */
		$list: { ul:1,ol:1,dl:1 },

		/**
		 * Elements that accept text nodes, but are not possible to edit into
		 * the browser.
		 */
		$nonEditable: { applet:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,script:1,textarea:1,param:1,audio:1,video:1 },

		/**
		 * List of elements that can be ignored if empty, like `<b>` or `<span>`.
		 */
		$removeEmpty: removeEmpty,

		/**
		 * List of elements that have tabindex set to zero by default.
		 */
		$tabIndex: { a:1,area:1,button:1,input:1,object:1,select:1,textarea:1 },

		/**
		 * List of elements used inside the `<table>` element, like `<tbody>` or `<td>`.
		 */
		$tableContent: { caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1 }
	} );
})();

// PACKAGER_RENAME( CKEDITOR.dtd )
