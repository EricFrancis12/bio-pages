

const users = [
    {
        _id: '410544b2-4001-4271-9855-fec4b6a6442a_u',
        email: 'email@domain.com',
        hashedpassword: '123456'
    }
];

const bioPages = [
    {
        _id: '000_b',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a_u',
        name: '',
        font: '1',
        textcolor: 'white',
        backgroundcolor: 'black',
        imagesrc: '/assets/images/IMAGE_ID.png',
        headingtext: 'Sample Heading',
        subheadingtext: 'Sample Subheading',
        buttonstyle: '1',
        buttoncolor: 'blue',
        buttontextcolor: 'white',
        buttonbordercolor: 'white',
        buttons: [
            {
                text: 'Sample Button Text',
                icon: 'faPencil',
                url: 'https://bing.com?thisisacoolpage=true',
                disabled: false
            }
        ]
    }
];

const timestamp = Date.now();
const clicks = [
    {
        biopage_id: bioPages[0]._id,
        timestamp: timestamp
    },
    {
        biopage_id: bioPages[0]._id,
        timestamp: timestamp + 1102
    },
    {
        biopage_id: bioPages[0]._id,
        timestamp: timestamp + 4747
    }
];

module.exports = {
    users,
    bioPages,
    clicks
};
