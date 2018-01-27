const HelloWorld = resolve => require(['@/pages/HelloWorld'], resolve);
const Test = resolve => require(['@/testPages/Test'], resolve);

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
];
export default routes;
