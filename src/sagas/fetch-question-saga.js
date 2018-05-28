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
    // To call an external site e.g. http://acme.com/api/questions/1234, CORS should be handled.
    let i = 0;
    console.log(++i, "yield call()");
    const raw = yield call (fetch, `/api/questions/${question_id}`);
    console.log(i,"After call()");
    
    console.log(++i,"yield raw.json()");
    const json = yield raw.json();
    console.log(i,"After raw.json()");
    
    console.log(++i,"yield json.items")
    const question = json.items[0];
    console.log(i,"After json.items");
    /**
     * Notify application that question has been fetched
     */
    console.log(++i,"yield put()");
    yield put({type:`FETCHED_QUESTION`,question});
    console.log(++i,"After put()");
    
    console.log(++i,"At end");
}
