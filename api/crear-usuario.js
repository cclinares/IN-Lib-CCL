// api/crear-usuario.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xvxnqcvviwkqmhtfhfxo.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, correo, rol } = req.body;
  if (!nombre || !correo || !rol) return res.status(400).json({ error: 'Faltan datos requeridos' });

  try {
    const { data: authUser, error: authError } = await supabase.auth.admin.inviteUserByEmail(correo);
    if (authError) throw authError;

    const { data: insertado, error: dbError } = await supabase
      .from('usuarios')
      .insert({ nombre, correo, rol, auth_id: authUser.user.id });

    if (dbError) throw dbError;

    return res.status(200).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    return res.status(500).json({ error: 'Error al crear usuario: ' + error.message });
  }
}
