

const nodemailer = require('nodemailer');
var Mailgen = require('mailgen');
const config = require('../constant/config');
var ejs = require("ejs");
var path = require('path');

var utils = {


    sendMessageEmailWithLink(username, emailSent, message, linkMessage, LinkButton, Link) {

        var email = {
            body: {
                name: username,
                intro: message,
                action: {
                    instructions: linkMessage,
                    button: {
                        color: '#3869D4',
                        text: LinkButton,
                        link: Link
                    }
                },
            }
        };
        console.log({
            color: '#3869D4',
            text: LinkButton,
            link: Link
        });

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Sharhan',
                link: config.website,
                // Optional logo
                logo: config.serverBase + '/images/logo.png'
            }
        });


        // Generate an HTML email with the provided contents
        var emailBody = mailGenerator.generate(email);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        var emailText = mailGenerator.generatePlaintext(email);

        utils.SendEmailsForOrders(emailSent, 'Sharhan', emailBody, emailText);
    },
    sendPasswordEmail(username, emailSent, password) {

        // Prepare email contents
        var email = {
            body: {
                name: username,
                intro: 'your account created successfully <br/> <b>' + 'Password' + ":  " + password + '</b>',
                action: {
                    instructions: 'Click here to login into dashbord',
                    button: {
                        color: '#3869D4',
                        text: 'Dashboard',
                        link: config.website
                    }
                },
            }
        };


        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Sharhan',
                link: 'http://google.com/',
                // Optional logo
                // logo: 'http://195.229.192.170:3300/images/logo.png'
            }
        });


        // Generate an HTML email with the provided contents
        var emailBody = mailGenerator.generate(email);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        var emailText = mailGenerator.generatePlaintext(email);

        utils.SendEmailsForOrders(emailSent, 'Sharhan', emailBody, emailText);
    },
    sendOTPEmailForgetPassword(username, emailSent, otp) {



        // Prepare email contents
        var email = {
            body: {
                name: username,
                intro: otp,
            }
        };






        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Sharhan',
                link: config.website,
                // Optional logo
                logo: config.serverBase + '/images/logo.png'
            }
        });


        // Generate an HTML email with the provided contents
        var emailBody = mailGenerator.generate(email);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        var emailText = mailGenerator.generatePlaintext(email);

        utils.SendEmailsForOrders(emailSent, 'Sharhan', emailBody, emailText);
    },

};
module.exports = utils;