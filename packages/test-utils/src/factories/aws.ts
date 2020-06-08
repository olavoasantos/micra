import { factory, enumFactory } from 'node-factory';
import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { getFormattedDate } from '../helpers/getFormattedDate';
import { AWSRegions } from '../types/aws';
import { StageFactory, HTTPMethodFactory } from './misc';

export const AWSRegionFactory = enumFactory<AWSRegions>([
  'us-east-2',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
]);

export const LambdaContextFactory = factory<LambdaContext>((fake) => {
  const stage = StageFactory.get();
  const region = AWSRegionFactory.get();
  const serviceName = fake.lorem.word();
  const functionName = fake.lorem.word();
  const accountId = String(
    fake.random.number({ min: 100000000000, max: 999999999999 }),
  );

  return {
    callbackWaitsForEmptyEventLoop: false,
    functionVersion: '$LATEST',
    functionName: `${serviceName}-${stage}-${functionName}`,
    memoryLimitInMB: '256',
    logGroupName: `/aws/lambda/${serviceName}-${stage}-${functionName}`,
    logStreamName: `${getFormattedDate(
      new Date(),
    )}/[$LATEST]${fake.random.alphaNumeric(32)}`,
    invokedFunctionArn: `arn:aws:lambda:${region}:${accountId}:function:${serviceName}-${stage}-${functionName}`,
    awsRequestId: fake.random.uuid(),
    getRemainingTimeInMillis: () => 0,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };
});

export const APIGatewayProxyEventFactory = factory<APIGatewayProxyEvent>(
  (fake) => {
    const ip = fake.internet.ip();
    const stage = StageFactory.get();
    const path = `/${fake.lorem.word()}`;
    const region = AWSRegionFactory.get();
    const locale = fake.address.countryCode();
    const httpMethod = HTTPMethodFactory.get();
    const apiId = fake.random.alphaNumeric(10);
    const userAgent = fake.internet.userAgent();
    const accountId = String(
      fake.random.number({ min: 100000000000, max: 999999999999 }),
    );

    const headers = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-Country': locale,
      'Content-Type': 'application/json',
      Host: `${apiId}.execute-api.${region}.amazonaws.com`,
      'User-Agent': userAgent,
      Via: `1.1 ${fake.random.alphaNumeric(32)}.cloudfront.net (CloudFront)`,
      'X-Amz-Cf-Id': `-${fake.random.alphaNumeric(45)}_${fake.random.alphaNumeric(7)}==`,
      'X-Amzn-Trace-Id': `Root=${fake.random.number(9)}-${fake.random.alphaNumeric(8)}-${fake.random.alphaNumeric(24)}`,
      'X-Forwarded-For': `${ip}, ${fake.internet.ip}`,
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https',
    };

    return {
      resource: path,
      path,
      httpMethod,
      headers,
      multiValueHeaders: Object.entries(headers).reduce(
        (
          multiValueHeaders: APIGatewayProxyEvent['multiValueHeaders'],
          [key, value],
        ) => {
          multiValueHeaders[key] = [value];
          return multiValueHeaders;
        },
        {},
      ),
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        authorizer: null,
        resourceId: fake.random.alphaNumeric(6),
        resourcePath: path,
        httpMethod,
        extendedRequestId: `${fake.random.alphaNumeric(6)}=`,
        requestTime: fake.date.recent().toUTCString(),
        path: `/${stage}${path}`,
        accountId,
        protocol: 'HTTP/1.1',
        stage,
        domainPrefix: apiId,
        requestTimeEpoch: Math.floor(fake.date.recent().getTime()),
        requestId: fake.random.uuid(),
        identity: {
          cognitoIdentityPoolId: null,
          accountId: null,
          cognitoIdentityId: null,
          caller: null,
          sourceIp: ip,
          principalOrgId: null,
          accessKey: null,
          cognitoAuthenticationType: null,
          cognitoAuthenticationProvider: null,
          userArn: null,
          userAgent: userAgent,
          user: null,
          apiKey: null,
          apiKeyId: null,
        },
        domainName: `${apiId}.execute-api.${region}.amazonaws.com`,
        apiId,
      },
      body: '',
      isBase64Encoded: false,
    };
  },
);
