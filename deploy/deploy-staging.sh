touch deploy/.staging

DATE=$(date +%s)
FILE=nodejs-helpers-$DATE.tar.gz
S3_KEY="applications/staging/nodejs-helpers/deployments/$FILE"
EXCLUDE="./node_modules"
EXCLUDE2="*.tar.gz"
EXCLUDE3="./.git"
EXCLUDE4="./app_development.json"
EXCLUDE5="./test"
EXCLUDE6="./*.env"
if [ ! $(command -v tar) ]; then
  echo "Install tar to use this utility"
else
  tar zcvf $FILE --exclude=$EXCLUDE --exclude=$EXCLUDE2 --exclude=$EXCLUDE3 --exclude=$EXCLUDE4 --exclude=$EXCLUDE5 --exclude=$EXCLUDE6 ./
  echo "DEPLOYING $FILE"
  aws s3 cp $FILE s3://nodejs/$S3_KEY
  aws deploy create-deployment  --deployment-config-name CodeDeployDefault.OneAtATime --application-name email-helpers-staging --region=us-east-1 --deployment-group-name email-helpers-staging --s3-location bucket=nodejs,bundleType=tgz,key=$S3_KEY
  rm -rf $FILE
fi
