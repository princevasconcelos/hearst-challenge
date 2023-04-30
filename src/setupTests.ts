// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

process.env.REACT_APP_API_KEY = 'my_key';
process.env.REACT_APP_API_URL = 'https://api.thecatapi.com/v1';
process.env.REACT_APP_API_SUB_ID = 'test';
