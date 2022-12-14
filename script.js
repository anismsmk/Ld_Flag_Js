      function main()
    {
      // Set clientSideID to your LaunchDarkly client-side ID
      const clientSideID = '62e23f0835775a113ccccb8d';

      // Set flagKey to the feature flag key you want to evaluate
      const flagKey = 'JSClientflag';

      // Set up the user properties. This user should appear on your
      // LaunchDarkly users dashboard soon after you run the demo.

      const user = {
        'key': 'happy-user',
        'name': 'Morty'
      };

      var div = document.createElement('div');
      document.body.appendChild(div);
      div.appendChild(document.createTextNode('Initializing...'));

      if (clientSideID === '') {
        div.replaceChild(document.createTextNode('Please edit index.html to set clientSideID to your LaunchDarkly client-side ID first'), div.firstChild);
        return;
      }

      const ldclient = LDClient.initialize(clientSideID, user);

      function render() {
        const flagValue = ldclient.variation(flagKey, false);
        const label = 'Feature flag ' + flagKey + ' is ' + flagValue + ' for this user';
        div.replaceChild(document.createTextNode(label), div.firstChild);
      }

      ldclient.on('initialized', () => {
        div.appendChild(document.createTextNode('SDK successfully initialized!'), div.firstChild);
      });
      ldclient.on('failed', () => {
        div.appendChild(document.createTextNode('SDK failed to initialize'), div.firstChild);
      });
      ldclient.on('ready', render);
      ldclient.on('change', render);


      // Here we ensure that the SDK shuts down cleanly and has a chance
      // to deliver analytics envets to LaunchDarkly before the program
      // exits. If analytics events are not delivered, the user properties
      // and flag usage statistics will not appear on your dashboard.
      // In a normal long-running application, the SDK would continue
      // running and events would be delivered automatically in the background.
      ldclient.close();
    }
    main();