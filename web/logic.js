/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// set this to your deployed endpoint
const endpoint = 'FIXME'

/**
 * @return the input dom
 *
 */
const input = () => document.querySelector('input')

/**
 * @return the response dom container
 *
 */
const container = () => document.querySelector('#response')

/**
 * Install a spinner
 *
 */
const spin = () => {
    container().classList.add('spin')
    return Promise.resolve()
}

/**
 * Uninstall a spinner
 *
 */
const unspin = () => {
    container().classList.remove('spin')
    return Promise.resolve()
}

/**
 * Render the response in the UI
 *
 */
const render = response => {
    container().innerText = response
    input().value = ''
}

/**
 * Utter the current input value, and update the UI with the response
 *
 */
const speak = () => {
    spin()
        .then(() => send(input().value))
        .then(render, render)
        .then(unspin, unspin)

    // ensure that the form submit does not reload the page
    return false
}

/**
 * Send an utterance to the endpoint
 *
 */
const send = utterance => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = arg => {
        const response = JSON.parse(xhr.responseText)
        if (response.error) {
            reject(response.error)
        } else {
            resolve(response.utterance)
        }
    }
    xhr.onerror = evt => {
        reject('Internal Error')
    }

    xhr.open('POST', endpoint)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ utterance }))
})
