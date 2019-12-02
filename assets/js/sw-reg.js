        // Service Worker Registration
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", function() {
            navigator.serviceWorker
              .register("service-worker.js")
              .then(function() {
                console.log("ServiceWorker Registration Success!");
              })
              .catch(function() {
                console.log("ServiceWorker Registration Failed!");
              });
          });
        } else {
          console.log("ServiceWorker Aren't Compatible With This.");
        }