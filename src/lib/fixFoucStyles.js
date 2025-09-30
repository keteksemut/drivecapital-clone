import { useEffect } from 'react';

const FixFoucStyles = () => {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"][data-n-p]')).map(link => ({
      element: link,
      href: link.getAttribute('href'),
    }));

    // Remove the `data-n-p` attribute
    links.forEach(({ element }) => element.removeAttribute('data-n-p'));

    const hrefs = [];
    const mutationObserver = new MutationObserver(mutations => {
      const newStyles = mutations
        .filter(({ target }) => target.nodeName === 'STYLE' && target.hasAttribute('data-n-href'))
        .map(({ target }) => ({
          element: target,
          href: target.getAttribute('data-n-href'),
        }));

      // Process newly observed styles
      newStyles.forEach(({ element, href }) => {
        if (hrefs.includes(href)) {
          element.remove();
        } else {
          element.setAttribute('data-fouc-fix-n-href', href);
          element.removeAttribute('data-n-href');
          hrefs.push(href);
        }
      });

      // Clean up previous styles
      links.reduce((acc, { element, href }) => {
        if (hrefs.includes(href)) {
          element.remove();
        } else {
          acc.push({ element, href });
        }
        return acc;
      }, []);
    });

    mutationObserver.observe(document.head, {
      subtree: true,
      attributeFilter: ['media'],
    });

    // Cleanup observer on component unmount
    return () => mutationObserver.disconnect();
  }, []);

  return null;
};

export default FixFoucStyles;