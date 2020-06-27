const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const Iam = require('../lib/iam-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Iam.IamStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
