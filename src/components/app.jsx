import React, { useEffect, useState } from 'react';
import { getDevice } from 'framework7/lite-bundle';
import {
  f7ready,
  App,
  Panel,
  Views,
  View,
  Navbar,
  Page,
  Block,
  List,
  ListItem,
  Link,
  Toolbar,
  ToolbarPane,
  Preloader
} from 'framework7-react';

import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  const device = getDevice();
  const [devocionales, setDevocionales] = useState([]);
  const [loading, setLoading] = useState(true);

  const f7params = {
    name: 'Devocional Cristiano',
    theme: 'auto',
    darkMode: true,
    store: store,
    routes: routes,
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  useEffect(() => {
    store.dispatch('fetchDevocionales');
    
    const loadData = () => {
      const state = store.state;
      if (state.devocionales) {
        setDevocionales(state.devocionales);
        setLoading(false);
      } else {
        setTimeout(loadData, 500);
      }
    };
    loadData();
  }, []);

  f7ready((f7) => {
    if (device.capacitor) {
      capacitorApp.init(f7);
    }
  });

  return (
    <App { ...f7params }>
      <Panel left cover dark>
        <View id="panel-left">
          <Page>
            <Navbar title="Devocionales" />
            <Block>
              <p style={{ fontSize: '13px', color: '#8e8e93' }}>Selecciona un devocional:</p>
            </Block>
            {loading ? (
              <Block className="text-align-center">
                <Preloader />
              </Block>
            ) : (
              <List>
                {devocionales.map((dev) => (
                  <ListItem key={dev.id} link={`/devocional/${dev.id}/`} title={dev.titulo} subtitle={dev.fecha} panelClose />
                ))}
              </List>
            )}
          </Page>
        </View>
      </Panel>

      <Views tabs className="safe-areas">
        <Toolbar tabbar icons bottom>
          <ToolbarPane>
            <Link tabLink="#view-home" tabLinkActive iconIos="f7:book_fill" iconMd="material:menu_book" text="Devocional" />
            <Link tabLink="#view-studies" iconIos="f7:search_circle_fill" iconMd="material:school" text="Estudios" />
            <Link tabLink="#view-tools" iconIos="f7:wrench_fill" iconMd="material:build" text="Herramientas" />
          </ToolbarPane>
        </Toolbar>

        <View id="view-home" main tab tabActive url="/" />
        <View id="view-studies" name="studies" tab url="/studies/" />
        <View id="view-tools" name="tools" tab url="/tools/" />
      </Views>
    </App>
  );
}
export default MyApp;