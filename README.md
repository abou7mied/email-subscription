# Email Subscription
[![Build Status](https://travis-ci.org/abou7mied/email-subscription.svg?branch=master)](https://travis-ci.org/abou7mied/email-subscription)
[![codecov.io](https://codecov.io/github/abou7mied/email-subscription/coverage.svg?branch=master)](https://codecov.io/github/abou7mied/email-subscription?branch=master)

Backend for a sample email subscription project. 

## How to run
First install the dependencies
```
npm install
```

Then create .env file using the following template
```dotenv
HTTP_PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/subscribers
EMAIL_TRANSPORT_HOST=
EMAIL_TRANSPORT_PORT=
EMAIL_TRANSPORT_SECURE=
EMAIL_TRANSPORT_USER=
EMAIL_TRANSPORT_PASSWORD=
EMAIL_FROM=no-reply@example.com
```

Start the server
```
npm start
```
Testing
```
npm test
```

## Built using
- koa (HTTP framework)
- Mongoose (ORM)
- inversify (dependency injection)
- ajv (data validation)
- swagger (API documentation)
- jest (Testing Framework)

## API
Check swagger documentation http://localhost:3000/swagger

