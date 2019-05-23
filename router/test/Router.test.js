import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import Router from '../Router';
import Delayed from '../transitions/Delayed';

// Use fake timers is needed for certain animations
// Use jest.runAllTimers(); inside a test case to advance the animation state
jest.useFakeTimers();

const defaultRoutes = {
    '/': () => <View testID="home" />,
    '/test': () => <View testID="test" />,
};

const defaultStack = [
    '/'
];

const mountRouter = (routes, stack) => {
    return renderer.create(
        <Router
            routes={routes || defaultRoutes}
            routeStack={stack || defaultStack}
        />
    );
}

describe('<Router />', () => {
  it('renders without crashing', () => {
    mountRouter();
  });

  describe('.push',  () => {
    it('adds to route stack', () => {
        const router = mountRouter().getInstance();
        router.push('/test');
        expect(router.state.routeStack.length).toBe(2);
        expect(router.state.routeStack[0]).toBe('/test');
    });

    describe('when Delayed animation is used', () => {
        it('renders appropriate component', () => {
            const router = mountRouter();
            const instance = router.getInstance();
            const root = router.root;
            
            // Finds initial instance
            root.findByProps({testID: 'home'});
            expect(root.findAllByProps({testID: 'test'}).length).toBe(0);

            // Pushes and renders both briefly
            instance.push('/test', { animation: new Delayed() });
            root.findByProps({testID: 'home'});
            root.findByProps({testID: 'test'});

            // Runs any animation timers
            jest.runAllTimers();

            // home id disappears and test remains
            root.findByProps({testID: 'test'});
            expect(root.findAllByProps({testID: 'home'}).length).toBe(0);
        });
    });
  });

  describe('.back',  () => {
    it('removes from route stack', () => {
        const router = mountRouter(defaultRoutes, ['/test', '/']).getInstance();
        router.back();
        expect(router.state.routeStack.length).toBe(1);
        expect(router.state.routeStack[0]).toBe('/');
    });

    describe('when Delayed animation is used', () => {
        it('renders appropriate component', () => {
            const router = mountRouter(defaultRoutes, ['/test', '/']);
            const instance = router.getInstance();
            const root = router.root;
            
            // Finds initial instance
            root.findByProps({testID: 'test'});
            expect(root.findAllByProps({testID: 'home'}).length).toBe(0);

            // Pushes and renders both briefly
            instance.back({ animation: new Delayed() });
            root.findByProps({testID: 'home'});
            root.findByProps({testID: 'test'});

            // Runs any animation timers
            jest.runAllTimers();

            // home id disappears and test remains
            root.findByProps({testID: 'home'});
            expect(root.findAllByProps({testID: 'test'}).length).toBe(0);
        });
    });
  });
});