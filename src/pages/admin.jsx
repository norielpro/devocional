import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  Link,
  Block,
  List,
  ListItem,
  Button,
  BlockTitle,
  Input,
  Icon
} from 'framework7-react';
import store from '../js/store';

const AdminPage = () => {
  const [devocionales, setDevocionales] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    versiculo: '',
    reflexion: '',
    oracion: ''
  });

  useEffect(() => {
    const loadData = () => {
      const state = store.state;
      if (state.devocionales && state.devocionales.length > 0) {
        setDevocionales([...state.devocionales]);
      }
    };
    loadData();
  }, []);

  const abrirNuevo = () => {
    setEditando(null);
    setFormData({
      titulo: '',
      fecha: '',
      versiculo: '',
      reflexion: '',
      oracion: ''
    });
    setMostrarPopup(true);
  };

  const abrirEditar = (dev) => {
    setEditando(dev);
    setFormData({
      titulo: dev.titulo || '',
      fecha: dev.fecha || '',
      versiculo: dev.versiculo || '',
      reflexion: dev.reflexion || '',
      oracion: dev.oracion || ''
    });
    setMostrarPopup(true);
  };

  const guardarDevocional = () => {
    let nuevosDevocionales;
    
    if (editando) {
      nuevosDevocionales = devocionales.map(d => 
        d.id === editando.id ? { ...d, ...formData } : d
      );
    } else {
      const nuevoDevocional = {
        id: Date.now(),
        ...formData
      };
      nuevosDevocionales = [...devocionales, nuevoDevocional];
    }
    
    setDevocionales(nuevosDevocionales);
    store.state.devocionales = nuevosDevocionales;
    localStorage.setItem('devocionales_cache', JSON.stringify(nuevosDevocionales));
    setMostrarPopup(false);
  };

  const eliminarDevocional = (id) => {
    if (confirm('¿Estás seguro de eliminar este devocional?')) {
      const nuevosDevocionales = devocionales.filter(d => d.id !== id);
      setDevocionales(nuevosDevocionales);
      store.state.devocionales = nuevosDevocionales;
      localStorage.setItem('devocionales_cache', JSON.stringify(nuevosDevocionales));
    }
  };

  const exportarJSON = () => {
    const json = { devocionales: devocionales };
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devocionales.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Page name="admin">
      <Navbar>
        <NavLeft>
          <Link iconIos="f7:chevron_left" iconMd="material:arrow_back" href="/tools/" />
        </NavLeft>
        <span style={{ fontSize: '18px', fontWeight: '600' }}>Admin Devocionales</span>
        <Block>
          <Button fill onClick={abrirNuevo}>+ Nuevo Devocional</Button>
        </Block>
      </Navbar>

      <Block>
        <p style={{ fontSize: '13px', color: '#8e8e93' }}>
          Gestiona los devocionales. Los cambios se guardan localmente.
          Exporta el JSON para subir a GitHub.
        </p>
      </Block>

      <Block>
        <Button fill outline onClick={exportarJSON} style={{ marginBottom: '16px' }}>
          📥 Exportar JSON
        </Button>
      </Block>

      <List>
        {devocionales.map((dev) => (
          <ListItem key={dev.id}>
            <div style={{ width: '100%', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', fontSize: '15px' }}>{dev.titulo}</span>
                <div>
                  <Button small onClick={() => abrirEditar(dev)} style={{ marginRight: '8px' }}>✏️</Button>
                  <Button small fill color="red" onClick={() => eliminarDevocional(dev.id)}>🗑️</Button>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#8e8e93', margin: 0 }}>{dev.fecha}</p>
            </div>
          </ListItem>
        ))}
      </List>

      {mostrarPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '8px', width: '90%', maxWidth: '500px',
            maxHeight: '90vh', overflow: 'auto'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>
                {editando ? 'Editar Devocional' : 'Nuevo Devocional'}
              </span>
              <Link iconIos="f7:xmark" iconMd="material:close" onClick={() => setMostrarPopup(false)} />
            </div>
            <Block>
              <BlockTitle>Título</BlockTitle>
              <Input 
                type="text" 
                value={formData.titulo} 
                onInput={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="Título del devocional"
              />
              
              <BlockTitle>Fecha</BlockTitle>
              <Input 
                type="text" 
                value={formData.fecha} 
                onInput={(e) => setFormData({...formData, fecha: e.target.value})}
                placeholder="Ej: 1 - 7 de Mayo, 2026"
              />
              
              <BlockTitle>Versículo</BlockTitle>
              <textarea 
                value={formData.versiculo} 
                onChange={(e) => setFormData({...formData, versiculo: e.target.value})}
                placeholder="Versículo bíblico"
                style={{ width: '100%', minHeight: '80px', padding: '8px' }}
              />
              
              <BlockTitle>Reflexión</BlockTitle>
              <textarea 
                value={formData.reflexion} 
                onChange={(e) => setFormData({...formData, reflexion: e.target.value})}
                placeholder="Texto de reflexión"
                style={{ width: '100%', minHeight: '120px', padding: '8px' }}
              />
              
              <BlockTitle>Oración</BlockTitle>
              <textarea 
                value={formData.oracion} 
                onChange={(e) => setFormData({...formData, oracion: e.target.value})}
                placeholder="Oración"
                style={{ width: '100%', minHeight: '80px', padding: '8px' }}
              />
              
              <Button fill onClick={guardarDevocional} style={{ marginTop: '16px' }}>
                💾 Guardar
              </Button>
            </Block>
          </div>
        </div>
      )}
    </Page>
  );
};
export default AdminPage;