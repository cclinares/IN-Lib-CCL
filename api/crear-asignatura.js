import { supabase } from '../../utils/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, nivel } = req.body;

  const { data, error } = await supabase.from('asignaturas').insert([{ nombre, nivel }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ asignatura: data[0] });
}