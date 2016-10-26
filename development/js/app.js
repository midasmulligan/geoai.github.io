// APP

/**
 * Background Interactivity
 *  A cluster of interconnected nodes vaguely resembling a neural network.
 *  Not truly, but enough.
 */

var networkInteractiveAnimation = (function() {

	var mouseX = 0, mouseY = 0,
			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,
			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,
			camera, scene, renderer;
	init();
	animate();
	function init() {
		var container, separation = 100, amountX = 50, amountY = 50,
	       	    particles, particle;
		
		container = document.getElementById("panel-header");
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 120;
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x57728B );
		scene.fog = new THREE.Fog( 0x000000, 0.15, 1000);
		renderer = new THREE.CanvasRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
		// particles
		var PI2 = Math.PI * 2;
		var material = new THREE.SpriteCanvasMaterial( {
					color: 0xe3ebf7,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
                                                context.fill();
					}
				} );
		var geometry = new THREE.Geometry();
		for ( var i = 0; i < 360; i ++ ) {
			particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2 - 1;
			particle.position.y = Math.random() * 2 - 1;
			particle.position.z = Math.random() * 2 - 1;
			particle.position.normalize();
			particle.position.multiplyScalar( Math.random() * 10 + 450 );
			particle.scale.x = particle.scale.y = 10;
			scene.add( particle );
			geometry.vertices.push( particle.position );
		}
		// lines
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5 } ) );
		scene.add( line );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	//
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}
	function onDocumentTouchStart( event ) {
		if ( event.touches.length > 1 ) {
			event.preventDefault();
			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}
	function onDocumentTouchMove( event ) {
		if ( event.touches.length == 1 ) {
			event.preventDefault();
			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}
	//
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function render() {
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}
console.log('Network app loaded.');
});

/**
 * Header Scroll-spy Handler
 * __Not yet implemented__
 */

var headerHandler = (function () {

	var fixed = false,
	    nav = document.getElementById('header'),
	    position = nav.offsetTop;

	function stick() {
		var scrollY = window.scrollY || window.pageYOffset;
		if (scrollY > position && !fixed) {
			fixed = true;
			nav.className = nav.className + ' small';
		} else if (scrollY <= position && fixed) {
			fixed = false;
			nav.classList.remove('fixed');
		}
	}
});

/**
 * Contact Button Handler
 *
 */

var contactButtonHandler = (function () {

	var contactButton = document.getElementById('contactButton');

	contactButton.addEventListener('click', function(e) {
		window.location.href = "mailto:info@qgstechnologies.com";
	});
console.log('Contact Handler loaded.');
});

/**
 * Navigation Links Handler
 * 
 */

var navHandler = (function () {

	var navHome = document.getElementById('navHome'),
	    navInfo = document.getElementById('navInfo'),
	    navSolu = document.getElementById('navSolu'),
	    navCont = document.getElementById('navCont');
	var panHome = document.getElementById('panel-1'),
	    panInfo = document.getElementById('panel-2'),
	    panSolu = document.getElementById('panel-3'),
	    panCont = document.getElementById('panel-4');


	var setActive = (function (el) {
		
		panHome.className = "";
		panInfo.className = "";
		panSolu.className = "";
		panCont.className = "";

		el.classList.add('active');
		console.log('Click event. ' + el);
	});

	navHome.onclick = function() {
		 setActive(panHome);
	};
	navInfo.onclick = function() {
		setActive(panInfo);
	};
	navSolu.onclick = function() {
		setActive(panSolu);
	};
	navCont.onclick = function() {
		setActive(panCont);
	};
console.log('Navigation handler loaded.')
});
