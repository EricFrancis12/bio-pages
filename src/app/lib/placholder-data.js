

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
    font: '1',
    imagesrc: '/assets/images/IMAGE_ID.png',
    headingtext: 'Sample Heading',
    subheadingtext: 'Sample Subheading',
    buttonstyle: '1',
    buttons: [
      {
        text: 'Sample Button Text',
        url: 'https://bing.com?thisisacoolpage=true'
      }
    ],
    clicks: [
      {
        timestamp: Date.now()
      },
      {
        timestamp: Date.now()
      }
    ]
  }
];

module.exports = {
  users,
  bioPages
};
