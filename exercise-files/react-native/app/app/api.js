import { AsyncStorage } from 'react-native'
import dummyData from './DUMMY-DATA'

export function createFakeRandomishNumber () {
  return new Date().valueOf()
}

export function login (username) {
  return AsyncStorage.setItem('username', username)
}

export function getUsername () {
  return AsyncStorage.getItem('username')
    .then((username) => username || '')
}

export function getQuestions () {
  return AsyncStorage.getItem('questions')
    .then((questions) => questions
      ? JSON.parse(questions)
      : setDummyQuestions().then((questions) => questions)
    )
}

function setDummyQuestions () {
  return saveQuestions(dummyData)
    .then(() => dummyData)
}

export function saveQuestions (questions) {
  return AsyncStorage.setItem('questions', JSON.stringify(questions))
}

export function getUsersVotes (username) {
  return AsyncStorage.getItem(`${username}-votes`)
    .then((votes) => JSON.parse(votes) || {})
}

export function setUsersVotes (username, votes) {
  return AsyncStorage.setItem(`${username}-votes`, JSON.stringify(votes))
}
