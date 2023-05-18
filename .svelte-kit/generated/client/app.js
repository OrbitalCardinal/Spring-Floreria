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
	() => import('./nodes/9')
];

export const server_loads = [3];

export const dictionary = {
		"/admin": [~4,[2]],
		"/admin/pedidos": [5,[2]],
		"/admin/ventas": [6,[2]],
		"/user": [7,[3]],
		"/user/login": [~8,[3]],
		"/user/signin": [~9,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';