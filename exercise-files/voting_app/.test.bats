#!/usr/bin/env bats
DIR=$(dirname $BATS_TEST_FILENAME)

load "${BOOK_ROOT}/scripts/bats/fullstack.bats"
load "${BOOK_ROOT}/scripts/bats-support/load.bash"
load "${BOOK_ROOT}/scripts/bats-assert/load.bash"

@test "voting_app e2e passses" {
  cd $DIR
  run_npm_cmd test $TEST_TMP_DIR || :
  run cat ${TEST_TMP_DIR}/log.txt
  assert_output --partial 'OK.'
}

setup() {
  echo "travis_fold:start:bats_voting_app"
  cd $DIR
  TEST_TMP_DIR="$(mktemp -d -t fullstackXXX)"
  kill_by_grep "concurrently" || :
  kill_by_port 3000 || :
  # ng serve 3>- &
  true
}

teardown() {
  cd $DIR
  kill_by_grep "concurrently" || :
  # temp_del "$TEST_TMP_DIR"
  kill_by_port 3000 || :
  echo "travis_fold:end:bats_voting_app"
  true
}
