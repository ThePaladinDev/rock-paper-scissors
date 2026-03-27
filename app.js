// 'helper' to wait for the 'load' event
const pageIsLoaded = new Promise((resolve) => {
  if (document.readyState == 'complete') resolve();
  else window.addEventListener('load', resolve);
});

// 'Pause' the script execution right here,
// until the page is painted.
await pageIsLoaded;

alert('Hello World!');
