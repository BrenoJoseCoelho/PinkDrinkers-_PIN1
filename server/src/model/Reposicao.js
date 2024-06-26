const { supabase } = require('../database');

// Verificar se o Totem existe
const verificarTotem = async (id_totem) => {
  const { data, error } = await supabase.from('Totem').select('*').eq('id_totem', id_totem);
  if (error) throw new Error('Erro ao verificar totem');
  if (!data || data.length === 0) throw new Error('Totem não encontrado');
  return data;
};

// Verificar se o Item de Estoque existe
const verificarItemEstoque = async (id_itemestoque) => {
  const { data, error } = await supabase.from('ItemEstoque').select('*').eq('id_itemestoque', id_itemestoque);
  if (error) throw new Error('Erro ao verificar item de estoque');
  if (!data || data.length === 0) throw new Error('Item de estoque não encontrado');
  return data;
};

exports.createReposicao = async (status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem) => {
  try {
    // Verificar Totem
    await verificarTotem(id_totem);

    // Verificar Item de Estoque
    await verificarItemEstoque(id_itemestoque);

    // Inserir Reposição
    const { data, error } = await supabase.from('Reposicao').insert({
      status_reposicao,
      observacao_reposicao,
      id_itemestoque,
      data_reposicao,
      id_totem
    }, { returning: 'minimal' }).select();

    if (error) throw new Error('Erro ao criar reposição');
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

exports.updateReposicao = async (id_reposicao, status_reposicao, observacao_reposicao, id_itemestoque, data_reposicao, id_totem) => {
  try {
    // Verificar Totem
    await verificarTotem(id_totem);

    // Verificar Item de Estoque
    await verificarItemEstoque(id_itemestoque);

    // Atualizar Reposição
    const { data, error } = await supabase.from('Reposicao').update({
      status_reposicao,
      observacao_reposicao,
      id_itemestoque,
      data_reposicao,
      id_totem
    }).eq('id_reposicao', id_reposicao).select();

    if (error) throw new Error('Erro ao atualizar reposição');
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

exports.listaReposicao = async () => {
  const { data, error } = await supabase.from('Reposicao').select('id_reposicao, Totem(nome_totem),Item_estoque(Bebida(nome_bebida)), status_reposicao, data_reposicao');
  return { data, error };
};

exports.reposicaoById = async (id_reposicao) => {
  const { data, error } = await supabase.from('Reposicao').select('id_reposicao, id_itemestoque, id_totem, status_reposicao,observacao_reposicao, data_reposicao').eq('id_reposicao', id_reposicao);
  return { data, error };
};
