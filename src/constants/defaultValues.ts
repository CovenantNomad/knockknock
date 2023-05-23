export const WEEKDAYS = [
  {
    id: 0,
    title: '일',
    selected: false,
  },
  {
    id: 1,
    title: '월',
    selected: true,
  },
  {
    id: 2,
    title: '화',
    selected: true,
  },
  {
    id: 3,
    title: '수',
    selected: true,
  },
  {
    id: 4,
    title: '목',
    selected: true,
  },
  {
    id: 5,
    title: '금',
    selected: true,
  },
  {
    id: 6,
    title: '토',
    selected: false,
  },
];

export const DEFAULTROUTINE = {
  name: '',
  icon: '',
  color: '',
  weekday: WEEKDAYS,
  hour: '',
  minute: '',
  hasNotification: false,
  notificationIds: [],
  userId: '',
  isActive: true,
  isPeriodRoutine: false,
};
