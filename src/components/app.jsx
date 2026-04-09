import React, { useEffect, useState, useRef } from 'react';
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
import HomePage from '../pages/home.jsx';
import StudiesPage from '../pages/studies.jsx';
import ToolsPage from '../pages/tools.jsx';
import AdminPage from '../pages/admin.jsx';

const MyApp = () => {
  const device = getDevice();
  const [devocionales, setDevocionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const f7Ref = useRef(null);

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
    const initialState = store.state.devocionales;
    if (initialState && initialState.length > 0) {
      setDevocionales(initialState);
      setLoading(false);
    }
    
    store.dispatch('fetchDevocionales').then(() => {
      const updatedState = store.state.devocionales;
      if (updatedState && updatedState.length > 0) {
        setDevocionales(updatedState);
        setLoading(false);
      }
    }).catch(() => {
      if (store.state.devocionales.length > 0) {
        setDevocionales(store.state.devocionales);
        setLoading(false);
      }
    });
  }, []);

  const seleccionarDevocional = (dev) => {
    console.log('MyApp - Seleccionando devocional:', dev.titulo);
    store.dispatch('seleccionarDevocional', dev);
    if (f7Ref.current) {
      f7Ref.current.panel.close('left');
    }
  };

  f7ready((f7Instance) => {
    f7Ref.current = f7Instance;
    if (device.capacitor) {
      capacitorApp.init(f7Instance);
    }
  });

  return (
    <App { ...f7params }>
      <Panel left cover dark swipe>
        <View>
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
                  <ListItem 
                    key={dev.id} 
                    title={dev.titulo} 
                    subtitle={dev.fecha}
                    onClick={() => seleccionarDevocional(dev)}
                  />
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

        <View id="view-home" main tab tabActive url="/" initialPage>
          <Navbar>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
          </Navbar>
          <HomePage />
        </View>
        <View id="view-studies" name="studies" tab url="/studies/">
          <StudiesPage />
        </View>
        <View id="view-tools" name="tools" tab url="/tools/">
          <ToolsPage />
          <AdminPage />
        </View>
      </Views>
    </App>
  );
}
export default MyApp;