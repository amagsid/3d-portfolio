let ready = false;
const listeners = new Set();

export const subscribeHeroMeshReady = (listener) => {
    listener(ready);
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const notifyHeroMeshReady = () => {
    if (ready) return;
    ready = true;
    listeners.forEach((listener) => listener(true));
};

export const resetHeroMeshReady = () => {
    if (!ready) return;
    ready = false;
    listeners.forEach((listener) => listener(false));
};
