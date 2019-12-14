#!/usr/bin/env bats
DIR=$(dirname $BATS_TEST_FILENAME)
TEST_NAME=$(basename $DIR)
PORT=3000

load "${BOOK_ROOT}/scripts/bats/fullstack.bats"
load "${BOOK_ROOT}/scripts/bats-support/load.bash"
load "${BOOK_ROOT}/scripts/bats-assert/load.bash"

@test "${TEST_NAME} e2e passses" {
  cd $DIR
  run_npm_cmd run-e2e $TEST_TMP_DIR
  run cat ${TEST_TMP_DIR}/log.txt
  assert_output --partial 'OK.'
}

setup() {
  echo "travis_fold:start:bats_${TEST_NAME}"
  cd $DIR
  TEST_TMP_DIR="$(mktemp -d -t fullstackXXX)"
  kill_react_scripts || :
  kill_by_port $PORT
  true
}

teardown() {
  cd $DIR
  kill_react_scripts || :
  kill_by_port $PORT
  echo "travis_fold:end:bats_${TEST_NAME}"
  true
}