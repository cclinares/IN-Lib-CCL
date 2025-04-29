import { supabase } from '../../utils/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { curso_id, asignatura_id, profesor_id } = req.body;

  const { data, error } = await supabase.from('profesores_asignaturas').insert([{ curso_id, asignatura_id, profesor_id }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ asignacion: data[0] });
}