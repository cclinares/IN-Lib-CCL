// api/crear-usuario.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xvxnqcvviwkqmhtfhfxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eG5xY3Z2aXdrcW1odGZoZnhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTkzNjM5MSwiZXhwIjoyMDYxNTEyMzkxfQ.L5z2xX8zf_FlrITBUPyNVpocH4cVNVjBceMvrqDJr5Q'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, correo, rol } = req.body;

  if (!nombre || !correo || !rol) return res.status(400).json({ error: 'Faltan campos requeridos' });

  try {
    const { data: user, error: authError } = await supabase.auth.admin.inviteUserByEmail(correo);
    if (authError) throw authError;

    const { error: insertError } = await supabase.from('usuarios').insert({
      id: user.user.id,
      nombre,
      correo,
      rol
    });
    if (insertError) throw insertError;

    return res.status(200).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: error.message || 'Error inesperado' });
  }
}
