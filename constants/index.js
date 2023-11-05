export const sidebarLinks = [
  {
    imgURL: '/assets/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/create.svg',
    route: '/dashboard',
    label: 'Dashboard',
  },
  {
    imgURL: '/assets/edit.svg',
    route: '/activity',
    label: 'Activity',
  },
  {
    imgURL: '/assets/community.svg',
    route: '/users',
    label: 'Users',
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
