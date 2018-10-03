import { Meteor } from 'meteor/meteor';

// Source: https://youtu.be/j-WcyAjVceM
async function renderAsync() {
  const [
    React,
    { render },
    { default: App },
    { default: BurgerBtnController },
    { default: HeaderTitle },
    { default: Routes },
    { default: Menu },
  ] = await Promise.all([
    import('react'),
    import('react-dom'),
    import('/app/ui/app'),
    import('/app/ui/components/smart/header/burger-btn-controller'),
    import('/app/ui/components/smart/header/header-title'),
    import('/app/ui/routes'),
    import('/app/ui/components/smart/menu'),
  ]);

  // Inject react app components into App's Shell
  render(<App component={BurgerBtnController} />, document.getElementById('burger-btn-controller'));
  render(<App component={HeaderTitle} />, document.getElementById('header-title'));
  render(<App component={Menu} />, document.getElementById('menu'));
  render(<App component={Routes} />, document.getElementById('main'));
}

Meteor.startup(() => {
  const renderStart = Date.now();
  const startupTime = renderStart - window.performance.timing.responseStart;
  console.log(`Meteor.startup took: ${startupTime}ms`);

  // Register service worker
  import('/app/ui/register-sw').then(() => {});

  renderAsync().then(() => {
    const renderTime = Date.now() - renderStart;
    console.log(`renderAsync took: ${renderTime}ms`);
    console.log(`Total time: ${startupTime + renderTime}ms`);
  });
});
