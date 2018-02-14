var apn = require('apn');

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({
    key:'./key.pem',
    cert:'./Push_Test_key.pem',
    production: false // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
// iphone 4s
// var deviceToken = 'D3F454B47753A3321FE701A5A44B9A8913B7DB73583F7C1918134E4915DA36DB';
// iPhone 5
var deviceToken = 'E00BA2DCD29136A16F4D31A1051C2963B1C3B8F1AE07F82CD3FE5FB2B47A574B';

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'lanet.testing';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
notification.badge = 1;

// Play ping.aiff sound when the notification is received
notification.sound = 'default';

// Display the following message (the actual notification text, supports emoji)
notification.alert = 'Hello World \u270C';

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
notification.payload = {id: 123};

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {
    // Check the result for any failed devices
    console.log(result);
});