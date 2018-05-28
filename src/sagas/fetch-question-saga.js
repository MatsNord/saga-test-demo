import { call, takeEvery, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

export default function * () {
    /**
     * Every time REQUEST_FETCH_QUESTION, fork a handleFetchQuestion process for it
     */
    yield takeEvery(`REQUEST_FETCH_QUESTION`,handleFetchQuestion);
}

/**
 * Fetch question details from the local proxy API
 */
export function * handleFetchQuestion ({question_id}) {
    // The fetch calls a local proxy server that calls the external site.
    // It also could be real call like http://acme.com/api/questions/1234
    const raw = yield fetch(`/api/questions/${question_id}`);
    const json = yield raw.json();
    const question = json.items[0];
    /**
     * Notify application that question has been fetched
     */
    yield put({type:`FETCHED_QUESTION`,question});
}
