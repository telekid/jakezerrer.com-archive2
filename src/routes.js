import UIRouterReact from 'ui-router-react';
import Home from './components/Home';

const router = new UIRouterReact();

// Register state
router.stateRegistry.register({
  name: 'home',
  url: '/',
  component: Home,
});

router.html5Mode(true);

router.start();
