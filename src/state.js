import createState from 'react-copy-write';

const {
  Provider,
  Consumer,
  createSelector,
  mutate,
} = createState({
  phoneNumber: '3173400957',
  view: 'login' // login | verify
});

export {
  Provider,
  Consumer,
  createSelector,
  mutate,
};