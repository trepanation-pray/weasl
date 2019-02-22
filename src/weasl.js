function weaslOpen( content, name, style, padding, width ) {

  var weaslOpened = new Event('weaslOpened');

  // Create the modal structure
  var modal = {
    wrap: document.createElement( 'div' ),
    overlay: document.createElement( 'div' ),
    container: document.createElement( 'div' ),
    content: document.createElement( 'div' ),
    close: document.createElement( 'button' ),
  }

  //Add classes and attributes
  modal.wrap.classList.add('weasl__site-wrap');

  modal.overlay.classList.add('weasl');
  modal.overlay.classList.add('weasl-' + name);

  if ( style ) {
    modal.overlay.classList.add(style);
  }

  modal.container.classList.add('weasl__container');
  modal.container.setAttribute('role', 'dialog');
  modal.container.setAttribute('tabindex', '0');

  if ( padding ) {
    modal.container.style.padding = padding;
  }
  if ( width ) {
    modal.container.style.maxWidth = width;
  }

  modal.content.classList.add('weasl__content');

  modal.content.innerHTML = content;

  modal.close.classList.add('weasl__close');
  modal.close.setAttribute('type', 'button');
  modal.close.setAttribute('title', 'Close modal');
  modal.close.setAttribute('tabindex', '0');
  
  // Move the body's children into this wrapper
  while (document.body.firstChild)
  {
    modal.wrap.appendChild(document.body.firstChild);
  }

  // Add modal structure to dom
  document.body.appendChild(modal.wrap);
  modal.overlay.appendChild(modal.container);
  modal.container.appendChild(modal.content);
  modal.container.appendChild(modal.close);
  document.body.appendChild(modal.overlay);


  // Activate Modal

  setTimeout(function(){

    document.body.classList.add('weasl--active');

    setTimeout(function(){
      //Set focus
      document.body.querySelector('.weasl__container').focus();
      // Dispatch the open event.
      document.dispatchEvent(weaslOpened);
    
    }, 250 ); 

  }, 0 ); 

}

// Close modal

function weaslClose( event, expiration) {

  var weaslClosed = new Event('weaslClosed');

  // Remove active states from body.
  document.body.classList.remove('weasl--active');
  
  // Remove Content.

  setTimeout(function(){
    // Grab the original body contents
    var body = document.body.querySelector('.weasl__site-wrap').innerHTML;
    
    // Reinstate the boby contents
    document.body.innerHTML = body;

  }, 250 ); 

  // Dispatch the close event.
  document.dispatchEvent(weaslClosed);

};


document.addEventListener('click', function (event) {
  
  if (!event.target.matches('.weasl__close, .weasl__close-button, .weasl')) return;

  event.preventDefault();
  
  weaslClose( event );
  
}, false);


// Main weasl function
function weasl( options ) {
  
  // Declare the intiate event.
  var weaslInit = new Event('weaslInit');

  // Dispatch the initiate event.
  document.dispatchEvent(weaslInit);

  var name = options.name,
      content = options.content,
      style = options.style,
      padding = options.padding,
      width = options.width;
      
      
  weaslOpen( content, name, style, padding, width );

}