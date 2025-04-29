import { supabase } from '../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nivel, inspector_id } = req.body;

  const { data, error } = await supabase.from('inspectores_niveles').insert([{ nivel, inspector_id }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ asignacion: data[0] });
}