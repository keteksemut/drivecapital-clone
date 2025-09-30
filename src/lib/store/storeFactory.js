import { useDebugValue } from "react";
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/with-selector';

let r = (e) => {
    let t;
    let n = new Set(),
      r = (e, r) => {
        let i = "function" == typeof e ? e(t) : e;
        if (!Object.is(i, t)) {
          let e = t;
          (t = (null != r ? r : "object" != typeof i)
            ? i
            : Object.assign({}, t, i)),
            n.forEach((n) => n(t, e));
        }
      },
      i = () => t,
      s = {
        setState: r,
        getState: i,
        subscribe: (e) => (n.add(e), () => n.delete(e)),
        destroy: () => {
          console.warn(
            "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
          ),
            n.clear();
        },
      };
    return (t = e(r, i, s)), s;
  },
  i = (e) => (e ? r(e) : r);
let u = (e) => {
    "function" != typeof e &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
      );
    let t = "function" == typeof e ? i(e) : e,
      n = (e, n) =>
        (function (e, t = e.getState, n) {
          let r = useSyncExternalStoreWithSelector(
            e.subscribe,
            e.getState,
            e.getServerState || e.getState,
            t,
            n
          );
          return useDebugValue(r), r;
        })(t, e, n);
    return Object.assign(n, t), n;
  },
  l = (e) => (e ? u(e) : u);

export { l as storeFactory };
