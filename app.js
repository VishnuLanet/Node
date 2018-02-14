var apn = require('apn');

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({
        key: './NGOKEY.pem',
        cert : './NGO1.pem',
        production: false // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
var deviceToken = '31164A1E4A529DEA87C7F527C89901BC3B34B6A32697AA1ECCAED1A3C518DAB0';

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'com.lanet.NGO1';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
notification.badge = 3;

// Play ping.aiff sound when the notification is received
notification.sound = 'default';

// Display the following message (the actual notification text, supports emoji)
notification.alert = 'Hello World \u270C';

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
notification.payload = {'id': '123'};

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {
    // Check the result for any failed devices
    console.log(result);
});