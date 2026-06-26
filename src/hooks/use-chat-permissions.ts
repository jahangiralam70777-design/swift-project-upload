// Thin adapter over the unified RBAC resolver (useMyAccess). Kept for
// backward compatibility with chat/broadcast managers — DO NOT add new
// role logic here. New gates should call useCan()/useCanPage() directly.
import { useMyAccess } from "@/hooks/use-my-access";
import { useAppStore } from "@/stores/app-store";

export type ChatPermissions = {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isStaff: boolean;
  canReply: boolean;
  canAssign: boolean;
  canDelete: boolean;
  canManageSettings: boolean;
  userId: string | null;
  loading: boolean;
  failed: boolean;
  error: string | null;
};

const EMPTY: ChatPermissions = {
  isAuthenticated: false,
  isSuperAdmin: false,
  isAdmin: false,
  isModerator: false,
  isStaff: false,
  canReply: false,
  canAssign: false,
  canDelete: false,
  canManageSettings: false,
  userId: null,
  loading: false,
  failed: false,
  error: null,
};

export function useChatPermissions(): ChatPermissions {
  const a = useMyAccess();
  const storeUser = useAppStore((s) => s.user);
  const userId = a.userId || storeUser?.id || null;
  if (a.loading) {
    return { ...EMPTY, isAuthenticated: !!userId, userId, loading: true };
  }
  if (a.failed) {
    return {
      ...EMPTY,
      isAuthenticated: !!userId,
      userId,
      failed: true,
      error: "RBAC access lookup failed or timed out",
    };
  }
  if (!a.userId) return { ...EMPTY, loading: false };
  const isModerator = a.roles.includes("moderator");
  const isStaff = a.isAdmin || a.isSuperAdmin || isModerator;
  // Capability mapping driven by the backend permission set so super_admin
  // can grant chat capabilities to any role via the matrix.
  const can = (p: string) =>
    a.isSuperAdmin || a.isAdmin || a.permissions.has(p);
  return {
    isAuthenticated: true,
    isSuperAdmin: a.isSuperAdmin,
    isAdmin: a.isAdmin,
    isModerator,
    isStaff,
    canReply: isStaff || can("moderate_content"),
    canAssign: a.isSuperAdmin || can("manage_users"),
    canDelete: a.isSuperAdmin || can("manage_system"),
    canManageSettings: a.isAdmin || can("manage_system"),
    userId: a.userId,
    loading: false,
    failed: false,
    error: null,
  };
}
