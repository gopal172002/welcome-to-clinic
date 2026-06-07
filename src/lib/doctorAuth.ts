const DOCTOR_SESSION_KEY = "manonirmaan-doctor-session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

type DoctorSession = {
  authenticated: true;
  expiresAt: number;
};

function getStorage() {
  return typeof window === "undefined" ? null : window.sessionStorage;
}

export function startDoctorSession() {
  const storage = getStorage();
  if (!storage) return;

  const session: DoctorSession = {
    authenticated: true,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  storage.setItem(DOCTOR_SESSION_KEY, JSON.stringify(session));
}

export function clearDoctorSession() {
  getStorage()?.removeItem(DOCTOR_SESSION_KEY);
}

export function isDoctorAuthenticated() {
  const storage = getStorage();
  const rawSession = storage?.getItem(DOCTOR_SESSION_KEY);
  if (!rawSession) return false;

  try {
    const session = JSON.parse(rawSession) as Partial<DoctorSession>;
    if (session.authenticated !== true || typeof session.expiresAt !== "number") {
      clearDoctorSession();
      return false;
    }
    if (Date.now() > session.expiresAt) {
      clearDoctorSession();
      return false;
    }
    return true;
  } catch {
    clearDoctorSession();
    return false;
  }
}
