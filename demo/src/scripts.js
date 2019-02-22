
// Check if cookie is set
if( !getCookie( 'hello' ) ) {
  // If not set run modal
  var yourContent = 'Hello World'
  weasl({
    name: 'hello',
    content: yourContent
  });
}
// The closed event
document.addEventListener('weaslClosed', function (e) {
  //Set cookie to acknowledge the popup has been seen.
  setCookie('hello', 'acknowledged pop up', 1, '/');
}, false);

// Listen for the event.

// The initiated event
document.addEventListener('weaslInit', function (e) {
  console.log('Initialised');
}, false);

// The open event
document.addEventListener('weaslOpened', function (e) {
  console.log('Open');
}, false);

// The closed event
document.addEventListener('weaslClosed', function (e) {
  console.log('Closed');
}, false);


document.addEventListener('click', function (event) {
  if (!event.target.matches('.example')) return;
  var alertContent = 
  '<h1>This is an alert!</h1>' +
  '<p>This is an example modal.</p>' +
  '<p><button class="btn weasl__close-button" type="button" title="Close modal" tabindex="0">Close the modal</button></p>';
  weasl({
    name: 'alert',
    content: alertContent,
  });
}, false);
