    // Checking Notification API Feature
    if ("Notification" in window) {
        requestPermission();
      } else {
        console.error("Notification not Supported With This Browser");
      }
      
      // Got Permission For Notification API
      function requestPermission() {
        Notification.requestPermission().then(function (result) {
          if (result === "denied") {
            console.log("Notification Feature not Permitted");
            return;
          } else if (result === "default") {
            console.error("User closes the Permit Box ");
            return;
          }
          console.log("Notification Feature Permitted");

          if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BJXkmLG7hB3nTktcT7ljRF5A_NUWNOll7yYxTUKTHllNLwBZ6dC9gSYep6PTHkN4i1q95IBhzK4xOrH6Yz8zQ30")
                }).then(function(subscribe) {
                    console.log('Successfully Subscribed with Endpoint: ', subscribe.endpoint);
                    console.log('Successfully Subscribed with p256dh Key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Successfully Subscribed with Auth Key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e) {
                    console.error('Cannot Subscribed ', e.message);
                });
            });
        }

        });
      }