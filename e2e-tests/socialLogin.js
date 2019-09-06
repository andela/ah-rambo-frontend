module.exports = {
  'Test social login: click social login': (client) => {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('body', 1000)
      .click('.google-icon')
      .setValue('input[type=email]', 'teamrambo50@gmail.com')
      .click('div[id=identifierNext]')
      .pause(2000)
      .setValue('input[type=password]', 'simsteamrambo50')
      .click('div[id=passwordNext]')
      .pause(2000)
      .assert.urlContains('google.com')
      .end();
  },
};
