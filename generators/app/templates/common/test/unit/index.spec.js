var helpers = require(__BASE + '/test/helpers');
var index = require(__BASE + '/src/index');

describe('main', function() {
  it('returns hello world', function() {
    helpers.expect(index()).to.eql('hello world');
  });
});
