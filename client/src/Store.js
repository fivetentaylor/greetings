import { store } from 'react-easy-state';

let stateStore = store({
  members: [],
  meetups: [],
  assignments: [],
  page: 'members',
  get: (resource) => {
    fetch(`/${resource}`)
		  .then( result => result.json() )
		  .then( obj => stateStore[resource] = obj );
  },
  create: (
    resource,
    obj,
  ) => {
    fetch(`/${resource}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then( () => stateStore.get(resource) );
  },
  delete: ( resource, obj ) => {
    fetch(`/${resource}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).then( () => stateStore.get(resource) );
  },
});

export default stateStore;
