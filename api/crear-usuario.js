import { supabase } from '../../utils/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, correo, rol, curso_id } = req.body;

  const { data, error } = await supabase.from('usuarios').insert([{ nombre, correo, rol, curso_id }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ usuario: data[0] });
}