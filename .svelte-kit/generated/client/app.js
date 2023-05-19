export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [3];

export const dictionary = {
		"/": [~4],
		"/admin": [~5,[2]],
		"/admin/pedidos": [~6,[2]],
		"/admin/ventas": [7,[2]],
		"/user": [~8,[3]],
		"/user/cart": [~9,[3]],
		"/user/info": [~10,[3]],
		"/user/login": [~11,[3]],
		"/user/orders": [~12,[3]],
		"/user/signin": [~13,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';