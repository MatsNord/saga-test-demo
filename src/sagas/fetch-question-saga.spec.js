import { handleFetchQuestion } from './fetch-question-saga';
// The mock is automatically picked up fron __mocks__
import fetch from 'isomorphic-fetch';

describe("Fetch Question Saga", () => {
    beforeAll(()=>{
        fetch.__setValue([{question_id: 42}]);
    });
    it("should fetch the question", async () =>{
        // Call the saga generator function
        const gen = handleFetchQuestion({question_id: 42});
        // Advance the the generator to make the ajax call
        const { value } = gen.next();
        // the raw result should now contain an array of one item..
        expect(value).toEqual([{question_id: 42}]);
        // Check that the mocked fetch was called with the correct url
        expect(fetch).toHaveBeenCalledWith('/api/questions/42');
        // This test ends here, as it focus on demonstring the mock usage
        // We are not using the call() effect, so we have to mock fetch
    });
});