import { supabase } from '../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, nivel, profe_guia_id } = req.body;

  const { data, error } = await supabase.from('cursos').insert([{ nombre, nivel, profe_guia_id }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ curso: data[0] });
}