import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false sul server e durante l'idratazione, true subito dopo nel browser.
export default function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
