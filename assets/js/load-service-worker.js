---
layout: blank
---
const promptStr = 'New version of {{ site.url }} is available, do you want to update? It may take two reloads.';
function createUIPrompt(opts) {
  if (confirm(promptStr)) {
     opts.onAccept()
  }
}
// register a service worker for offline content
// This code sample uses features introduced in Workbox v6.
import {Workbox, messageSW} from '{{ site.url }}/assets/js/workbox-v6.1.5/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  let registration;

  const showSkipWaitingPrompt = (event) => {
    const prompt = createUIPrompt({
      onAccept: () => {
        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener('controlling', (event) => {
          window.location.reload();
        });
        wb.messageSW({ type: 'SKIP_WAITING', payload: 'SKIP_WAITING' });
      },
      onReject: () => {
        prompt.dismiss();
      }
    });
  };

  // Add an event listener to detect when the registered
  // service worker has installed but is waiting to activate.
  wb.addEventListener('waiting', showSkipWaitingPrompt);
  wb.register().then(function() {
    // console.log('CLIENT: service worker registration complete.');
    }, function () {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
  console.log('CLIENT: service worker is not supported.');
}
