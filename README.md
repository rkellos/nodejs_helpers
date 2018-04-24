# Consumer Email Helpers

<b>Constants:</b>  (/lib/helpers/constants.js) - 

![](http://localhost:9000/api/project_badges/measure?project=nodejs_helpers&metric=alert_status)
![](https://img.shields.io/jenkins/s/https/jenkins.qa.ubuntu.com/view/Precise/view/All%20Precise/job/precise-desktop-amd64_default.svg)

  A common place for any constant used, or supplied via process.env; one place to change - this is a common software engineering practice. This can promote consistency, single place to change and locate. Including the same error message consistency.

  ## 
   > CODE SAMPLE:

    APP: {
      group: "nodejs",
      name: "nodejs-helpers"
    },
    ENV: {
      PORT: process.env.PORT,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,

      STACK_NAME: process.env.STACK_NAME,
      NEW_RELIC_KEY: process.env.NEW_RELIC_KEY,

      RDS_HOST: process.env.RDS_HOST || "localhost",
      RDS_USER: process.env.RDS_USER,
      RDS_PASSWORD: process.env.RDS_PASSWORD,
      RDS_DATABASE: process.env.RDS_DATABASE,
      RDS_TABLE: process.env.RDS_TABLE
      ...
    }
  > Usage: MATCHES process.env vars, ex: Constant.ENV.JWT_EXPIRES_IN <=(same as)=> process.env.JWT_EXPIRES_IN
  --> allowing a single place to set definitions of env vars, using same names and accessible from loaded package.
  ##


<b>Logger:</b> (/lib/helpers/logger.js) -

  Currently using a base of Winston, which has a mature life-cycle and provides all the same functionality as loggly, or any other. This logger provides color console, and multiple types of transports available. Currently CloudWatch is implemented, console, and another transport planned is aws-sns transport - with the idea of controller log-level, location, and transports to include planned.

  ## 
   > CODE SAMPLE:

      INFO: [2017-06-25T01:55:37.548Z] - "New Relic instrumentation is disabled. You must not be in dev and have process.env.STACK_NAME, process.env.NEW_RELIC_KEY set."

      DEBUG: [2017-06-25T01:55:37.550Z] - "NODE_ENV N/A"

      DEBUG: [2017-06-25T01:55:37.550Z] - "STACK_NAME: N/A"

      DEBUG: [2017-06-25T01:55:37.550Z] - "NEW_RELIC_KEY: N/A"

      call-source header: undefined

      NoAuthRouteAuthenticator used.

      INFO: [2017-06-25T01:55:41.129Z] - "(30) defineRoutes :: Controller initialized"

      INFO: [2017-06-25T01:55:41.132Z] - "(20) TokenService.getToken :: Token requested for email: x@y.com"

      INFO: [2017-06-25T01:55:41.134Z] - "[SUCCESS] (20) TokenService.getToken :: Successful token generation"

      ERROR: [2017-06-25T01:55:41.135Z] - "[FAIL] (21) ResponseArchiverService._self.archive :: Archival to Firehose error: Missing required key 'DeliveryStreamName' in params"

      Response: {"errors":[],"forensics":[],"timing":{"time_received":"2017-06-25T01:55:41.128Z","time_elapsed_milliseconds":8},"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoieEB5LmNvbSIsImlhdCI6MTQ5ODM1NTc0MX0.nernObP0WoJ821WX3Rcm_T41n0yBGPvgQ5UxZkOdQqc"}}

      GET /x@y.com 200 10.899 ms - 260
  ##


<b>Stack:</b> (/lib/helpers/stack.js) - 

   Started as an experiment, and fully acknowledged that <= es5, the used callee, caller, is not recommended. However, if failed by callee, or caller, the result is the current type or function is not logged - so non-destructive. This helper allows the reporting of type, function, method location to identify the position of an error or success logged.


<b>ConnectionFactory:</b> (/lib/factories/connection_factory.js) - 

  A factory is more than one, so beside the regularly used mysql connection-pool, a redis connection and token cache client access can also been added - so the factory can return multiple types of connections.


<b>BaseModel/Schema/Request Validation:</b> (/lib/models and /lib/validation) - 

  This is an experiment with creating a base model (id, email) of known commonly used fields, so as to implement a base structure and use request validation, setup, at least.


---------------------------------------------
Experiment: SNS transport
---------------------------------------------
    SNS logging that pushes a message

    const AWS = require('aws-sdk');
    const sns = new AWS.SNS({
      region: '..',
      accessKeyId: '..',
      secretAccessKey: '..'
    });

    const options = {
      level: 'error',
      sns,  //required
      topicArn: '..' //required
    };

    logging.add(SnsTransport, options);

    When the the following message is logged

    const landingDetails = {
      location: {
        latitude: 28.4859,
        longitude: -80.5444
      },
      fuel: 'nominal'
    }
    logger.info('successful landing', landingDetails);
    Then the resulting Amazon SNS message body would be

    {
      "model": "Falcon 9",
      "flight": 20,
      "timestamp": 1450748385666,
      "level": "info",
      "message": "successful landing",
      "meta": {
        "location": {
          "latitude": 28.4859,
          "longitude": -80.5444
        },
        "fuel": "nominal"
      }
    }


---------------------------------------------
Experiment: Newrelic Transport
---------------------------------------------

    Newrelic-winston is a Newrelic transport:

      var winston = require('winston');
      winston.add(require('newrelic-winston'), options);
    The Newrelic transport will send your errors to newrelic and accepts the following options:

    env: the current environment. Defaults to process.env.NODE_ENV
    If env is either 'dev' or 'test' the lib will not load the included newrelic module saving devs from annoying errors ;)


---------------------------------------------
Experiment: Kinesis Firehose Transport
---------------------------------------------

    The winston-firehose transport relays your log messages to Amazon Kinesis Firehose.

      var winston = require('winston');
      var WFirehose = require('winston-firehose');

      winston.add(WFirehose, options);
    Options:

    streamName: The name of the Amazon Kinesis Firehose stream to which to log. [required]
    firehoseOptions: The AWS Kinesis firehose options to pass direction to the firehose client, as documented by AWS. [required]


---------------------------------------------
Experiment: Redis Transport 
(core winston support for Redis transport)
---------------------------------------------

    Winston.add(winston.transports.Redis, options)
    This transport accepts the options accepted by the node-redis client:

    host: (Default localhost) Remote host of the Redis server
    port: (Default 6379) Port the Redis server is running on.
    auth: (Default None) Password set on the Redis server
    In addition to these, the Redis transport also accepts the following options.

    length: (Default 200) Number of log messages to store.
    container: (Default winston) Name of the Redis container you wish your logs to be in.
    channel: (Default None) Name of the Redis channel to stream logs from.
    Metadata: Logged as JSON literal in Redis


    ------------------------------------------