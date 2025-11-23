import { useState } from 'react';
import { Button, Input, Checkbox } from 'neo-ram-prisma'; // Tu librería
import type { Todo } from '../hooks/useTodos';

// Props que recibirá este componente
interface Props {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  visionMode: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export const PrismaTodo = ({ todos, onAdd, onToggle, onDelete, visionMode }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue(''); // Limpiar input
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '10px' }}>
      <h3 style={{ marginTop: 0 }}>✨ Versión Prisma (Accesible)</h3>
      
      {/* FORMULARIO DE AGREGAR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Nueva tarea accesible..."
            value={inputValue}
            // Nota: Verifica si tu Input usa 'onChange' estándar o devuelve solo el valor
            onChange={(e: any) => setInputValue(e.target.value)} 
            colorVision={visionMode}
            variant="primary"
          />
        </div>
        <Button 
          variant="primary" 
          onClick={handleAdd}
          colorVision={visionMode}
        >
          Agregar
        </Button>
      </div>

      {/* LISTA DE TAREAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1px',
              borderBottom: '1px solid #eee'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Checkbox 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                colorVision={visionMode}
                variant="success"
                label="" // Label vacío si solo queremos el cuadrito
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : 'inherit'
              }}>
                {todo.text}
              </span>
            </div>

            <Button 
              variant="danger" 
              //size="sm" // Usamos tamaño pequeño si tu librería lo tiene
              onClick={() => onDelete(todo.id)}
              colorVision={visionMode}
            >
              Eliminar
            </Button>
          </div>
        ))}
        
        {todos.length === 0 && <p style={{color: '#888'}}>No hay tareas pendientes.</p>}
      </div>
    </div>
  );
};