export const ROLES = {
  Superadmin: "superadmin",
  Admin: "admin",
  User: "user",
} as const;

export const ROLE_LIST = Object.values(ROLES);

export const APP_CONFIG = {
  NAME: 'Project Name',
  PREFIX: 'project_name',
  STORAGE_URL: 'https://lernin.psycopoint.com', // eg.: https://media.yourdomain.com
}