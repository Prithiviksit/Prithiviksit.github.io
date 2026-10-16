// Platform features live here; the quiz engine and progress store have no PWA dependency.
export const webRuntime =
  document.querySelector('meta[name="finpath-runtime"]')?.content !== "native";
const listeners = new Set();
let registration, installPrompt;
const state = {
  platform:
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
      ? "ios"
      : /Android/.test(navigator.userAgent)
        ? "android"
        : "desktop",
  installed:
    matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true,
  canInstall: false,
  downloading: false,
  offline: null,
  update: false,
  message: "",
};
const emit = () => listeners.forEach((listener) => listener({ ...state }));

function watch(worker) {
  worker?.addEventListener("statechange", () => {
    if (worker.state === "installed" && navigator.serviceWorker.controller) {
      state.update = true;
      emit();
    }
  });
}

async function register() {
  if (!webRuntime || !("serviceWorker" in navigator))
    throw new Error(
      "Offline saving is unavailable in this browser. You can still practice online.",
    );
  if (!registration) {
    registration = navigator.serviceWorker
      .register(new URL("../sw.js", import.meta.url), {
        updateViaCache: "none",
      })
      .then((reg) => {
        state.update = !!reg.waiting;
        watch(reg.installing);
        reg.addEventListener("updatefound", () => watch(reg.installing));
        emit();
        return reg;
      })
      .catch((error) => {
        registration = null;
        throw error;
      });
  }
  return registration;
}

async function request(type) {
  await register();
  return new Promise((resolve, reject) => {
    let timer;
    const channel = new MessageChannel();
    const stop = () => {
      clearTimeout(timer);
      channel.port1.close();
    };
    const timeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        stop();
        reject(
          new Error(
            "Offline saving could not finish. Reconnect and try again.",
          ),
        );
      }, 45000);
    };
    timeout();
    channel.port1.onmessage = ({ data }) => {
      if (data.progress) {
        state.message = `Saving for offline practice… ${Math.round((100 * data.done) / data.total)}%`;
        emit();
        timeout();
        return;
      }
      stop();
      if (data.error) reject(new Error(data.error));
      else resolve(data.result);
    };
    navigator.serviceWorker.ready
      .then((reg) => {
        if (!reg.active)
          throw new Error("The app is still getting ready. Please try again.");
        reg.active.postMessage({ type }, [channel.port2]);
      })
      .catch((error) => {
        stop();
        reject(error);
      });
  });
}

export const pwa = {
  getState: () => ({ ...state }),
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  async refresh() {
    try {
      state.offline = await request("OFFLINE_STATUS");
      state.message = "";
    } catch (error) {
      state.message = error.message;
    }
    emit();
  },
  async install() {
    if (!installPrompt) return;
    const prompt = installPrompt;
    installPrompt = null;
    state.canInstall = false;
    emit();
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch {
      state.message =
        "Use your browser’s menu to add Finpath to your home screen.";
      emit();
    }
  },
  async download() {
    if (state.downloading) return;
    state.downloading = true;
    state.message = "Saving lessons for offline practice…";
    emit();
    try {
      state.offline = await request("SAVE_OFFLINE");
      // This is only a request to reduce eviction risk; browser permission is optional.
      navigator.storage?.persist?.().catch(() => {});
      state.message = "All lessons are ready offline on this device.";
    } catch (error) {
      state.message = `${error.message} Your saved progress is unchanged.`;
    } finally {
      state.downloading = false;
      emit();
    }
  },
};

if (webRuntime) {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    state.canInstall = true;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    state.installed = true;
    state.canInstall = false;
    emit();
  });
  register().catch((error) => {
    state.message = error.message;
    emit();
  });
}
