import { useState } from 'react';
import qs from 'query-string'; // For URL params
import jsonp from 'jsonp'; // For JSONP requests

const initialState = () => ({
  loading: false,
  error: null,
  data: null
});

export const useJsonp = ({ url }) => {
  const [state, setState] = useState(initialState);

  const makeRequest = (params) => {
    const queryString = qs.stringify(params);
    const fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;

    setState({ loading: true, error: null, data: null });

    jsonp(fullUrl, {
      param: 'callback',
      timeout: 4000
    }, (error, response) => {
      if (error) {
        setState({
          loading: false,
          error,
          data: null
        });
        return;
      }

      // Check for API error response
      if (response && response.error) {
        setState({
          loading: false,
          error: new Error(response.error),
          data: response
        });
        return;
      }

      setState({
        loading: false,
        error: null,
        data: response
      });
    });
  };

  const reset = () => {
    setState(initialState());
  };

  return [state, makeRequest, reset];
};