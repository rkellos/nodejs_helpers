#!/bin/bash
ENV_FILE='/srv/app.env'
getEnvironmentValue(){
  echo -e `grep "^$1=" $ENV_FILE | awk -F = '{ print $2 }'`
}
