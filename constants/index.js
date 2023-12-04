export const sidebarLinks = [
  {
    imgURL: '/home.svg',
    route: '/',
    label: 'Dashboard',
  },
  {
    imgURL: '/edit.svg',
    route: '/activity',
    label: 'Activity',
  },
  {
    imgURL: '/community.svg',
    route: '/users',
    label: 'Users',
  },
  {
    imgURL: '/person-plus-fill.svg',
    route: '/add-user',
    label: 'Add User',
  },
];

export const profileTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' },
];

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Members', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
];
