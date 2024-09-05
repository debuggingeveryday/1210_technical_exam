export const TODO = 'todo';
export const IN_PROGRESS = 'in_progress';
export const DONE = 'done';

export const ALL_STATUSES = [TODO, IN_PROGRESS, DONE];

export const DRAFT = 'draft';
export const PUBLISHED = 'published';

export const ADMINISTRATOR = 'administrator';
export const MANAGER = 'manager';
export const ASSIGNEE = 'assignee';

export const ALL_ROLES = [ADMINISTRATOR, MANAGER, ASSIGNEE];

export const CAN_ACCESS_TASK = 'can_access_task';
export const CAN_CREATE_TASK = 'can_create_task';
export const CAN_VIEW_ALL_TASK = 'can_view_all_task';
export const CAN_VIEW_TASK = 'can_view_task';
export const CAN_UPDATE_TASK = 'can_update_task';
export const CAN_DELETE_TASK = 'can_delete_task';
export const CAN_CHANGE_STATUS_TASK = 'can_change_status_task';
export const CAN_ACCESS_CREATE_TASK = 'can_access_create_task';
export const CAN_ACCESS_SHOW_TASK = 'can_access_show_task';
export const CAN_ACCESS_EDIT_TASK = 'can_access_edit_task';

export const ALL_PERMISSIONS = [
  CAN_ACCESS_TASK,
  CAN_CREATE_TASK,
  CAN_VIEW_TASK,
  CAN_VIEW_ALL_TASK,
  CAN_UPDATE_TASK,
  CAN_DELETE_TASK,
  CAN_CHANGE_STATUS_TASK,
  CAN_ACCESS_CREATE_TASK,
  CAN_ACCESS_SHOW_TASK,
  CAN_ACCESS_EDIT_TASK,
];

export const ASSIGNEE_PERMISSIONS = [
  CAN_ACCESS_TASK,
  CAN_VIEW_TASK,
  CAN_CHANGE_STATUS_TASK,
  CAN_ACCESS_SHOW_TASK,
  CAN_ACCESS_EDIT_TASK,
];
