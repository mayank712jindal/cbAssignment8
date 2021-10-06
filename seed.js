const Visitor = require('./models/visitor');

const visitors = [
    {
        name: 'Rahul',
        email: "rahul@email.com",
        phone: 9898989898,
        isAvailable: true,
        entryTime: "16:20:17",
        exitTime: "-"
    },
    {
        name: 'Sabeel',
        email: "sabeel@email.com",
        phone: 9898989898,
        isAvailable: true,
        entryTime: "16:20:17",
        exitTime: "-"
    },
];

const seedDB = async () => {

    await Visitor.deleteMany({});
    await Visitor.insertMany(visitors);
    console.log('DB Seeded');
}

module.exports = seedDB;