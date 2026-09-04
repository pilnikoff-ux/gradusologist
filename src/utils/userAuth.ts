export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'guest';
  joinedAt: string;
}

const USER_STORAGE_KEY = 'gradusolog_user_profile';

export function getSavedUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const getCurrentUser = getSavedUserProfile;

export function saveUserProfile(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to save user profile:', err);
  }
}

export function logoutUser(): void {
  saveUserProfile(null);
}

// Generate an isolated storage key per user so multiple users on same device don't mix journals
export function getUserJournalKey(userId?: string): string {
  return userId ? `gradusolog_journal_${userId}` : 'gradusolog_journal';
}

export function getUserFavoritesKey(userId?: string): string {
  return userId ? `gradusolog_favs_${userId}` : 'gradusolog_favs';
}
