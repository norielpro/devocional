import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  NavLeft,
  Link,
  Block,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Preloader
} from 'framework7-react';
import store from '../js/store';

const HomePage = () => {
  const [devocional, setDevocional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todosDevocionales, setTodosDevocionales] = useState([]);

  useEffect(() => {
    const loadDevocionales = () => {
      const state = store.state;
      if (state.devocionales && state.devocionales.length > 0) {
        setTodosDevocionales(state.devocionales);
        const devocionalDelDia = getDevocionalSemanal(state.devocionales);
        setDevocional(devocionalDelDia);
        setLoading(false);
      } else {
        setTimeout(loadDevocionales, 500);
      }
    };
    loadDevocionales();
  }, []);

  function getDevocionalSemanal(devocionales) {
    if (!devocionales.length) return null;
    
    const hoy = new Date();
    const semanaDelAnio = getWeekNumber(hoy);
    const indice = semanaDelAnio % devocionales.length;
    
    return devocionales[indice] || devocionales[0];
  }

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  if (loading) {
    return (
      <Page name="home">
        <Navbar large sliding={false}>
          <NavLeft>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" panelClose />
          </NavLeft>
          <NavTitle sliding>Devocional</NavTitle>
          <NavTitleLarge>Devocional Cristiano</NavTitleLarge>
        </Navbar>
        <Block className="text-align-center" style={{ padding: '50px' }}>
          <Preloader size="42px" />
          <p style={{ marginTop: '16px', color: '#8e8e93' }}>Cargando devocional...</p>
        </Block>
      </Page>
    );
  }

  if (!devocional) {
    return (
      <Page name="home">
        <Navbar large sliding={false}>
          <NavLeft>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" panelClose />
          </NavLeft>
          <NavTitle sliding>Devocional</NavTitle>
          <NavTitleLarge>Devocional Cristiano</NavTitleLarge>
        </Navbar>
        <Block>
          <p>No hay devocionales disponibles.</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page name="home">
      <Navbar large sliding={false}>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" panelClose />
        </NavLeft>
        <NavTitle sliding>Devocional</NavTitle>
        <NavTitleLarge>Devocional Cristiano</NavTitleLarge>
      </Navbar>

      <Block>
        <Card className="demo-card-header-pic">
          <CardHeader className="no-border" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <div style={{ padding: '16px' }}>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>Devocional de la Semana</span>
            </div>
          </CardHeader>
          <CardContent>
            <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '20px', fontWeight: '600' }}>{devocional.titulo}</h2>
            <p style={{ fontSize: '12px', color: '#8e8e93', margin: 0 }}>{devocional.fecha}</p>
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', borderLeft: '3px solid #667eea' }}>
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '13px', lineHeight: '1.5' }}>"{devocional.versiculo}"</p>
            </div>
            {devocional.reflexion && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Reflexión</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#8e8e93' }}>{devocional.reflexion}</p>
              </div>
            )}
            {devocional.oracion && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(118, 75, 162, 0.1)', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '500' }}>📿 Oración</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', lineHeight: '1.5' }}>{devocional.oracion}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link>Compartir</Link>
            <Link>Guardar</Link>
          </CardFooter>
        </Card>
      </Block>

      {todosDevocionales.length > 1 && (
        <Block>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Otros Devocionales</h3>
          {todosDevocionales.filter(d => d.id !== devocional.id).slice(0, 3).map((dev) => (
            <Card key={dev.id} style={{ marginBottom: '12px' }}>
              <CardContent padding>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>{dev.titulo}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8e8e93' }}>{dev.fecha}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Block>
      )}
    </Page>
  );
};
export default HomePage;