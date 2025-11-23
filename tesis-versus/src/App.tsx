import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { PrismaTodo } from './components/PrismaTodo';
import { Select } from 'neo-ram-prisma';

type VisionMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

function App() {
  const [visionMode, setVisionMode] = useState<VisionMode>('normal');
  
  // Lógica del To-Do
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  const visionOptions = [
    { value: 'normal', label: '👁 Visión Normal' },
    { value: 'protanopia', label: '🔴 Protanopia (Rojo)' },
    { value: 'deuteranopia', label: '🟢 Deuteranopia (Verde)' },
    { value: 'tritanopia', label: '🔵 Tritanopia (Azul)' },
  ];

  return (
    <div className="app-container"> 
      <h1 style={{ 
        display: 'flex',
        alignItems: 'center',     // Centra verticalmente logo y texto
        justifyContent: 'center', // Centra todo el bloque en la página
        gap: '20px',              // Espacio entre la imagen y el texto
        marginBottom: '30px', 
        fontSize: '2.5rem', 
        color: '#333' 
      }}>
        <img 
          src="PrismaIcon.png"
          alt="To Do Prisma Logo" 
          style={{ 
            height: '60px', 
            width: 'auto', 
            objectFit: 'contain'
          }} 
        />
        
        To Do Prisma
      </h1>
      {/* CONTROLADOR DE VISIÓN */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        textAlign: 'left'
      }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
          Simulación de Vista:
        </label>
        
        {/* Largo del select*/}
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Select 
            variant="primary"
            options={visionOptions}
            placeholder="Selecciona un modo"
            value={visionMode}
            onChange={(e: any) => {
               const val = e.target ? e.target.value : e;
               setVisionMode(val as VisionMode);
            }}
            colorVision={visionMode} 
            style={{ width: '100%' }} 
          />
        </div>
      </div>

      {/* Tu componente Prisma (El To-Do Completo) */}
      <div style={{ textAlign: 'left' }}> 
        <PrismaTodo 
          todos={todos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={removeTodo}
          visionMode={visionMode}
        />
      </div>

    </div>
  );
}

export default App;