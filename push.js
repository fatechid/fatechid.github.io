var webPush = require('web-push');
const vapidKeys = {
   "publicKey": "BJXkmLG7hB3nTktcT7ljRF5A_NUWNOll7yYxTUKTHllNLwBZ6dC9gSYep6PTHkN4i1q95IBhzK4xOrH6Yz8zQ30",
   "privateKey": "SSPoguGP8tRNZX1w_iHJQkXvecCzAeyK7_cvb7JEfx4"
};
 
 
webPush.setVapidDetails(
   'mailto:mayer@fatechid.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d2g3ja9rBUc:APA91bGYGVKXdNfbiYSTyQrAJ6BIIuuf5TqYqPvw1Guw1RolAMHJ-lWaQhtGK4V6ubXMy1CVQa1Ji5wT7P8cGJwIh6q5YzlAAfASVP2vnR0uwcn_tHdXfU7i6dTqd3qKnwFq7lWdMX6m",
   "keys": {
       "p256dh": "BAe6rksnalz/Vjii+4zfI3ROxaSNqkw3YWpzfJBTBCUq01WnuGSL0eCtZmBL137xn1ro2BeIQzbhHyn5de9uaro=",
       "auth": "bEgwjO1yleXikaLYkY0Byw=="
   }
   
};
var payload = 'Congrats! Your Application Now Can Use Push Notification, Stay Tuned';
var options = {
   gcmAPIKey: '323850420595',
   TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);