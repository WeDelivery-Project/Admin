const admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;

const account = {
  displayName: admin ? `${admin.firstname} ${admin.lastname}` : '',
  email: admin ? admin.email : '',
  photoURL: '/assets/images/avatars/avatar_18.jpg',
};

export default account;
