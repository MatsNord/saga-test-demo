import { call, put } from 'redux-saga/effects';
import { handleFetchQuestion } from './fetch-question-saga';
import fetch from 'isomorphic-fetch';

describe("Fetch Question Saga", () => {

    it("should fetch the question", async () =>{
        // Pass in the parameters to the generator function, the saga
        const gen = handleFetchQuestion({question_id: 42});
        // The generator is waiting in the beginning of the function *
        
        // Advance the generator to yield call();
        // As the call effect is used in the saga, we will check the specification of the call
        expect(gen.next().value).toEqual(call (fetch, `/api/questions/42`));
        // The value was yielded from the generator, and then it stopped
        
        // Prepare the next value for the genrator
        const mockFn = jest.fn( () => { return {items:[{question_id: 42}]}});
        const raw = { json: mockFn };

        // Advance the generator to yield raw.json(), and put the value you want it to yield
        // 
        expect(gen.next(raw).value).toEqual({items:[{question_id: 42}]});
        // Test that the call raw.json() was done
        expect(mockFn.mock.calls.length).toBe(1);

        // Advance the generator yield put()
        expect(gen.next({items:[{question_id: 42}]}).value).toEqual(put({type:`FETCHED_QUESTION`, question: {question_id: 42}}));
        
        // Let the generator end and check that is was the previous yield was the last to be done.
        expect(gen.next().done).toBe(true);
    });
});
