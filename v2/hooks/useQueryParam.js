// https://brettfisher.dev/easiest-way-to-use-query-param/

import { useState } from 'react';
import { inBrowser } from '../lib/where';

const getQuery = () => {
  if (inBrowser) {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key) => {
  return getQuery().get(key);
};

const useQueryParam = (key, defaultVal) => {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

  const updateUrl = (newVal) => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (inBrowser) {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  return [query, updateUrl];
};

export default useQueryParam;
