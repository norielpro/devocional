import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  Link,
  Block,
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from 'framework7-react';
import store from '../js/store';

const DevocionalDetailPage = (props) => {
  const { id } = props.route.params || {};
  const devocionales = store.getState().devocionales;
  const devocional = devocionales.find(d => String(d.id) === String(id));

  if (!devocional) {
    return (
      <Page>
        <Navbar title="Devocional" backLink="Atrás">
          <NavLeft>
            <Link back iconIos="f7:chevron_left" iconMd="material:arrow_back" />
          </NavLeft>
        </Navbar>
        <Block>
          <p>Devocional no encontrado.</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar title={devocional.titulo} backLink="Atrás">
        <NavLeft>
          <Link back iconIos="f7:chevron_left" iconMd="material:arrow_back" />
        </NavLeft>
      </Navbar>

      <Block>
        <Card>
          <CardHeader className="no-border" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <div style={{ padding: '16px' }}>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>{devocional.fecha}</span>
            </div>
          </CardHeader>
          <CardContent>
            <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>{devocional.titulo}</h2>
            <div style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', borderLeft: '3px solid #667eea' }}>
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
    </Page>
  );
};
export default DevocionalDetailPage;