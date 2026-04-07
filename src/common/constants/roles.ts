// Список всех возможных ролей в системе
export const ROLES = {
    USER: "USER",
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const DEFAULT_ROLES: Role[] = [ROLES.USER];
