// index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNewChangesNotification = functions.database.ref('janazas/{id}').onWrite((change, context) => {

    var topic = "NewJanaza";

    // A message that contains the notification that devices will receive	
    var message = {
        notification: {
            title: 'New Janaza',
            body: change.after.val().name + ' has passed away on ' + change.after.val().deathDate
        }
    };

    // Using Cloud Messaging to create notification
    return admin.messaging().sendToTopic(topic, message).then(function (response) {
        console.log('Successfully sent message:', response);
        return null;
    }).catch(function (error) {
        throw new Error("Error sending message:", error);
    });
})

exports.sendUpdateNotification = functions.database.ref('janazas/{id}').onUpdate((change, context) => {

    var topic = "NewJanaza";

    // A message that contains the notification that devices will receive	
    var message = {
        notification: {
            title: 'Janza Update',
            body: change.after.val().name + ' has passed away on ' + change.after.val().deathDate
        }
    };

    // Using Cloud Messaging to create notification
    return admin.messaging().sendToTopic(topic, message).then(function (response) {
        console.log('Successfully sent message:', response);
        return null;
    }).catch(function (error) {
        throw new Error("Error sending message:", error);
    });
})