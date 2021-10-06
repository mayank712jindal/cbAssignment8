const express = require('express');
const app = express.Router();
const Visitor = require('../models/visitor');

app.get('/user/checkin', (req, res) => {
    res.render("checkin");
})
app.get('/show', async (req, res) => {
    const data = await Visitor.find({});
    res.render('show', { data });
})

function sendEmail(email, mesg) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.EMAIL,
        subject: 'Sending with SendGrid is Fun',
        text: mesg,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
app.post('/user/checkin', async (req, res) => {
    const newItem = {
        ...req.body,
        isAvailable: true
    }
    await Visitor.create(newItem);
    const { name, email, entryTime } = req.body;
    let msg = `heyy ${name}, you just checkedin at ${entryTime}`
    sendEmail(email, msg);
    res.redirect('/show');
})
app.patch('/user/checkout/:id', async (req, res) => {

    let today = new Date()
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const { id } = req.params;

    const item = await Visitor.findById(id);
    const { name, email, isAvailable } = item;
    if (isAvailable) {
        await Visitor.findByIdAndUpdate(id, { exitTime: time });
        await Visitor.findByIdAndUpdate(id, { isAvailable: false });
        let msg = `heyy ${name}, you just checkedout at ${time}`
        sendEmail(email, msg);
    }
    res.redirect(`/show`);
});

module.exports = app;