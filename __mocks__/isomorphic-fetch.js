let __value = 49;
const isomorphicFetch = jest.fn(() => __value);
isomorphicFetch.__setValue = v => __value = v;
export default isomorphicFetch;