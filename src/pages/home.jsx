import React, { useState, useEffect } from 'react';
import {
  Page,
  Block,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Link,
  Preloader
} from 'framework7-react';
import { Share } from '@capacitor/share';
import store from '../js/store';

const HomePage = () => {
  const [devocional, setDevocional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todosDevocionales, setTodosDevocionales] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const state = store.state;
      if (state.devocionales && state.devocionales.length > 0) {
        setTodosDevocionales(state.devocionales);
        
        if (state.devocionalSeleccionado) {
          setDevocional(state.devocionalSeleccionado);
        } else {
          const dev = getDevocionalSemanal(state.devocionales);
          setDevocional(dev);
        }
        setLoading(false);
      } else {
        setTimeout(loadData, 300);
      }
    };
    loadData();
  }, [key]);

  useEffect(() => {
    const interval = setInterval(() => {
      const state = store.state;
      if (state.devocionalSeleccionado && state.devocionalSeleccionado.id !== devocional?.id) {
        console.log('Store selection changed to:', state.devocionalSeleccionado.titulo);
        setDevocional(state.devocionalSeleccionado);
        setKey(k => k + 1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [devocional?.id]);

  function getDevocionalSemanal(devocionales) {
    if (!devocionales || devocionales.length === 0) return null;
    
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const inicio = new Date(anio, 0, 1);
    const diff = hoy - inicio;
    const unaSemana = 7 * 24 * 60 * 60 * 1000;
    const semana = Math.ceil((diff + inicio.getDay() * 24 * 60 * 60 * 1000) / unaSemana);
    const indice = (semana - 1) % devocionales.length;
    
    return devocionales[indice] || devocionales[0];
  }

  const compartirDevocional = async () => {
    if (!devocional) return;
    
    const texto = `${devocional.titulo}\n\n${devocional.versiculo}\n\n${devocional.reflexion || ''}\n\n${devocional.oracion || ''}\n\n- Devocional Cristiano`;
    
    try {
      await Share.share({
        title: devocional.titulo,
        text: texto,
        dialogTitle: 'Compartir Devocional'
      });
    } catch (error) {
      console.log('Error al compartir:', error);
    }
  };

  if (loading) {
    return (
      <Page name="home">
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
        <Block>
          <p>No hay devocionales disponibles.</p>
        </Block>
      </Page>
    );
  }

  console.log('Mostrando devocional:', devocional.titulo);

  return (
    <Page name="home">
      <Block>
        <Card className="demo-card-header-pic">
          <CardHeader className="no-border" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <div style={{ padding: '16px' }}>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>Devocional</span>
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
            <Link onClick={compartirDevocional}>Compartir</Link>
            <Link>Guardar</Link>
          </CardFooter>
        </Card>
      </Block>

      {todosDevocionales.length > 1 && (
        <Block>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Otros Devocionales</h3>
          {todosDevocionales.slice(0, 5).map((dev) => (
            <Card key={dev.id} style={{ marginBottom: '12px' }}>
              <CardContent padding>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>{dev.titulo}</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8e8e93' }}>{dev.fecha}</p>
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