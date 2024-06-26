const { supabase } = require('../database');


exports.createMaquina = async (status_maquina, local_maquina) => {
  const { data, error } = await supabase.from('Maquina').insert({status_maquina: status_maquina, local_maquina:local_maquina}, { returning: 'minimal' }).select();
  if (error) {
  }
  return  {data,error};
};

exports.updateMaquina = async (id_maquina,status_maquina, local_maquina) => {
  const { data, error } = await supabase.from('Maquina').update({ status_maquina: status_maquina, local_maquina:local_maquina}).eq('id_maquina', id_maquina).select();
  if (error) {
  }
  return  {data,error};
};

exports.selectMaquina = async () => {
  const { data, error } = await supabase.from('Maquina').select(`id_maquina,status_maquina,local_maquina`);
  if (error) {
  }
  return { data, error };
};

exports.maquinaById = async (id_maquina) => {
  const { data, error } = await supabase.from('Maquina').select('id_maquina, status_maquina, local_maquina').eq('id_maquina', id_maquina);

  if (error) {
  }
  return { data, error };
};