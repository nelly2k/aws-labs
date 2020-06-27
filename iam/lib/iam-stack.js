const cdk = require('@aws-cdk/core');
const iam = require('@aws-cdk/aws-iam')
const s3 = require('@aws-cdk/aws-s3');

class IamStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);


    var bucket = new s3.Bucket(this, 'bucketForPremissions', {
      bucketName: 'aws-labs.iam.nelly2k.com'
    });

    var bucketPolicy = new iam.ManagedPolicy(this, 'bucketAccess', {
      policyName: 'aws-labs.iam-bucket-permission'
    });
    var statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    })

    statement.addActions("s3:GetObject", "s3:ListBucket");
    statement.addResources(bucket.bucketArn);
    bucketPolicy.addStatements(statement);

    var developers = new iam.Group(this, 'developers', {
      groupName: "developers"
    });

    developers.addManagedPolicy(bucketPolicy);
    new iam.User(this, 'mike.wazovski',{
      passwordResetRequired: true,
      userName: 'mike.wazovski',
      password: cdk.SecretValue.plainText('1234'),
      groups:[developers]
    });

  }
}

module.exports = { IamStack }
