import { useCallback, useState } from 'react';

export default function useSetState(initial = {}) {
    const [state, saveState] = useState(initial);
    const setState = useCallback((newState) => {
        saveState(pre => ({ ...pre, ...newState }))
    }, []);
    const initState = useCallback((newState = {}) => {
        saveState(pre => ({ ...initial, ...newState }));
    }, []);
    return [state, setState, initState];
};
