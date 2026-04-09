import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Block,
  BlockTitle,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListInput,
  Range,
  Toggle,
  Icon
} from 'framework7-react';

const ToolsPage = () => {
  const [herramientaActiva, setHerramientaActiva] = useState('referencias');

  const herramientas = [
    { id: 'referencias', nombre: 'Referencias', icono: '📚', descripcion: 'Calculadora de versículos y referencias bíblicas' },
    { id: 'cronograma', nombre: 'Cronograma', icono: '📅', descripcion: 'Planifica tu serie de mensajes' },
    { id: 'notas', nombre: 'Notas', icono: '📝', descripcion: 'Tus notas y apuntes de predicación' },
    { id: 'himnario', nombre: 'Himnario', icono: '🎵', descripcion: 'Índice de himnos y cantos' },
  ];

  const renderHerramienta = () => {
    switch (herramientaActiva) {
      case 'referencias':
        return (
          <div>
            <BlockTitle>Calculadora de Referencias</BlockTitle>
            <Card>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '16px' }}>
                  Convierte referencias bíblicas a formato estándar
                </p>
                <List>
                  <ListInput
                    label="Referencia"
                    type="text"
                    placeholder="Ej: Juan 3:16 o Salmos 23:1"
                  />
                </List>
                <Block style={{ marginTop: '16px' }}>
                  <Button fill>Buscar</Button>
                </Block>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Referencia Rápida</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Juan 3:16', 'Salmos 23:1', 'Romanos 8:28', 'Proverbios 3:5-6', 'Efesios 2:8-9', 'Filipenses 4:13'].map((ref, i) => (
                    <span key={i} style={{ 
                      fontSize: '12px', 
                      padding: '6px 10px', 
                      background: 'rgba(102, 126, 234, 0.1)', 
                      color: '#667eea',
                      borderRadius: '6px' 
                    }}>
                      {ref}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'cronograma':
        return (
          <div>
            <BlockTitle>Cronograma de Predicación</BlockTitle>
            <Card>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '16px' }}>
                  Planifica tu serie de mensajes para las próximas semanas
                </p>
                <List>
                  <ListInput
                    label="Título de la Serie"
                    type="text"
                    placeholder="Ej: Vida en Cristo"
                  />
                  <ListInput
                    label="Número de Semanas"
                    type="number"
                    placeholder="8"
                  />
                </List>
                <Block style={{ marginTop: '16px' }}>
                  <Button fill>Crear Cronograma</Button>
                </Block>
              </CardContent>
            </Card>
          </div>
        );
      case 'notas':
        return (
          <div>
            <BlockTitle>Notas de Predicación</BlockTitle>
            <Card>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '16px' }}>
                  Guarda tus notas, ideas y apuntes para futuras predicaciones
                </p>
                <List>
                  <ListInput
                    label="Título"
                    type="text"
                    placeholder="Título de la nota"
                  />
                  <ListInput
                    label="Contenido"
                    type="textarea"
                    placeholder="Escribe tus notas aquí..."
                    resizable
                  />
                </List>
                <Block style={{ marginTop: '16px' }}>
                  <Button fill>Guardar Nota</Button>
                </Block>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Notas Recientes</h4>
                <p style={{ fontSize: '13px', color: '#8e8e93' }}>No hay notas guardadas aún</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'himnario':
        return (
          <div>
            <BlockTitle>Himnario</BlockTitle>
            <Card>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '16px' }}>
                  Busca himnos y cantos para tu servicio
                </p>
                <List>
                  <ListInput
                    label="Buscar Himno"
                    type="search"
                    placeholder="Por título o número..."
                  />
                </List>
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Himnos Populares</h4>
                  {[
                    { numero: '1', titulo: 'Santo, Santo, Santo' },
                    { numero: '62', titulo: 'Jesús Es Mi Rey' },
                    { numero: '103', titulo: 'Dame Tu Corazón' },
                    { numero: '245', titulo: 'En Tu Presencia' },
                    { numero: '328', titulo: 'Gracias Señor' },
                  ].map((himno, i) => (
                    <div key={i} style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: '500' }}>{himno.titulo}</span>
                      <span style={{ fontSize: '12px', color: '#667eea' }}>#{himno.numero}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Page name="tools">
      <Navbar large sliding={false}>
        <NavTitle sliding>Herramientas</NavTitle>
        <NavTitleLarge>Herramientas del Predicador</NavTitleLarge>
      </Navbar>

      <Block>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {herramientas.map((h) => (
            <div 
              key={h.id}
              onClick={() => setHerramientaActiva(h.id)}
              style={{ 
                padding: '12px 8px', 
                background: herramientaActiva === h.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
                borderRadius: '8px',
                color: herramientaActiva === h.id ? 'white' : '#333',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{h.icono}</div>
              <span style={{ fontSize: '10px', fontWeight: '500' }}>{h.nombre}</span>
            </div>
          ))}
        </div>
      </Block>

      {renderHerramienta()}
    </Page>
  );
};
export default ToolsPage;