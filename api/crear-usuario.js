// api/crear-usuario.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, correo, rol } = req.body;

  try {
    // 1. Crear usuario en Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: correo,
      email_confirm: true, // envía correo automáticamente
    });

    if (authError) throw authError;

    // 2. Insertar en tabla usuarios
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert({ nombre, correo, rol });

    if (insertError) throw insertError;

    res.status(200).json({ message: 'Usuario creado correctamente.' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: error.message });
  }
}
