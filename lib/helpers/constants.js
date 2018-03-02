"use strict";
const Constant = {
  APP: {
    group: "nodejs",
    name: "nodejs-helpers"
  },
  ENV: {
    AUTH: process.env.AUTH,
    AUTH_HEADER_KEY: process.env.AUTH_HEADER_KEY,
    AUTH_HEADER_VALUE: process.env.AUTH_HEADER_VALUE,

    PORT: process.env.PORT || 3000,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,

    STACK_NAME: process.env.STACK_NAME,
    NEW_RELIC_KEY: process.env.NEW_RELIC_KEY,

    RDS_HOST: process.env.RDS_HOST || "localhost",
    RDS_USER: process.env.RDS_USER,
    RDS_PASSWORD: process.env.RDS_PASSWORD,
    RDS_DATABASE: process.env.RDS_DATABASE,
    RDS_TABLE: process.env.RDS_TABLE,

    NODE_ENV: process.env.NODE_ENV,
    DEBUG: process.env.DEBUG,

    MATRIX_SUB_URL: process.env.MATRIX_SUB_URL,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_ENDPOINT: process.env.REDIS_ENDPOINT || "localhost",
    REDIS_EXPIRATION: process.env.REDIS_EXPIRATION || 345600,
    REDIS_SET_EXPIRATION: process.env.REDIS_SET_EXPIRATION || 345600,
    REDIS_TIMEOUT: process.env.REDIS_TIMEOUT,
    RETRY_TIMEOUT: process.env.RETRY_TIMEOUT,
    REDIS_RECS_HOST: process.env.REDIS_RECS_HOST,
    REDIS_USER_HOST: process.env.REDIS_USER_HOST,

    LOG_LEVEL: process.env.LOG_LEVEL || "debug",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PEM_FILE: "",
    ARCHIVE_FIREHOSE_STREAM: process.env.ARCHIVE_FIREHOSE_STREAM,

    ITERABLE_URL: process.env.ITERABLE_URL,
    ITERABLE_KEY: process.env.ITERABLE_KEY,
    ITERABLE_KEY_US: process.env.ITERABLE_KEY_US,
    ITERABLE_KEY_APAC: process.env.ITERABLE_KEY_APAC,
    ITERABLE_KEY_EMEA: process.env.ITERABLE_KEY_EMEA,

    EMAIL_ENRICHMENT_PROD_SUBSCRIBER: process.env.EMAIL_ENRICHMENT_PROD_SUBSCRIBER,
    EMAIL_ENRICHMENT_STAGING_SUBSCRIBER: process.env.EMAIL_ENRICHMENT_STAGING_SUBSCRIBER,
    EMAIL_ENRICHMENT_SUBSCRIBER: process.env.EMAIL_ENRICHMENT_SUBSCRIBER,
    EMAIL_SUBSCRIPTIONS_URL: process.env.EMAIL_SUBSCRIPTIONS_URL,
    TOPIC_ARN: process.env.TOPIC_ARN,

    KINESIS_EMAIL_EVENT_ARN: process.env.KINESIS_EMAIL_EVENT_ARN,

    LAST_ACTIVITY_URL: process.env.LAST_ACTIVITY_URL,
    LIKELIHOOD_TO_RESPOND_URL: process.env.LIKELIHOOD_TO_RESPOND_URL,

    VISITOR_URL: process.env.VISITOR_URL,
    VISITOR_STATE_URL: process.env.VISITOR_STATE_URL,
    VISITOR_INTERNAL_AUTH_KEY: process.env.VISITOR_INTERNAL_AUTH_KEY,
    VISITOR_INTERNAL_AUTH_VALUE: process.env.VISITOR_INTERNAL_AUTH_VALUE
  },
  JWT: {
    ExpiresIn: "7 days"
  },
  STATUS: {
    success: "success",
    fail: "fail"
  },
  PKEY: {
    path: "/srv/",
    filename: "email-token-key.pem",
    filepath: "/srv/email-token-key.pem"
  },
  ERROR_TYPE: {
    Error400: "BadRequest",
    Error401: "NotAuthorized",
    Error403: "Forbidden",
    Error404: "NotFound",
    ErrorArgNull: "Argument missing or null",
    Error500: "InternalServerError",
    Error: "Application error"
  }
};

module.exports = Constant;
