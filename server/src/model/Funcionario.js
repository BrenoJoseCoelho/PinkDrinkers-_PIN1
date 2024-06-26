const { supabase } = require('../database');


exports.createFuncionario = async (nome, email, password) => {
  const { data, error } = await supabase.from('Funcionario')
  .insert({ name: nome, email: email, password: password}, { returning: 'minimal' })
  .select();
  if (error) {
  }
  return  {data,error};
};

exports.updateFuncionario = async (id_funcionario, nome, email, password) => {
  const { data, error } = await supabase.from('Funcionario').update({ name: nome, email: email, password: password}).eq('id_funcionario', id_funcionario).select();
  if (error) {
  }
  return  {data,error};
};

exports.selectFuncionarios = async () => {
  let { data: Funcionario, error } = await supabase
    .from('Funcionario')
    .select('name, email');

  if (error) {
  }

  return { data: Funcionario, error };
};


exports.funcionarioById = async (id_funcionario) => {
  const { data, error } = await supabase
    .from('Funcionario')
    .select('name, email, password')
    .eq('id_funcionario', id_funcionario);

  if (error) {
  }  
  
  return { data, error };
};
