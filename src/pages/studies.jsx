import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Block,
  BlockTitle,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
  Card,
  CardContent,
  Link,
  Icon
} from 'framework7-react';

const StudiesPage = () => {
  const categorias = [
    {
      id: 1,
      nombre: 'Libros de la Biblia',
      icono: 'book',
      temas: [
        { id: 1, titulo: 'Génesis - Creación y Patriarchas', versiculos: 'Génesis 1-50' },
        { id: 2, titulo: 'Salmos - Alabanza y Oración', versiculos: 'Salmos 1-150' },
        { id: 3, titulo: 'Proverbios - Sabiduría Práctica', versiculos: 'Proverbios 1-31' },
        { id: 4, titulo: 'Romanos - Doctrina Cristiana', versiculos: 'Romanos 1-16' },
      ]
    },
    {
      id: 2,
      nombre: 'Temas Teológicos',
      icono: 'lightbulb',
      temas: [
        { id: 5, titulo: 'Soteriología - Doctrina de la Salvación', versiculos: 'Juan 3:16, Efesios 2:8-9' },
        { id: 6, titulo: 'Cristología - Estudio de Cristo', versiculos: 'Filipenses 2:5-11, Hebreos 1' },
        { id: 7, titulo: 'Pneumatología - El Espíritu Santo', versiculos: 'Juan 14:16-26, Hechos 2' },
        { id: 8, titulo: 'Escatología - Eventos Finales', versiculos: 'Apocalipsis 20-22' },
      ]
    },
    {
      id: 3,
      nombre: 'Estudios por Libros',
      icono: 'doc_text',
      temas: [
        { id: 9, titulo: 'Estudios en Mateo', versiculos: 'Mateo 1-28' },
        { id: 10, titulo: 'Estudios en Efesios', versiculos: 'Efesios 1-6' },
        { id: 11, titulo: 'Estudios en Santiago', versiculos: 'Santiago 1-5' },
      ]
    },
    {
      id: 4,
      nombre: 'Personajes Bíblicos',
      icono: 'person',
      temas: [
        { id: 12, titulo: 'Abraham - El Padre de la Fe', versiculos: 'Génesis 12-25' },
        { id: 13, titulo: 'Moisés - El Libertador', versiculos: 'Éxodo 1-40' },
        { id: 14, titulo: 'David - El Rey Según el Corazón de Dios', versiculos: '1 Samuel 16 - 1 Reyes 2' },
        { id: 15, titulo: 'Pablo - El Apóstol de los Gentiles', versiculos: 'Hechos 9, Filipenses' },
      ]
    }
  ];

  return (
    <Page name="studies">
      <Navbar large sliding={false}>
        <NavTitle sliding>Estudios</NavTitle>
        <NavTitleLarge>Estudios Bíblicos</NavTitleLarge>
      </Navbar>

      <Block>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Explora por Categoría</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {categorias.map((cat) => (
            <div key={cat.id} style={{ 
              padding: '16px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                {cat.icono === 'book' && '📖'}
                {cat.icono === 'lightbulb' && '💡'}
                {cat.icono === 'doc_text' && '📝'}
                {cat.icono === 'person' && '👤'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>{cat.nombre}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Temas Populares</h3>
        <List accordionList>
          {categorias.map((categoria) => (
            <AccordionItem key={categoria.id} opened={categoria.id === 1}>
              <AccordionToggle>
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>
                    {categoria.icono === 'book' && '📖'}
                    {categoria.icono === 'lightbulb' && '💡'}
                    {categoria.icono === 'doc_text' && '📝'}
                    {categoria.icono === 'person' && '👤'}
                  </span>
                  <span style={{ fontWeight: '500' }}>{categoria.nombre}</span>
                </div>
              </AccordionToggle>
              <AccordionContent>
                {categoria.temas.map((tema) => (
                  <ListItem key={tema.id} link={`/estudio/${tema.id}/`} title={tema.titulo} after={tema.versiculos} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </List>
      </Block>
    </Page>
  );
};
export default StudiesPage;